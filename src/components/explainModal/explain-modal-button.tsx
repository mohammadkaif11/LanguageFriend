"use client";
import { LightBulbIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import React from "react";
import ExplainModal from "./explain-modal";

function ExplainModalButton({
  text,
}: {
  text: string | null;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <LightBulbIcon
        onClick={() => {
          setOpen(true);
        }}
        className="h-6 w-6 "
      ></LightBulbIcon>
      <ExplainModal text={text} open={open} setOpen={setOpen} />
    </>
  );
}

export default ExplainModalButton;
