import { FileGenerator } from "./fileGenerator";
import { TemplateManager } from "./TemplateManager";
import { ProjectStructureGenerator } from "./ProjectStructureGenerator";
import { Page } from "../../webview-ui/src/types";
import * as vscode from "vscode";

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
    this.outputPath = outputPath;
    this.projectName = projectName;
    this.templateManager = new TemplateManager(context);
    this.fileGenerator = new FileGenerator(
      projectName,
      outputPath,
      this.templateManager,
      projectName,
      `${projectName}.App`,
      "CN=YourPublisherName",
      `${projectName} Description`
    );
    this.projectStructureGenerator = new ProjectStructureGenerator(outputPath);
  }

  public async generateApp() {
    try {
      console.log(`Starting to generate WinUI 3 project "${this.projectName}"...`);
      console.log(`Number of pages to generate: ${this.pages.length}`);

      if (this.pages.length === 0) {
        throw new Error("No pages to generate");
      }

      this.projectStructureGenerator.createProjectStructure();
      console.log("Project structure created.");

      await this.fileGenerator.generateProjectFiles(this.pages);
      console.log("Project files generated.");

      console.log(
        `WinUI 3 project "${this.projectName}" generated successfully at ${this.outputPath}`
      );
    } catch (error) {
      console.error("Error generating app:", error);
      throw error;
    }
  }
}
