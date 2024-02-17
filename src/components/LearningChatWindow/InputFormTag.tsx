import React, { useState, useEffect } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import ContentEditable from "react-contenteditable";
import { startChart } from "~/server/chatGPT/chatgpt";
import { type LearningObjectResponseInterface, type MessageLearningModelInterface } from "model";
import MicroPhone from "~/components/speech-text-js/MicroPhone";
import { traslateText } from "~/server/chatGPT/gptHelper";

interface InputFormTagProps {
  setMessages: React.Dispatch<React.SetStateAction<MessageLearningModelInterface[]>>;
  chatHistory: MessageLearningModelInterface[];
  setSenderLoading:React.Dispatch<React.SetStateAction<boolean>>;
}

function InputFormTag(props: InputFormTagProps) {
  const [message, setMessage] = useState<string>("");

  async function onMessageSend() {
    if (!message) {
      return;
    }
    setMessage("");
    props.setSenderLoading(true);
    const targetLanguageText=await traslateText(message);
    props.setSenderLoading(false);

    const userMessage: MessageLearningModelInterface = {
      content: message,
      role: "user",
      voiceUrl: null,
      nativeLanguage:message,
      targetLanguage: targetLanguageText,
    };

    const updatedChatHistory = [...props.chatHistory, userMessage];
    props.setMessages(updatedChatHistory);

    try {
      const response = await startChart(updatedChatHistory);
      const assistantMessage = response as MessageLearningModelInterface;
      const obj = JSON.parse(assistantMessage.content) as LearningObjectResponseInterface;
      assistantMessage.nativeLanguage = obj.inNativeLanguage ?? "";
      assistantMessage.targetLanguage = obj.inTargetLanguage ?? "";
      assistantMessage.voiceUrl = null;
      const updatedChatHistoryWithResponse = [
        ...updatedChatHistory,
        assistantMessage,
      ];
      props.setMessages(updatedChatHistoryWithResponse);
    } catch (errors) {
      console.log("error", errors);
    }
  }

  useEffect(() => {
    console.log("message changed", message);
  }, [message]);
  

  return (
    <div className="relative flex h-[30%] w-full items-center justify-center rounded-t-[25%] bg-slate-400">
      <div className="relative flex flex-col justify-center items-center gap-2 ">
        <ContentEditable
          tagName="div"
          html={message!=="" ? message : "Type Your Message here!"  }
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          className=" text-white text-xl p-4 w-full"
        />
        <button
          onClick={onMessageSend}
          className="flex w-20 items-center justify-center rounded-md border-2 border-white bg-white text-xl text-black "
        >
          Send
          <PaperAirplaneIcon className="h-8 w-8" />{" "}
        </button>
      </div>
      <div className="absolute left-[42%] top-[-32px]">
        <MicroPhone setMessage={setMessage} />
      </div>
    </div>
  );
}

export default InputFormTag;
