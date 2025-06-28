import React from "react";
import Layout from "../../../components/Layout";
import { motion } from "framer-motion";

const Sprint2Retrospective = () => (
  <Layout className="min-h-screen flex flex-col items-center justify-center">
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="text-center"
    >
      <h1 className="text-4xl font-bold mb-6 text-center dark:text-light">
        Sprint 2 Retrospective
      </h1>
      <p className="text-lg max-w-2xl text-center dark:text-light/80">
        Analysis of the second BJJ training sprint: progress, setbacks, and new
        strategies implemented.
      </p>
    </motion.div>
  </Layout>
);

export default Sprint2Retrospective;
