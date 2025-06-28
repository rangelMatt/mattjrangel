import React from "react";
import Layout from "../../../components/Layout";
import { motion } from "framer-motion";

const recommendedBooks = [
  {
    title: "The Brazilian Jiu-Jitsu Globetrotter",
    author: "Christian Graugart",
    description:
      "A travel memoir and BJJ adventure that explores the global community and philosophy of the sport.",
    type: "Memoir",
  },
  {
    title: "Jiu-Jitsu University",
    author: "Saulo Ribeiro",
    description:
      "A technical manual covering fundamental to advanced BJJ concepts, positions, and escapes.",
    type: "Technique",
  },
  {
    title: "The Art of Learning",
    author: "Josh Waitzkin",
    description:
      "A deep dive into the process of mastering skills, blending chess, martial arts, and personal growth.",
    type: "Mindset",
  },
  {
    title: "Drill to Win",
    author: "Andre Galvao",
    description:
      "A year-round training manual with drills and routines for improving BJJ performance.",
    type: "Training",
  },
  {
    title: "Mastering Jujitsu",
    author: "Renzo Gracie & John Danaher",
    description:
      "A comprehensive look at the history, strategy, and techniques of BJJ from two legendary instructors.",
    type: "Strategy",
  },
  {
    title: "Breathe: A Life in Flow",
    author: "Rickson Gracie",
    description:
      "The autobiography of a BJJ icon, focusing on philosophy, resilience, and the art of breathing.",
    type: "Biography",
  },
];

const RecommendedReading = () => (
  <Layout className="min-h-screen flex flex-col items-center justify-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl px-4"
    >
      <h1 className="text-4xl font-bold mb-8 text-center dark:text-light">
        Recommended Reading
      </h1>
      <p className="text-lg mb-12 text-center dark:text-light/80">
        Books and resources to deepen your understanding of Brazilian Jiu-Jitsu,
        training, and personal growth.
      </p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recommendedBooks.map((book, index) => (
          <motion.div
            key={book.title}
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
                {book.type}
              </span>
            </div>
            <h3 className="font-semibold text-lg mb-1 text-dark dark:text-light">
              {book.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              by {book.author}
            </p>
            <p className="text-dark/70 dark:text-light/70 text-sm leading-relaxed">
              {book.description}
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
        More reading recommendations coming soon...
      </motion.div>
    </motion.div>
  </Layout>
);

export default RecommendedReading;
