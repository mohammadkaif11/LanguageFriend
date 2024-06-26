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
        <div className="m-2">
          <CreateSceneModalButton />
        </div>
        {userScene.length > 0 && (
          <div className="my-4">
            <div className="m-2">
              <span className="inline-block  bg-yellow-100 p-2 text-2xl font-bold text-yellow-500">
                Your Scenes
              </span>
            </div>{" "}
            <div className=" grid justify-items-center gap-4 sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-3">
              {userScene.map((sceneCard, index) => {
                return (
                  <div key={sceneCard.sceneTitle} className="p-[5px] lg:p-0">
                    <SceneCard
                      index={index}
                      isDefault={false}
                      scene={sceneCard}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div>
          <div className="m-2">
            <span className="inline-block bg-yellow-100 p-2 text-2xl font-bold text-yellow-500">
              Scenes
            </span>
          </div>
          <div className="grid justify-items-center gap-4 sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-3">
            {scene.map((sceneCard, index) => {
              return (
                <div key={sceneCard.sceneTitle} className="p-[5px] lg:p-0">
                  <SceneCard index={index} isDefault={true} scene={sceneCard} />
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
