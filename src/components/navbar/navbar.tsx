/* eslint-disable @next/next/no-img-element */
"use client";
import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import SettingModal from "../modals/setting-modal";
import Link from "next/link";
import { PhotoIcon, CurrencyDollarIcon } from "@heroicons/react/16/solid";
import {Cog6ToothIcon,ArrowRightEndOnRectangleIcon} from "@heroicons/react/24/solid";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [settingModalOpen, setSettingModal] = useState(false);
  const { data: session } = useSession();

  return (
    <>
      <Disclosure as="nav" className="bg-yellow-100">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-yellow-500 hover:bg-yellow-100 hover:text-yellow-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center md:justify-between">
                  <div className="flex flex-shrink-0 items-center">
                    <Link href="/">
                      <h4 className="text-2xl font-bold text-yellow-500">
                        <span className="text-4xl">L</span>ANGAUGE
                        <span className="text-4xl">F</span>RIEND
                      </h4>
                    </Link>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    <Link
                      href="/scene"
                      className="group items-center border-b-2 border-transparent px-1 pt-1 text-lg		 font-bold text-yellow-500 transition duration-300"
                    >
                      <span className="flex items-center gap-2">
                        {" "}
                        Scene <PhotoIcon className="h-6 w-6 text-yellow-600" />
                      </span>

                      <span className="block h-0.5 max-w-0 bg-yellow-500 transition-all duration-500 group-hover:max-w-full"></span>
                    </Link>
                    <Link
                      href="/subscription"
                      className="group items-center border-b-2 border-transparent px-1 pt-1 text-lg		 font-bold text-yellow-500 transition duration-300"
                    >
                      <span className="flex items-center gap-2">
                        {" "}
                        Subscription{" "}
                        <CurrencyDollarIcon className="h-6 w-6 text-yellow-600" />
                      </span>

                      <span className="block h-0.5 max-w-0 bg-yellow-500 transition-all duration-500 group-hover:max-w-full"></span>
                    </Link>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-yellow-200 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={
                            session?.user?.image ??
                            `https://avatar.vercel.sh/${session?.user?.image}`
                          }
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-auto origin-top-right rounded-md bg-yellow-100 py-1 shadow-lg ring-1 ring-yellow-200 ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(
                                active ? "bg-pin-200" : "",
                                "flex flex-col px-4 py-2 text-sm text-yellow-900",
                              )}
                            >
                              {session?.user?.name}
                              <span className="text-sm font-bold text-yellow-500">
                                {" "}
                                {session?.user?.email}
                              </span>
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => {
                                setSettingModal(true);
                              }}
                              className={classNames(
                                active ? "bg-yellow-200" : "",
                                "flex flex-col px-4 py-2 text-sm font-bold text-yellow-500",
                              )}
                            >
                               <span className="flex items-center gap-2">
                        {" "}
                        Settings
 <Cog6ToothIcon className="h-6 w-6 text-yellow-600" />
                      </span>

                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => {
                                void signOut();
                              }}
                              className={classNames(
                                active ? "bg-yellow-200" : "",
                                "flex flex-col px-4 py-2 text-sm font-bold text-yellow-500",
                              )}
                            >
                                <span className="flex items-center gap-2">
                        {" "}
                        Sign out
 <ArrowRightEndOnRectangleIcon className="h-6 w-6 text-yellow-600" />
                      </span>
                              
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="flex flex-col space-y-1 pb-4 pt-2">
                {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
                <Disclosure.Button className="border-trasparent border-l-4 py-2 pl-3 pr-4 text-lg	 font-bold text-yellow-500">
                  <Link href="/scene"><span className="flex items-center gap-2">
                        {" "}
                        Scene <PhotoIcon className="h-6 w-6 text-yellow-600" />
                      </span></Link>
                </Disclosure.Button>
                <Disclosure.Button className="border-trasparent  border-l-4  py-2 pl-3 pr-4 text-lg	 font-bold text-yellow-500">
                  <Link href="/subscription"> <span className="flex items-center gap-2">
                        {" "}
                        Subscription{" "}
                        <CurrencyDollarIcon className="h-6 w-6 text-yellow-600" />
                      </span></Link>
                </Disclosure.Button>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <SettingModal
        open={settingModalOpen}
        setOpen={setSettingModal}
      ></SettingModal>
    </>
  );
}
