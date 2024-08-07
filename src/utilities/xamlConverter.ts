import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { TemplateManager } from "../WinUI3/TemplateManager";
import { ProjectStructureGenerator } from "../WinUI3/ProjectStructureGenerator";
import { FileGenerator } from "../WinUI3/fileGenerator";
import { Page } from "../../webview-ui/src/types";
import { SerializedNodes } from "@craftjs/core";

export async function convertToXaml(
  contents: string | string[] | SerializedNodes,
  fileNames: string | string[],
  context: vscode.ExtensionContext
) {
  const currentFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
  if (!currentFolder) {
    vscode.window.showErrorMessage("No workspace folder is open");
    return;
  }

  const projectName = await vscode.window.showInputBox({
    prompt: "Enter a name for your WinUI 3 project",
    placeHolder: "MyWinUIProject",
  });

  if (!projectName) {
    vscode.window.showErrorMessage("Project name is required");
    return;
  }

  let pages: Page[] = [];

  // Handle different types of input
  if (typeof contents === "string" && typeof fileNames === "string") {
    // Single page
    pages = [
      {
        id: fileNames,
        name: fileNames,
        content: JSON.parse(contents) as SerializedNodes,
      },
    ];
  } else if (
    Array.isArray(contents) &&
    Array.isArray(fileNames) &&
    contents.length === fileNames.length
  ) {
    // Multiple pages
    pages = contents.map((content: string, index: string | number) => ({
      id: fileNames[index],
      name: fileNames[index],
      content: typeof content === "string" ? JSON.parse(content) : content,
    }));
  } else if (typeof contents === "object" && !Array.isArray(contents)) {
    // Single page with object content
    pages = [
      {
        id: Array.isArray(fileNames) ? fileNames[0] : fileNames,
        name: Array.isArray(fileNames) ? fileNames[0] : fileNames,
        content: contents,
      },
    ];
  } else {
    throw new Error("Invalid input format for contents or fileNames");
  }

  const outputPath = path.join(currentFolder, projectName);

  const templateManager = new TemplateManager(context);
  const projectStructureGenerator = new ProjectStructureGenerator(outputPath);
  const fileGenerator = new FileGenerator(
    projectName,
    outputPath,
    templateManager,
    projectName,
    `${projectName}.App`,
    "CN=YourPublisherName",
    `${projectName} Description`
  );

  try {
    projectStructureGenerator.createProjectStructure();
    fileGenerator.generateProjectFiles(pages);

    vscode.window.showInformationMessage(
      `WinUI 3 project '${projectName}' generated at ${outputPath}`
    );
  } catch (error) {
    vscode.window.showErrorMessage(`Error generating WinUI 3 project: ${(error as Error).message}`);
  }
}
