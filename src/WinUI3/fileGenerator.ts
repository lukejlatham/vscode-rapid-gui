import * as fs from "fs";
import * as path from "path";
import { TemplateManager } from "./TemplateManager";
import { generateGridXaml } from "./gridGenerator";
import { Page } from "../../webview-ui/src/types";

export class FileGenerator {
  private projectName: string;
  private outputPath: string;
  private templateManager: TemplateManager;
  private namespace: string;
  private appIdentity: string;
  private publisher: string;
  private appDescription: string;

  constructor(
    projectName: string,
    outputPath: string,
    templateManager: TemplateManager,
    namespace: string,
    appIdentity: string,
    publisher: string,
    appDescription: string
  ) {
    this.projectName = projectName;
    this.outputPath = outputPath;
    this.templateManager = templateManager;
    this.namespace = namespace;
    this.appIdentity = appIdentity;
    this.publisher = publisher;
    this.appDescription = appDescription;
  }

  public generateProjectFiles(pages: Page[]) {
    if (pages.length === 0) {
      console.error("No pages to generate");
      return;
    }
    this.createAppXaml();
    this.createAppXamlCs();
    this.createMainWindowXaml(pages);
    this.createMainWindowXamlCs(pages);
    this.createPackageAppxmanifest();
    this.createProjectFile();
    this.createLaunchSettings();
    this.createAppManifest();
    this.createResourcesFile();
    this.createGitignore();
    this.createReadme();

    pages.forEach((page) => {
      this.createPageXaml(page);
      this.createPageXamlCs(page.name);
    });
  }

  private createFile(fileName: string, content: string) {
    const filePath = path.join(this.outputPath, fileName);
    fs.writeFileSync(filePath, content);
  }

  private createAppXaml() {
    const content = this.templateManager.fillTemplate("App.xaml", {
      namespace: this.namespace,
    });
    this.createFile("App.xaml", content);
  }

  private createAppXamlCs() {
    const content = this.templateManager.fillTemplate("App.xaml.cs", {
      namespace: this.namespace,
    });
    this.createFile("App.xaml.cs", content);
  }

  private createMainWindowXaml(pages: Page[]) {
    const pageItems = pages
      .map((page) => `<NavigationViewItem Content="${page.name}" Tag="${page.name}"/>`)
      .join("\n                ");

    const content = this.templateManager.fillTemplate("MainWindow.xaml", {
      namespace: this.namespace,
      projectName: this.projectName,
      pageItems: pageItems,
    });
    this.createFile("MainWindow.xaml", content);
  }

  private createMainWindowXamlCs(pages: Page[]) {
    if (pages.length === 0) {
      console.error("No pages available to create MainWindow.xaml.cs");
      return;
    }

    const content = this.templateManager.fillTemplate("MainWindow.xaml.cs", {
      namespace: this.namespace,
      defaultPage: pages[0].name,
    });
    this.createFile("MainWindow.xaml.cs", content);
  }

  public generatePageXaml(page: Page): string {
    const gridXaml = generateGridXaml(page);
    const content = this.templateManager.fillTemplate("Page.xaml", {
      namespace: this.namespace,
      pageName: page.name,
      pageContent: gridXaml,
    });
    return content;
  }

  private createPageXaml(page: Page) {
    const content = this.generatePageXaml(page);
    const filePath = path.join(this.outputPath, "Pages", `${page.name}.xaml`);
    fs.writeFileSync(filePath, content, "utf-8");
    console.log(`Generated ${filePath}`);
  }

  private createPageXamlCs(pageName: string) {
    const content = this.templateManager.fillTemplate("Page.xaml.cs", {
      namespace: this.namespace,
      pageName: pageName,
    });
    this.createFile(`Pages/${pageName}.xaml.cs`, content);
  }

  private createPackageAppxmanifest() {
    const content = this.templateManager.fillTemplate("Package.appxmanifest", {
      namespace: this.namespace,
      appName: this.projectName,
      appIdentity: this.appIdentity,
      publisher: this.publisher,
      appDescription: this.appDescription,
    });
    this.createFile("Package.appxmanifest", content);
  }

  private createProjectFile() {
    const content = this.templateManager.fillTemplate("ProjectFile.csproj", {
      projectName: this.projectName,
    });
    this.createFile(`${this.projectName}.csproj`, content);
  }

  private createLaunchSettings() {
    const content = this.templateManager.fillTemplate("launchSettings.json", {
      projectName: this.projectName,
    });
    this.createFile("Properties/launchSettings.json", content);
  }

  private createAppManifest() {
    const content = this.templateManager.fillTemplate("app.manifest", {
      appName: this.projectName,
    });
    this.createFile("app.manifest", content);
  }

  private createResourcesFile() {
    const content = this.templateManager.fillTemplate("Resources.resw", {
      appName: this.projectName,
    });
    this.createFile("Strings/en-us/Resources.resw", content);
  }

  private createGitignore() {
    try {
      const content = this.templateManager.getTemplate("gitignore");
      this.createFile(".gitignore", content);
    } catch (error) {
      console.warn("Failed to create .gitignore file:", error.message);
      // Optionally create a basic .gitignore file with common entries
      const basicGitignore = "bin/\nobj/\n.vs/\n";
      this.createFile(".gitignore", basicGitignore);
    }
  }

  private createReadme() {
    const content = this.templateManager.fillTemplate("README.md", {
      projectName: this.projectName,
    });
    this.createFile("README.md", content);
  }
}
