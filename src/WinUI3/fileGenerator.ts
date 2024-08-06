import * as fs from "fs";
import * as path from "path";
import { TemplateManager } from "./TemplateManager";
import { generateGridXaml } from "./gridGenerator";
import { generateComponentXaml } from "./componentGenerator";
import { Page } from "../../webview-ui/src/types";

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
    this.createAppXaml();
    this.createAppXamlCs();
    this.createMainWindowXaml();
    this.createMainWindowXamlCs();
    this.createPackageAppxmanifest();
    this.createProjectFile();
    this.createLaunchSettings();
    this.createAppManifest();
    this.createResourcesFile();

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
      namespace: this.projectName,
    });
    this.createFile("App.xaml", content);
  }

  private createAppXamlCs() {
    const content = this.templateManager.fillTemplate("App.xaml.cs", {
      namespace: this.projectName,
    });
    this.createFile("App.xaml.cs", content);
  }

  private createMainWindowXaml() {
    const content = this.templateManager.fillTemplate("MainWindow.xaml", {
      namespace: this.projectName,
    });
    this.createFile("MainWindow.xaml", content);
  }

  private createMainWindowXamlCs() {
    const content = this.templateManager.fillTemplate("MainWindow.xaml.cs", {
      namespace: this.projectName,
    });
    this.createFile("MainWindow.xaml.cs", content);
  }

  private createPageXaml(page: Page) {
    const gridXaml = generateGridXaml(page);
    const componentXaml = generateComponentXaml(page.content);
    const pageContent = `${gridXaml}\n${componentXaml}`;

    const content = this.templateManager.fillTemplate("Page.xaml", {
      namespace: this.projectName,
      pageName: page.name,
      pageContent: pageContent,
    });
    this.createFile(`Pages/${page.name}.xaml`, content);
  }

  private createPageXamlCs(pageName: string) {
    const content = this.templateManager.fillTemplate("Page.xaml.cs", {
      namespace: this.projectName,
      pageName: pageName,
    });
    this.createFile(`Pages/${pageName}.xaml.cs`, content);
  }

  private createPackageAppxmanifest() {
    const content = this.templateManager.fillTemplate("Package.appxmanifest", {
      namespace: this.projectName,
      appName: this.projectName,
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
}
