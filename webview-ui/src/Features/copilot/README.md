# Copilot frontend - NOT CURRENTLY USED

This is the frontend of an experimental copilot feature that sends a chat history to an Azure OpenAI endpoint. It consists of a simple chat component that sends a message history to the vscode backend - further details are available there. 

We decided to focus more on the intial AI generation, but many of the same principles could be reused here in future. 

The core idea was to send a simplified version of the node tree (possibly just the grid cells and their children) with the user's messages. It would be able to provide design advice and manipulate the simplified layout with tools, which would then be reconstructed in the frontend. 

Some potential areas to explore:
- A tool that applies theming based on user requests - see theming feature.
- A tool that applies consistent UI design principles - font sizing, alignments etc.
- A tool that could rearrange the UI into a mobile friendly format.
- Message history length management.
- Integration with copilot.
