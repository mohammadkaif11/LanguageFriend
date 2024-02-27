"use server";
import OpenAI from "openai";
import { extractContentAndRole } from "../utils/helper";
import { type MessageInterface } from "model";

export const startChart = async (data: MessageInterface[]) => {
  const openai = new OpenAI();
  console.log('startChart>>>>>', data);
  const inputParams = extractContentAndRole(data);
  const completion = await openai.chat.completions.create({
    messages: inputParams,
    model: "gpt-4",
  });
  return completion.choices[0]?.message;
};

export const generateAudio = async (text: string) => {

  const openai = new OpenAI();

  console.log('generateAudio>>>>>', text);
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input: text,
  });
  
  const buffer = Buffer.from(await mp3.arrayBuffer());

  const base64Audio = Buffer.from(buffer).toString("base64");

  return base64Audio;
};

