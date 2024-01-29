import { OpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { LLMChain } from "langchain/chains";
import { topic_prompt } from "~/server/utils/generateTopicsPrompt";
import { story_prompt } from "./generateStoryPrompt";

export async function generateTopic() {
	const questionllm = new OpenAI({
		temperature: 0.3,
		modelName: "gpt-4",
	});
    
	const questiontemplate = topic_prompt.replace("{goal}",'traveller')

	const questionPrompt = new PromptTemplate({
		template: questiontemplate,
		inputVariables: [],
	});

	const questionChain = new LLMChain({
		llm: questionllm,
		prompt: questionPrompt,
	});
	const questionResult = await questionChain.run("");
	return questionResult;
}


export async function generateStory(topic: string) {
	const questionllm = new OpenAI({
		temperature: 0.3,
		modelName: "gpt-4",
	});
    
	const questiontemplate = story_prompt.replace("{goal}",'traveller').replace("{topic}",topic)

	const questionPrompt = new PromptTemplate({
		template: questiontemplate,
		inputVariables: [],
	});

	const questionChain = new LLMChain({
		llm: questionllm,
		prompt: questionPrompt,
	});
	const questionResult = await questionChain.run("");
	return questionResult;
}


