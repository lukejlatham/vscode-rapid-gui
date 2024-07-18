import React, { useState, useRef } from "react";
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
  type: "user" | "copilot";
  text: string;
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
      setMessages([...messages, { type: "user", text: newMessage }]);

      vscode.postMessage({
        command: "aiMessage",
        content: newMessage,
      });
      setNewMessage("");
    }
  };

  return (
    <div className={styles.chatContainer}>
      <CopilotChat {...chatState} ref={chatRef} className={styles.messageList}>
        {messages.map((message, index) => {
          if (message.type === "user") {
            return <UserMessageComponent key={index} message={message} />;
          } else {
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
