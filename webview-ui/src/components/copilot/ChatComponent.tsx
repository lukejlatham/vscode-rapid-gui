import React, { useState, useRef, useEffect } from "react";
import {
  CopilotChat,
  CopilotChatProps,
  CopilotChatState,
  useCopilotChat_unstable,
} from "@fluentui-copilot/react-copilot-chat";
import { Send24Regular } from "@fluentui/react-icons";
import { Button, Input } from "@fluentui/react-components";
import { UserMessageComponent, CopilotMessageComponent } from "./MessageComponents";
import useChatStyles from "./ChatStyles";
import { vscode } from "../../utilities/vscode";
import { useEditor } from "@craftjs/core";

type ChatMessage = {
  role: "user" | "assistant" | "tool" | "system";
  tool_call_id?: string;
  content: string;
};

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toolCallMessage, setToolCallMessage] = useState<string | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const styles = useChatStyles();
  const { query } = useEditor();

  const chatProps: CopilotChatProps = {};
  const chatState: CopilotChatState = useCopilotChat_unstable(chatProps, chatRef);

  const serializedData = query.serialize();

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const userMessage: ChatMessage = { role: "user", content: newMessage };

      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setIsLoading(true);

      const messagesToSend = [...messages, userMessage];

      vscode.postMessage({
        command: "aiUserMessage",
        content: JSON.stringify(messagesToSend),
      });

      setNewMessage("");
    }
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data;

      if (message.command === "aiCopilotMessage") {
        setMessages((prevMessages) => {
          const updatedMessages: ChatMessage[] = JSON.parse(message.content);
          return updatedMessages;
        });
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
  }, []);

  return (
    <div className={styles.chatContainer}>
      <CopilotChat {...chatState} ref={chatRef} className={styles.messageList}>
        {messages.map((message, index) => {
          if (message.role === "user") {
            return <UserMessageComponent key={index} message={message} />;
          } else if (message.role === "assistant") {
            return <CopilotMessageComponent key={index} message={message} />;
          } else if (message.role === "tool") {
            return <div key={index}>{message.content}</div>;
          }
        })}
        {toolCallMessage && <div>{toolCallMessage}</div>}
        {isLoading && <div>Loading...</div>}
      </CopilotChat>
      <div className={styles.inputContainer}>
        <Input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className={styles.input}
        />
        <Button onClick={handleSendMessage} appearance="outline" icon={<Send24Regular />}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatComponent;
export type { ChatMessage };
