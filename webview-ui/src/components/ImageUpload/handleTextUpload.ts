import { vscode } from "../../utilities/vscode";

async function handleTextUpload(textInput: string): Promise<void> {
  try {
    vscode.postMessage({
      command: "ProcessTextDescription",
      content: textInput,
    });
  } catch (error) {
    console.error("Error processing text:", error);
  }
}

export { handleTextUpload };
