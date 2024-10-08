import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import { generateImage } from "../generateImage/openaiGenerateImage";

export async function handleImageGenerate(
  alt: string,
  context: vscode.ExtensionContext
): Promise<string> {
  const currentFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;

  if (!currentFolder) {
    vscode.window.showErrorMessage("No workspace folder is open");
    return "";
  }

  const directory = path.join(currentFolder, "uploaded_images");
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  const base64Image = await generateImage(alt, context);

  const sanitizeFilename = (alt: string): string => {
    return alt.replace(/[^a-z0-9]/gi, "_").toLowerCase();
  };

  const filename = `${sanitizeFilename(alt)}.png`;

  vscode.window.showInformationMessage("Saving generated image...");
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");

  const filePath = path.join(directory, filename);

  try {
    await fs.promises.writeFile(filePath, buffer);
    console.log("Generated image has been saved at", filePath);
    return filePath;
  } catch (err) {
    console.error("Error saving generated image", err);
    vscode.window.showErrorMessage("Failed to save generated image");
    return "";
  }
}
