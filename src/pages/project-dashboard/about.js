import React from "react";
import Layout from "../../components/Layout";
import { motion } from "framer-motion";
import ProjectDashboardLayout from "../../components/assistant/ProjectDashboardLayout";

const AboutDashboard = () => (
  <ProjectDashboardLayout
    pageTitle="About Project Dashboard"
    pageDescription="Learn about the intersection of BJJ and Project Management"
  >
    <Layout className="min-h-screen flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="max-w-2xl text-center"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-5xl font-bold mb-8 text-center dark:text-light"
        >
          About Project Dashboard
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-lg dark:text-light/80 space-y-6"
        >
          <p>
            <strong>Project Management & Brazilian Jiu-Jitsu:</strong> This
            dashboard explores the synergy between Agile project management
            principles and Brazilian Jiu-Jitsu (BJJ) training. By applying
            proven methodologies like Scrum, Kanban, and regular retrospectives,
            practitioners can accelerate their learning, set clear goals, and
            continuously improve on and off the mats.
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <strong>About Matt Rangel:</strong> Matt is an experienced
            Operations Program Manager and passionate BJJ practitioner. With a
            background in both project management and martial arts, he brings a
            unique perspective to optimizing personal and team performance
            through structured, iterative approaches.
          </motion.p>
        </motion.div>
      </motion.div>
    </Layout>
  </ProjectDashboardLayout>
);

export default AboutDashboard;
