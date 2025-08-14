import React from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import TransitionEffect from "../../components/TransitionEffect";
import { motion } from "framer-motion";
// import Breadcrumbs from "../../components/Breadcrumbs";

const DashboardIndex = () => (
  <>
    <TransitionEffect />
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.4 }}
    >
      <Layout className="min-h-screen flex flex-col items-center justify-center">
        {/* <Breadcrumbs /> */}
        <h1 className="text-5xl font-bold mb-8 text-center dark:text-light">
          Project Dashboard
        </h1>
        <nav className="flex flex-col gap-4 w-full max-w-md">
          <Link
            href="/project-dashboard/blog"
            className="w-full py-4 px-6 bg-primary text-light dark:bg-primaryDark dark:text-dark rounded-lg text-xl font-semibold text-center shadow hover:bg-primary/90 transition"
          >
            Blog
          </Link>
          <Link
            href="/project-dashboard/project-sprints"
            className="w-full py-4 px-6 bg-primary text-light dark:bg-primaryDark dark:text-dark rounded-lg text-xl font-semibold text-center shadow hover:bg-primary/90 transition"
          >
            Project Sprints
          </Link>
          <Link
            href="/project-dashboard/resources"
            className="w-full py-4 px-6 bg-primary text-light dark:bg-primaryDark dark:text-dark rounded-lg text-xl font-semibold text-center shadow hover:bg-primary/90 transition"
          >
            Resources
          </Link>
          <Link
            href="/project-dashboard/about"
            className="w-full py-4 px-6 bg-primary text-light dark:bg-primaryDark dark:text-dark rounded-lg text-xl font-semibold text-center shadow hover:bg-primary/90 transition"
          >
            About
          </Link>
        </nav>
      </Layout>
    </motion.div>
  </>
);

export default DashboardIndex;
