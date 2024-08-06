import { generateGridXaml } from "./gridGenerator";
import { generateComponentXaml } from "./componentGenerator";
import { FileGenerator } from "./fileGenerator";
import { TemplateManager } from "./TemplateManager";
import { ProjectStructureGenerator } from "./ProjectStructureGenerator";
import { Page } from "../../webview-ui/src/types";
import * as path from "path";

export class AppGenerator {
  private pages: Page[];
  private outputPath: string;
  private projectName: string;
  private templateManager: TemplateManager;
  private fileGenerator: FileGenerator;
  private projectStructureGenerator: ProjectStructureGenerator;

  constructor(pages: Page[], outputPath: string, projectName: string) {
    this.pages = pages;
    this.outputPath = outputPath;
    this.projectName = projectName;
    this.templateManager = new TemplateManager(path.join(__dirname, "templates"));
    this.fileGenerator = new FileGenerator(projectName, outputPath, this.templateManager);
    this.projectStructureGenerator = new ProjectStructureGenerator(outputPath);
  }

  public generateApp() {
    this.projectStructureGenerator.createProjectStructure();
    this.fileGenerator.generateProjectFiles(this.pages);
    console.log(
      `WinUI 3 project "${this.projectName}" generated successfully at ${this.outputPath}`
    );
  }
}
