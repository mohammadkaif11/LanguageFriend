"use server";
import { ErrorInterface } from "model";
import { getServerAuthSession } from "./auth";
import { put } from "@vercel/blob";
import { db } from "./db";
import { Scene } from "@prisma/client";
import { targetLanguageSetting } from "Database/langaugeSetting";

export const createScene = async (formData: FormData) => {
  try {
    const session = await getServerAuthSession();
    if (!session?.user?.id) {
      throw new Error("User is  not authenticated");
    }
    const file = formData.get("sceneImage") as File;
    const sceneTitle = formData.get("sceneTitle") as string;
    const sceneDescription = formData.get("sceneDescription") as string;
    const botRole = formData.get("botRole") as string;
    const yourRole = formData.get("yourRole") as string;
    if (!sceneTitle || !sceneDescription || !botRole || !yourRole) {
      throw new Error("Please fill in all required fields");
    }
    if (!file) {
      throw new Error("Please upload image for scene");
    }
    const vercelUploadRes = await put(file.name, file, { access: "public" });
    const scene = await db.scene.create({
      data: {
        userId: session.user.id,
        sceneTitle: sceneTitle,
        sceneDescription: sceneDescription,
        botRole: botRole,
        yourRole: yourRole,
        sceneImage: vercelUploadRes.url,
      },
    });
    return { data: scene };
  } catch (error: unknown) {
    console.error("Error while creating scene", error);
    const Error: ErrorInterface = {
      message: (error as Error).message || "An unknown error occurred",
    };
    return { error: Error.message };
  }
};

export const updateLanguageSettings = async (
  targetLanguage: string,
  nativeLanguage: string,
  goalofLanguage: string,
  proficiencyLevel: string,
) => {
  try {
    const session = await getServerAuthSession();
    if (!session?.user?.id) {
      throw new Error("User is  not authenticated");
    }
    const user = await db.user.findUnique({ where: { id: session.user.id } });
    if (!user) {
      throw new Error("User is  not found");
    }
    const updateUser = await db.user.update({
      data: {
        nativeLanguageSetting: nativeLanguage,
        targetLanguageSetting: targetLanguage,
        goal: goalofLanguage,
        proficiencyLevelSetting: proficiencyLevel,
      },
      where: { id: session.user.id },
    });
    console.log('update user', updateUser);
    return { data: updateUser };
  } catch (error: unknown) {
    console.error("Error while updating language setting", error);
    const Error: ErrorInterface = {message: (error as Error).message || "An unknown error occurred"};
    return { error: Error.message };
  }
};
