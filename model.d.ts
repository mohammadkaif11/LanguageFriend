export interface MessageInterface {
  role: "system" | "user" | "assistant";
  content: string;
  voiceUrl: string | null ;
}
