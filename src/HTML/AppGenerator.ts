import * as vscode from "vscode";
import * as path from "path";
import { Page } from "../../webview-ui/src/types";
import { TemplateManager } from "./TemplateManager";
import { FileGenerator } from "./FileGenerator";

export class AppGenerator {
  private pages: Page[];
  private outputPath: string;
  private projectName: string;
  private fileGenerator: FileGenerator;

  constructor(
    pages: Page[],
    outputPath: string,
    projectName: string,
    context: vscode.ExtensionContext,
    workspaceFolder: string
  ) {
    this.pages = pages;
    this.outputPath = outputPath;
    this.projectName = projectName;
    const templateManager = new TemplateManager(context);
    this.fileGenerator = new FileGenerator(
      this.projectName,
      this.outputPath,
      templateManager,
      workspaceFolder
    );
  }

  public async generateApp() {
    try {
      // console.log(`Starting to generate HTML/CSS project "${this.projectName}"...`);
      // console.log(`Number of pages to generate: ${this.pages.length}`);

      if (this.pages.length === 0) {
        throw new Error("No pages to generate");
      }

      this.fileGenerator.generateProjectFiles(this.pages);
      console.log("Project files generated.");

      // Get the actual output path from the FileGenerator
      const actualOutputPath = path.join(this.outputPath, this.projectName);
      console.log(
        `HTML/CSS project "${this.projectName}" generated successfully at ${actualOutputPath}`
      );
    } catch (error) {
      console.error("Error generating app:", error);
      throw error;
    }
  }
}
