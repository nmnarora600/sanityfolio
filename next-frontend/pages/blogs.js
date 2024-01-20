import React, { useEffect,  useState } from "react";
import Head from "next/head";
import Link from "next/link";
import "boxicons/css/boxicons.min.css";

import { createClient } from "next-sanity";

import imageUrlBuilder from "@sanity/image-url";
const Blogs = ({ blogs, authors }) => {
  






  const [mobileMenu, setMobileMenu] = useState(false);
  const [hovered, sethovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(true);
  const builder = imageUrlBuilder({
    projectId:process.env.NEXT_PUBLIC_PROJECT_ID,
    dataset:process.env.NEXT_PUBLIC_DATASET,
  });

  const [search, setSearch] = useState("");
  const [find, setFind] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [slide, setSlide] = useState(false);
  let imgRef = "";

  useEffect(() => {
    const handleScroll = () => {
      // Check if the page is scrolled down
      const scrolled = window.scrollY == 0;
      setIsScrolled(scrolled);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    handleClick();
  }, [search]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    sethovered(false);
  };

  const triggerMobileNavItem = async () => {
    setMobileMenu(false);
  };

  const handleClick = () => {
    setFind(true);

    let searchByName = blogs.filter((item) => {
      return (
        item.title.toLowerCase().includes(search) ||
        item.tags.some((element) =>
          element.toLowerCase().includes(search.toLowerCase())
        )
      );
    });
    let authres = authors.filter((item) => {
      return item.title.toLowerCase().includes(search);
    });
    const searchByAuthor = blogs.filter((element) => {
      return authres.some(
        (authElement) => authElement._id === element.author.author._ref
      );
    });

    const joinedArray = Array.from(
      new Set(searchByName.concat(searchByAuthor))
    );
   
    setSearchResult(joinedArray);
  };
  return (
    <div
      className={`relative ${
        mobileMenu ? "overflow-hidden max-h-screen" : ""
      } bg-grey-50`}
    >
      <Head>
        <meta charset="utf-8" />

        <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible" />

        <meta
          content="width=device-width, initial-scale=1, shrink-to-fit=yes maximum-scale=1, user-scalable=no"
          name="viewport"
        />
        <title>Naman Arora | Blogs </title>

        <meta property="og:title" content="Naman Arora | Blogs" />

        <meta property="og:locale" content="en_US" />

        <link rel="canonical" href={`https://namanarora.in/blogs/`} />

        <meta property="og:url" content={`https://namanarora.in/blogs/`} />

        <meta
          name="description"
          content="Explore a collection of insightful blogs on computer science and engineering by Naman Arora. From coding tutorials to tech innovations, our blog page delves into the world of software development, artificial intelligence, and cutting-edge technologies. Stay informed, enhance your skills, and discover the latest trends in the dynamic field of computer science."
        />

    

        <meta name="theme-color" content="#5540af" />

        <meta property="og:image" content="//assets/img/social.jpg" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="//assets/img/social.jpg" />
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
            <li className="py-2" onClick={() => triggerMobileNavItem("#about")}>
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

            <li className="py-2" onClick={() => triggerMobileNavItem("#work")}>
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

            <li className="py-2" onClick={() => triggerMobileNavItem("#blog")}>
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
      {/* ===================================== GO Back======================= */}
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

      {/* ==================================BLOGS===================================== */}
      <div className="w-[90vw] mx-auto ">
        <div className="md:pt-36 md:pb-6 pt-24 pb-2 flex items-center md:flex-row flex-col ">
          <div className=" text-center font-body w-full text-xl mx-auto flex justify-center md:text-3xl md:pb-0 pb-5 font-medium text-black  lg:text-5xl uppercase">
            Check out my latest Blogs!
          </div>
          <div className="flex items-center justify-end md:w-0 w-full pb-2 md:pb-0 mr-3">
            <input
              type="text"
              name="search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className={`md:w-48 md:rounded-xl relative ${
                slide ? "opacity-100" : "opacity-0"
              } shadow-sm rounded-md md:h-9 h-7 focus:border-2 focus:ring-0 focus:border-primary bg-grey-50  border border-grey-30 ease-in-out transition-all delay-200 `}
              placeholder="Search for Favourites"
              value={search}
            />
            <button
              onClick={() => {
                setSlide(!slide);
              }}
              className="bg-primary ml-1 shadow-md flex md:h-10 h-7 md:w-10 w-7 md:rounded-xl rounded-md justify-center items-center"
            >
              <i
                className="bx bx-search-alt md:scale-[1.3] p-[12.8px]"
                style={{ color: "#ffffff" }}
              ></i>
            </button>
          </div>
        </div>

        <div className="mx-auto grid w-full md:w-[90vw] grid-cols-1 gap-6 md:pt-5 pt-0 sm:w-3/4 lg:w-full lg:grid-cols-3 xl:gap-10 ">
          {searchResult == null &&
            find == false &&
            blogs.map((item) => {
              imgRef = item.blogimg;
              return (
                <Link
                  href={`/blog/${item.slug.current}`}
                  key={item.slug.current}
                  className="shadow hover:scale-105 ease-in-out duration-500 transform transition-transform min-h-min"
              
                >
                  <div
                    style={{
                      backgroundImage: `url(${
                        imgRef
                          ? builder.image(imgRef).url()
                          : "/assets/img/post-01.png"
                      })`,
                    }}
                    className="group relative h-72 bg-cover bg-center bg-no-repeat sm:h-84 lg:h-64 xl:h-72 "
                  >
                    <span className="absolute inset-0 block bg-gradient-to-b from-blog-gradient-from to-blog-gradient-to bg-cover bg-center bg-no-repeat opacity-10 transition-opacity group-hover:opacity-50"></span>
                    <span className="absolute right-0 bottom-0 mr-4 mb-4 block rounded-full border-2 border-white px-6 py-2 text-center font-body text-sm font-bold uppercase text-white md:text-base transition-colors ease-linear hover:bg-grey-50 hover:text-secondary">
                      Read More
                    </span>
                  </div>
                  <div className="bg-white py-6 px-5 xl:py-8">
                    <span className="block font-body text-lg md:h-12 capitalize font-semibold text-black">
                      {item.title}
                    </span>
                    <span className="block pt-2 font-body md:h-20 text-grey-20">
                      {item.metadesc.slice(0, 145)}{" "}
                      {item.metadesc.length > 145 ? ". . ." : "."}
                    </span>

                    <span className="  pt-2 md:pb-2 bottom-0 font-body flex text-grey-20 md:h-3">
                      Published on: &nbsp;{" "}
                      <p className="font-semibold">
                        {new Date(item._createdAt).toLocaleDateString("en-IN", {
                          weekday: "long",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </span>
                    <span className=" md:pt-4 md:h-4 bottom-0 font-body flex text-grey-20">
                      Author: &nbsp;{" "}
                      <p className="font-semibold">
                        {authors.find(
                          (element) => element._id === item.author.author._ref
                        ).title || "Anonymous"}
                      </p>
                    </span>
                  </div>
                </Link>
              );
            })}
          {searchResult != null &&
            searchResult.map((item) => {
              imgRef = item.blogimg;
              return (
                <div
                  key={item.slug.current}
                  className="shadow hover:scale-105 ease-in-out  duration-500 transform transition-transform min-h-min"
                >
                  <Link href={`/blog/${item.slug.current}`}  >
                    <div
                      style={{
                        backgroundImage: `url(${
                          imgRef
                            ? builder.image(imgRef).url()
                            : "/assets/img/post-01.png"
                        })`,
                      }}
                      className="group relative h-72 bg-cover bg-center bg-no-repeat sm:h-84 lg:h-64 xl:h-72 "
                    >
                      <span className="absolute inset-0 block bg-gradient-to-b from-blog-gradient-from to-blog-gradient-to bg-cover bg-center bg-no-repeat opacity-10 transition-opacity group-hover:opacity-50"></span>
                      <span className="absolute right-0 bottom-0 mr-4 mb-4 block rounded-full border-2 border-white px-6 py-2 text-center font-body text-sm font-bold uppercase text-white md:text-base transition-colors ease-linear hover:bg-grey-50 hover:text-secondary">
                        Read More
                      </span>
                    </div>
                  </Link>
                  <div className="bg-white py-6 px-5 xl:py-8">
                    <Link
                      href={`/blog/${item.slug.current}`}
                      key={item.slug.current}
                    >
                      <span className="block font-body text-lg md:h-12 capitalize font-semibold text-black">
                        {item.title}
                      </span>
                    </Link>
                    <span className="block pt-2 font-body text-justify md:h-20 text-grey-20">
                      {item.metadesc.slice(0, 145)}
                      {item.metadesc.length > 145 ? ". . ." : "."}
                    </span>

                    <span className="  pt-2 md:pb-2 bottom-0 font-body flex text-grey-20 md:h-3">
                      Published on: &nbsp;{" "}
                      <p className="font-semibold">
                        {new Date(item._createdAt).toLocaleDateString("en-IN", {
                          weekday: "long",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </span>
                    <span className=" md:pt-4 md:h-4 bottom-0 font-body flex text-grey-20">
                      Author: &nbsp;{" "}
                      <p className="font-semibold">
                        {authors.find(
                          (element) => element._id === item.author.author._ref
                        ).title || "Anonymous"}
                      </p>
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
        {searchResult == "" && find == true && (
          <h3 className=" text-center  font-body min-h-screen font-medium text-black ">
            No Blogs Found, Kindly modify the query{" "}
          </h3>
        )}
      </div>

      {/* ==================================Copyright======================= */}
      <div className="bg-primary mt-28">
        <div className="container flex  justify-center py-6">
          <p className="text-center font-body text-white ">
            © Copyright 2024. All right reserved.
          </p>
       
        </div>
      </div>
    </div>
  );
};

export default Blogs;

export async function getServerSideProps(context) {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_DATASET,
    useCdn: process.env.NEXT_PUBLIC_CDN,
    apiVersion: process.env.NEXT_PUBLIC_API_VERSION,
  });
  const query = `*[_type=="blog"] | order(_createdAt desc)`;
  const query2 = `*[_type=="author"]`;
  const blogs = await client.fetch(query);
  const authors = await client.fetch(query2);

  return {
    props: {
      blogs: blogs,
      authors,
    },
  };
}
