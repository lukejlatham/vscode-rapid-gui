import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

export async function handleImageUpload(
  base64Image: string,
  filename: string,
  context: vscode.ExtensionContext
): Promise<string> {
  const currentFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;

  if (!currentFolder) {
    vscode.window.showErrorMessage("No workspace folder is open");
    return "";
  }

  // Ensure the directory exists
  const directory = path.join(currentFolder, "uploaded_images");
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  // Convert base64 to binary buffer
  vscode.window.showInformationMessage("Saving image file");
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");

  const filePath = path.join(directory, filename);

  try {
    await fs.promises.writeFile(filePath, buffer);
    console.log("Image file has been saved at", filePath);
    return filePath; // Return the file path
  } catch (err) {
    console.error("Error saving image", err);
    vscode.window.showErrorMessage("Failed to save image file");
    return "";
  }
}
