import React, { useState, useEffect } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import { startChart } from "~/server/chatGPT/chatgpt";
import { type MessageInterface } from "model";
import MicroPhone from "~/components/speech-text-js/MicroPhone";

interface InputFormTagProps {
  setMessages: React.Dispatch<React.SetStateAction<MessageInterface[]>>;
  chatHistory: MessageInterface[];
}

function InputFormTag(props: InputFormTagProps) {
  const [message, setMessage] = useState<string>("");

  async function onMessageSend() {
    if (!message) {
      return;
    }

    const userMessage: MessageInterface = {
      content: message,
      role: "user",
      voiceUrl: null,
    };

    const updatedChatHistory = [...props.chatHistory, userMessage];
    props.setMessages(updatedChatHistory);

    try {
      const response = await startChart(updatedChatHistory);
      const assistantMessage = response as MessageInterface;

      const updatedChatHistoryWithResponse = [
        ...updatedChatHistory,
        assistantMessage,
      ];
      props.setMessages(updatedChatHistoryWithResponse);
    } catch (errors) {
      console.log("error", errors);
    } finally {
      setMessage("");
    }
  }
  useEffect(() => {
    console.log("message changed", message);
  }, [message]);

  return (
    <div className="flex py-5">
      <input
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        value={message}
        className="w-full rounded-xl bg-gray-300 px-3 py-5"
        type="text"
        placeholder="type your message here..."
      />
      <MicroPhone setMessage={setMessage} />
      <PaperAirplaneIcon onClick={onMessageSend} className="h-14 w-14" />
    </div>
  );
}

export default InputFormTag;
