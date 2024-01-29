"use server";
interface MessageInterface {
  role: "system" | "user" | "assistant";
  content: string;
  voiceUrl: string | null;
}
import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { extractContentAndRole } from "../utils/helper";
const openai = new OpenAI();

export const startChart = async (data: MessageInterface[]) => {
  const inputParams = extractContentAndRole(data);
  const completion = await openai.chat.completions.create({
    messages: inputParams,
    model: "gpt-3.5-turbo",
  });
  console.log(completion);
  console.log("data", data);
  return completion.choices[0]?.message;
};

// export async function main() {
//   console.log('main is hitting audio');
//   const mp3 = await openai.audio.speech.create({
//     model: "tts-1",
//     voice: "alloy",
//     input: "Today is a wonderful day to build something people love!",
//   });
//   console.log('speechFile',speechFile);

//   const buffer = Buffer.from(await mp3.arrayBuffer());
//   const base64String = buffer.toString('base64'); // Convert Uint8Array to base64 string

//   console.log('buffer',buffer);

//   return base64String;
// }

// { chat_history: "Human: Hi!\AI: What's up?" }

// main().then((data) =>{
//   // Create a Blob from the buffer
//   const blob = new Blob([data], { type: 'audio/mp3' });
//   console.log('blob',blob);

//   // Create a data URL from the Blob
//   const dataUrl = URL.createObjectURL(blob);
//   console.log('dataUrl',dataUrl);

//   // Create an <audio> element and set the data URL as the source
//   const audio = new Audio(dataUrl);
//   console.log('audio',audio);

//       console.log(data);
//     }).catch((err) =>{
//       console.log(err);
//     })

export const generateAudio = async (text: string) => {
  console.log("text>>>>generateAudio", text);
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input: text,
  });
  const buffer = Buffer.from(await mp3.arrayBuffer());
  const base64String = buffer.toString("base64");

  return base64String;
};
