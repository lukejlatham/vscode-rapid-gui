import * as fs from "fs";
import * as path from "path";
import { TemplateManager } from "./TemplateManager";
import { Page } from "../../webview-ui/src/types";
import { Node } from "./JSONParser";
import { generateGridCss, generateGridHtml } from "./GridGenerator";
import { ProjectStructureGenerator } from "./ProjectStructureGenerator";
import { generateBackgroundCss } from "./components/Background";
import { generateComponentCss } from "./componentGenerator";

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

    this.createMainIndexHtml(pages);
    this.createPageFiles(pages);
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

  private createMainIndexHtml(pages: Page[]) {
    let content = this.templateManager.getTemplate("index.html");
    content = content.replace(/{{projectName}}/g, this.projectName);
    content = content.replace("{{pageTitle}}", "Home");
    content = content.replace("{{content}}", this.generateNavigation(pages));
    this.createFile("index.html", content);
  }

  private generateNavigation(pages: Page[]): string {
    return `
      <nav>
        <ul>
          ${pages.map((page) => `<li><a href="${page.name}.html">${page.name}</a></li>`).join("\n")}
        </ul>
      </nav>
    `;
  }

  private resetComponentCounters() {
    const componentCounters = {};
  }

  private createPageFiles(pages: Page[]) {
    pages.forEach((page) => {
      this.resetComponentCounters();
      const pageContent = this.generatePageHtmlContent(page);
      this.resetComponentCounters();
      const gridCss = generateBackgroundCss(
        page.content.ROOT as Node,
        page.content as { [key: string]: Node }
      );
      const componentCss = this.generateComponentCss(page.content as { [key: string]: Node });

      let content = this.templateManager.getTemplate("index.html");
      content = content.replace(/{{projectName}}/g, this.projectName);
      content = content.replace("{{pageTitle}}", page.name);
      content = content.replace("{{content}}", pageContent);
      content = content.replace('href="css/styles.css"', `href="css/${page.name}.css"`);

      this.createFile(`${page.name}.html`, content);
      this.createFile(`css/${page.name}.css`, gridCss + componentCss);
    });
  }

  private generateComponentCss(content: { [key: string]: Node }): string {
    let css = "";
    for (const nodeId in content) {
      if (nodeId !== "ROOT") {
        const node = content[nodeId];
        css += generateComponentCss(
          { pages: { temp: { components: content, root: node, layout: [] } } },
          "temp"
        );
      }
    }
    return css;
  }

  private generatePageHtmlContent(page: Page): string {
    try {
      console.log("Generating content for page:", page.name);
      console.log("Raw page content:", JSON.stringify(page.content, null, 2));

      if (typeof page.content === "string") {
        page.content = JSON.parse(page.content);
      }

      if (!page.content || typeof page.content !== "object" || !page.content.ROOT) {
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
    cssContent = cssContent.replace(/{{projectName}}/g, this.projectName);
    cssContent = cssContent.replace("{{dynamicStyles}}", "");
    this.createFile("css/styles.css", cssContent);
  }

  private createJsFile() {
    let jsContent = this.templateManager.getTemplate("main.js");
    jsContent = jsContent.replace(/{{projectName}}/g, this.projectName);
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
