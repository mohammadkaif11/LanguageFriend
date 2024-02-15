"use client";
import { ArrowLongRightIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import React from "react";
import ExplainModal from "./explain-modal";

function ExplainModalButton({text}:{text:string| null}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <ArrowLongRightIcon
        onClick={() => {
          setOpen(true);
        }}
        className="h-10  w-10"
      ></ArrowLongRightIcon>
      <ExplainModal text={text} open={open} setOpen={setOpen} />
    </div>
  );
}

export default ExplainModalButton;
