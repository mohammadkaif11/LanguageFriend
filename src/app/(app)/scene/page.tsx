import { useRouter } from "next/router";
import React from "react";
import CreateSceneModalButton from "~/components/scene/create-scene-modal-button";
import SceneCard from "~/components/scene/scene-card";
import scene from "~/secene.json";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { notFound, redirect } from "next/navigation";


async function page() {

  const sessions = await getServerAuthSession();

  if (!sessions?.user?.id) {
    redirect("/login");
  }

  const userScene = await db.scene.findMany({
    where: { userId: sessions.user.id },
  });

  return (
    <>
      <div className="mx-auto my-2  max-w-7xl">
        <div className="my-3">
          <CreateSceneModalButton />
        </div>
        {userScene.length > 0 && (
          <div className="my-4">
            <h2>Your Scenes</h2>
            <div className=" grid  gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {userScene.map((sceneCard, index) => {
                return (
                  <div key={sceneCard.sceneTitle} className="p-[5px] lg:p-0">
                    <SceneCard index={index} isDefault={false} scene={sceneCard} />
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div>
        <h2 className="my-4">Normal Scenes</h2>
        <div className=" grid  gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {scene.map((sceneCard, index) => {
            return (
              <div key={sceneCard.sceneTitle} className="p-[5px] lg:p-0">
                <SceneCard index={index} isDefault={true} />
              </div>
            );
          })}
        </div>
        </div>
      </div>
    </>
  );
}

export default page;
