import React from "react";
import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import profilePicBg from "../../public/images/profile/developer-pic-1-bg.png";
import { LinkArrow } from "@/components/Icons";
import HireMe from "@/components/HireMe";
import lightBulb from "../../public/images/svgs/miscellaneous_icons_1.svg";
import TransitionEffect from "@/components/TransitionEffect";
import CalendlyEmbed from "@/components/CalendlyEmbed";

export default function Home() {
  return (
    <>
      <Head>
        <title>Matt Rangel&apos;s Portfolio</title>
        <meta
          name="description"
          content="Project Manager and Program Manager Portfolio"
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TransitionEffect />
      <main className="flex items-center text-dark w-full min-h-screen dark:text-light">
        <Layout className="pt-0 md:pt-16 sm:pt-8">
          <div className="flex items-center justify-between w-full lg:flex-col">
            <div className="w-1/2 md:w-full">
              <Image
                src={profilePicBg}
                alt="MR"
                className="w-full h-auto
                lg:hidden md:inline-block md:w-full
              "
                priority
                sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              50vw"
              />
            </div>
            <div className="w-1/2 flex flex-col items-center self-center lg:w-full lg:text-center">
              <AnimatedText
                text="Simplifying the complex, solving problems through code"
                className="!text-6xl !text-left 
                xl:!text-5xl lg:!text-center lg:!text-6xl md:!text-5xl sm:!text-3xl  
                "
              />
              <p className="my-4 text-base font-medium md:text-sm sm:text-xs">
                As a passionate career changer and life long learner, I start
                from a place of curiosity and growth mindset. I find inspiration
                in the people I work with, their perspective, and the
                opportunity to problem solve together. Challenges are
                invigorating and are the drivers to greater ideas. Check out my
                latest projects and articles to see my dedication to leveraging
                React.js and other cutting-edge technologies to create
                innovative solutions.
              </p>
              <div className="flex items-center self-start mt-2 lg:self-center">
                <Link
                  href="/MATTHEW-RANGEL-PM-Resume.pdf"
                  download
                  target={"_blank"}
                  className="flex items-center bg-dark text-light p-2.5 px-6
                rounded-lg text-lg font-semibold
                hover:bg-light hover:text-dark
                border-2 border-solid border-transparent hover:border-dark

                dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light
                hover:dark:border-light
                md:p-2 md:px-4 md:text-base

                "
                >
                  Resume <LinkArrow className={"w-6 ml-1"} />
                </Link>
                <Link
                  href="mailto:mattrangel@gmail.com"
                  target={"_blank"}
                  className="ml-4 text-lg font-medium capitalize text-dark underline dark:text-light md:text-base"
                >
                  Contact
                </Link>
                <Link
                  href="https://calendly.com/mattrangel/quick-chat"
                  target={"_blank"}
                  className="ml-4 text-lg font-medium capitalize text-dark underline dark:text-light md:text-base"
                >
                  Schedule an Appointment
                </Link>
              </div>
            </div>
          </div>
        </Layout>
        <HireMe />
        <div
          className="absolute right-8 bottom-8 inline-block w-24 md:hidden
        "
        >
          <Image src={lightBulb} alt="Matt Rangel" className="w-full h-auto" />
        </div>
      </main>
    </>
  );
}
