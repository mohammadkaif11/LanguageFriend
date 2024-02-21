import { type MessageInterface } from "model";
import { targetLanguageSetting } from "Database/langaugeSetting";
import { nativeLanguageSetting } from "Database/langaugeSetting";

export const extractContentAndRole = (data: MessageInterface[]) => {
  return data.map(({ role, content }) => ({ role, content }));
};

export const extractTargetLanguageByLanguageCode = (
  target_languageCode: string,
) => {
  const target_language =
    targetLanguageSetting.find(
      (language) => language.code === target_languageCode,
    )?.language ?? "English";
  return target_language;
};

export const extractNativeLanguageByLanguageCode = (
  native_languageCode: string,
) => {
  const native_language =
    nativeLanguageSetting.find(
      (language) => language.code === native_languageCode,
    )?.language ?? "English";
  return native_language;
};
