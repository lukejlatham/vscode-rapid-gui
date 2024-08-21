import { useRef } from 'react';
import {
  useUserMessage_unstable,
  useCopilotMessage_unstable,
  UserMessageProps,
  CopilotMessageProps,
  UserMessageState,
  CopilotMessageState,
} from '@fluentui-copilot/react-copilot-chat';

export const useUserMessageState = (): UserMessageState => {
  const userMessageRef = useRef<HTMLDivElement>(null);
  return useUserMessage_unstable({} as UserMessageProps, userMessageRef);
};

export const useCopilotMessageState = (): CopilotMessageState => {
  const copilotMessageRef = useRef<HTMLDivElement>(null);
  return useCopilotMessage_unstable({} as CopilotMessageProps, copilotMessageRef);
};
