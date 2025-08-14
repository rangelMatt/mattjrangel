import React from "react";
import Layout from "../../../components/Layout";
import Link from "next/link";
import { motion } from "framer-motion";
// import Breadcrumbs from "../../../components/Breadcrumbs";

const blogPosts = [
  {
    href: "/project-dashboard/blog/intro-to-bjj-project-management",
    title: "Introduction to BJJ Project Management",
  },
  {
    href: "/project-dashboard/blog/scrum-for-bjj-training",
    title: "Scrum for BJJ Training",
  },
  {
    href: "/project-dashboard/blog/agile-retrospectives-for-bjj",
    title: "Agile Retrospectives for BJJ",
  },
  {
    href: "/project-dashboard/blog/risk-management-in-bjj-competition",
    title: "Risk Management in BJJ Competition",
  },
  {
    href: "/project-dashboard/blog/optimizing-bjj-training-through-kanban",
    title: "Optimizing BJJ Training Through Kanban",
  },
];

const BlogIndex = () => (
  <>
    <Layout className="min-h-screen flex flex-col items-center justify-center">
      {/* <Breadcrumbs /> */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <h1 className="text-5xl font-bold mb-8 text-center dark:text-light">
          Blog
        </h1>
        <ul className="w-full flex flex-col gap-4">
          {blogPosts.map((post) => (
            <li key={post.href}>
              <Link
                href={post.href}
                className="block py-4 px-6 bg-primary text-light dark:bg-primaryDark dark:text-dark rounded-lg text-xl font-semibold shadow hover:bg-primary/90 transition"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
    </Layout>
  </>
);

export default BlogIndex;
