import React from "react";
import Layout from "../../../components/Layout";
import { motion } from "framer-motion";
import ProjectDashboardLayout from "../../../components/assistant/ProjectDashboardLayout";
// import Breadcrumbs from "../../../components/Breadcrumbs";

const IntroToBJJProjectManagement = () => (
  <ProjectDashboardLayout
    pageTitle="Intro to BJJ Project Management"
    pageDescription="Discover how project management principles can transform your Brazilian Jiu-Jitsu training"
  >
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
          Intro to BJJ Project Management
        </motion.h1>
        <motion.p
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          className="text-lg max-w-2xl text-center dark:text-light/80"
        >
          Discover how project management principles can transform your
          Brazilian Jiu-Jitsu training. This article introduces the core
          concepts and sets the stage for applying Agile and Scrum to your
          journey on the mats.
        </motion.p>
      </motion.div>
    </Layout>
  </ProjectDashboardLayout>
);

export default IntroToBJJProjectManagement;
