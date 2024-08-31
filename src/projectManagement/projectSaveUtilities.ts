import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export async function handleFileSave(
  contents: object,
  fileNames: object,
  context: vscode.ExtensionContext
) {
  const currentFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;

  if (!currentFolder) {
    vscode.window.showErrorMessage("No workspace folder is open");
    return;
  }

  const savedPagesFolder = path.join(currentFolder, "Saved Pages");

  // Create 'Saved Pages' folder if it doesn't exist
  if (!fs.existsSync(savedPagesFolder)) {
    fs.mkdirSync(savedPagesFolder);
  } else {
    // Delete all existing files in the 'Saved Pages' folder
    const files = fs.readdirSync(savedPagesFolder);
    for (const file of files) {
      const filePath = path.join(savedPagesFolder, file);
      try {
        fs.unlinkSync(filePath);
        console.log(`File ${file} has been deleted`);
      } catch (err) {
        console.error(`Error deleting file ${file}`, err);
        vscode.window.showErrorMessage(`Failed to delete file: ${file}`);
      }
    }
  }

  // Write new files
  for (const key in contents) {
    if (contents.hasOwnProperty(key) && fileNames.hasOwnProperty(key)) {
      const filePath = path.join(savedPagesFolder, `${fileNames[key]}.json`);
      const content = contents[key];

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

export async function handleFileLoad(context: vscode.ExtensionContext, webview: vscode.Webview) {
  const currentFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;

  if (!currentFolder) {
    vscode.window.showErrorMessage("No workspace folder is open");
    return;
  }

  const savedPagesFolder = path.join(currentFolder, "Saved Pages");

  if (!fs.existsSync(savedPagesFolder)) {
    vscode.window.showErrorMessage(
      "Cannot find Saved Pages folder. Make sure you have saved a project first, and have not deleted or renamed the 'Saved Pages' folder."
    );
    return;
  }

  fs.readdir(savedPagesFolder, (err, files) => {
    if (err) {
      console.error("Error reading Saved Pages folder", err);
      vscode.window.showErrorMessage("Failed to read Saved Pages folder");
      return;
    }

    const fileContents: { fileName: string; fileData: any }[] = [];
    let filesRead = 0;

    files.forEach((file) => {
      const filePath = path.join(savedPagesFolder, file);
      const fileName = path.basename(file, ".json");

      fs.readFile(filePath, "utf8", (err, data) => {
        filesRead++;
        if (err) {
          console.error(`Error reading file ${file}`, err);
          vscode.window.showErrorMessage(`Failed to read file: ${file}`);
        } else {
          // console.log(`File ${file} has been read`, data);
          fileContents.push({ fileName, fileData: data });
        }

        // Check if all files have been read
        if (filesRead === files.length) {
          console.log("Projects files read: ", fileContents);
          webview.postMessage({ command: "loadFiles", data: fileContents });
          vscode.window.showInformationMessage("All project files read successfully");
        }
      });
    });
  });
}
