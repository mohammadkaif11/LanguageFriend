import React from "react";
import ConversationButton from "~/components/Buttons/ConversationButton";
import ShowStory from "~/components/Story/ShowStory";
import ShowTopic from "~/components/Story/ShowTopic";
import ShowWordMeaning from "~/components/Story/ShowWordMeaning";
import {generateTopic,generateStory} from "~/server/utils/generation";

async function page() {
  // const topic =await generateTopic();
  //   console.log('topic', topic);
  // const Story = await generateStory(topic);
  // console.log('story generated',Story);
  return (
    <div className="flex flex-col gap-2">
      <ShowTopic />
      <ShowStory />
      <ShowWordMeaning />
      <ConversationButton />
    </div>
  );
}

export default page;
