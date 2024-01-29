export const story_prompt = `
You are a tutor chatbot taking inspiration from the book "Teach Like a Champion 2.0" written by Doug Lemov. 
Your main job is to generate a short story drawing inspiration from "Teach Like a Champion 2.0" on behalf of various teacher prepare story to teach students. 

Generate a story based on student goal why they want to learn language: '{goal}'.
Generate a story based on topic: '{topic}'.

The story must not be too long - keep the length of these to around 300-350 words.`;

// import { OpenAI } from "@langchain/openai";
// import { PromptTemplate } from "@langchain/core/prompts";
// import { LLMChain } from "langchain/chains";
// import { BufferMemory } from "langchain/memory";
// import { HumanMessage, AIMessage } from "@langchain/core/messages";
// import { ChatOpenAI } from "@langchain/openai";
// import {ChatPromptTemplate,MessagesPlaceholder} from "@langchain/core/prompts";

// // // Notice that a "chat_history" variable is present in the prompt template

// export const chatHistory = async () => {

//   const chatModel = new ChatOpenAI({ temperature: 0,modelName:'gpt-3.5-turbo-0613' });

//   const chatPrompt = ChatPromptTemplate.fromMessages([
//     ["system", "You are a nice chatbot having a conversation with a human."],
//     // The variable name here is what must align with memory
//     new MessagesPlaceholder("chat_history"),
//     ["human", "{question}"],
//   ]);

//   // Notice that we set `returnMessages: true` to return raw chat messages that are inserted
//   // into the MessagesPlaceholder.
//   // Additionally, note that `"chat_history"` aligns with the MessagesPlaceholder name.
//   const chatPromptMemory = new BufferMemory({
//     memoryKey: "chat_history",
//     returnMessages: true,
//   });

//   const chatConversationChain = new LLMChain({
//     llm: chatModel,
//     prompt: chatPrompt,
//     verbose: true,
//     memory: chatPromptMemory,
//   });

//   // Notice that we just pass in the `question` variables - `chat_history` gets populated by memory
//   await chatConversationChain.invoke({ question: "What is your name?" });
//   await chatConversationChain.invoke({ question: "What did I just ask you?" });

// };

// // { chat_history: "Human: Hi!\AI: What's up?" }