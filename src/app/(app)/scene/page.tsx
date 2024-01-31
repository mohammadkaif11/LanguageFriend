import React from "react";
import SceneCard from "~/components/scene/scene-card";
import scene from "~/secene.json";
function page() {
  return (
    <>
      <div className="mx-auto my-2 grid max-w-7xl gap-4 sm:grid-cols-1 lg:grid-cols-4">
        {scene.map((sceneCard) => {
          return (
            <div key={sceneCard.sceneTitle} className="p-[5px] lg:p-0">
              <SceneCard />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default page;
