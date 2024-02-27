import { getBasisPrompt, getBasisPromptForLearning } from "./promptUtils";
import { extractNativeLanguageByLanguageCode } from "../utils/helper";
import { extractTargetLanguageByLanguageCode } from "../utils/helper";
import { practice_Language_prompt ,learning_Language_Prompt} from "./chatPropmt";

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

export const getPracticeFeedPrompt = (
  sceneId: string | null,
  userScene: string | null,
  characterId: string | null,
  target_languageCode: string,
  native_languageCode: string,
) => {
  const target_language =
    extractTargetLanguageByLanguageCode(target_languageCode);
  const native_language =
    extractNativeLanguageByLanguageCode(native_languageCode);
  const resultPrompt = practice_Language_prompt
    .replace("(target_Language)", target_language)
    .replace("(native_Language)", native_language);
  return resultPrompt;
};

export const getLearningFeedPrompt = (
  sceneId: string | null,
  userScene: string | null,
  characterId: string | null,
  target_languageCode: string,
  native_languageCode: string,
) => {
  const target_language =
    extractTargetLanguageByLanguageCode(target_languageCode);
  const native_language =
    extractNativeLanguageByLanguageCode(native_languageCode);
  const resultPrompt = learning_Language_Prompt
    .replace("(target_Language)", target_language)
    .replace("(native_Language)", native_language);
  return resultPrompt;
};
