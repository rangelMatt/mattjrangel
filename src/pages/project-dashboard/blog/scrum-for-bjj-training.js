import React from "react";
import Layout from "../../../components/Layout";
import { motion } from "framer-motion";
// import Breadcrumbs from "../../../components/Breadcrumbs";

const ScrumForBJJTraining = () => (
  <Layout className="min-h-screen flex flex-col items-center justify-center">
    {/* <Breadcrumbs /> */}
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { staggerChildren: 0.15 },
        },
      }}
      className="text-center"
    >
      <motion.h1
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        className="text-4xl font-bold mb-6 text-center dark:text-light"
      >
        Scrum for BJJ Training
      </motion.h1>
      <motion.p
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        className="text-lg max-w-2xl text-center dark:text-light/80"
      >
        Learn how Scrum methodology can bring structure and focus to your BJJ
        training sessions. Explore roles, sprints, and daily stand-ups adapted
        for martial arts improvement.
      </motion.p>
    </motion.div>
  </Layout>
);

export default ScrumForBJJTraining;
