import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import article1 from "../../public/images/articles/Finding the perfect role.png";
import article2 from "../../public/images/articles/Becoming an Effective PM.png";
import article3 from "../../public/images/articles/Portfolio shot.png";
import article4 from "../../public/images/articles/gym-app.png";
import article5 from "../../public/images/articles/reactElementvsComponent.png";
import article6 from "../../public/images/articles/atHomePM.png";
import article7 from "../../public/images/articles/ReactRoadMap.png";
import article8 from "../../public/images/articles/ReactBeginners.png";
import article9 from "../../public/images/articles/react_overview.png";
import article10 from "../../public/images/articles/pmMethodologies.png";
import article11 from "../../public/images/articles/projectLifeCycle.png";
import { motion, useMotionValue } from "framer-motion";
import TransitionEffect from "@/components/TransitionEffect";

const FramerImage = motion(Image);

const MovingImg = ({ title, img, link }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const imgRef = useRef(null);

  function handleMouse(event) {
    imgRef.current.style.display = "inline-block";
    x.set(event.pageX);
    y.set(-10);
  }
  function handleMouseLeave(event) {
    imgRef.current.style.display = "none";
    x.set(0);
    y.set(0);
  }

  return (
    <Link
      href={link}
      target="_blank"
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
    >
      <h2 className="capitalize text-xl font-semibold hover:underline">
        {title}
      </h2>
      <FramerImage
        style={{ x: x, y: y }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 0.2 } }}
        ref={imgRef}
        src={img}
        alt={title}
        className="z-10 w-96 h-auto hidden absolute rounded-lg md:!hidden"
      />
    </Link>
  );
};

const Article = ({ img, title, date, link }) => {
  return (
    <motion.li
      initial={{ y: 200 }}
      whileInView={{ y: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
      viewport={{ once: true }}
      className="relative w-full p-4 py-6 my-4 rounded-xl flex items-center justify-between bg-light text-dark first:mt-0 border border-solid border-dark dark:border-light dark:bg-dark border-r-4 border-b-4 dark:text-light
      sm:flex-col
      "
    >
      <MovingImg title={title} img={img} link={link} />
      <span className="text-primary dark:text-primaryDark font-semibold pl-4 sm:self-start sm:pl-0 xs:text-sm">
        {date}
      </span>
    </motion.li>
  );
};

const FeaturedArticle = ({ img, title, time, summary, link }) => {
  return (
    <li className="relative col-span-1 w-full p-4 bg-light border border-solid border-dark dark:bg-dark dark:border-light rounded-2xl ">
      <div
        className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2.5rem]  bg-dark
      rounded-br-3xl
      "
      />
      <Link
        href={link}
        target="_blank"
        className="w-full inline-block cursor-pointer overflow-hidden rounded-lg "
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
      <Link href={link} target="_blank" className="w-full cursor-pointer">
        <h2 className="capitalize text-2xl font-bold my-2 mt-4 hover:underline xs:text-lg">
          {title}
        </h2>
      </Link>
      <p className="text-sm mb-2">{summary}</p>
      <span className="text-primary font-semibold dark:text-primaryDark">
        {time}
      </span>
    </li>
  );
};

const articles = () => {
  return (
    <>
      <Head>
        <title>Matt Rangel | About Page</title>
        <meta name="description" content="any description" />
      </Head>
      <TransitionEffect />
      <main className="w-full mb-16 flex flex-col items-center justify-center overflow-hidden dark:text-light">
        <Layout className="pt-16 ">
          <AnimatedText
            text="Words Can Change The World! "
            className="mb-16 lg:!text-7xl sm:mb-8 sm:!text-xl xs:!text-4xl "
          />
          <ul className="grid grid-cols-2 gap-16 lg:gap-8 md:grid-cols-1 md:gap-16">
            <FeaturedArticle
              title="Introduction to project management methodologies"
              summary="Learn Project Management methodologies that help guide project managers throughout a project with steps to take, tasks to complete, and principles for managing a project overall"
              time="8 min read"
              link="https://rangelmatt.github.io/reading-notes/googlePmCert/1.Week_3_Foundations/3.2pmMethodologies"
              img={article10}
            />
            <FeaturedArticle
              title="Project Life Cycle"
              summary="Learn about the basic structure of a project, the life cycle, which is a great way to guide your project in the right direction so that you and your project stay on track and end up in the right place."
              time="8 min read"
              link="https://rangelmatt.github.io/reading-notes/googlePmCert/1.Week_3_Foundations/3.1projectLifeCycle"
              img={article11}
            />
            <FeaturedArticle
              title="Learning about careers in Project Management"
              summary="Learn Job descriptions and what they mean plus the responsibilities to be a successful project manager."
              time="3 min read"
              link="https://rangelmatt.github.io/reading-notes/googlePmCert/1.Week_1_Foundations/pmCareers"
              img={article1}
            />
            <FeaturedArticle
              title="Becoming an Effective Project Manager"
              summary="Learn the value that a project manager brings to all sorts of businesses and how they impact an organization."
              time="10 min read"
              link="https://rangelmatt.github.io/reading-notes/googlePmCert/1.Week_2_Foundations/effectivePM"
              img={article2}
            />
          </ul>
          <h2 className="font-bold text-4xl w-full text-center my-16 mt-32">
            All Articles
          </h2>
          <ul>
            <Article
              title="Portfolio Introduction"
              date="April 6, 2023"
              img={article3}
              link="https://rangelmatt.github.io/reading-notes/newsLetter/portfolio/"
            />
            <Article
              title="First Paid App"
              date="Feb 2, 2023"
              img={article4}
              link="https://rangelmatt.github.io/reading-notes/newsLetter/firstPaidApp/"
            />
            <Article
              title="React Element vs Component"
              date="Jan 30, 2023"
              img={article5}
              link="https://rangelmatt.github.io/reading-notes/reactRoadmap/reactElementvsComp/"
            />
            <Article
              title='At Home "PM"ing'
              date="Jan 24, 2023"
              img={article6}
              link="https://rangelmatt.github.io/reading-notes/newsLetter/homePm"
            />
            <Article
              title="100 React Developer Road Map"
              date="Jan 23, 2023"
              img={article7}
              link="https://rangelmatt.github.io/reading-notes/reactRoadmap/100-react/"
            />
            <Article
              title="React Beginners Guide Reading Notes"
              date="Jan 17, 2023"
              img={article8}
              link="https://rangelmatt.github.io/reading-notes/reactRoadmap/beginnersGuide/"
            />
            <Article
              title="React Overview"
              date="June 3, 2022"
              img={article9}
              link="https://rangelmatt.github.io/reading-notes/CodeFellows/401class/401class-38/"
            />
          </ul>
        </Layout>
      </main>
    </>
  );
};
export default articles;
