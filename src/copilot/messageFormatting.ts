import { ChatMessage } from "./index";

function formatMessages(conversationHistory: string): ChatMessage[] {
  const systemPrompt =
    "You are a very knowledgeable ui designer who is helping a user refine their project. Keep your responses to less than 50 words.";

  let parsedConversationHistory: ChatMessage[];

  try {
    parsedConversationHistory = JSON.parse(conversationHistory);
    if (!Array.isArray(parsedConversationHistory)) {
      throw new Error("Parsed conversation history is not an array");
    }
  } catch (error) {
    throw new Error("Invalid conversation history format ");
  }

  parsedConversationHistory.unshift({
    role: "system",
    content: systemPrompt,
  });

  return parsedConversationHistory;
}

export { formatMessages };
