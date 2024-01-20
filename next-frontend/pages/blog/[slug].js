import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import "boxicons/css/boxicons.min.css";
import { createClient } from "next-sanity";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import SanityImage from "../SanityImage";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

export default function Post({ blog, author, allBlogs }) {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [hovered, sethovered] = useState(false);
  const [copy, setCopy] = useState([]);

  const codeRefs = useRef([]);

  const handleCopyClick = (index) => {
    const selectedCodeRef = codeRefs.current[index];
    if (selectedCodeRef.current) {
      navigator.clipboard.writeText(selectedCodeRef.current.innerText);
    }

    setCopy((prevIndexes) => [...prevIndexes, index]);
    setTimeout(() => {
      setCopy((prevIndexes) => prevIndexes.filter((i) => i !== index));
    }, 1000);
  };

  const [isScrolled, setIsScrolled] = useState(true);
  let pubdate = new Date(blog._createdAt);
  let dateoptions = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const builder = imageUrlBuilder({
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_DATASET,
  });
  useEffect(() => {
    const handleScroll = () => {
      // Check if the page is scrolled down

      setIsScrolled(window.scrollY == 0);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const currIdx = allBlogs.findIndex((item) => item._id === blog._id);

  const getVideoId = (inputString) => {
    const regex = /(?:\?|&)v=([^&]+)/;
    const match = inputString.match(regex);

    return match ? match[1] : inputString;
  };
  const myPortableTextComponents = {
    types: {
      image: ({ value }) => {
        return (
          <div className="flex justify-center">
            <SanityImage {...value} />
          </div>
        );
      },
      code: ({ index, value }) => {
        codeRefs.current[index] = useRef(null);

        return (
          <div className="relative">
            <div
              className="absolute right-3 invert top-3 z-20 cursor-pointer scale-125 "
              onClick={() => handleCopyClick(index)}
            >
              {copy.includes(index) ? (
                <i
                  className="bx bxs-check-circle invert"
                  style={{ color: "green" }}
                ></i>
              ) : (
                <i className="bx bx-copy-alt "></i>
              )}
            </div>
            <div ref={codeRefs.current[index]}>
              <SyntaxHighlighter language={value.language} style={atomDark}>
                {value.code}
              </SyntaxHighlighter>
            </div>
          </div>
        );
      },
      youtube: ({ value }) => {
        let vid = getVideoId(value.url);

        return (
          <div>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${vid}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        );
      },
    },
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    sethovered(false);
  };
  const triggerMobileNavItem = () => {
    setMobileMenu(false);
  };

  const imageRef = author.image.asset._ref;
  const imgUrl2 = builder.image(imageRef).url();
  const metaImg = builder.image(blog.blogimg.asset._ref).url();


  let dim = imgUrl2.match(/-(\d+)x(\d+)\./);
  var lowDim = Math.min(dim[1], dim[2]);

  const imgUrl = imgUrl2 + `?rect=0,0,${lowDim},${lowDim}`;

  return (
    <>
      <div
        className={` relative ${
          mobileMenu ? "overflow-hidden max-h-screen" : ""
        } bg-grey-50`}
      >
        <Head>
          <meta charSet="utf-8" />

          <meta content="IE=edge,chrome=1" httpEquiv="X-UA-Compatible" />

          <meta
            content="width=device-width, initial-scale=1, shrink-to-fit=yes maximum-scale=1, user-scalable=no"
            name="viewport"
          />

          <title>{blog.title}</title>

          <meta property="og:title" content={blog.title} />

          <meta property="og:locale" content="en_US" />

          <link
            rel="canonical"
            href={`https://namanarora.in/blogs/${blog.slug.current}`}
          />

          <meta
            property="og:url"
            content={`https://namanarora.in/blogs/${blog.slug.current}`}
          />

          <meta name="description" content={blog.metadesc} />

          <meta name="theme-color" content="#5540af" />

          <meta property="og:site_name" content={blog.title} />

          <meta property="og:image" content={metaImg} />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content={metaImg} />
        </Head>
        {/* ======================================> Main Navbar <=================================== */}
        <div
          className={`w-full z-50 top-0 py-2  sm:py-5 bg-primary ${
            isScrolled ? "fixed bg-none opacity-100" : " absolute"
          }
  `}
        >
          <div className="container flex items-center justify-between px-[5vw] ">
            <div>
              <Link href="/">
                <img
                  src="/assets/img/logo.png"
                  className="scale-110 ml-10 lg:w-40 w-24"
                  alt="logo image"
                />
              </Link>
            </div>
            <div className="hidden lg:block">
              <ul className="flex items-center">
                <li className="group pl-6">
                  <Link href={"/#about"}>
                    <span className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white ">
                      About
                    </span>

                    <span className="block h-0.5 w-full bg-transparent group-hover:bg-yellow"></span>
                  </Link>
                </li>
                <li className="group pl-6">
                  <Link href={"/#services"}>
                    <span className="cursor-pointer pt-0.5 font-header font-semibold  uppercase text-white">
                      Services
                    </span>

                    <span className="block h-0.5 w-full bg-transparent group-hover:bg-yellow"></span>
                  </Link>
                </li>
                <li className="group pl-6">
                  <Link href={"/#portfolio"}>
                    <span className="cursor-pointer pt-0.5 font-header font-semibold  uppercase text-white">
                      Portfolio
                    </span>

                    <span className="block h-0.5 w-full bg-transparent group-hover:bg-yellow"></span>
                  </Link>
                </li>

                <li className="group pl-6">
                  <Link href={"/#clients"}>
                    <span className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white">
                      Clients
                    </span>

                    <span className="block h-0.5 w-full bg-transparent group-hover:bg-yellow"></span>
                  </Link>
                </li>
                <li className="group pl-6">
                  <Link href={"/#work"}>
                    <span className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white">
                      Work
                    </span>

                    <span className="block h-0.5 w-full bg-transparent group-hover:bg-yellow"></span>
                  </Link>
                </li>

                <li className="group pl-6">
                  <Link href={"/#statistics"}>
                    <span className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white">
                      Statistics
                    </span>

                    <span className="block h-0.5 w-full bg-transparent group-hover:bg-yellow"></span>
                  </Link>
                </li>

                <li className="group pl-6">
                  <Link href={"/#blog"}>
                    <span className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white">
                      Blog
                    </span>

                    <span className="block h-0.5 w-full bg-transparent group-hover:bg-yellow"></span>
                  </Link>
                </li>

                <li className="group pl-6">
                  <Link href={"/#contact"}>
                    <span className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white">
                      Contact
                    </span>

                    <span className="block h-0.5 w-full bg-transparent group-hover:bg-yellow"></span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="block lg:hidden">
              <button onClick={() => setMobileMenu(true)}>
                <i className="bx bx-menu text-4xl text-white"></i>
              </button>
            </div>
          </div>
        </div>

        {/* =====================================> Mobile Navbar <==================================== */}

        <div
          className={`pointer-events-none fixed inset-0 z-70 min-h-screen bg-black bg-opacity-70 opacity-0 transition-opacity lg:hidden ${
            mobileMenu ? "opacity-100 pointer-events-auto" : ""
          }`}
        >
          <div className="absolute right-0 min-h-screen w-2/3 bg-primary py-4 px-8 shadow md:w-1/3">
            <button
              className="absolute top-0 right-0 mt-4 mr-4"
              onClick={() => {
                setMobileMenu(false);
              }}
            >
              <img
                src="/assets/img/icon-close.svg"
                className="h-10 w-auto"
                alt=""
              />
            </button>

            <ul className="mt-8 flex flex-col">
              <li
                className="py-2"
                onClick={() => triggerMobileNavItem("#about")}
              >
                <Link href={"/#about"}>
                  <span className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white">
                    About
                  </span>
                </Link>
              </li>

              <li
                className="py-2"
                onClick={() => triggerMobileNavItem("#services")}
              >
                <Link href={"/#services"}>
                  <span className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white">
                    Services
                  </span>
                </Link>
              </li>

              <li
                className="py-2"
                onClick={() => triggerMobileNavItem("#portfolio")}
              >
                <Link href={"/#portfolio"}>
                  <span className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white">
                    Portfolio
                  </span>
                </Link>
              </li>

              <li
                className="py-2"
                onClick={() => {
                  triggerMobileNavItem("#clients");
                }}
              >
                <Link href={"/#clients"}>
                  <span className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white">
                    Clients
                  </span>
                </Link>
              </li>

              <li
                className="py-2"
                onClick={() => triggerMobileNavItem("#work")}
              >
                <Link href={"/#work"}>
                  <span className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white">
                    Work
                  </span>
                </Link>
              </li>

              <li
                className="py-2"
                onClick={() => triggerMobileNavItem("#statistics")}
              >
                <Link href={"/#statistics"}>
                  <span className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white">
                    Statistics
                  </span>
                </Link>
              </li>

              <li
                className="py-2"
                onClick={() => triggerMobileNavItem("#blog")}
              >
                <Link href={"/#blog"}>
                  <span className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white">
                    Blog
                  </span>
                </Link>
              </li>

              <li
                className="py-2"
                onClick={() => triggerMobileNavItem("#contact")}
              >
                <Link href={"/#contact"}>
                  <span className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white">
                    Contact
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* ==========================Scroll up======================== */}

        <div
          className={`  bg-none fixed h-9 scale-[3] bottom-2 right-7  rounded-full z-70 cursor-pointer transition-opacity duration-300 ${
            isScrolled ? "hidden" : ""
          }`}
        >
          <i
            className={`bx bx-up-arrow-circle  bg-primary text-white rounded-full ${
              hovered ? " bx-tada scale-105" : ""
            } `}
            onMouseEnter={() => sethovered(true)}
            onMouseLeave={() => {
              sethovered(false);
            }}
            onClick={scrollToTop}
          ></i>
        </div>
        {/* ========================================main blog================================ */}
        <div>
          <div className="container py-6 md:py-10 md:w-[80vw] w-[95vw] mx-auto text-justify md:pt-36 pt-15  shadow overflow-x-hidden">
            <div className="mx-auto max-w-4xl">
              <div className="">
                <h1 className="pt-5  font-body text-left md:text-center text-xl uppercase font-semibold text-primary sm:text-4xl md:text-5xl xl:text-6xl">
                  {blog.title}
                </h1>
                {/* <p className="border-b-2 border-t-2 h-[5px] border-primary "/> */}
                <div className="flex items-center pt-5 md:pt-10 ">
                  <div>
                    <img
                      src={`${imgUrl || "/assets/img/blog-author.jpg"}`}
                      className="h-20 w-20 rounded-full border-2 border-grey-70 shadow object-top object-cover"
                      alt="author image"
                    />
                  </div>
                  <div className="pl-5">
                    <p className="font-semibold">Author:</p>
                    <span className="block font-body font-bold text-grey-10 text-left text-xl">
                      {author.title}
                    </span>
                    <span className="block pt-1 font-body  font-bold text-grey-30 text-left text-lg">
                      {pubdate &&
                        pubdate.toLocaleDateString("en-IN", dateoptions)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="prose max-w-none pt-8 font-body">
                <PortableText
                  value={blog.content}
                  components={myPortableTextComponents}
                  projectId={process.env.NEXT_PUBLIC_PROJECT_ID}
                  dataset={process.env.NEXT_PUBLIC_DATASET}
                  serializers={{
                    h1: (props) => <h1 style={{ color: "blue" }} {...props} />,
                    li: ({ children }) => (
                      <li className="special-list-item">{children}</li>
                    ),
                  }}
                />
              </div>
              <div className="flex md:pt-10 pt-5 flex-wrap">
                {blog.tags && (
                  <span className="pt-[4px] text-lg font-body font-semibold">
                    Tags |
                  </span>
                )}

                {blog.tags &&
                  blog.tags.map((item, index) => {
                    return (
                      <Link
                        key={index}
                        href={`https://www.google.com/search?q=${encodeURIComponent(
                          item
                        )}`}
                        target="_blank"
                        className="rounded-xl flex bg-primary px-5 mx-2 py-1 my-1 uppercase font-body font-bold text-white hover:bg-grey-20"
                      >
                        {item}
                      </Link>
                    );
                  })}
              </div>
              <div className="mt-10 flex justify-between border-t border-lila py-12">
                <Link
                  href={`${
                    currIdx > 0
                      ? `/blog/${allBlogs[currIdx - 1].slug.current}`
                      : "#"
                  }`}
                  className="flex items-center"
                >
                  <i
                    className={`bx bx-left-arrow-alt text-2xl text-primary ${
                      currIdx > 0 ? "" : "opacity-40 cursor-not-allowed"
                    }`}
                  ></i>
                  <span
                    className={`block pl-2 font-body text-lg font-bold uppercase text-primary md:pl-5 ${
                      currIdx > 0 ? "" : "opacity-40 cursor-not-allowed"
                    }`}
                  >
                    Previous Post
                  </span>
                </Link>

                <Link
                  href={`${
                    currIdx < allBlogs.length - 1
                      ? `/blog/${allBlogs[currIdx + 1].slug.current}`
                      : "#"
                  }`}
                  className=" flex items-center"
                >
                  <span
                    className={`block pr-2 font-body text-lg font-bold uppercase text-primary md:pr-5 ${
                      currIdx < allBlogs.length - 1
                        ? ""
                        : "opacity-40 cursor-not-allowed"
                    }`}
                  >
                    Next Post
                  </span>
                  <i
                    className={`bx bx-right-arrow-alt text-2xl text-primary ${
                      currIdx < allBlogs.length - 1
                        ? ""
                        : "opacity-40 cursor-not-allowed"
                    }`}
                  ></i>
                </Link>
              </div>

              {/* ===========================Author=============================== */}
              <div className="flex flex-col items-center border-t border-lila py-12 pt-12 md:flex-row md:items-start xl:pb-20">
                <div className="w-3/4 sm:w-2/5 lg:w-1/4 xl:w-1/5  rounded-full  ">
                  <img
                    src={`${imgUrl || "/assets/img/blog-author.jpg"}`}
                    className=" rounded-full border-2 border-grey-70 shadow object-top object-cover"
                    alt="author image"
                  />
                </div>

                <div className="ml-0 text-center md:ml-10 md:w-5/6 md:text-left">
                  <h3 className="pt-10 font-body text-2xl font-bold text-secondary md:pt-0">
                    {author.title}
                  </h3>
                  <p className="pt-5 font-body text-lg leading-8 text-secondary text-justify sm:leading-9 md:text-xl md:leading-9 lg:leading-9 xl:leading-9">
                    {author.about}
                  </p>
                  <div className="flex items-center justify-center pt-5 md:justify-start">
                    <Link href="/">
                      <i className="bx bxl-facebook-square text-2xl text-primary hover:text-yellow"></i>
                    </Link>
                    <Link href="/" className="pl-4">
                      <i className="bx bxl-twitter text-2xl text-primary hover:text-yellow"></i>
                    </Link>
                    <Link href="/" className="pl-4">
                      <i className="bx bxl-dribbble text-2xl text-primary hover:text-yellow"></i>
                    </Link>
                    <Link href="/" className="pl-4">
                      <i className="bx bxl-linkedin text-2xl text-primary hover:text-yellow"></i>
                    </Link>
                    <Link href="/" className="pl-4">
                      <i className="bx bxl-instagram text-2xl text-primary hover:text-yellow"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary">
        <div className="container flex flex-col justify-center py-6 ">
          <p className="text-center font-body text-white">
            © Copyright 2024. All right reserved.
          </p>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_DATASET,
    useCdn: process.env.NEXT_PUBLIC_CDN,
    apiVersion: process.env.NEXT_PUBLIC_API_VERSION,
  });
  const query = `*[ _type=='blog' && slug.current=='${context.query.slug}'][0]`;
  const blog = await client.fetch(query);
  let aq = blog.author.author._ref;

  let query2 = `*[_id == '${aq}'][0]`;

  let authdetail = await client.fetch(query2);
  let query3 = `*[_type == "blog"] | order(_createdAt desc) {
  _id,
  slug,
  title,
  _createdAt
}`;
  let allBlogs = await client.fetch(query3);
  return {
    props: {
      blog: blog,
      author: authdetail,
      allBlogs,
    },
  };
}
