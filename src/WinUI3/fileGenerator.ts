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
    this.createGitignore();
    this.createReadme();
    this.copyDefaultAssets();

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

  private copyDefaultAssets() {
    const assetFiles = [
      "Square44x44Logo.png",
      "Square150x150Logo.png",
      "Wide310x150Logo.png",
      "SplashScreen.png",
    ];
    assetFiles.forEach((file) => {
      const sourcePath = path.join(__dirname, "..", "resources", "DefaultAssets", file);
      const destPath = path.join(this.outputPath, "Assets", file);
      fs.copyFileSync(sourcePath, destPath);
    });
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

  private createGitignore() {
    const content = `
  # Visual Studio files
  .vs/
  bin/
  obj/
  
  # Build results
  [Dd]ebug/
  [Rr]elease/
  x64/
  x86/
  [Aa][Rr][Mm]/
  [Aa][Rr][Mm]64/
  bld/
  [Bb]in/
  [Oo]bj/
  [Ll]og/
  
  # NuGet Packages
  *.nupkg
  # The packages folder can be ignored because of Package Restore
  **/packages/*
  # except build/, which is used as an MSBuild target.
  !**/packages/build/
  `;
    this.createFile(".gitignore", content);
  }

  private createReadme() {
    const content = `
  # ${this.projectName}
  
  This is a WinUI 3 project generated automatically from your design!
  
  ## Getting Started
  
  1. Open the solution in Visual Studio 2019 or later.
  2. Ensure you have the Windows App SDK installed.
  3. Build and run the project.
  
  ## Project Structure
  
  - \`App.xaml\` and \`App.xaml.cs\`: Application entry point
  - \`MainWindow.xaml\` and \`MainWindow.xaml.cs\`: Main window of the application
  - \`Pages/\`: Contains individual pages of the application as XAML files that you created!
  - \`Assets/\`: Contains application assets like icons and images!
  
  ## Dependencies
  
  - Microsoft.WindowsAppSDK
  - Microsoft.Windows.SDK.BuildTools
  
  `;
    this.createFile("README.md", content);
  }
}
