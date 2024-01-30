import { MessageInterface } from "model";

export const extractContentAndRole = (data: MessageInterface[]) => {
  return data.map(({ role, content }) => ({ role, content }));
};


