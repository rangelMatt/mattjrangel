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
      {process.env.NEXT_PUBLIC_AI_CHAT_ENABLED === "true" ? (
        <ChatWidget pageMeta={pageMeta} />
      ) : null}
    </>
  );
};

export default ProjectDashboardLayout;
