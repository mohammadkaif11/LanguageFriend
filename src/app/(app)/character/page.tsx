import React from "react";
import scene from "~/secene.json";
import CharacterCard from "~/components/character/character-card";
import CreateCharacterModalButton from "~/components/character/create-character-modal-button";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { redirect } from "next/navigation";
async function page() {
  const sessions = await getServerAuthSession();

  if (!sessions?.user?.id) {
    redirect("/login");
  }

  const userCharacters = await db.character.findMany({
    where: { userId: sessions.user.id },
  });

  return (
    <>
      <div className="mx-auto my-2  max-w-7xl">
        <div className="my-3">
          <CreateCharacterModalButton />
        </div>
        {userCharacters.length > 0 && (
          <div className="my-4">
            <h2>Your Character</h2>
            <div className=" grid  gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {userCharacters.map((character, index) => {
                return (
                  <div key={character.name} className="p-[5px] lg:p-0">
                    <CharacterCard index={index} isDefault={false} character={character}/>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div className=" grid  gap-4 sm:grid-cols-1 lg:grid-cols-4">
          {scene.map((sceneCard, index) => {
            return (
              <div key={sceneCard.sceneTitle} className="p-[5px] lg:p-0">
                <CharacterCard index={index} isDefault={true} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default page;
