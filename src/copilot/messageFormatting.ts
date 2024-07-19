import { ChatMessage } from "./index";

function formatMessages(conversationHistory: string): ChatMessage[] {
  let parsedConversationHistory: ChatMessage[];

  try {
    parsedConversationHistory = JSON.parse(conversationHistory);
    if (!Array.isArray(parsedConversationHistory)) {
      throw new Error("Parsed conversation history is not an array");
    }
  } catch (error) {
    throw new Error("Invalid conversation history format ");
  }

  return parsedConversationHistory;
}

export { formatMessages };
