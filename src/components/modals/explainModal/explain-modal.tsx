"use client";
import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import VoiceLoadSpiner from "../../loader/voice-load-spinner";
import { explainOutput } from "~/server/chatGPT/gptHelper";
export const maxDuration = 300;

interface ExplainOutPutResponse {
  word: string;
  explanation: string;
}

export default function ExplainModal({
  open,
  setOpen,
  text,
}: {
  open: boolean;
  text: string | null;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [explainOutputResponse, setExplainOutputResponse] = useState<
    ExplainOutPutResponse[]
  >([]);

  useEffect(() => {
    if (text != null && open) {
      void getOutputResponse(text);
    }
  }, [open]);

  const getOutputResponse = async (text: string) => {
    try {
      const data = await explainOutput(text);
      setExplainOutputResponse(JSON.parse(data) as ExplainOutPutResponse[]);
    } catch (error) {
      console.error(error);
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
                <div className="absolute right-0 top-0  pr-4 pt-4 block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => setOpen(false)}
                  >
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 flex flex-col gap-x-2 gap-y-2">
                  <Dialog.Title
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    Explaination
                  </Dialog.Title>
                  <div className="flex flex-col gap-2">
                    {explainOutputResponse.length === 0 ? (
                      <div className="flex justify-center">
                        <VoiceLoadSpiner />
                      </div>
                    ) : (
                      explainOutputResponse && (
                        <div className="relative overflow-x-auto">
                          <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                              <tr>
                                <th scope="col" className="px-6 py-3">
                                  Word
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Explanation
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Play
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {explainOutputResponse?.map(
                                (explainOutput, index) => (
                                  <tr
                                    className="bg-white dark:bg-gray-800"
                                    key={index}
                                  >
                                    <td className="px-6 py-4">
                                      {explainOutput.word}
                                    </td>
                                    <td className="px-6 py-4">
                                      {explainOutput.explanation}
                                    </td>
                                    <td className="px-6 py-4">Play</td>
                                  </tr>
                                ),
                              )}
                            </tbody>
                          </table>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
