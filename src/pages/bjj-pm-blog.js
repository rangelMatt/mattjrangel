import React from "react";
import Head from "next/head";
import Layout from "@/components/Layout";
import AnimatedText from "@/components/AnimatedText";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import TransitionEffect from "@/components/TransitionEffect";

// Placeholder images (replace with your own if available)
import blog1 from "../../public/images/blogs/blog1.png";
import blog2 from "../../public/images/blogs/blog2.png";
import blog3 from "../../public/images/blogs/blog3.png";
import blog4 from "../../public/images/blogs/blog4.png";

const FramerImage = motion(Image);

const FeaturedBlog = ({ title, summary, img, link }) => (
  <article
    className="w-full flex items-center justify-between relative rounded-br-2xl
    rounded-3xl border border-solid border-dark bg-light shadow-2xl p-12 dark:bg-dark dark:border-light
    lg:flex-col lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:p-4"
  >
    <div
      className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2.5rem]  bg-dark dark:bg-light
      rounded-br-3xl xs:-right-2 sm:h-[102%] xs:w-full xs:rounded-[1.5rem]"
    />
    <Link
      href={link}
      target="_blank"
      className="w-1/2 cursor-pointer overflow-hidden rounded-lg lg:w-full "
    >
      <FramerImage
        src={img}
        alt={title}
        className="w-full h-auto"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      />
    </Link>
    <div className="w-1/2 flex flex-col items-start justify-between pl-6 lg:w-full lg:pl-0 lg:pt-6">
      <span className="text-primary font-medium text-xl dark:text-primaryDark xs:text-base">
        Featured Blog
      </span>
      <Link
        href={link}
        target="_blank"
        className="hover:underline underline-offset-2"
      >
        <h2 className="my-2 w-full text-left text-4xl font-bold dark:text-light sm:text-sm">
          {title}
        </h2>
      </Link>
      <p className="my-2 font-medium text-dark dark:text-light sm:text-sm">
        {summary}
      </p>
      <div className="mt-2 flex items-center">
        <Link
          href={link}
          target="_blank"
          className="ml-4 rounded-lg bg-dark text-light p-2 px-6 text-lg font-semibold
            dark:bg-light dark:text-dark 
            sm:px-4 sm:text-base"
        >
          Read Blog
        </Link>
      </div>
    </div>
  </article>
);

const Blog = ({ title, img, link }) => (
  <article
    className="w-full flex flex-col items-center justify-center rounded-2xl 
    border border-solid border-dark bg-light p-6 relative dark:bg-dark dark:border-light xs:p-4"
  >
    <div
      className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2rem]  bg-dark
      rounded-br-3xl dark:bg-light md:-right-2 md:w-[101%] xs:h-[102%] xs:rounded-[1.5rem]"
    />
    <Link
      href={link}
      target="_blank"
      className="w-full cursor-pointer overflow-hidden rounded-lg "
    >
      <FramerImage
        src={img}
        alt={title}
        className="w-full h-auto"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
        priority
        sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              50vw"
      />
    </Link>
    <div className="w-full flex flex-col items-start justify-between mt-4 ">
      <span className="text-primary font-medium text-xl dark:text-primaryDark lg:text-lg md:text-base">
        Blog
      </span>
      <Link
        href={link}
        target="_blank"
        className="hover:underline underline-offset-2"
      >
        <h2 className="my-2 w-full text-left text-3xl font-bold lg:text-2xl">
          {title}
        </h2>
      </Link>
      <div className="w-full mt-2 flex items-center justify-between">
        <Link
          href={link}
          target="_blank"
          className=" text-lg font-semibold underline md:text-base"
        >
          Read
        </Link>
      </div>
    </div>
  </article>
);

const bjjPmBlog = () => (
  <>
    <Head>
      <title>Matt Rangel | BJJ PM Blog</title>
      <meta
        name="description"
        content="Brazilian Jiu-Jitsu Project Management Blog"
      />
    </Head>
    <TransitionEffect />
    <main className="w-full mb-16 flex flex-col items-center justify-center dark:text-light">
      <Layout className="pt-16 ">
        <AnimatedText
          text="Lessons from the Mat: BJJ & Project Management"
          className="mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-5xl"
        />
        <AnimatedText
          text="Applying martial arts mindset to leadership, learning, and growth."
          className={`mb-2 !text-6xl 
                xl:!text-5xl lg:!text-center lg:!text-6xl md:!text-5xl sm:!text-3xl sm:mb-4 text-dark/75 dark:text-light/75
            font-specialE`}
        />

        <div className="grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0">
          <div className="col-span-12">
            <FeaturedBlog
              title="How BJJ Principles Improve Project Management"
              img={blog1}
              summary="Discover how the core principles of Brazilian Jiu-Jitsu—adaptability, resilience, and continuous learning—can transform your approach to project management."
              link="#"
            />
          </div>
          <div className="col-span-6 sm:col-span-12">
            <Blog
              title="Rolling with Uncertainty: Lessons from the Mat"
              img={blog2}
              link="#"
            />
          </div>
          <div className="col-span-6 sm:col-span-12">
            <Blog
              title="Tapping Out: Why Failure is a Step Forward"
              img={blog3}
              link="#"
            />
          </div>
          <div className="col-span-12">
            <FeaturedBlog
              title="Building a Growth Mindset through BJJ"
              img={blog4}
              summary="Explore how the journey in BJJ fosters a growth mindset, and how you can apply these lessons to your professional and personal life."
              link="#"
            />
          </div>
        </div>
      </Layout>
    </main>
  </>
);

export default bjjPmBlog;
