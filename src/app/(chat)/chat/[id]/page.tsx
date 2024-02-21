import { redirect } from "next/navigation";
import React from "react";
import ChatWindow from "~/components/chat/text/ChatWindow";
import { getServerAuthSession } from "~/server/auth";

async function page() {
  const sessions = await getServerAuthSession();
  if (!sessions?.user?.id) {
    redirect("/login");
  }
  return <ChatWindow nativeLanguageCode={sessions?.user?.nativeLanguageSetting} />;
}

export default page;
