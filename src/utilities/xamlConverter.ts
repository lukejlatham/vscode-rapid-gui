import * as vscode from "vscode";
import * as path from "path";
import { Page } from "../../webview-ui/src/types";
import { parseJSON, ParsedJSON } from "../WinUI3/JsonParser";
import { AppGenerator } from "../WinUI3/generateapp";

export async function convertToXaml(
  contents: string[],
  fileNames: string[],
  context: vscode.ExtensionContext
): Promise<void> {
  console.log("Contents:", contents);
  console.log("FileNames:", fileNames);

  if (!contents || !fileNames || contents.length !== fileNames.length) {
    throw new Error("Invalid contents or fileNames");
  }

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

  for (let i = 0; i < contents.length; i++) {
    const fileName = fileNames[i];
    const jsonContent = contents[i];

    console.log(`Processing page: ${fileName}`);
    console.log("JSON Content:", jsonContent);

    try {
      const parsedJSON: ParsedJSON = parseJSON(jsonContent);
      // const pageName = Object.keys(parsedJSON.pages)[0];
      const pageStructure = parsedJSON.pages.default;

      console.log("Parsed content:", JSON.stringify(pageStructure, null, 2));
      const page: Page = {
        id: fileName,
        name: fileName,
        content: pageStructure.components,
      };
      console.log("Created Page object:", JSON.stringify(page, null, 2));
      pages.push(page);
    } catch (error) {
      console.error(`Error processing page ${fileName}:`, error);
    }
  }

  console.log("Number of pages created:", pages.length);

  if (pages.length === 0) {
    throw new Error("No pages were created. Check the input data.");
  }

  try {
    const appGenerator = new AppGenerator(pages, projectFolder, projectName, context);
    await appGenerator.generateApp();

    vscode.window.showInformationMessage(
      `WinUI 3 project "${projectName}" generated successfully in ${projectFolder}`
    );
  } catch (error) {
    console.error("Error generating WinUI 3 project:", error);
    vscode.window.showErrorMessage(`Failed to generate WinUI 3 project: ${error.message}`);
  }
}
