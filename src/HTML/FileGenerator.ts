import * as fs from "fs";
import * as path from "path";
import { TemplateManager } from "./TemplateManager";
import { Page } from "../../webview-ui/src/types";
import { generateGridHtml, generateGridCss } from "./GridGenerator";
import { ParsedJSON, parseJSON } from "./JSONParser";

export class FileGenerator {
  private projectName: string;
  private outputPath: string;
  private templateManager: TemplateManager;

  constructor(projectName: string, outputPath: string, templateManager: TemplateManager) {
    this.projectName = projectName;
    this.outputPath = outputPath;
    this.templateManager = templateManager;
  }

  public generateProjectFiles(pages: Page[]) {
    if (pages.length === 0) {
      console.error("No pages to generate");
      return;
    }

    this.createHtmlFiles(pages);
    this.createCssFile(pages);
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
      let content = this.templateManager.getTemplate("index.html");
      const pageContent = this.generatePageHtmlContent(page);

      content = this.templateManager.fillTemplate("index.html", {
        projectName: this.projectName,
        pageTitle: page.name,
        content: pageContent,
      });

      this.createFile(`${page.name}.html`, content);
    });
  }

  private generatePageHtmlContent(page: Page): string {
    const parsedJSON: ParsedJSON = parseJSON(JSON.stringify(page.content));
    return generateGridHtml(page, this.outputPath);
  }

  private createCssFile(pages: Page[]) {
    let cssContent = this.templateManager.getTemplate("styles.css");

    pages.forEach((page) => {
      cssContent += generateGridCss(page);
    });

    this.createFile("css/styles.css", cssContent);
  }

  private createJsFile() {
    const jsContent = this.templateManager.getTemplate("main.js");
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
