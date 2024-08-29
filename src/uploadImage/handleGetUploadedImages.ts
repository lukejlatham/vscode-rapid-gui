import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

export async function handleGetUploadedImages(context: vscode.ExtensionContext): Promise<string[]> {
  const currentFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;

  if (!currentFolder) {
    vscode.window.showErrorMessage("No workspace folder is open");
    return [];
  }

  const directory = path.join(currentFolder, "uploaded_images");
  // Check if the directory exists
  if (!fs.existsSync(directory)) {
    return [];
  }

  try {
    // Read the directory and filter out image files
    const files = await fs.promises.readdir(directory);
    const imageFiles = files.filter((file) => /\.(jpg|jpeg|png|gif|bmp|svg)$/i.test(file));

    // Return the absolute paths of the image files
    const imagePaths = imageFiles.map((file) => path.join(directory, file));
    return imagePaths;
  } catch (err) {
    console.error("Error reading uploaded images folder", err);
    vscode.window.showErrorMessage("Failed to retrieve uploaded images");
    return [];
  }
}
