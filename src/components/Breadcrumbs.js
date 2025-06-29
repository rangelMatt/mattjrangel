import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const labelMap = {
  "": "Home",
  "project-dashboard": "Project Dashboard",
  blog: "Blog",
  "intro-to-bjj-project-management": "Intro to BJJ Project Management",
  "scrum-for-bjj-training": "Scrum for BJJ Training",
  "agile-retrospectives-for-bjj": "Agile Retrospectives for BJJ",
  "project-sprints": "Project Sprints",
  "sprint-1-retrospective": "Sprint 1 Retrospective",
  "sprint-2-retrospective": "Sprint 2 Retrospective",
  "sprint-3-retrospective": "Sprint 3 Retrospective",
  "all-sprints": "All Sprints (Summary)",
  resources: "Resources",
  "bjj-glossary": "BJJ Glossary",
  "project-management-tools-for-bjj": "Project Management Tools for BJJ",
  "recommended-reading": "Recommended Reading",
  about: "About",
  projects: "Portfolio",
};

const Chevron = () => (
  <svg
    className="mx-2 h-4 w-4 text-gray-400 dark:text-gray-500"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const Breadcrumbs = () => {
  const router = useRouter();
  const asPath = router.asPath.split("?")[0];
  const segments = asPath.split("/").filter(Boolean);

  // Remove breadcrumbs entirely on the home page
  if (segments.length === 0) return null;

  let path = "";

  return (
    <motion.nav
      className="w-full flex justify-start px-32 lg:px-16 md:px-12 sm:px-8 py-2"
      aria-label="Breadcrumb"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.4 }}
    >
      <ol className="flex items-center bg-gray-50 dark:bg-dark/60 border border-gray-200 dark:border-gray-700 rounded-md px-4 py-2 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 shadow-sm">
        <li>
          <Link
            href="/"
            className="hover:text-primary dark:hover:text-primaryDark transition-colors"
          >
            Home
          </Link>
        </li>
        {segments.map((seg, idx) => {
          path += "/" + seg;
          const isLast = idx === segments.length - 1;
          const label =
            labelMap[seg] ||
            seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
          return (
            <React.Fragment key={path}>
              <Chevron />
              {isLast ? (
                <span className="text-gray-900 dark:text-light font-semibold cursor-default">
                  {label}
                </span>
              ) : (
                <Link
                  href={path}
                  className="hover:text-primary dark:hover:text-primaryDark transition-colors"
                >
                  {label}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </motion.nav>
  );
};

export default Breadcrumbs;
