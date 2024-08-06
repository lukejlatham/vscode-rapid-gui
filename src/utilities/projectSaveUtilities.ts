import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export async function handleFileSave(contents: object, fileNames: object, context: vscode.ExtensionContext) {
  const currentFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;

  if (!currentFolder) {
    vscode.window.showErrorMessage("No workspace folder is open");
    return;
  }

  const savedPagesFolder = path.join(currentFolder, 'Saved Pages');

  // Create 'Saved Pages' folder if it doesn't exist
  if (!fs.existsSync(savedPagesFolder)) {
    fs.mkdirSync(savedPagesFolder);
  }

  for (const key in contents) {
    if (contents.hasOwnProperty(key) && fileNames.hasOwnProperty(key)) {
      const filePath = path.join(savedPagesFolder, `${fileNames[key]}.json`);
      const content = JSON.stringify(contents[key], null, 2);

      fs.writeFile(filePath, content, (err) => {
        if (err) {
          console.error("Error writing file", err);
          vscode.window.showErrorMessage(`Failed to save file: ${fileNames[key]}`);
        } else {
          console.log(`File ${fileNames[key]} has been saved`);
          vscode.window.showInformationMessage(`File ${fileNames[key]} saved successfully`);
        }
      });
    }
  }
}

export async function handleFileLoad(context: vscode.ExtensionContext, fileName: string, webview: vscode.Webview) {
  const currentFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;

  if (!currentFolder) {
    vscode.window.showErrorMessage("No workspace folder is open");
    return;
  }

  const filePath = path.join(currentFolder, `${fileName}.json`);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file", err);
      vscode.window.showErrorMessage("Failed to read Project file");
    } else {
      console.log("Project file has been read", data);
      webview.postMessage({ command: "loadFile", data: JSON.parse(data) });
      vscode.window.showInformationMessage("Project file read successfully");
    }
  });
}
