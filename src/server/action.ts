"use server";
import { ErrorInterface } from "model";
import { getServerAuthSession } from "./auth";
import { put } from "@vercel/blob";
import { db } from "./db";
import { del } from "@vercel/blob";

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

export const updateScene = async (formData: FormData, sceneId: string) => {
  try {
    const session = await getServerAuthSession();
    if (!session?.user?.id) {
      throw new Error("User is  not authenticated");
    }
    if (!sceneId) {
      throw new Error("sceneId is required");
    }
    const scenedb = await db.scene.findUnique({ where: { id: sceneId } });
    if (!scenedb) {
      throw new Error("scene not found");
    }

    // eslint-disable-next-line prefer-const
    let imageUrl = scenedb.sceneImage;
    const file = formData.get("sceneImage") as File;
    const sceneTitle = formData.get("sceneTitle") as string;
    const sceneDescription = formData.get("sceneDescription") as string;
    const botRole = formData.get("botRole") as string;
    const yourRole = formData.get("yourRole") as string;
    if (file) {
      await del(scenedb.sceneImage);
      const vercelUploadRes = await put(file.name, file, { access: "public" });
      imageUrl = vercelUploadRes.url;
    }

    const scene = await db.scene.update({
      data: {
        sceneTitle: sceneTitle,
        sceneDescription: sceneDescription,
        botRole: botRole,
        yourRole: yourRole,
        sceneImage: imageUrl,
      },
      where: {
        id: sceneId,
        userId: session.user.id,
      },
    });
    return { data: scene };
  } catch (error: unknown) {
    console.error("Error while updating scene", error);
    const Error: ErrorInterface = {
      message: (error as Error).message || "An unknown error occurred",
    };
    return { error: Error.message };
  }
};

export const deleteScene = async (sceneId: string) => {
  try {
    const session = await getServerAuthSession();
    if (!session?.user?.id) {
      throw new Error("User is  not authenticated");
    }
    if (!sceneId) {
      throw new Error("sceneId is required");
    }
    const scenedb = await db.scene.findUnique({ where: { id: sceneId } });
    if (!scenedb) {
      throw new Error("scene not found");
    }
    await del(scenedb.sceneImage);
    const scene = await db.scene.delete({
      where: {
        id: sceneId,
        userId: session.user.id,
      },
    });
    return { data: scene };
  } catch (error: unknown) {
    console.error("Error while deleting scene", error);
    const Error: ErrorInterface = {
      message: (error as Error).message || "An unknown error occurred",
    };
    return { error: Error.message };
  }
};

export const createChracter = async (formData: FormData) => {
  try {
    const session = await getServerAuthSession();
    if (!session?.user?.id) {
      throw new Error("User is  not authenticated");
    }
    const file = formData.get("image") as File;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    if (!name || !description || !file) {
      throw new Error("Please fill in all required fields");
    }
    const vercelUploadRes = await put(file.name, file, { access: "public" });
    const character = await db.character.create({
      data: {
        userId: session.user.id,
        name: name,
        description: description,
        imageUrl: vercelUploadRes.url,
      },
    });
    return { data: character };
  } catch (error: unknown) {
    console.error("Error while creating character", error);
    const Error: ErrorInterface = {
      message: (error as Error).message || "An unknown error occurred",
    };
    return { error: Error.message };
  }
};

export const updateCharacter = async (
  formData: FormData,
  characterId: string,
) => {
  try {
    const session = await getServerAuthSession();
    if (!session?.user?.id) {
      throw new Error("User is  not authenticated");
    }
    if (!characterId) {
      throw new Error("characterId is required");
    }
    const characterdb = await db.character.findUnique({
      where: { id: characterId },
    });
    if (!characterdb) {
      throw new Error("Character not found");
    }

    // eslint-disable-next-line prefer-const
    let imageUrl = characterdb.imageUrl;
    const file = formData.get("image") as File;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    if (file) {
      await del(characterdb.imageUrl);
      const vercelUploadRes = await put(file.name, file, { access: "public" });
      imageUrl = vercelUploadRes.url;
    }

    const character = await db.character.update({
      data: {
        name: name,
        description: description,
        imageUrl: imageUrl,
      },
      where: {
        id: characterId,
        userId: session.user.id,
      },
    });

    return { data: character };
  } catch (error: unknown) {
    console.error("Error while updating character", error);
    const Error: ErrorInterface = {
      message: (error as Error).message || "An unknown error occurred",
    };
    return { error: Error.message };
  }
};

export const deleteCharacter = async (characterId: string) => {
  try {
    const session = await getServerAuthSession();
    if (!session?.user?.id) {
      throw new Error("User is  not authenticated");
    }
    if (!characterId) {
      throw new Error("characterId is required");
    }
    const characterdb = await db.character.findUnique({
      where: { id: characterId },
    });
    if (!characterdb) {
      throw new Error("Character not found");
    }
    await del(characterdb.imageUrl);
    const character = await db.character.delete({
      where: {
        id: characterId,
        userId: session.user.id,
      },
    });
    return { data: character };
  } catch (error: unknown) {
    console.error("Error while deleting character", error);
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
    console.log("update user", updateUser);
    return { data: updateUser };
  } catch (error: unknown) {
    console.error("Error while updating language setting", error);
    const Error: ErrorInterface = {
      message: (error as Error).message || "An unknown error occurred",
    };
    return { error: Error.message };
  }
};
