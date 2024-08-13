# Copilot backend - NOT CURRENTLY USED

This is the backend of an experimental copilot feature that sends a chat history to an Azure OpenAI endpoint. The idea was to send a simplified version of the node tree (possibly just the grid cells and their children) with the user's messages. It would be able to provide design advice and manipulate the simplified layout with tools, which would then be reconstructed in the frontend. 

Some potential areas to explore:
- A tool that applies theming based on user requests - see theming feature.
- A tool that applies consistent UI design principles - font sizing, alignments etc.
- A tool that could rearrange the UI into a mobile friendly format.
- Message history length management.
- Integration with copilot.

## Copilot Flow

1. `ChatComponent.tsx` posts `aiUserMessage` when user message is sent.
   
2. `MainWebViewPanel.ts` receives the message and calls `processCopilotMessages` in `index.ts`.

3. `processCopilotMessages` orchestrates the following:
   - **Message Formatting** (`messageFormatting.ts`): Converts the conversation history string into an array of message objects and adds a system message.
   - **Sending Messages** (`sendMessageToAzure.ts`): Sends formatted messages to Azure OpenAI and returns the raw response. This includes handling function calls - a dummy example is in `toolDescribeLayout.ts`.
  
4. `processCopilotMessages` returns the final message as a string and posts `aiCopilotMessage` to the webview.

5. `ChatComponent.tsx` replaces its loading message with the response and adds it to the message history.
