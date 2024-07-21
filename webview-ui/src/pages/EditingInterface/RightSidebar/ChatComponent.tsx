import React, { useCallback, useRef, useState } from "react";
import {
  CopilotChat,
  CopilotChatProps,
  CopilotChatState,
  useCopilotChat_unstable,
} from "@fluentui-copilot/react-copilot-chat";
import { Send24Regular } from "@fluentui/react-icons";
import { Button, Input } from "@fluentui/react-components";
import { UserMessageComponent, CopilotMessageComponent } from "../../../Features/copilot/MessageComponents";
import useChatStyles from "./ChatStyles";
import { useEditor } from "@craftjs/core";
import useChatMessages, { ChatMessage } from "../../../Features/copilot/useChatMessages";
import useChatEventHandlers from "../../../Features/copilot/useChatEventHandlers";
import initializeChat from "../../../Features/copilot/initializeChat";

const ChatComponent: React.FC = () => {
  const { query } = useEditor();

  const baseSystemMessage = initializeChat(query);

  const {
    messages,
    newMessage,
    isLoading,
    setNewMessage,
    handleSendMessage,
    setMessages,
    setIsLoading,
  } = useChatMessages(baseSystemMessage);
  
  const [toolCallMessage, setToolCallMessage] = useState<string | null>(null);

  useChatEventHandlers(setMessages, setIsLoading, setToolCallMessage);

  const chatRef = useRef<HTMLDivElement>(null);
  const styles = useChatStyles();

  const chatProps: CopilotChatProps = {};
  const chatState: CopilotChatState = useCopilotChat_unstable(chatProps, chatRef);

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
