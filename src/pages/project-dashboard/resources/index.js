import React from "react";
import Layout from "../../../components/Layout";
import Link from "next/link";
import { motion } from "framer-motion";
import ProjectDashboardLayout from "../../../components/assistant/ProjectDashboardLayout";

const resources = [
  { href: "/project-dashboard/resources/bjj-glossary", title: "BJJ Glossary" },
  {
    href: "/project-dashboard/resources/project-management-tools-for-bjj",
    title: "Project Management Tools for BJJ",
  },
  {
    href: "/project-dashboard/resources/recommended-reading",
    title: "Recommended Reading",
  },
];

const ResourcesIndex = () => (
  <ProjectDashboardLayout
    pageTitle="Resources"
    pageDescription="BJJ and Project Management Resources"
  >
    <Layout className="min-h-screen flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <h1 className="text-5xl font-bold mb-8 text-center dark:text-light">
          Resources
        </h1>
        <ul className="w-full flex flex-col gap-4">
          {resources.map((resource) => (
            <li key={resource.href}>
              <Link
                href={resource.href}
                className="block py-4 px-6 bg-primary text-light dark:bg-primaryDark dark:text-dark rounded-lg text-xl font-semibold shadow hover:bg-primary/90 transition"
              >
                {resource.title}
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
    </Layout>
  </ProjectDashboardLayout>
);

export default ResourcesIndex;
