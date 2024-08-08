import * as fs from "fs";
import * as path from "path";
import { TemplateManager } from "./TemplateManager";
import { generateGridXaml } from "./gridGenerator";
import { Page } from "../../webview-ui/src/types";
//working with pages, and should be all dynamic

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
    let content = this.templateManager.getTemplate("App.xaml");
    content = content.replace("{{namespace}}", this.namespace);
    this.createFile("App.xaml", content);
  }

  private createAppXamlCs() {
    let content = this.templateManager.getTemplate("App.xaml.cs");
    content = content.replace("{{namespace}}", this.namespace);
    this.createFile("App.xaml.cs", content);
  }

  private createMainWindowXaml(pages: Page[]) {
    let content = this.templateManager.getTemplate("MainWindow.xaml");
    const pageItems = pages
      .map((page) => `<NavigationViewItem Content="${page.name}" Tag="${page.name}"/>`)
      .join("\n                ");

    content = content.replace("{{namespace}}", this.namespace);
    content = content.replace("{{projectName}}", this.projectName);
    content = content.replace("{{pageItems}}", pageItems);

    this.createFile("MainWindow.xaml", content);
  }

  private createMainWindowXamlCs(pages: Page[]) {
    if (pages.length === 0) {
      console.error("No pages available to create MainWindow.xaml.cs");
      return;
    }

    let content = this.templateManager.getTemplate("MainWindow.xaml.cs");

    content = content.replace(/\{\{namespace\}\}/g, this.namespace);

    content = content.replace("{{defaultPage}}", pages[0].name);

    const pageTypeLogic = pages
      .map(
        (page) => `                    case "${page.name}": pageType = typeof(${page.name}); break;`
      )
      .join("\n");

    content = content.replace(
      "                    // This will be replaced dynamically",
      pageTypeLogic
    );

    this.createFile("MainWindow.xaml.cs", content);
  }

  public generatePageXaml(page: Page): string {
    const gridXaml = generateGridXaml(page);

    const content = this.templateManager.fillTemplate("Page.xaml", {
      namespace: this.projectName,
      pageName: page.name,
      pageContent: gridXaml,
    });

    const finalContent = content.replace("{{PAGE_CONTENT}}", gridXaml);
    console.log(finalContent);

    return finalContent;
  }

  private createPageXaml(page: Page) {
    // console.log("Creating XAML for page:", page.name);
    // console.log("Page structure:", JSON.stringify(page, null, 2));
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
