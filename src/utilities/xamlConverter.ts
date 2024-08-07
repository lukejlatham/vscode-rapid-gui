import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { TemplateManager } from "../WinUI3/TemplateManager";
import { ProjectStructureGenerator } from "../WinUI3/ProjectStructureGenerator";
import { FileGenerator } from "../WinUI3/fileGenerator";
import { Page } from "../../webview-ui/src/types";
import { parseJSON, ParsedJSON } from "../WinUI3/JsonParser";

export async function convertToXaml(
  contents: object,
  fileNames: object,
  context: vscode.ExtensionContext
): Promise<void> {
  const currentFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
  if (!currentFolder) {
    throw new Error("No workspace folder is open");
  }

  const projectName = await vscode.window.showInputBox({
    prompt: "Enter a name for your WinUI 3 project",
    placeHolder: "MyWinUI3Project",
  });

  if (!projectName) {
    throw new Error("Project name is required");
  }

  const projectFolder = path.join(currentFolder, projectName);

  const pages: Page[] = [];

  for (const key in contents) {
    if (contents.hasOwnProperty(key) && fileNames.hasOwnProperty(key)) {
      const fileName = fileNames[key];
      const jsonContent = contents[key];

      console.log(`Processing page: ${fileName}`);

      const parsedContent = JSON.parse(jsonContent);

      const page: Page = {
        id: fileName,
        name: fileName,
        content: parsedContent,
      };

      pages.push(page);
    }
  }

  const templateManager = new TemplateManager(context);
  const projectStructureGenerator = new ProjectStructureGenerator(projectFolder);
  const fileGenerator = new FileGenerator(
    projectName,
    projectFolder,
    templateManager,
    projectName,
    `${projectName}.App`,
    "CN=YourPublisherName",
    `${projectName} Description`
  );

  projectStructureGenerator.createProjectStructure();
  await fileGenerator.generateProjectFiles(pages);

  vscode.window.showInformationMessage(
    `WinUI 3 project "${projectName}" generated successfully in ${projectFolder}`
  );
}
