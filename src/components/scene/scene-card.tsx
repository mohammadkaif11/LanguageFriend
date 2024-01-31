"use client";
import React, { useState } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Bars4Icon } from "@heroicons/react/16/solid";
import EditSceneModal from "./edit-scene-modal";
import DeleteSceneModal from "./delete-scene-modal";

function SceneCard({
  index,
  isDefault,
}: {
  index: number;
  isDefault: boolean;
}) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleOpenEditModal = () => {
    setIsEditOpen(true);
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteOpen(true);
  };

  return (
    <>
      <div className="relative mt-6 flex min-w-[300px] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md ">
        <div className="p-6">
          <div className="flex justify-between">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mb-4 h-12 w-12 text-gray-900"
            >
              <path
                fill-rule="evenodd"
                d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
                clip-rule="evenodd"
              ></path>
              <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z"></path>
            </svg>
            {!isDefault && (
              <Menu as="div" className="relative inline-block text-left">
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
          </div>
          <h5 className="text-blue-gray-900 mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal antialiased">
            UI/UX Review Check
          </h5>
          <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
            Because its about motivating the doers. Because Im here to follow my
            dreams and inspire others.
          </p>
        </div>
        <div className="p-6 pt-0">
          <button
            className="flex select-none items-center gap-2 rounded-lg px-4 py-2 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            Start Conversation
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
      <EditSceneModal open={isEditOpen} setOpen={setIsEditOpen} />
      <DeleteSceneModal open={isDeleteOpen} setOpen={setIsDeleteOpen} />
    </>
  );
}

export default SceneCard;
