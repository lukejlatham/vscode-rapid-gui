import * as fs from "fs";
import * as path from "path";
import { TemplateManager } from "./TemplateManager";
import { Page } from "../../webview-ui/src/types";
import { generateGridHtml, generateGridCss } from "./GridGenerator";
import { ProjectStructureGenerator } from "./ProjectStructureGenerator";

export class FileGenerator {
  private projectName: string;
  private outputPath: string;
  private templateManager: TemplateManager;

  constructor(projectName: string, outputPath: string, templateManager: TemplateManager) {
    const structureGenerator = new ProjectStructureGenerator(outputPath, projectName);
    structureGenerator.generateStructure();
    this.outputPath = structureGenerator.getOutputPath();
    this.projectName = projectName;
    this.templateManager = templateManager;
  }

  public generateProjectFiles(pages: Page[]) {
    if (pages.length === 0) {
      console.error("No pages to generate");
      return;
    }

    this.createHtmlFiles(pages);
    this.createMainCssFile();
    this.createJsFile();
    this.createReadme();
    this.copyAssetImages();
  }

  private createFile(fileName: string, content: string) {
    const filePath = path.join(this.outputPath, fileName);
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(filePath, content);
  }

  private createHtmlFiles(pages: Page[]) {
    pages.forEach((page) => {
      const pageContent = this.generatePageHtmlContent(page);
      const pageCss = generateGridCss(page);

      let content = this.templateManager.getTemplate("index.html");
      content = content.replace("{{projectName}}", this.projectName);
      content = content.replace("{{pageTitle}}", page.name);
      content = content.replace("{{content}}", pageContent);

      this.createFile(`${page.name}.html`, content);
      this.createFile(`css/${page.name}.css`, pageCss);
    });
  }

  private generatePageHtmlContent(page: Page): string {
    try {
      console.log("Generating content for page:", page.name);
      console.log("Raw page content:", JSON.stringify(page.content, null, 2));

      if (typeof page.content === "string") {
        page.content = JSON.parse(page.content);
      }

      if (!page.content || !page.content.ROOT) {
        throw new Error("ROOT node is missing in the JSON structure");
      }

      return generateGridHtml(page, this.outputPath);
    } catch (error) {
      console.error("Error in generatePageHtmlContent:", error);
      return `<p>Error generating content for ${page.name}: ${error.message}</p>`;
    }
  }

  private createMainCssFile() {
    let cssContent = this.templateManager.getTemplate("styles.css");
    cssContent = cssContent.replace("{{projectName}}", this.projectName);
    cssContent = cssContent.replace("{{dynamicStyles}}", "");
    this.createFile("css/styles.css", cssContent);
  }

  private createJsFile() {
    let jsContent = this.templateManager.getTemplate("main.js");
    jsContent = jsContent.replace("{{projectName}}", this.projectName);
    jsContent = jsContent.replace("{{dynamicScripts}}", "");
    this.createFile("js/main.js", jsContent);
  }

  private createReadme() {
    const content = this.templateManager.fillTemplate("README.md", {
      projectName: this.projectName,
    });
    this.createFile("README.md", content);
  }

  private copyAssetImages() {
    const templateAssetsPath = path.join(this.templateManager.getTemplatesPath(), "images");
    const projectAssetsPath = path.join(this.outputPath, "images");

    if (fs.existsSync(templateAssetsPath)) {
      if (!fs.existsSync(projectAssetsPath)) {
        fs.mkdirSync(projectAssetsPath, { recursive: true });
      }

      const assetFiles = fs.readdirSync(templateAssetsPath);
      for (const file of assetFiles) {
        const srcPath = path.join(templateAssetsPath, file);
        const destPath = path.join(projectAssetsPath, file);
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}
