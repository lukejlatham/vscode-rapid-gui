import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { TemplateManager } from "../WinUI3/TemplateManager";
import { ProjectStructureGenerator } from "../WinUI3/ProjectStructureGenerator";
import { FileGenerator } from "../WinUI3/fileGenerator";
import { Page } from "../../webview-ui/src/types";
import { parseJSON, ParsedJSON } from "../WinUI3/JsonParser";

export async function convertToXaml(
  contents: string,
  fileName: string,
  context: vscode.ExtensionContext
): Promise<string> {
  const currentFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
  if (!currentFolder) {
    throw new Error("No workspace folder is open");
  }

  console.log("Contents:", contents);
  console.log("FileNames:", fileName);

  const parsedJSON: ParsedJSON = parseJSON(contents);
  const page: Page = {
    id: fileName,
    name: fileName,
    content: parsedJSON.pages[fileName].components,
  };

  const templateManager = new TemplateManager(context);
  const fileGenerator = new FileGenerator(
    fileName,
    "",
    templateManager,
    fileName,
    `${fileName}.App`,
    "CN=YourPublisherName",
    `${fileName} Description`
  );

  const xamlContent = fileGenerator.generatePageXaml(page);

  return xamlContent;
}
