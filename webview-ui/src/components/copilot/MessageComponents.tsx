import React from 'react';
import { UserMessage, CopilotMessage } from '@fluentui-copilot/react-copilot-chat';
import { Message } from './ChatComponent';
import { useUserMessageState, useCopilotMessageState } from './hooks';
import useChatStyles from './ChatStyles';

export const UserMessageComponent: React.FC<{ message: Message }> = ({ message }) => {
  const userMessageState = useUserMessageState();
  const styles = useChatStyles();

  return (
    <UserMessage {...userMessageState} className={`${styles.message} ${styles.userMessage}`}>
      <div>{message.content}</div>
    </UserMessage>
  );
};

export const CopilotMessageComponent: React.FC<{ message: Message }> = ({ message }) => {
  const copilotMessageState = useCopilotMessageState();
  const styles = useChatStyles();

  return (
    <CopilotMessage {...copilotMessageState} className={`${styles.message} ${styles.copilotMessage}`}>
      <div>{message.content}</div>
    </CopilotMessage>
  );
};
