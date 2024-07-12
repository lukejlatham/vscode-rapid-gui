import { vscode } from "../../utilities/vscode";

// handleUploadLogic.ts
export function encodeImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1]; // Remove the data URL prefix
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function handleSketchUpload(file: File): Promise<void> {
  try {
    const base64Image = await encodeImage(file);
    // vscode.postMessage({
    //   command: "processSketchLayout",
    //   content: base64Image,
    // });
    console.log("Sketch uploaded successfully");
    console.log("Base64 image:", base64Image);
  } catch (error) {
    console.error("Error processing sketch upload:", error);
  }
}
