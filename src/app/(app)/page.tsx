import scene from "~/secene.json";
import CharacterCard from "~/components/character/character-card";
import SceneCard from "~/components/scene/scene-card";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import StartChat from "~/components/start-chat/StartChat";

export default async function HomePage() {
  const sessions = await getServerAuthSession();

  if (!sessions?.user?.id) {
    redirect("/login");
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-2 p-4">
        <h1 className="mt-2 text-3xl text-gray-800">Start Conversation</h1>
       <StartChat/>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h1 className="mt-2 text-3xl text-gray-800">Scene</h1>
        <div
          className="flex gap-4 overflow-x-scroll "
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {scene.map((sceneCard, index) => {
            if (index <= 5) {
              return (
                <div key={sceneCard.sceneTitle} className="p-[5px] lg:p-0">
                  <SceneCard index={index} isDefault={true} />
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h1 className="mt-2 text-3xl text-gray-800">Character</h1>
        <div
          className="flex gap-4 overflow-x-scroll "
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {scene.map((sceneCard, index) => {
            if (index <= 5) {
              return (
                <div key={sceneCard.sceneTitle} className="p-[5px] lg:p-0">
                  <CharacterCard index={index} isDefault={true} />
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}
