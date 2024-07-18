type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

export function formatMessages(conversationHistory: string): Message[] {
  let parsedConversationHistory: Message[];
  try {
    parsedConversationHistory = JSON.parse(conversationHistory);
    if (!Array.isArray(parsedConversationHistory)) {
      throw new Error("Parsed conversation history is not an array");
    }
  } catch (error) {
    throw new Error("Invalid conversation history format: " + error.message);
  }

  // Add the system message at the start of the conversation history
  parsedConversationHistory.unshift({
    role: "system",
    content: "You are a helpful assistant.",
  });

  return parsedConversationHistory;
}
