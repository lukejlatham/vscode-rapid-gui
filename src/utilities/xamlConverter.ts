import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { TemplateManager } from "../WinUI3/TemplateManager";
import { ProjectStructureGenerator } from "../WinUI3/ProjectStructureGenerator";
import { FileGenerator } from "../WinUI3/fileGenerator";
import { Page } from "../../webview-ui/src/types";
import { parseJSON, ParsedJSON } from "../WinUI3/JsonParser";
import { AppGenerator } from "../WinUI3/generateapp";

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

      const parsedJSON: ParsedJSON = parseJSON(jsonContent);
      const page: Page = {
        id: fileName,
        name: fileName,
        content: parsedJSON.pages[fileName].components,
      };
      pages.push(page);
    }
  }

  const appGenerator = new AppGenerator(pages, projectFolder, projectName, context);
  await appGenerator.generateApp();

  vscode.window.showInformationMessage(
    `WinUI 3 project "${projectName}" generated successfully in ${projectFolder}`
  );
}
