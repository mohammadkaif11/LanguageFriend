import { basis_prompt,feed_basis_learning_chat_prompt } from "./chatPropmt"
import { targetLanguageSetting } from "Database/langaugeSetting";
import { nativeLanguageSetting } from "Database/langaugeSetting";

export const getBasisPrompt=(target_languageCode:string,native_languageCode:string)=>{
    const target_language=targetLanguageSetting.find(language => language.code===target_languageCode)?.language ?? "English";
    const native_language=nativeLanguageSetting.find(language => language.code===native_languageCode)?.language ?? "English";
    const base_prompt_refactor =basis_prompt.replace("(target_language)",target_language).replace("(native_language)",native_language);
    console.log('base_prompt_refactor',base_prompt_refactor);
    return base_prompt_refactor;
}


export const getBasisPromptForLearning=(target_languageCode:string,native_languageCode:string)=>{
    const target_language=targetLanguageSetting.find(language => language.code===target_languageCode)?.language ?? "English";
    const native_language=nativeLanguageSetting.find(language => language.code===native_languageCode)?.language ?? "English";
    const base_prompt_refactor=feed_basis_learning_chat_prompt;
    const replace_base_prompt_refactor= base_prompt_refactor.replace("(target_language)",target_language).replace("(native_language)",native_language);
    return replace_base_prompt_refactor;
}