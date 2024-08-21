type ChatMessage = {
  role: "user" | "assistant" | "tool" | "system";
  tool_call_id?: string;
  content: string;
};

const initializeChat = (): ChatMessage[] => {
  const baseSystemMessage: ChatMessage[] = [
    {
      role: "system",
      content: `You are a very knowledgeable UI designer who is helping a user refine their project. Keep your responses to less than 50 words.`,
    },
  ];

  return baseSystemMessage;
};

export default initializeChat;
