import React from "react";
import ChatWindow from "~/components/LearningChatWindow/ChatWindow";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
async function page() {
  const sessions = await getServerAuthSession();
  if (!sessions?.user?.id) {
    redirect("/login");
  }
  return (
      <ChatWindow nativeLanguage={sessions.user.nativeLanguageSetting}  targetLanguage={sessions.user.targetLanguageSetting}/>
  );
}

export default page;
