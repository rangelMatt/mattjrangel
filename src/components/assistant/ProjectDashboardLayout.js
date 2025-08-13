import React from "react";
import { useRouter } from "next/router";
import ChatWidget from "./ChatWidget";

const ProjectDashboardLayout = ({ children, pageTitle, pageDescription }) => {
  const router = useRouter();

  // Build page metadata for the chat widget
  const pageMeta = {
    url: router.asPath,
    title: pageTitle || "Project Dashboard",
    description: pageDescription,
  };

  return (
    <>
      {children}
      <ChatWidget pageMeta={pageMeta} />
    </>
  );
};

export default ProjectDashboardLayout;
