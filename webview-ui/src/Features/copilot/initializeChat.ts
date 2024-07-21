import { convertToSimplifiedVersion } from "./getUiLayout";

type ChatMessage = {
  role: "user" | "assistant" | "tool" | "system";
  tool_call_id?: string;
  content: string;
};

const initializeChat = (query: any): ChatMessage[] => {
  const serializedData = query.serialize();
  const fullNodes = JSON.parse(serializedData);
  const simplifiedNodes = convertToSimplifiedVersion(fullNodes);
  const uiLayout = JSON.stringify(simplifiedNodes, null, 2);

  const baseSystemMessage: ChatMessage[] = [
    {
      role: "system",
      content: `You are a very knowledgeable UI designer who is helping a user refine their project. Keep your responses to less than 50 words.\n\n The user's current layout expressed as a JSON tree is: ${uiLayout}`,
    },
  ];

  return baseSystemMessage;
};

export default initializeChat;
