import * as vscode from "vscode";
import * as path from "path";
import { Page } from "../../webview-ui/src/types";
import { TemplateManager } from "./TemplateManager";
import { FileGenerator } from "./FileGenerator";
import { ProjectStructureGenerator } from "./ProjectStructureGenerator";

export class AppGenerator {
  private pages: Page[];
  private outputPath: string;
  private projectName: string;
  private templateManager: TemplateManager;
  private fileGenerator: FileGenerator;
  private projectStructureGenerator: ProjectStructureGenerator;

  constructor(
    pages: Page[],
    outputPath: string,
    projectName: string,
    context: vscode.ExtensionContext
  ) {
    this.pages = pages;
    this.outputPath = path.join(outputPath, projectName);
    this.projectName = projectName;
    this.templateManager = new TemplateManager(context);
    this.fileGenerator = new FileGenerator(this.projectName, this.outputPath, this.templateManager);
    this.projectStructureGenerator = new ProjectStructureGenerator(
      this.outputPath,
      this.projectName
    );
  }

  public async generateApp() {
    try {
      console.log(`Starting to generate HTML/CSS project "${this.projectName}"...`);
      console.log(`Number of pages to generate: ${this.pages.length}`);

      if (this.pages.length === 0) {
        throw new Error("No pages to generate");
      }

      this.projectStructureGenerator.generateStructure();
      console.log("Project structure created.");

      this.fileGenerator.generateProjectFiles(this.pages);
      console.log("Project files generated.");

      console.log(
        `HTML/CSS project "${this.projectName}" generated successfully at ${this.outputPath}`
      );
    } catch (error) {
      console.error("Error generating app:", error);
      throw error;
    }
  }
}
