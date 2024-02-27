import { type Session } from "next-auth";
import { type User } from "@prisma/client";

export interface MessageInterface {
  role: "system" | "user" | "assistant";
  content: string;
  voiceUrl: string | null;
}

export interface MessageLearningModelInterface {
  role: "system" | "user" | "assistant";
  content: string;
  nativeLanguage: string | null;
  targetLanguage: string | null;
  voiceUrl: string | null;
}

export interface LearningObjectResponseInterface {
  inNativeLanguage: string | null;
  inTargetLanguage: string | null;
}

export interface ErrorInterface {
  message: string;
}

export interface CustomSession extends Session {
  data: {
    user?: User;
  };
  expires: string;
  status: string;
}

interface CustomUser {
  id: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  createdAt?: string | null | undefined;
  emailVerified?: string | null | undefined;
  goal?: string | null | undefined;
  nativeLanguageSetting?: string | null | undefined;
  proficiencyLevelSetting?: string | null | undefined;
  targetLanguageSetting?: string | null | undefined;
  updatedAt?: string | null | undefined;
}
