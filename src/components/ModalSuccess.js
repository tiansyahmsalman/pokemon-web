import React, { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function ModalSucces() {
    return (
        <Transition appear show={modalSuccess} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 mx-5 md:mx-0 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  YESSSS
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-black">
                    {data.pokemon.name} was caught!
                  </p>
                </div>
                <div className="w-full md:mb-0">
                  <div className="relative">
                    <div className="flex justify-center items-center">
                      <img
                        src={data.pokemon.sprites.front_default}
                        className="w-3/4"
                        alt=""
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex border-b-2 border-gray-500">
                    <label className="self-center text-gray-600">Name:</label>
                    <input
                      className="w-full py-1 pl-2 border-0 focus:outline-none"
                      type="text"
                      onChange={(e) => {
                        chamgeName(e.target.value);
                      }}
                      required
                    />
                  </div>
                  {dialogEmpty ? (
                    <p className="text-xs text-red-500 mt-1">{dialogEmpty}</p>
                  ) : (
                    ""
                  )}
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 mx-1 text-sm font-medium text-yellow-900 bg-yellow-200 border border-transparent rounded-md hover:bg-yellow-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={() => {
                      savePokemon(data.pokemon);
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    )
}