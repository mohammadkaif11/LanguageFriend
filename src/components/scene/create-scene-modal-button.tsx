"use client";
import { useState } from "react";
import React from "react";
import CreateSceneModal from "./create-scene-modal";

function CreateSceneModalButton() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setOpen(true);
        }}
        className="block rounded-md bg-yellow-500 px-4 py-2 text-sm font-bold text-gray-900"
      >
        Create Custom scene
      </button>
      <CreateSceneModal open={open} setOpen={setOpen} />
    </div>
  );
}

export default CreateSceneModalButton;
