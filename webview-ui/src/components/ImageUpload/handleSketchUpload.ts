import { vscode } from "../../utilities/vscode";

function encodeImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function handleSketchUpload(file: File): Promise<void> {
  try {
    console.log("Uploading sketch:", file);

    const base64ImageString = await encodeImage(file);

    console.log("Encoded image:");

    vscode.postMessage({
      command: "processSketch",
      content: base64ImageString,
    });

    console.log("Posted message to VS Code:");
  } catch (error) {
    console.error("Error processing sketch upload:", error);
  }
}

export { handleSketchUpload };
