/* eslint-disable @next/next/no-img-element */
"use client";
import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { type Scene } from "@prisma/client";
import { toast } from "sonner";
import VoiceLoadSpiner from "../loader/voice-load-spinner";
import { type ErrorInterface } from "model";
import { updateScene } from "~/server/action";
import { useRouter } from "next/navigation";

export default function EditSceneModal({
  open,
  setOpen,
  scene,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  scene?: Scene;
}) {
  const [loading, setloading] = useState(false);
  const [sceneId, setSceneId] = useState("");
  const [sceneTitle, setSceneTitle] = useState("");
  const [sceneDescription, setSceneDescription] = useState("");
  const [botRole, setBotRole] = useState("");
  const [yourRole, setYourRole] = useState("");
  const [sceneImage, setSceneImage] = useState<File | null | undefined>(null);
  const [sceneImageUrl, setSceneImageUrl] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setSceneTitle(scene?.sceneTitle ?? "");
    setSceneDescription(scene?.sceneDescription ?? "");
    setBotRole(scene?.botRole ?? "");
    setYourRole(scene?.yourRole ?? "");
    setSceneId(scene?.id ?? "");
  }, []);

  const handleEdit = async () => {
    try {
      setloading(true);
      if (!sceneTitle || !sceneDescription || !botRole || !yourRole) {
        throw new Error("Please fill in all required fields");
      }
      if (!sceneId) {
        throw new Error("Scene ID must be provided");
      }
      const formData = new FormData();
      formData.append("sceneTitle", sceneTitle);
      formData.append("sceneDescription", sceneDescription);
      formData.append("botRole", botRole);
      formData.append("yourRole", yourRole);
    
      if (sceneImage) {
        formData.append("sceneImage", sceneImage);
      }

      const res = await updateScene(formData, sceneId);
      if (!res.data) {
        throw new Error(res.error);
      }
      router.refresh();
      toast.success("successfully updated scene!");
    } catch (error: unknown) {
      const Error: ErrorInterface = {
        message: (error as Error).message || "Internal Server Error",
      };
      toast.error(Error.message);
      console.error("Error while updating scene:", error);
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
        setSceneImage(file);
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
                    Edit a scene
                  </Dialog.Title>
                  <div className="flex flex-col gap-2">
                    <div className="mx-auto">
                      {scene?.sceneImage && sceneImageUrl === null && (
                        <img
                          className="mb-3 h-24 w-24 rounded-full shadow-lg"
                          src={scene?.sceneImage}
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
                        Scene Title
                      </label>
                      <input
                        type="text"
                        value={sceneTitle}
                        onChange={(e) => setSceneTitle(e.target.value)}
                        className="mt-2 w-[100%] rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="Description"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Scene Description
                      </label>
                      <input
                        type="text"
                        value={sceneDescription}
                        onChange={(e) => setSceneDescription(e.target.value)}
                        className="mt-2 w-[100%] rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="SceneTitle"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Bot Role
                      </label>
                      <input
                        type="text"
                        value={botRole}
                        onChange={(e) => setBotRole(e.target.value)}
                        className="mt-2 w-[100%] rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="SceneTitle"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Your Role
                      </label>
                      <input
                        type="text"
                        value={yourRole}
                        onChange={(e) => setYourRole(e.target.value)}
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
                    {loading ? <VoiceLoadSpiner /> : "Save Changes"}
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
