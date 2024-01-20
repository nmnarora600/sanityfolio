import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import "boxicons/css/boxicons.min.css";

import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Typewriter from "typewriter-effect";
const Home = ({ blogs }) => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [hovered, sethovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(true);
  const builder = imageUrlBuilder({
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_DATASET,
  });
  let imgRef = "";

  const containerRef = useRef(null);
  const imageRef = useRef(null);

  const rotateOnHover = () => {
    if (containerRef.current && imageRef.current) {
      containerRef.current.style.transition = "transform 0.3s ease-in-out";
      imageRef.current.style.transition = "transform 0.3s ease-in-out";

      containerRef.current.style.transform = "rotate(180deg)";
      imageRef.current.style.transform = "rotate(-180deg)";
    }
  };

  const resetRotation = () => {
    if (containerRef.current && imageRef.current) {
      containerRef.current.style.transition = "transform 0.3s ease-in-out";
      imageRef.current.style.transition = "transform 0.3s ease-in-out";

      containerRef.current.style.transform = "rotate(0deg)";
      imageRef.current.style.transform = "rotate(0deg)";
    }
  };
  function isMobileDevice() {
    return /iPhone|iPad|iPod|Android|Windows Phone/i.test(navigator.userAgent);
  }

  const handleCall = () => {
    if (isMobileDevice()) {
      window.location.href = `tel:${7088447600}`;
    } else {
      navigator.clipboard.writeText("7088447600");
      alert("Number copied to Clipboard !");
    }
  };

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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  const triggerNavItem = async (id) => {
    const targetElement = document.querySelector(id);

    await targetElement.scrollIntoView({ behavior: "smooth" });
  };

  const triggerMobileNavItem = async (id) => {
    setMobileMenu(false);
    await triggerNavItem(id);
    // return;
    await document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={`relative overflow-x-hidden ${
        mobileMenu ? "overflow-hidden max-h-screen" : ""
      }`}
    >
      <Head>
        <meta charSet="utf-8" />

        <meta content="IE=edge,chrome=1" httpEquiv="X-UA-Compatible" />

        <meta
          content="width=device-width, initial-scale=1, shrink-to-fit=yes maximum-scale=1, user-scalable=no"
          name="viewport"
        />

        <title>Naman Arora | Portfolio </title>

        <meta property="og:title" content="Naman Arora | Portfolio " />

        <meta property="og:locale" content="en_US" />
        <meta name="theme-color" content="#5540af" />

        <meta property="og:image" content="//assets/img/social.jpg" />

        <meta name="twitter:card" content="summary_large_image" />

        <meta name="twitter:image" content="//assets/img/social.jpg" />
        <link rel="canonical" href="https://namanarora.in" />

        <meta property="og:url" content="https://namanarora.in" />
        <meta
          name="description"
          content="Explore the diverse world of technology through the portfolio and insightful blogs of Naman Arora, a passionate computer engineer. Discover innovative projects, efficient coding solutions, and thought-provoking articles covering the evolving landscape of software development."
        />
      </Head>

      <div id="main" className="relative">
        <div>
          {/* ======================================> Main Navbar <=================================== */}
          <div
            className={`w-full z-50 top-0 py-2  sm:py-5  ${
              isScrolled ? "fixed bg-none opacity-100" : " absolute"
            }
  `}
          >
            <div className="container flex items-center justify-between px-[5vw]">
              <div>
                <Link href="/">
                  <img
                    src="/assets/img/logo.png"
                    className=" ml-10 scale-110 lg:w-40 w-24"
                    alt="logo image"
                  />
                </Link>
              </div>
              <div className="hidden lg:block">
                <ul className="flex items-center">
                  <li
                    className="group pl-6"
                    onClick={() => triggerNavItem("#about")}
                  >
                    <span className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white ">
                      About
                    </span>

                    <span className="block h-0.5 w-full bg-transparent group-hover:bg-yellow"></span>
                  </li>
                  <li
                    className="group pl-6"
                    onClick={() => triggerNavItem("#services")}
                  >
                    <span className="cursor-pointer pt-0.5 font-header font-semibold  uppercase text-white">
                      Services
                    </span>

                    <span className="block h-0.5 w-full bg-transparent group-hover:bg-yellow"></span>
                  </li>
                  <li
                    className="group pl-6"
                    onClick={() => triggerNavItem("#portfolio")}
                  >
                    <span className="cursor-pointer pt-0.5 font-header font-semibold  uppercase text-white">
                      Portfolio
                    </span>

                    <span className="block h-0.5 w-full bg-transparent group-hover:bg-yellow"></span>
                  </li>

                  <li
                    className="group pl-6"
                    onClick={() => triggerNavItem("#clients")}
                  >
                    <span className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white">
                      Clients
                    </span>

                    <span className="block h-0.5 w-full bg-transparent group-hover:bg-yellow"></span>
                  </li>
                  <li
                    className="group pl-6"
                    onClick={() => triggerNavItem("#work")}
                  >
                    <span className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white">
                      Work
                    </span>

                    <span className="block h-0.5 w-full bg-transparent group-hover:bg-yellow"></span>
                  </li>

                  <li
                    className="group pl-6"
                    onClick={() => triggerNavItem("#statistics")}
                  >
                    <span className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white">
                      Statistics
                    </span>

                    <span className="block h-0.5 w-full bg-transparent group-hover:bg-yellow"></span>
                  </li>

                  <li
                    className="group pl-6"
                    onClick={() => triggerNavItem("#blog")}
                  >
                    <span className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white">
                      Blog
                    </span>

                    <span className="block h-0.5 w-full bg-transparent group-hover:bg-yellow"></span>
                  </li>

                  <li
                    className="group pl-6"
                    onClick={() => triggerNavItem("#contact")}
                  >
                    <span className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white">
                      Contact
                    </span>

                    <span className="block h-0.5 w-full bg-transparent group-hover:bg-yellow"></span>
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
            <div className="absolute right-0 min-h-screen w-2/3 z-20 bg-primary py-4 px-8 shadow md:w-1/3">
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
                  <span className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white">
                    About
                  </span>
                </li>

                <li
                  className="py-2"
                  onClick={() => triggerMobileNavItem("#services")}
                >
                  <span className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white">
                    Services
                  </span>
                </li>

                <li
                  className="py-2"
                  onClick={() => triggerMobileNavItem("#portfolio")}
                >
                  <span className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white">
                    Portfolio
                  </span>
                </li>

                <li
                  className="py-2"
                  onClick={() => {
                    triggerMobileNavItem("#clients");
                  }}
                >
                  <span className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white">
                    Clients
                  </span>
                </li>

                <li
                  className="py-2"
                  onClick={() => triggerMobileNavItem("#work")}
                >
                  <span className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white">
                    Work
                  </span>
                </li>

                <li
                  className="py-2"
                  onClick={() => triggerMobileNavItem("#statistics")}
                >
                  <span className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white">
                    Statistics
                  </span>
                </li>

                <li
                  className="py-2"
                  onClick={() => triggerMobileNavItem("#blog")}
                >
                  <span className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white">
                    Blog
                  </span>
                </li>

                <li
                  className="py-2"
                  onClick={() => triggerMobileNavItem("#contact")}
                >
                  <span className="cursor-pointer pt-0.5 font-header font-semibold uppercase text-white">
                    Contact
                  </span>
                </li>
              </ul>
            </div>
            <div
              className="absolute left-0 min-h-screen w-1/3 opacity-0 py-4 px-8 shadow md:w-1/3"
              onClick={() => setMobileMenu(false)}
            ></div>
          </div>
          <div>
            {/* =======================================> Main Page <=============================== */}
            <div
              className={`  bg-none fixed h-9 scale-[3] bottom-2 right-7  rounded-full z-70 cursor-pointer transition-opacity duration-300 ${
                isScrolled ? "hidden" : ""
              }`}
              onClick={scrollToTop}
            >
              <i
                className={`bx bx-up-arrow-circle  bg-primary text-white rounded-full ${
                  hovered ? " bx-tada scale-105" : ""
                } `}
                onMouseEnter={() => sethovered(true)}
                onMouseLeave={() => {
                  sethovered(false);
                }}
              ></i>
            </div>

            {/* ######################## Opening Page############### */}
            <div
              className="relative bg-cover bg-center bg-no-repeat py-10 md:pt-12 md:pb-10 min-h-screen"
              style={{ backgroundImage: "url(/assets/img/bg-hero.jpg)" }}
            >
              <div className="absolute inset-0 z-20 bg-gradient-to-r from-hero-gradient-from to-hero-gradient-to bg-cover bg-center bg-no-repeat"></div>

              <div className="container relative z-30 pt-20 pb-12 md:pt-56 md:pb-48">
                <div className="flex flex-col items-center justify-center lg:flex-row md:pl-[5vw]">
                  <div
                    ref={containerRef}
                    className={`rounded-full group border-8 border-l-white border-primary border-t-white  transition-transform  shadow-xl md:mr-[2vw] hover:rotate-90`}
                    onMouseOver={rotateOnHover}
                    onMouseLeave={resetRotation}
                  >
                    <img
                      ref={imageRef}
                      src="/assets/img/blog-author.jpg"
                      className="h-48  rounded-full sm:h-56 relative -z-10"
                      alt="author"
                    />
                  </div>

                  <div className="pt-8 sm:pt-10 lg:pl-8 lg:pt-0 min-w-[43vw] ">
                    <h5 className="text-center font-header text-4xl text-white sm:text-left sm:text-5xl md:text-4xl">
                      Hello,
                    </h5>

                    <h1 className="text-center static font-header flex flex-row text-4xl text-white sm:text-left sm:text-5xl md:text-7xl">
                      <span className="flex">
                        <h1 className="mr-5">I am</h1>

                        <Typewriter
                          options={{
                            strings: [
                              " Naman Arora.",
                              " an Engineer.",
                              " a Developer.",
                              " Creative.",
                              " Intutive.",
                            ],
                            autoStart: true,
                            loop: true,
                          }}
                        />
                      </span>
                    </h1>
                    <div className="flex flex-col justify-center pt-3 sm:flex-row sm:pt-5 lg:justify-start">
                      <div className="flex items-center justify-center pl-0 sm:justify-center md:pl-1">
                        <p className="font-body text-lg uppercase text-white">
                          Let's connect
                        </p>
                        <div
                          className="hidden sm:block"
                          style={{ paddingTop: "4px" }}
                        >
                          <i className="bx bx-chevron-right text-3xl text-yellow"></i>
                        </div>
                      </div>
                      <div
                        className="flex items-center justify-center pt-5 px-2 "
                        style={{ paddingTop: "4px" }}
                      >
                        <Link href="/" className="px-2">
                          <i className="bx bxl-facebook-square text-2xl text-white hover:text-yellow"></i>
                        </Link>
                        <Link href="/" className="px-2">
                          <i className="bx bxl-twitter text-2xl text-white hover:text-yellow"></i>
                        </Link>
                        <Link href="/" className="px-2">
                          <i className="bx bxl-dribbble text-2xl text-white hover:text-yellow"></i>
                        </Link>
                        <Link href="/" className="px-2">
                          <i className="bx bxl-linkedin text-2xl text-white hover:text-yellow"></i>
                        </Link>
                        <Link href="/" className="px-2">
                          <i className="bx bxl-instagram text-2xl text-white hover:text-yellow"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-evenly md:justify-center items-center pt-8 scale-110 w-full">
                  <Link
                    href={"/resume.pdf"}
                    className="flex justify-center"
                    target="_blank"
                    download
                  >
                    <span className=" z-60  block rounded-full border-2 border-white px-6 py-2 text-center font-body text-sm font-bold uppercase text-white md:text-base cursor-pointer  mx-0 bg-primary transition-colors ease-linear hover:bg-white hover:text-primary md:mr-10">
                      view Resume
                    </span>
                  </Link>
                  <Link href={"/blogs"} className="flex justify-center">
                    <span className=" z-60  block rounded-full border-2 border-white px-6 py-2 text-center font-body text-sm font-bold uppercase text-white md:text-base cursor-pointer  mx-0 bg-primary transition-colors ease-linear hover:bg-white hover:text-primary md:ml-10">
                      Read Blogs
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {/* ######################## About Page############### */}
            <div className="bg-grey-50" id="about">
              <div className="container flex flex-col items-center py-16 md:py-20 lg:flex-row w-[90vw]">
                <div className="w-full text-center sm:w-3/4 lg:w-3/5 lg:text-left  ">
                  <h2 className="font-header text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl">
                    Who am I?
                  </h2>
                  <h4 className="pt-6 font-header text-xl font-medium text-black sm:text-2xl lg:text-3xl">
                    I'm Christy Smith, a Web Designer & Photographer
                  </h4>
                  <p className="pt-6 font-body leading-relaxed text-grey-20">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                  {/* ------------------connect icons--------------------- */}
                  <div className="flex flex-col justify-center pt-6 sm:flex-row lg:justify-start">
                    <div className="flex items-center justify-center sm:justify-start">
                      <p className="font-body text-lg font-semibold uppercase text-grey-20">
                        Connect with me
                      </p>
                      <div className="hidden sm:block">
                        <i className="bx bx-chevron-right text-2xl text-primary"></i>
                      </div>
                    </div>
                    <div className="flex items-center justify-center pt-5 pl-2 sm:justify-start sm:pt-0">
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
                {/* +++++++++++++++++ 4 areas+++++++++++++++++++++ */}
                <div className="w-full pl-0 pt-10 sm:w-3/4 lg:w-2/5 lg:pl-12 lg:pt-0">
                  <div>
                    <div className="flex items-end justify-between">
                      <h4 className="font-body font-semibold uppercase text-black">
                        HTML & CSS
                      </h4>
                      <h3 className="font-body text-3xl font-bold text-primary">
                        85%
                      </h3>
                    </div>
                    <div className="mt-2 h-3 w-full rounded-full bg-lila">
                      <div
                        className="h-3 rounded-full bg-primary"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="pt-6">
                    <div className="flex items-end justify-between">
                      <h4 className="font-body font-semibold uppercase text-black">
                        Python
                      </h4>
                      <h3 className="font-body text-3xl font-bold text-primary">
                        70%
                      </h3>
                    </div>
                    <div className="mt-2 h-3 w-full rounded-full bg-lila">
                      <div
                        className="h-3 rounded-full bg-primary"
                        style={{ width: "70%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="pt-6">
                    <div className="flex items-end justify-between">
                      <h4 className="font-body font-semibold uppercase text-black">
                        Javascript
                      </h4>
                      <h3 className="font-body text-3xl font-bold text-primary">
                        98%
                      </h3>
                    </div>
                    <div className="mt-2 h-3 w-full rounded-full bg-lila">
                      <div
                        className="h-3 rounded-full bg-primary"
                        style={{ width: "98%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="pt-6">
                    <div className="flex items-end justify-between">
                      <h4 className="font-body font-semibold uppercase text-black">
                        Figma
                      </h4>
                      <h3 className="font-body text-3xl font-bold text-primary">
                        91%
                      </h3>
                    </div>
                    <div className="mt-2 h-3 w-full rounded-full bg-lila">
                      <div
                        className="h-3 rounded-full bg-primary"
                        style={{ width: "91%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ######################## Services Page############### */}
            <div
              className="container py-16 md:py-20 flex justify-center items-center flex-col"
              id="services"
            >
              <h2 className="text-center font-header text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl">
                Here's what I'm good at
              </h2>
              <h3 className="pt-6 text-center font-header text-xl font-medium text-black sm:text-2xl lg:text-3xl">
                These are the services Ioffer
              </h3>

              <div className="grid grid-cols-1 gap-6 pt-10 sm:grid-cols-2 md:gap-10 md:pt-12 lg:grid-cols-3 w-[90vw]">
                <div className="group rounded px-8 py-12 shadow hover:bg-primary">
                  <div className="mx-auto h-24 w-24 text-center xl:h-28 xl:w-28">
                    <div className="hidden group-hover:block">
                      <img
                        src="/assets/img/icon-development-white.svg"
                        alt="development icon"
                      />
                    </div>
                    <div className="block group-hover:hidden">
                      <img
                        src="/assets/img/icon-development-black.svg"
                        alt="development icon"
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="pt-8 text-lg font-semibold uppercase text-primary group-hover:text-yellow lg:text-xl">
                      WEB DEVELOPMENT
                    </h3>
                    <p className="text-grey pt-4 text-sm group-hover:text-white md:text-base">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </p>
                  </div>
                </div>
                <div className="group rounded px-8 py-12 shadow hover:bg-primary">
                  <div className="mx-auto h-24 w-24 text-center xl:h-28 xl:w-28">
                    <div className="hidden group-hover:block">
                      <img
                        src="/assets/img/icon-content-white.svg"
                        alt="content marketing icon"
                      />
                    </div>
                    <div className="block group-hover:hidden">
                      <img
                        src="/assets/img/icon-content-black.svg"
                        alt="content marketing icon"
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="pt-8 text-lg font-semibold uppercase text-primary group-hover:text-yellow lg:text-xl">
                      Technical Writing
                    </h3>
                    <p className="text-grey pt-4 text-sm group-hover:text-white md:text-base">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </p>
                  </div>
                </div>
                <div className="group rounded px-8 py-12 shadow hover:bg-primary">
                  <div className="mx-auto h-24 w-24 text-center xl:h-28 xl:w-28">
                    <div className="hidden group-hover:block">
                      <img
                        src="/assets/img/icon-mobile-white.svg"
                        alt="Mobile Application icon"
                      />
                    </div>
                    <div className="block group-hover:hidden">
                      <img
                        src="/assets/img/icon-mobile-black.svg"
                        alt="Mobile Application icon"
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="pt-8 text-lg font-semibold uppercase text-primary group-hover:text-yellow lg:text-xl">
                      Mobile Development
                    </h3>
                    <p className="text-grey pt-4 text-sm group-hover:text-white md:text-base">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </p>
                  </div>
                </div>
                <div className="group rounded px-8 py-12 shadow hover:bg-primary">
                  <div className="mx-auto h-24 w-24 text-center xl:h-28 xl:w-28">
                    <div className="hidden group-hover:block">
                      <img
                        src="/assets/img/icon-email-white.svg"
                        alt="Email Marketing icon"
                      />
                    </div>
                    <div className="block group-hover:hidden">
                      <img
                        src="/assets/img/icon-email-black.svg"
                        alt="Email Marketing icon"
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="pt-8 text-lg font-semibold uppercase text-primary group-hover:text-yellow lg:text-xl">
                      Email Development
                    </h3>
                    <p className="text-grey pt-4 text-sm group-hover:text-white md:text-base">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </p>
                  </div>
                </div>
                <div className="group rounded px-8 py-12 shadow hover:bg-primary">
                  <div className="mx-auto h-24 w-24 text-center xl:h-28 xl:w-28">
                    <div className="hidden group-hover:block">
                      <img
                        src="/assets/img/icon-design-white.svg"
                        alt="Theme Design icon"
                      />
                    </div>
                    <div className="block group-hover:hidden">
                      <img
                        src="/assets/img/icon-design-black.svg"
                        alt="Theme Design icon"
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="pt-8 text-lg font-semibold uppercase text-primary group-hover:text-yellow lg:text-xl">
                      Graphic Design
                    </h3>
                    <p className="text-grey pt-4 text-sm group-hover:text-white md:text-base">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </p>
                  </div>
                </div>
                <div className="group rounded px-8 py-12 shadow hover:bg-primary">
                  <div className="mx-auto h-24 w-24 text-center xl:h-28 xl:w-28">
                    <div className="hidden group-hover:block">
                      <img
                        src="/assets/img/icon-graphics-white.svg"
                        alt="Graphic Design icon"
                      />
                    </div>
                    <div className="block group-hover:hidden">
                      <img
                        src="/assets/img/icon-graphics-black.svg"
                        alt="Graphic Design icon"
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="pt-8 text-lg font-semibold uppercase text-primary group-hover:text-yellow lg:text-xl">
                      Web Design
                    </h3>
                    <p className="text-grey pt-4 text-sm group-hover:text-white md:text-base">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* ######################## Portfolio Page############### */}
            <div className="container py-16 md:py-20 w-[90vw]" id="portfolio">
              <h2 className="text-center font-header text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl">
                Check out my Portfolio
              </h2>
              <h3 className="pt-6 text-center font-header text-xl font-medium text-black sm:text-2xl lg:text-3xl">
                Here's what I have done with the past
              </h3>

              <div className="mx-auto grid w-full grid-cols-1 gap-8 pt-12 sm:w-3/4 md:gap-10 lg:w-full lg:grid-cols-2">
                <Link
                  href="/"
                  className="mx-auto transform transition-all hover:scale-[1.03] md:mx-0"
                >
                  <img
                    src="/assets/img/portfolio-apple.jpeg"
                    className="w-full shadow"
                    alt="portfolio image"
                  />
                </Link>
                <Link
                  href="/"
                  className="mx-auto transform transition-all hover:scale-[1.03] md:mx-0"
                >
                  <img
                    src="/assets/img/portfolio-stripe.jpeg"
                    className="w-full shadow"
                    alt="portfolio image"
                  />
                </Link>
                <Link
                  href="/"
                  className="mx-auto transform transition-all hover:scale-[1.03] md:mx-0"
                >
                  <img
                    src="/assets/img/portfolio-fedex.jpeg"
                    className="w-full shadow"
                    alt="portfolio image"
                  />
                </Link>
                <Link
                  href="/"
                  className="mx-auto transform transition-all hover:scale-[1.03] md:mx-0"
                >
                  <img
                    src="/assets/img/portfolio-microsoft.jpeg"
                    className="w-full shadow"
                    alt="portfolio image"
                  />
                </Link>
              </div>
            </div>
            {/* ######################## Clients Page############### */}
            <div className="bg-grey-50" id="clients">
              <div className="container py-16 md:py-20">
                <div className="mx-auto w-full sm:w-3/4 lg:w-full">
                  <h2 className="text-center font-header text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl">
                    My latest clients
                  </h2>
                  <div className="flex flex-wrap items-center justify-center pt-4 sm:pt-4">
                    <span className="m-8 block">
                      <img
                        src="/assets/img/logo-coca-cola.svg"
                        alt="client logo"
                        className="mx-auto block h-12 w-auto"
                      />
                    </span>
                    <span className="m-8 block">
                      <img
                        src="/assets/img/logo-apple.svg"
                        alt="client logo"
                        className="mx-auto block h-12 w-auto"
                      />
                    </span>

                    <span className="m-8 block">
                      <img
                        src="/assets/img/logo-netflix.svg"
                        alt="client logo"
                        className="mx-auto block h-12 w-auto"
                      />
                    </span>

                    <span className="m-8 block">
                      <img
                        src="/assets/img/logo-amazon.svg"
                        alt="client logo"
                        className="mx-auto block h-12 w-auto"
                      />
                    </span>

                    <span className="m-8 block">
                      <img
                        src="/assets/img/logo-stripe.svg"
                        alt="client logo"
                        className="mx-auto block h-12 w-auto"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* ######################## Work Page############### */}
            <div className="container py-16 md:py-20" id="work">
              <h2 className="text-center font-header text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl">
                My work experience
              </h2>
              <h3 className="pt-6 text-center font-header text-xl font-medium text-black sm:text-2xl lg:text-3xl">
                Here's what I did before freelancing
              </h3>

              <div className="relative mx-auto mt-12 flex w-full flex-col lg:w-2/3">
                <span className="left-2/5 absolute inset-y-0 ml-10 hidden w-0.5 bg-grey-40 md:block"></span>

                <div className="mt-8 flex flex-col text-center md:flex-row md:text-left">
                  <div className="md:w-2/5">
                    <div className="flex justify-center md:justify-start">
                      <span className="shrink-0">
                        <img
                          src="/assets/img/logo-spotify.svg"
                          className="h-auto w-32"
                          alt="company logo"
                        />
                      </span>
                      <div className="relative ml-3 hidden w-full md:block">
                        <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 transform bg-grey-70"></span>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-3/5">
                    <div className="relative flex md:pl-18">
                      <span className="absolute left-8 top-1 hidden h-4 w-4 rounded-full border-2 border-grey-40 bg-white md:block"></span>

                      <div className="mt-1 flex">
                        <i className="bx bxs-right-arrow hidden text-primary md:block"></i>
                        <div className="md:-mt-1 md:pl-8">
                          <span className="block font-body font-bold text-grey-40">
                            Apr 2015 - Mar 2018
                          </span>
                          <span className="block pt-2 font-header text-xl font-bold uppercase text-primary">
                            Frontend Developer
                          </span>
                          <div className="pt-2">
                            <span className="block font-body text-black">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Vestibulum mattis felis vitae risus pulvinar
                              tincidunt. Nam ac venenatis enim.
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex flex-col text-center md:flex-row md:text-left">
                  <div className="md:w-2/5">
                    <div className="flex justify-center md:justify-start">
                      <span className="shrink-0">
                        <img
                          src="/assets/img/logo-microsoft.svg"
                          className="h-auto w-32"
                          alt="company logo"
                        />
                      </span>
                      <div className="relative ml-3 hidden w-full md:block">
                        <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 transform bg-grey-70"></span>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-3/5">
                    <div className="relative flex md:pl-18">
                      <span className="absolute left-8 top-1 hidden h-4 w-4 rounded-full border-2 border-grey-40 bg-white md:block"></span>

                      <div className="mt-1 flex">
                        <i className="bx bxs-right-arrow hidden text-primary md:block"></i>
                        <div className="md:-mt-1 md:pl-8">
                          <span className="block font-body font-bold text-grey-40">
                            Mar 2018 - September 2019
                          </span>
                          <span className="block pt-2 font-header text-xl font-bold uppercase text-primary">
                            Software Engineer
                          </span>
                          <div className="pt-2">
                            <span className="block font-body text-black">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Vestibulum mattis felis vitae risus pulvinar
                              tincidunt. Nam ac venenatis enim.
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex flex-col text-center md:flex-row md:text-left">
                  <div className="md:w-2/5">
                    <div className="flex justify-center md:justify-start">
                      <span className="shrink-0">
                        <img
                          src="/assets/img/logo-fedex.svg"
                          className="h-auto w-32"
                          alt="company logo"
                        />
                      </span>
                      <div className="relative ml-3 hidden w-full md:block">
                        <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 transform bg-grey-70"></span>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-3/5">
                    <div className="relative flex md:pl-18">
                      <span className="absolute left-8 top-1 hidden h-4 w-4 rounded-full border-2 border-grey-40 bg-white md:block"></span>

                      <div className="mt-1 flex">
                        <i className="bx bxs-right-arrow hidden text-primary md:block"></i>
                        <div className="md:-mt-1 md:pl-8">
                          <span className="block font-body font-bold text-grey-40">
                            October 2019 - Feb 2021
                          </span>
                          <span className="block pt-2 font-header text-xl font-bold uppercase text-primary">
                            DevOps Engineer
                          </span>
                          <div className="pt-2">
                            <span className="block font-body text-black">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Vestibulum mattis felis vitae risus pulvinar
                              tincidunt. Nam ac venenatis enim.
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ######################## Statistics Page############### */}
            <div
              className="bg-cover bg-top bg-no-repeat pb-24 md:py-24 lg:py-24"
              style={{
                backgroundImage: "url(/assets/img/experience-figure.png)",
              }}
              id="statistics"
            >
              <h2 className="text-center font-header text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl">
                My Work Journey Stats
              </h2>
              <h3 className="pt-6 text-center font-header text-xl font-medium text-black sm:text-2xl lg:text-3xl">
                Insights into my career journey
              </h3>
              <div className="container">
                <div className="mx-auto w-full md:w-[90vw] lg:w-[90vw] bg-white py-16 shadow  lg:py-20 xl:py-24 2xl:w-full">
                  <div className="grid grid-cols-2 gap-5 md:gap-8 xl:grid-cols-4 xl:gap-5">
                    <div className="flex flex-col items-center justify-center text-center md:flex-row md:text-left py-7">
                      <div>
                        <img
                          src="/assets/img/icon-project.svg"
                          className="mx-auto h-12 w-auto md:h-20"
                          alt="icon project"
                        />
                      </div>
                      <div className="pt-5 md:pl-5 md:pt-0">
                        <h1 className="font-body text-2xl font-bold text-primary md:text-4xl">
                          12
                        </h1>
                        <h4 className="text-grey-dark font-header text-base font-medium leading-loose md:text-xl">
                          Finished Projects
                        </h4>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center text-center md:flex-row md:text-left">
                      <div>
                        <img
                          src="/assets/img/icon-award.svg"
                          className="mx-auto h-12 w-auto md:h-20"
                          alt="icon award"
                        />
                      </div>
                      <div className="pt-5 md:pl-5 md:pt-0">
                        <h1 className="font-body text-2xl font-bold text-primary md:text-4xl">
                          3
                        </h1>
                        <h4 className="text-grey-dark font-header text-base font-medium leading-loose md:text-xl">
                          Awards Won
                        </h4>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col items-center justify-center text-center md:mt-10 md:flex-row md:text-left lg:mt-0">
                      <div>
                        <img
                          src="/assets/img/icon-happy.svg"
                          className="mx-auto h-12 w-auto md:h-20"
                          alt="icon happy clients"
                        />
                      </div>
                      <div className="pt-5 md:pl-5 md:pt-0">
                        <h1 className="font-body text-2xl font-bold text-primary md:text-4xl">
                          8
                        </h1>
                        <h4 className="text-grey-dark font-header text-base font-medium leading-loose md:text-xl">
                          Happy Clients
                        </h4>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col items-center justify-center text-center md:mt-10 md:flex-row md:text-left lg:mt-0">
                      <div>
                        <img
                          src="/assets/img/icon-puzzle.svg"
                          className="mx-auto h-12 w-auto md:h-20"
                          alt="icon puzzle"
                        />
                      </div>
                      <div className="pt-5 md:pl-5 md:pt-0">
                        <h1 className="font-body text-2xl font-bold text-primary md:text-4xl">
                          99
                        </h1>
                        <h4 className="text-grey-dark font-header text-base font-medium leading-loose md:text-xl">
                          Bugs Fixed
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ######################## Blog Page############### */}
            <div className="bg-grey-50" id="blog">
              <div className="container py-16 md:py-20">
                <h2 className="text-center font-header text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl">
                  I also like to write
                </h2>
                <h4 className="md:pt-6 pt-3 text-center font-header text-xl font-medium  text-black sm:text-2xl lg:text-3xl">
                  Check out my latest blogs!
                </h4>
                <h4 className="md:py-8 pt-3 pb-0 text-center font-header text-xl font-medium  text-black sm:text-2xl lg:text-3xl">
                  <Link href={"/blogs"} className="flex justify-end">
                    <span className="md:absolute relative  md:right-0 md:mr-4 md:mb-4 block rounded-full border-2 border-white px-6 py-2 text-center font-body text-sm font-bold uppercase text-white md:text-base cursor-pointer bg-primary transition-colors ease-linear hover:bg-grey-50 hover:text-primary hover:border-primary">
                      view all
                    </span>
                  </Link>
                </h4>

                <div className="mx-auto grid w-full md:w-[90vw] grid-cols-1 gap-6 md:pt-5 pt-2 sm:w-3/4 lg:w-full lg:grid-cols-3 xl:gap-10 ">
                  {blogs.map((item) => {
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
                          <span className="block font-body text-lg md:h-12 font-semibold text-black">
                            {item.title}
                          </span>
                          <span className="block pt-2 font-body md:h-20 text-grey-20">
                            {item.metadesc.slice(0, 145)}{" "}
                            {item.metadesc.length > 145 ? ". . ." : "."}
                          </span>

                          <span className="  pt-2 md:pb-2 bottom-0 font-body flex text-grey-20 md:h-3">
                            Published on: &nbsp;{" "}
                            <p className="font-semibold">
                              {new Date(item._createdAt).toLocaleDateString(
                                "en-IN",
                                {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </p>
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* ######################## Contact Page############### */}
            <div className="container py-16 md:py-20" id="contact">
              <h2 className="text-center font-header text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl">
                Here's a contact form
              </h2>
              <h4 className="pt-6 text-center font-header text-xl font-medium text-black sm:text-2xl lg:text-3xl">
                Have Any Questions?
              </h4>
              <div className="mx-auto w-full pt-5 text-center sm:w-2/3 lg:pt-6">
                <p className="font-body text-grey-10">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit
                  hendrerit condimentum turpis nisl sem, viverra habitasse urna
                  ante lobortis fermentum accumsan. Viverra habitasse urna ante
                  lobortis fermentum accumsan.
                </p>
              </div>
              <form className="mx-auto w-full pt-10 sm:w-3/4">
                <div className="flex flex-col md:flex-row">
                  <input
                    className="mr-3 w-full rounded border-[1.5px] border-grey-70 px-4 py-3 font-body text-black md:w-1/2 lg:mr-5 hover:border-primary "
                    placeholder="Name"
                    type="text"
                    id="name"
                  />
                  <input
                    className="mt-6 w-full rounded border-[1.5px] border-grey-70 px-4 py-3 font-body text-black md:mt-0 md:ml-3 md:w-1/2 lg:ml-5 hover:border-primary "
                    placeholder="Email"
                    type="text"
                    id="email"
                  />
                </div>
                <textarea
                  className="mt-6 w-full rounded hover:border-primary  border-[1.5px] border-grey-70 px-4 py-3 font-body text-black md:mt-8"
                  placeholder="Message"
                  id="message"
                  cols="30"
                  rows="10"
                ></textarea>
                <button className="mt-6 flex items-center justify-center rounded bg-primary px-8 py-3 font-header text-lg font-bold uppercase text-white hover:bg-grey-20 delay-50 transition-all">
                  Send
                  <i className="bx bx-chevron-right relative -right-2 text-3xl"></i>
                </button>
              </form>
              <div className="flex flex-col pt-16 lg:flex-row w-[90vw] align-middle text-center items-center mx-auto">
                <div className="w-full border-l-2 border-t-2 border-r-2 border-b-2 border-grey-60 items-center flex flex-col px-6 py-6 sm:py-8 lg:w-1/3">
                  <div className="flex items-center">
                    <i className="bx bx-phone text-2xl text-grey-40"></i>
                    <p className="pl-2 font-body font-bold uppercase text-grey-40 lg:text-lg">
                      My Phone
                    </p>
                  </div>
                  <button
                    onClick={handleCall}
                    className="pt-2 text-left font-body font-bold text-primary lg:text-lg"
                  >
                    (+881) 111 222 333
                  </button>
                </div>
                <div className=" border-l-2 border-t-0 border-r-2 border-b-2 flex flex-col items-center border-grey-60 px-6 py-6 sm:py-8 lg:w-1/3 lg:border-l-0 lg:border-t-2 w-full">
                  <div className="flex items-center">
                    <i className="bx bx-envelope text-2xl text-grey-40"></i>
                    <p className="pl-2 font-body font-bold uppercase text-grey-40 lg:text-lg">
                      My Email
                    </p>
                  </div>
                  <Link
                    className="pt-2 text-left font-body font-bold flex w-fit flex-col text-primary lg:text-lg"
                    href="mailto:anaman465@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    name@mydomain.com
                  </Link>
                </div>
                <div className="w-full border-l-2 border-t-0 border-r-2 border-b-2 flex flex-col items-center border-grey-60 px-6 py-6 sm:py-8 lg:w-1/3 lg:border-l-0 lg:border-t-2">
                  <div className="flex items-center">
                    <i className="bx bx-map text-2xl text-grey-40"></i>
                    <p className="pl-2 font-body font-bold uppercase text-grey-40 lg:text-lg">
                      My Address
                    </p>
                  </div>
                  <Link
                    href={`https://maps.app.goo.gl/Wfmzz4wwvNPPv4bR8`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pt-2 text-left font-body font-bold text-primary lg:text-lg"
                  >
                    123 New York D Block 1100, 2011 USA
                  </Link>
                </div>
              </div>
            </div>
            {/* ######################## Map Page############### */}
            <div
              className="h-72 bg-cover bg-center bg-no-repeat sm:h-64 md:h-72 lg:h-96"
              style={{ backgroundImage: "url(/assets/img/map.png)" }}
            ></div>
            {/* ######################## Club Page############### */}
            <div
              className="relative bg-primary bg-cover bg-center bg-no-repeat py-16 bg-blend-multiply lg:py-24"
              style={{ backgroundImage: "url(/assets/img/bg-cta.jpg)" }}
            >
              <div className="container relative z-30">
                <h3 className="text-center font-header text-3xl uppercase leading-tight tracking-wide text-white sm:text-4xl lg:text-5xl">
                  Keep <span className="font-bold">up-to-date</span> <br />
                  with what I'm up to
                </h3>
                <form className="mt-6 flex flex-col justify-center sm:flex-row">
                  <input
                    className="w-full rounded px-4 py-3 font-body text-black sm:w-2/5 sm:py-4 lg:w-1/3"
                    type="text"
                    id="email"
                    placeholder="Give me your Email"
                  />
                  <button className="mt-2 rounded bg-yellow px-8 py-3 font-body text-base font-bold uppercase text-primary transition-colors hover:bg-primary hover:text-white focus:border-transparent focus:outline-none focus:ring focus:ring-yellow sm:ml-2 sm:mt-0 sm:py-4 md:text-lg">
                    Join the club
                  </button>
                </form>
              </div>
            </div>
          </div>
          {/* ######################## Copyright Page############### */}
          <div className="bg-primary">
            <div className="container flex justify-center py-6">
              <p className="text-center font-body text-white ">
                © Copyright 2024. All right reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

export async function getServerSideProps(context) {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_DATASET,
    useCdn: process.env.NEXT_PUBLIC_CDN,
    apiVersion: process.env.NEXT_PUBLIC_API_VERSION,
  });
  const query = `*[_type == "blog"] | order(_createdAt desc) [0...3]`;
  const blogs = await client.fetch(query);

  return {
    props: {
      blogs: blogs,
    },
  };
}
