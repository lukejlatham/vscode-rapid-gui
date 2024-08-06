import { parseJSON, ParsedJSON } from "./JsonParser";
import { generateGridXaml } from "./gridGenerator";
import { generateComponentXaml } from "./componentGenerator";
import { FileGenerator } from "./fileGenerator";
import { TemplateManager } from "./TemplateManager";
import { ProjectStructureGenerator } from "./ProjectStructureGenerator";
import { Page } from "../../webview-ui/src/types";
import * as path from "path";

export class AppGenerator {
  private jsonInput: string;
  private outputPath: string;
  private projectName: string;
  private parsedJSON: ParsedJSON;
  private templateManager: TemplateManager;
  private fileGenerator: FileGenerator;
  private projectStructureGenerator: ProjectStructureGenerator;

  constructor(jsonInput: string, outputPath: string, projectName: string) {
    this.jsonInput = jsonInput;
    this.outputPath = outputPath;
    this.projectName = projectName;
    this.parsedJSON = parseJSON(this.jsonInput);
    this.templateManager = new TemplateManager(path.join(__dirname, "templates"));
    this.fileGenerator = new FileGenerator(projectName, outputPath, this.templateManager);
    this.projectStructureGenerator = new ProjectStructureGenerator(outputPath);
  }

  public generateApp() {
    // Create project structure
    this.projectStructureGenerator.createProjectStructure();

    // Generate pages
    const pages: Page[] = this.generatePages();

    // Generate project files
    this.fileGenerator.generateProjectFiles(pages);

    console.log(
      `WinUI 3 project "${this.projectName}" generated successfully at ${this.outputPath}`
    );
  }

  private generatePages(): Page[] {
    const pages: Page[] = [];

    for (const [pageName, pageStructure] of Object.entries(this.parsedJSON.pages)) {
      const page: Page = {
        id: pageName,
        name: pageName,
        content: {
          ROOT: pageStructure.root,
          ...pageStructure.components,
        },
      };

      const gridXaml = generateGridXaml(pageStructure.root, pageStructure.components, page);
      const componentXaml = generateComponentXaml(pageStructure.components);

      pages.push(page);
    }

    return pages;
  }
}

// Usage
const jsonInput = "..."; // Your JSON input
const outputPath = "/path/to/output";
const projectName = "MyWinUIApp";

const appGenerator = new AppGenerator(jsonInput, outputPath, projectName);
appGenerator.generateApp();
