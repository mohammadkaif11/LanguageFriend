import React from 'react'
import scene from "~/secene.json";
import CharacterCard from '~/components/character/character-card';
import CreateCharacterModalButton from '~/components/character/create-character-modal-button';
function page() {
  return (
    <>
      <div className="mx-auto my-2  max-w-7xl">
        <div className="my-3">
          <CreateCharacterModalButton />
        </div>
        <div className=" grid  gap-4 sm:grid-cols-1 lg:grid-cols-4">
          {scene.map((sceneCard,index) => {
            return (
              <div key={sceneCard.sceneTitle} className="p-[5px] lg:p-0">
                <CharacterCard index={index}/>
              </div>
            );
          })}
        </div>
      </div>
    </>  )
}

export default page