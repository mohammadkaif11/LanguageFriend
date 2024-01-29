interface MessageInterface {
  role: "system" | "user" | "assistant";
  content: string;
  voiceUrl: string | null;
}

export const extractContentAndRole = (data: MessageInterface[]) => {
  return data.map(({ role, content }) => ({ role, content }));
};


