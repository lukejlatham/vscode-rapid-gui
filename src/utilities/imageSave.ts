import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export async function handleImageUpload(base64Image: string, filename: string, context: vscode.ExtensionContext): Promise<string> {
  const currentFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;

  if (!currentFolder) {
    vscode.window.showErrorMessage("No workspace folder is open");
    return;
  }

  // Convert base64 to binary buffer
  vscode.window.showInformationMessage("Saving image file");
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, 'base64');

  const filePath = path.join(currentFolder, filename);

  try {
    await fs.promises.writeFile(filePath, buffer);
    console.log("Image file has been saved at", filePath);
    return filePath;
  } catch (err) {
    console.error("Error saving image", err);
    vscode.window.showErrorMessage("Failed to save image file");
    return '';
  }
}
