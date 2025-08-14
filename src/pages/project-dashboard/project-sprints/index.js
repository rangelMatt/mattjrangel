import React from "react";
import Layout from "../../../components/Layout";
import Link from "next/link";
import { motion } from "framer-motion";

const sprints = [
  {
    href: "/project-dashboard/project-sprints/sprint-1-retrospective",
    title: "Sprint 1 Retrospective",
  },
  {
    href: "/project-dashboard/project-sprints/sprint-2-retrospective",
    title: "Sprint 2 Retrospective",
  },
  {
    href: "/project-dashboard/project-sprints/sprint-3-retrospective",
    title: "Sprint 3 Retrospective",
  },
  {
    href: "/project-dashboard/project-sprints/all-sprints",
    title: "All Sprints (Summary)",
  },
];

const ProjectSprintsIndex = () => (
  <>
    <Layout className="min-h-screen flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <h1 className="text-5xl font-bold mb-8 text-center dark:text-light">
          Project Sprints
        </h1>
        <ul className="w-full flex flex-col gap-4">
          {sprints.map((sprint) => (
            <li key={sprint.href}>
              <Link
                href={sprint.href}
                className="block py-4 px-6 bg-primary text-light dark:bg-primaryDark dark:text-dark rounded-lg text-xl font-semibold shadow hover:bg-primary/90 transition"
              >
                {sprint.title}
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
    </Layout>
  </>
);

export default ProjectSprintsIndex;
