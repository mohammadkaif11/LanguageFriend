"use server";
import { OpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { LLMChain } from "langchain/chains";
import { getServerAuthSession } from "../auth";

export const traslateText = async (text: string) => {
  const sessions = await getServerAuthSession();
  const model = new OpenAI({ temperature: 0.5 });

  const result = await model.call(
    `Traslate ${text} from ${sessions?.user?.nativeLanguageSetting} to ${sessions?.user?.targetLanguageSetting}.Important Note-: You should only return traslate text without symbol of " '.`,
  );
  console.log("result: ", result);
  return result;
};
