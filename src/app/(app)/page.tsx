import scene from "~/secene.json";
import SceneCard from "~/components/scene/scene-card";
import { getServerAuthSession } from "~/server/auth";
import Chat from "~/components/start-chat/Chat";
import { redirect } from "next/navigation";
import BasisChat from "~/components/start-chat/BasisChat";
import homeCard from "~/homeCard.json";
import { Scene } from "@prisma/client";

export default async function HomePage() {
  const sessions = await getServerAuthSession();

  if (!sessions?.user?.id) {
    redirect("/login");
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-4 p-4 md:flex-row">
        <div>
          <div className="mt-2">
            <span className="inline-block  bg-yellow-100 p-2 text-2xl  font-bold text-yellow-500">
              Chat Globally with Language Friend
            </span>
          </div>
          <Chat
            title={homeCard[1]?.title ?? ""}
            description={homeCard[1]?.description ?? ""}
          />
        </div>
        <div>
          <div className="mt-2">
            <span className="inline-block  bg-yellow-100 p-2 text-2xl  font-bold text-yellow-500">
              Practice and Learn with Language Friend
            </span>
          </div>
          <BasisChat
            title={homeCard[0]?.title ?? ""}
            description={homeCard[0]?.description ?? ""}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <div className="mt-2">
          <span className="inline-block  bg-yellow-100 p-2 text-2xl  font-bold text-yellow-500">
            Scene-Based Learning with Language Friend
          </span>
        </div>
        <div
          className="flex gap-4 overflow-x-scroll "
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {scene.map((sceneCard, index) => {
            if (index <= 5) {
              return (
                <div key={sceneCard.sceneTitle} className="p-[5px] lg:p-0">
                  <SceneCard index={index} isDefault={true} scene={sceneCard} />
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
