import { useState, useCallback } from "react";
import { vscode } from "../../utilities/vscode";

type ChatMessage = {
  role: "user" | "assistant" | "tool" | "system";
  tool_call_id?: string;
  content: string;
};

const useChatMessages = (initialMessages: ChatMessage[]) => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [newMessage, setNewMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSendMessage = useCallback(() => {
    if (newMessage.trim() !== "") {
      const userMessage: ChatMessage = { role: "user", content: newMessage };

      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setIsLoading(true);

      const messagesToSend = [...messages, userMessage];

      console.log("Sending messages to AI Copilot", messagesToSend);

      vscode.postMessage({
        command: "aiUserMessage",
        content: JSON.stringify(messagesToSend),
      });

      setNewMessage("");
    }
  }, [newMessage, messages]);

  return {
    messages,
    newMessage,
    isLoading,
    setNewMessage,
    handleSendMessage,
    setMessages,
    setIsLoading,
  };
};

export default useChatMessages;
export type { ChatMessage };
