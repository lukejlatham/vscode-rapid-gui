import { useEffect } from "react";
import { ChatMessage } from "./ChatComponent";

const useChatEventHandlers = (
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setToolCallMessage: React.Dispatch<React.SetStateAction<string | null>>
) => {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data;

      if (message.command === "aiCopilotMessage") {
        setMessages(JSON.parse(message.content));
        setIsLoading(false);
        setToolCallMessage(null);
      }

      if (message.command === "aiCopilotToolCall") {
        setToolCallMessage(message.content);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [setMessages, setIsLoading, setToolCallMessage]);
};

export default useChatEventHandlers;
