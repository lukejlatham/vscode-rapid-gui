import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import { Page } from "../../webview-ui/src/types";
import { AppGenerator } from "../HTML/AppGenerator";

export async function convertToHtml(
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
    prompt: "Enter a name for your HTML/CSS project",
    placeHolder: "MyHtmlProject",
  });

  if (!projectName) {
    throw new Error("Project name is required");
  }

  const projectFolder = path.join(currentFolder, projectName);

  // Ensure the project folder exists
  if (!fs.existsSync(projectFolder)) {
    fs.mkdirSync(projectFolder, { recursive: true });
  }

  const pages: Page[] = [];

  for (let i = 0; i < contents.length; i++) {
    const fileName = fileNames[i];
    const jsonContent = contents[i];

    console.log(`Processing page: ${fileName}`);
    console.log("JSON Content:", jsonContent);

    try {
      // Unescape the JSON string if necessary
      const unescapedContent = JSON.parse(jsonContent);
      console.log("Unescaped content:", JSON.stringify(unescapedContent, null, 2));

      const page: Page = {
        id: fileName,
        name: fileName,
        content: unescapedContent,
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
    const generator = new AppGenerator(pages, projectFolder, projectName, context);
    await generator.generateApp();

    vscode.window.showInformationMessage(
      `HTML/CSS project "${projectName}" generated successfully in ${projectFolder}`
    );
  } catch (error) {
    console.error("Error generating HTML/CSS project:", error);
    vscode.window.showErrorMessage(`Failed to generate HTML/CSS project: ${error.message}`);
  }
}
