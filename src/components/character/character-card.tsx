/* eslint-disable @next/next/no-img-element */
// 'use client'
// import React, { useState } from "react";

// function CharacterCard({index}:{index:number}) {
//   const [isDropdownOpen, setDropdownOpen] = useState(false);

//   const toggleDropdown = () => {
//     setDropdownOpen(!isDropdownOpen);
//   };
//   return (
//     <div className="w-full lg:max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-600">
//       <div className="flex  justify-end px-4 pt-4">
//         <button
//           id={"dropdownButton"+index}
//           onClick={toggleDropdown}

//           data-dropdown-toggle={"dropdown"+index}
//           className="inline-block rounded-lg p-1.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
//           type="button"
//         >
//           <span className="sr-only">Open dropdown</span>
//           <svg
//             className="h-5 w-5"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="currentColor"
//             viewBox="0 0 16 3"
//           >
//             <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
//           </svg>
//         </button>
//         <div
//           id={"dropdown"+index}
//           className={`z-10 ${isDropdownOpen ? "" : "hidden"} w-44 list-none divide-y divide-gray-100 rounded-lg bg-white text-base shadow dark:bg-gray-700`}        >
//           <ul className="py-2" aria-labelledby={"dropdownButton"+index}>
//             <li>
//               <a
//                 href="#"
//                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
//               >
//                 Edit
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#"
//                 className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
//               >
//                 Delete
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>
//       <div className="flex flex-col items-center pb-10">
//         <img
//           className="mb-3 h-24 w-24 rounded-full shadow-lg"
//           src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
//           alt="Bonnie image"
//         />
//         <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
//           Bonnie Green
//         </h5>
//         <span className="text-sm text-gray-500 dark:text-gray-400">
//           Visual Designer
//         </span>
//         <div className="mt-4 flex md:mt-6">
//           <button

//             className="inline-flex items-center rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//           >
//             Start Chat
//           </button>

//         </div>
//       </div>
//     </div>
//   );
// }

// export default CharacterCard;

"use client";
import React, { useState } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Bars4Icon } from "@heroicons/react/16/solid";
import EditCharacterModal from "./edit-character-modal";
import DeleteCharacterModal from "./delete-character-modal";
import { Character } from "@prisma/client";

function CharacterCard({
  index,
  isDefault,
  character,
}: {
  index: number;
  isDefault: boolean;
  character?: Character;
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
      <div className="relative min-w-[300px] mt-6 flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md ">
        <div className="p-6">
          <div className="flex justify-between">
            <img
              className="mb-3 h-24 w-24 rounded-full shadow-lg"
              src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
              alt="Bonnie image"
            />
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
      <EditCharacterModal open={isEditOpen} setOpen={setIsEditOpen} character={character} />
      <DeleteCharacterModal open={isDeleteOpen} setOpen={setIsDeleteOpen} characterId={character?.id} />
    </>
  );
}

export default CharacterCard;
