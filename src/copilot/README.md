## Copilot Flow

1. `ChatComponent.tsx` posts `aiUserMessage` when user message is sent.
   
2. `MainWebViewPanel.ts` receives the message and calls `processCopilotMessages` in `index.ts`.

3. `processCopilotMessages` orchestrates the following:
   - **Message Formatting** (`messageFormatting.ts`): Converts the conversation history string into an array of message objects and adds a system message.
   - **Sending Messages** (`sendMessageToAzure.ts`): Sends formatted messages to Azure OpenAI and returns the raw response.
   - **Extracting Content** (`extractContent.ts`): Extracts and returns the content from the raw Azure OpenAI response.
  
4. `processCopilotMessages` returns the final message as a string and posts `aiCopilotMessage` to the webview.

5. `ChatComponent.tsx` replaces its loading message with the response and adds it to the message history.
