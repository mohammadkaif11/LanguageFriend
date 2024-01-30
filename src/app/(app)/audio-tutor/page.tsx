import React from "react";
import ConversationButton from "~/components/Buttons/ConversationButton";
import ListenStory from "~/components/Story/ListenStory";
import ShowTopic from "~/components/Story/ShowTopic";
import ShowWordMeaning from "~/components/Story/ShowWordMeaning";
import TextToSpeech from "~/components/text-speech-js/TextSpeech";

function page() {
  return (
    <div className="flex flex-col gap-2">
      {/* <ShowTopic />
      <ListenStory />
      <ShowWordMeaning />
      <ConversationButton /> */}
      <TextToSpeech/>
    </div>
  );
}

export default page;
