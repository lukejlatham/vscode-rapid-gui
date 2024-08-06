import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { TemplateManager } from "../WinUI3/TemplateManager";
import { ProjectStructureGenerator } from "../WinUI3/ProjectStructureGenerator";
import { FileGenerator } from "../WinUI3/fileGenerator";
import { Page } from "../../webview-ui/src/types";

export async function convertToXaml(
  contents: string[],
  fileNames: string[],
  context: vscode.ExtensionContext
) {
  const currentFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
  if (!currentFolder) {
    vscode.window.showErrorMessage("No workspace folder is open");
    return;
  }

  const pages: Page[] = contents.map((content, index) => ({
    id: fileNames[index],
    name: fileNames[index],
    content: JSON.parse(content),
  }));

  const outputPath = path.join(currentFolder, "WinUI3Output");
  const projectName = "MyWinUIApp";

  const templateManager = new TemplateManager(path.join(context.extensionPath, "templates"));
  const projectStructureGenerator = new ProjectStructureGenerator(outputPath);
  const fileGenerator = new FileGenerator(projectName, outputPath, templateManager);

  try {
    projectStructureGenerator.createProjectStructure();
    fileGenerator.generateProjectFiles(pages);

    vscode.window.showInformationMessage(`WinUI 3 project generated at ${outputPath}`);
  } catch (error) {
    vscode.window.showErrorMessage(`Error generating WinUI 3 project: ${(error as Error).message}`);
  }
}
