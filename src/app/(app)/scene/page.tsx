import React from "react";
import CreateSceneModalButton from "~/components/scene/create-scene-modal-button";
import SceneCard from "~/components/scene/scene-card";
import scene from "~/secene.json";
function page() {
  return (
    <>
      <div className="mx-auto my-2  max-w-7xl">
        <div className="my-3">
          <CreateSceneModalButton />
        </div>
        <div className=" grid  gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {scene.map((sceneCard,index) => {
            return (
              <div key={sceneCard.sceneTitle} className="p-[5px] lg:p-0">
                <SceneCard index={index} isDefault={true}/>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default page;
