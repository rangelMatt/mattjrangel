import React from "react";
import Layout from "../../../components/Layout";
import { motion } from "framer-motion";

const pmTools = [
  {
    name: "Trello",
    description:
      "Visual project management with Kanban boards perfect for tracking BJJ training progress and techniques to learn.",
    category: "Task Management",
  },
  {
    name: "Notion",
    description:
      "All-in-one workspace for documenting training notes, creating technique databases, and tracking personal goals.",
    category: "Documentation",
  },
  {
    name: "Asana",
    description:
      "Team collaboration tool that can be adapted for group training sessions and competition preparation.",
    category: "Team Management",
  },
  {
    name: "Jira",
    description:
      "Advanced project management for serious practitioners wanting to track detailed training sprints and retrospectives.",
    category: "Advanced PM",
  },
  {
    name: "Miro",
    description:
      "Digital whiteboard for visualizing training flows, technique sequences, and competition strategies.",
    category: "Visual Planning",
  },
  {
    name: "Google Sheets",
    description:
      "Simple spreadsheet tracking for logging training sessions, progress metrics, and competition results.",
    category: "Data Tracking",
  },
];

const PMToolsForBJJ = () => (
  <Layout className="min-h-screen flex flex-col items-center justify-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl px-4"
    >
      <h1 className="text-4xl font-bold mb-8 text-center dark:text-light">
        Project Management Tools for BJJ
      </h1>
      <p className="text-lg mb-12 text-center dark:text-light/80">
        A curated list of digital and analog tools to help practitioners apply
        project management techniques to their BJJ training.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pmTools.map((tool, index) => (
          <motion.div
            key={tool.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            }}
            className="bg-light dark:bg-dark/50 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm cursor-pointer"
          >
            <div className="mb-3">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary dark:bg-primaryDark/10 dark:text-primaryDark rounded-full">
                {tool.category}
              </span>
            </div>
            <h3 className="font-semibold text-lg mb-3 text-dark dark:text-light">
              {tool.name}
            </h3>
            <p className="text-dark/70 dark:text-light/70 text-sm leading-relaxed">
              {tool.description}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400"
      >
        More tools and detailed implementation guides coming soon...
      </motion.div>
    </motion.div>
  </Layout>
);

export default PMToolsForBJJ;
