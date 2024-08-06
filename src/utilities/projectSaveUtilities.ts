import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export async function handleFileSave(nodeTreeProject: string, fileName:string, context: vscode.ExtensionContext) {
  const currentFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;

  if (!currentFolder) {
    vscode.window.showErrorMessage("No workspace folder is open");
    return;
  }

  const filePath = path.join(currentFolder, `${fileName}.json`);

  fs.writeFile(filePath, nodeTreeProject, (err) => {
    if (err) {
      console.error("Error writing file", err);
      vscode.window.showErrorMessage("Failed to save Project file");
    } else {
      console.log("Project file has been saved");
      vscode.window.showInformationMessage("Project file saved successfully");
    }
  });
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
