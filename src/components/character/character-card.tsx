"use client";
import React, { useState } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Bars4Icon } from "@heroicons/react/16/solid";
import EditCharacterModal from "./edit-character-modal";
import DeleteCharacterModal from "./delete-character-modal";
import { type Character } from "@prisma/client";
import { useRouter } from "next/navigation";
import { uid } from "uid";

function CharacterCard({
  index,
  isDefault,
  name,
  description,
  image,
  character,
}: {
  index: number;
  isDefault: boolean;
  character?: Character;
  name: string;
  description: string;
  image: string;
}) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const router = useRouter();

  const handleOpenEditModal = () => {
    setIsEditOpen(true);
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteOpen(true);
  };

  const handleLearningChat = () => {
    const id = uid();
    router.push(`/learning-chat/${id}`);
  };

  const handlePracticeChat = () => {
    const id = uid();
    router.push(`/practice-chat/${id}`);
  };

  return (
    <>
      <div className="relative mt-6 flex h-[350px] max-w-[500px]  flex-col rounded-xl bg-yellow-100 bg-clip-border text-gray-700 shadow-md">
        <div className="flex flex-col  my-auto p-4">
          {!isDefault && (
            <Menu
              as="div"
              className="relative float-end inline-block text-left"
            >
              <div>
                <Menu.Button>
                  <Bars4Icon className="mb-4 h-6 w-6 text-gray-900" />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0  z-10  w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      <button
                        className="block px-4 py-2 text-sm text-gray-700"
                        onClick={handleOpenEditModal}
                      >
                        Edit
                      </button>
                    </Menu.Item>
                    <Menu.Item>
                      <button
                        className="block px-4 py-2 text-sm text-gray-700"
                        onClick={handleOpenDeleteModal}
                      >
                        Delete
                      </button>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          )}
          <div>
            <img
              className="float-left m-2 h-24 w-24  rounded-full"
              src={image}
              alt=""
            />
            <h5 className="text-blue-gray-900 mb-2 block font-sans text-lg font-semibold leading-snug tracking-normal antialiased">
              {name}
            </h5>
            <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
              {description}
            </p>
          </div>
          <div className="flex gap-2 pr-2 pt-2">
            <button
              onClick={handlePracticeChat}
              className="flex select-none items-center gap-2 rounded-lg bg-yellow-500 px-4 py-2 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:bg-yellow-300 active:bg-yellow-300 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              Practice Language
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                ></path>
              </svg>
            </button>
            <button
              onClick={handleLearningChat}
              className="flex select-none items-center gap-2 rounded-lg bg-yellow-500 px-4 py-2 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:bg-yellow-300 active:bg-yellow-300 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
              type="button"
            >
              Learn Language
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {!isDefault && (
        <>
          {" "}
          <EditCharacterModal
            open={isEditOpen}
            setOpen={setIsEditOpen}
            character={character}
          />
          <DeleteCharacterModal
            open={isDeleteOpen}
            setOpen={setIsDeleteOpen}
            characterId={character?.id}
          />
        </>
      )}
    </>
  );
}

export default CharacterCard;
