"use server";
import { OpenAI } from "@langchain/openai";
import { getServerAuthSession } from "../auth";

export const traslateText = async (text: string) => {
  const sessions = await getServerAuthSession();
  const model = new OpenAI({modelName:"gpt-4",streaming:false});
  const result = await model.call(`Traslate ${text} from ${sessions?.user?.nativeLanguageSetting} to ${sessions?.user?.targetLanguageSetting}.Important Note-: You should only return traslate text without symbol of " '.`);
  return result;
};

export const explainOutput = async (text: string) => {
  const sessions = await getServerAuthSession();
  const model = new OpenAI({modelName:"gpt-4",streaming:false});
  const result = await model.call(`Your task is explain this ${text} in ${sessions?.user?.nativeLanguageSetting} so learner can understand the language. 
  Note-: response will return in array of json object [{ word:"" ,explanation:""}]. don't miss any words  and you should not contain any other words`);
  console.log('explained output result:>>>>>>>>>>>',result);
  return result;
};

