"use client";
import { useState } from "react";
import React from "react";
import CreateCharacterModal from "./create-character-modal";

function CreateCharacterModalButton() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setOpen(true);
        }}
        className="block rounded-md bg-gray-800 px-4 py-2 text-sm text-white"
      >
        Create Custom Character
      </button>
      <CreateCharacterModal open={open} setOpen={setOpen} />
    </div>
  );
}

export default CreateCharacterModalButton;
