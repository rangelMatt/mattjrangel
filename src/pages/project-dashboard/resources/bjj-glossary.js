import React from "react";
import Layout from "../../../components/Layout";
import { motion } from "framer-motion";

const glossaryTerms = [
  {
    term: "Guard",
    definition:
      "A position where you control your opponent from your back using your legs and hips.",
  },
  {
    term: "Mount",
    definition:
      "A dominant position where you sit on your opponent's chest with your knees on the ground.",
  },
  {
    term: "Side Control",
    definition:
      "A position where you control your opponent from the side, typically with your chest on their chest.",
  },
  {
    term: "Kimura",
    definition:
      "A shoulder lock submission that targets the shoulder joint and rotator cuff.",
  },
  {
    term: "Triangle Choke",
    definition:
      "A choke submission using your legs to create a triangle around your opponent's neck and arm.",
  },
];

const BJJGlossary = () => (
  <Layout className="min-h-screen flex flex-col items-center justify-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl px-4"
    >
      <h1 className="text-4xl font-bold mb-8 text-center dark:text-light">
        BJJ Glossary
      </h1>
      <p className="text-lg mb-12 text-center dark:text-light/80">
        A comprehensive glossary of Brazilian Jiu-Jitsu terms for newcomers and
        reference.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {glossaryTerms.map((item, index) => (
          <motion.div
            key={item.term}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            className="bg-light dark:bg-dark/50 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h4 className="font-semibold text-lg mb-2 text-primary dark:text-primaryDark">
              {item.term}
            </h4>
            <p className="text-dark/80 dark:text-light/80">{item.definition}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400"
      >
        More terms coming soon...
      </motion.div>
    </motion.div>
  </Layout>
);

export default BJJGlossary;
