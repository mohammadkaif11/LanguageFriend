"use client";
import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Character } from "@prisma/client";
import { updateCharacter } from "~/server/action";
import VoiceLoadSpiner from "../loader/voice-load-spinner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ErrorInterface } from "model";

export default function EditCharacterModal({
  open,
  setOpen,
  character
}: {
  character?: Character;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null | undefined>(null);
  const [loading, setloading] = useState(false);
  const [sceneImageUrl, setSceneImageUrl] = useState<string | null>(null);
  const [characterId, setCharcterId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setName(character?.name ?? "");
    setCharcterId(character?.id ?? null);
    setDescription(character?.description ?? "");
  }, []);

  const handleEdit = async () => {
    try {
      setloading(true);
      if (!name || !description) {
        throw new Error("Please fill in all required fields");
      }
      if (!characterId) {
        throw new Error("Character ID must be provided");
      }
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
    
      if (image) {
        formData.append("image", image);
      }

      const res = await updateCharacter(formData, characterId);
      if (!res.data) {
        throw new Error(res.error);
      }
      router.refresh();
      toast.success("successfully updated character!");
    } catch (error: unknown) {
      const Error: ErrorInterface = {
        message: (error as Error).message || "Internal Server Error",
      };
      toast.error(Error.message);
      console.error("Error while updating character:", error);
    } finally {
      setloading(false);
      setOpen(false);
    }
  };

  const handleUpload = (file: File | null | undefined) => {
    if (file) {
      if (file.size / 1024 / 1024 > 50) {
        toast.error("File size too big (max 50MB)");
      } else if (
        !file.type.includes("png") &&
        !file.type.includes("jpg") &&
        !file.type.includes("jpeg")
      ) {
        toast.error("Invalid file type (must be .png, .jpg, or .jpeg)");
      } else {
        const reader = new FileReader();
        setImage(file);
        reader.onload = (e) => {
          setSceneImageUrl(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 flex flex-col gap-x-2 gap-y-2">
                  <Dialog.Title
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    Create a custom scene
                  </Dialog.Title>
                  <div className="flex flex-col gap-2">
                  <div className="mx-auto">
                      {character?.imageUrl && sceneImageUrl === null && (
                        <img
                          className="mb-3 h-24 w-24 rounded-full shadow-lg"
                          src={character?.imageUrl}
                          alt="Bonnie image"
                        />
                      )}
                      {sceneImageUrl && (
                        <img
                          className="mb-3 h-24 w-24 rounded-full shadow-lg"
                          src={sceneImageUrl}
                          alt="Bonnie image"
                        />
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="Title"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Chracter Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-2 w-[100%] rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="Description"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Describe something about character
                      </label>
                      <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-2 w-[100%] rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="Images"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Scene Image
                      </label>
                      <input
                        type="file"
                        onChange={(e) => {
                          const file = e.currentTarget.files?.[0];
                          handleUpload(file);
                        }}
                        className="mt-2 w-[100%] rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={handleEdit}
                  >
                    {loading ? <VoiceLoadSpiner></VoiceLoadSpiner> : "Save changes"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
