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

export type Message = {
  role: "system" | "user" | "assistant" | "loading";
  content: string;
};

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const chatRef = useRef<HTMLDivElement>(null);
  const styles = useChatStyles();
  const { query } = useEditor();

  const chatProps: CopilotChatProps = {};
  const chatState: CopilotChatState = useCopilotChat_unstable(chatProps, chatRef);

  const serializedData = query.serialize();

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const userMessage: Message = { role: "user", content: newMessage };
      const loadingMessage: Message = { role: "loading", content: "Loading..." };

      setMessages((prevMessages) => [...prevMessages, userMessage, loadingMessage]);

      const messagesToSend = [...messages, userMessage].filter((msg) => msg.role !== "loading");

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
          const updatedMessages = prevMessages.filter((msg) => msg.role !== "loading");
          const copilotMessage: Message = { role: "assistant", content: message.content };

          return [...updatedMessages, copilotMessage];
        });
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [messages]);

  return (
    <div className={styles.chatContainer}>
      <CopilotChat {...chatState} ref={chatRef} className={styles.messageList}>
        {messages.map((message, index) => {
          if (message.role === "user") {
            return <UserMessageComponent key={index} message={message} />;
          } else if (message.role === "assistant" || message.role === "loading") {
            return <CopilotMessageComponent key={index} message={message} />;
          }
        })}
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
