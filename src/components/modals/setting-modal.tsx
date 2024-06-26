"use client";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { targetLanguageSetting } from "Database/langaugeSetting";
import { nativeLanguageSetting } from "Database/langaugeSetting";
import { proficiencyLevelSetting } from "Database/langaugeSetting";
import { goalSetting } from "Database/langaugeSetting";
import VoiceLoadSpiner from "../loader/voice-load-spinner";
import { updateLanguageSettings } from "~/server/action";
import { toast } from "sonner";
import { ErrorInterface } from "model";
import { useSession } from "next-auth/react";
import { CustomSession } from "model";
import { useRouter } from "next/navigation";
export default function SettingModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const session =(useSession() as unknown) as CustomSession;
  const [loading, setLoading] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState("");
  const [nativeLanguage, setNativeLanguage] = useState("");
  const [goal, setGoal] = useState("");
  const [proficiencyLevel, setProficiencyLevel] = useState("");
  const router = useRouter();
  
  useEffect(() => {
    console.log(session?.data?.user);
    setTargetLanguage(session?.data?.user?.targetLanguageSetting ?? "");
    setNativeLanguage(session?.data?.user?.nativeLanguageSetting ?? "");
    setGoal(session?.data?.user?.goal ?? "");
    setProficiencyLevel(session?.data?.user?.proficiencyLevelSetting ?? "")
  }, [session.status]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (
        targetLanguage.trim() === "" ||
        nativeLanguage.trim() == "" ||
        goal.trim() === "" ||
        proficiencyLevel.trim() === ""
      ) {
        throw new Error("Please details");
      }

      const res = await updateLanguageSettings(
        targetLanguage,
        nativeLanguage,
        goal,
        proficiencyLevel,
      );
      if (!res.data) {
        throw new Error(res.error);
      }
      router.refresh();
      toast.success("successfully updated language setting!");
    } catch (error) {
      const Error: ErrorInterface = {
        message: (error as Error).message || "Internal Server Error",
      };
      toast.error(Error.message);
      console.error("Error while creating scene:", error);
    } finally {
      setOpen(false);
      setLoading(false);
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
                    Language Settings
                  </Dialog.Title>
                  <div className="flex flex-col gap-2">
                    <div>
                      <label
                        htmlFor="Target Language"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Target Language
                      </label>

                      <select
                        id="targetLanguage"
                        name="targetLanguage"
                        className="mt-2 w-[100%] rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) => {
                          setTargetLanguage(e.target.value);
                        }}
                        value={targetLanguage}
                      >
                        {targetLanguageSetting.map((languageOption) => (
                          <option
                            key={languageOption.language}
                            value={languageOption.code}
                          >
                            {languageOption.language}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="Target Language"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Native Language
                      </label>
                      <select
                        id="native"
                        name="targetLanguage"
                        className="mt-2 w-[100%] rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) => {
                          setNativeLanguage(e.target.value);
                        }}
                        value={nativeLanguage}

                      >
                        {nativeLanguageSetting.map((languageOption) => (
                          <option
                            key={languageOption.language}
                            value={languageOption.code}
                          >
                            {languageOption.language}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="Target Language"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Goal of Language Learning
                      </label>
                      <select
                        id="targetLanguage"
                        name="targetLanguage"
                        className="mt-2 w-[100%] rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) => {
                          setGoal(e.target.value);
                        }}
                        value={goal}

                      >
                        {goalSetting.map((languageOption) => (
                          <option
                            key={languageOption.goal}
                            value={languageOption.goal}
                          >
                            {languageOption.goal} {languageOption.icon}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="Target Language"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Level of Proficiency
                      </label>
                      <select
                        id="targetLanguage"
                        name="targetLanguage"
                        className="mt-2 w-[100%] rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(e) => {
                          setProficiencyLevel(e.target.value);
                        }}
                        value={proficiencyLevel}
                      >
                        {proficiencyLevelSetting.map((languageOption) => (
                          <option
                            key={languageOption.level}
                            value={languageOption.level}
                          >
                            {languageOption.level} {languageOption.icon}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={handleSubmit}
                  >
                    {loading ? <VoiceLoadSpiner /> : "Save changes"}
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
