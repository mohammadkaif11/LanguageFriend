import { getBasisPrompt ,getBasisPromptForLearning} from "./promptUtils";
const defaultBasisPrompt = "You are AI Language Tutor";

export const getFeedPrompt = (
  sceneId: string | null,
  native_language: string,
  target_language: string,
  learningMode: boolean,
) => {
  let prompt;
  if (sceneId === null) {
    prompt = getBasisPrompt(target_language, native_language);
    return prompt;
  }
  return defaultBasisPrompt;
};

export const getNormalConversationFeedPrompt = (
  sceneId: string | null,
  native_language: string,
  target_language: string,
) => {
  let prompt;
  if (sceneId === null) {
    prompt = getBasisPromptForLearning(target_language, native_language);
    return prompt;
  }
  return defaultBasisPrompt;
};
