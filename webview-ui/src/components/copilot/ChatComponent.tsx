import React, { useState, useRef, useEffect, useCallback } from "react";
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
import { convertToSimplifiedVersion } from "./getUiLayout";

type ChatMessage = {
  role: "user" | "assistant" | "tool" | "system";
  tool_call_id?: string;
  content: string;
};

const ChatComponent: React.FC = () => {
  const { query } = useEditor();

  const serializedData = query.serialize();

  const fullNodes = JSON.parse(serializedData);

  console.log("IN CHAT COMPONENT: Full nodes", fullNodes);

  const simplifiedNodes = convertToSimplifiedVersion(fullNodes);

  console.log("IN CHAT COMPONENT: Simplified nodes", simplifiedNodes);
  
  // TODO: currently the baseSystemMessage is sent an empty {} object as the uiLayout, instead of the actual layout when the chat is opened.
  const uiLayout = JSON.stringify(simplifiedNodes, null, 2);

  console.log("IN CHAT COMPONENT: UI Layout", uiLayout);

  const baseSystemMessage: ChatMessage[] = [{ role: "system", content: `You are a very knowledgeable ui designer who is helping a user refine their project. Keep your responses to less than 50 words.\n\n The user's current layout expressed as a JSON tree is: ${uiLayout}` }];

  const [messages, setMessages] = useState<ChatMessage[]>(baseSystemMessage);
  const [newMessage, setNewMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toolCallMessage, setToolCallMessage] = useState<string | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const styles = useChatStyles();

  const chatProps: CopilotChatProps = {};
  const chatState: CopilotChatState = useCopilotChat_unstable(chatProps, chatRef);


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

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data;

      if (message.command === "aiCopilotMessage") {
        setMessages((prevMessages) => JSON.parse(message.content));
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

  const renderMessage = useCallback((message: ChatMessage, index: number) => {
    switch (message.role) {
      case "user":
        return <UserMessageComponent key={index} message={message} />;
      case "assistant":
        return <CopilotMessageComponent key={index} message={message} />;
      case "tool":
        return <CopilotMessageComponent key={index} message={message} />;
      default:
        return null;
    }
  }, []);

  return (
    <div className={styles.chatContainer}>
      <CopilotChat {...chatState} ref={chatRef} className={styles.messageList}>
        {messages.map(renderMessage)}
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
