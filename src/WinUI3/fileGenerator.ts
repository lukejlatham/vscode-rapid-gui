import * as fs from "fs";
import * as path from "path";
import { TemplateManager } from "./TemplateManager";
import { generateGridXaml } from "./gridGenerator";
import { Page } from "../../webview-ui/src/types";
import { v4 as uuidv4 } from "uuid";

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
    this.createAppManifest();
    this.createAppXaml();
    this.createAppXamlCs();
    this.createMainWindowXaml(pages);
    this.createMainWindowXamlCs(pages);
    this.createPackageAppxmanifest();
    this.createProjectFile();
    this.createLaunchSettings();
    this.createResourcesFile();
    this.createSolutionFile();
    this.createDirectoryBuildProps();
    this.createPublishProfiles();

    pages.forEach((page) => {
      const sanitizedPageName = this.sanitizePageName(page.name);
      this.createPageXaml(page, sanitizedPageName);
      this.createPageXamlCs(sanitizedPageName);
    });
  }

  private sanitizePageName(pageName: string): string {
    return pageName.replace(/\s+/g, "");
  }

  private createFile(fileName: string, content: string) {
    const filePath = path.join(this.outputPath, fileName);
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(filePath, content);
  }

  private createAppManifest() {
    let content = this.templateManager.getTemplate("app.manifest");
    content = content.replace(/\{\{projectName\}\}/g, this.projectName);
    this.createFile("app.manifest", content);
  }

  private createAppXaml() {
    let content = this.templateManager.getTemplate("App.xaml");
    content = content.replace(/\{\{namespace\}\}/g, this.namespace);
    this.createFile("App.xaml", content);
  }

  private createAppXamlCs() {
    let content = this.templateManager.getTemplate("App.xaml.cs");
    content = content.replace(/\{\{namespace\}\}/g, this.namespace);
    this.createFile("App.xaml.cs", content);
  }

  private createMainWindowXaml(pages: Page[]) {
    let content = this.templateManager.getTemplate("MainWindow.xaml");
    const pageItems = pages
      .map((page) => {
        const sanitizedPageName = this.sanitizePageName(page.name);
        return `<NavigationViewItem Content="${page.name}" Tag="${sanitizedPageName}"/>`;
      })
      .join("\n        ");

    content = content.replace(/\{\{namespace\}\}/g, this.namespace);
    content = content.replace(/\{\{pageItems\}\}/g, pageItems);
    this.createFile("MainWindow.xaml", content);
  }

  private createMainWindowXamlCs(pages: Page[]) {
    let content = this.templateManager.getTemplate("MainWindow.xaml.cs");
    content = content.replace(/\{\{namespace\}\}/g, this.namespace);

    const firstPageName = this.sanitizePageName(pages[0].name);
    content = content.replace(
      /ContentFrame\.Navigate\(typeof\(pageName\)\);/,
      `ContentFrame.Navigate(typeof(${firstPageName}));`
    );

    const pageTypeLogic = pages
      .map((page) => {
        const sanitizedPageName = this.sanitizePageName(page.name);
        return `case "${sanitizedPageName}": pageType = typeof(${sanitizedPageName}); break;`;
      })
      .join("\n                     ");

    content = content.replace(
      /case "pageName": pageType = typeof\(pageName\); break;/,
      pageTypeLogic
    );

    this.createFile("MainWindow.xaml.cs", content);
  }

  private createPackageAppxmanifest() {
    let content = this.templateManager.getTemplate("Package.appxmanifest");
    content = content.replace(/\{\{appName\}\}/g, this.projectName);
    content = content.replace(/\{\{YourPublisher\}\}/g, this.publisher);
    this.createFile("Package.appxmanifest", content);
  }

  private createProjectFile() {
    let content = this.templateManager.getTemplate("ProjectFile.csproj");
    content = content.replace(/\{\{projectName\}\}/g, this.projectName);
    this.createFile(`${this.projectName}.csproj`, content);
  }

  private createLaunchSettings() {
    let content = this.templateManager.getTemplate("launchSettings.json");
    content = content.replace(/\{\{projectName\}\}/g, this.projectName);
    this.createFile("Properties/launchSettings.json", content);
  }

  private createResourcesFile() {
    let content = this.templateManager.getTemplate("Resources.resw");
    content = content.replace(/\{\{appName\}\}/g, this.projectName);
    this.createFile("Strings/en-US/Resources.resw", content);
  }

  private createSolutionFile() {
    const projectGuid = uuidv4().toUpperCase();
    let content = this.templateManager.getTemplate("SolutionFile.sln");
    content = content.replace(/\{\{projectName\}\}/g, this.projectName);
    content = content.replace(/\{\{projectGuid\}\}/g, projectGuid);
    const solutionFilePath = path.join(path.dirname(this.outputPath), `${this.projectName}.sln`);
    fs.writeFileSync(solutionFilePath, content);
  }

  private createDirectoryBuildProps() {
    const content = this.templateManager.getTemplate("Directory.Build.props");
    this.createFile("Directory.Build.props", content);
  }

  private createPageXaml(page: Page, sanitizedPageName: string) {
    const gridXaml = generateGridXaml(page);
    let content = this.templateManager.getTemplate("Page.xaml");
    content = content.replace(/\{\{namespace\}\}/g, this.namespace);
    content = content.replace(/\{\{pageName\}\}/g, sanitizedPageName);
    content = content.replace(/\{\{PAGE_CONTENT\}\}/g, gridXaml);
    this.createFile(`${sanitizedPageName}.xaml`, content);
  }

  private createPageXamlCs(sanitizedPageName: string) {
    let content = this.templateManager.getTemplate("Page.xaml.cs");
    content = content.replace(/\{\{namespace\}\}/g, this.namespace);
    content = content.replace(/pageName/g, sanitizedPageName);
    this.createFile(`${sanitizedPageName}.xaml.cs`, content);
  }

  private createPublishProfiles() {
    const architectures = ["x86", "x64", "arm64"];
    architectures.forEach((arch) => {
      const content = `<?xml version="1.0" encoding="utf-8"?>
<Project ToolsVersion="4.0" xmlns="http://schemas.microsoft.com/developer/msbuild/2003">
  <PropertyGroup>
    <PublishProtocol>FileSystem</PublishProtocol>
    <Platform>${arch}</Platform>
    <RuntimeIdentifier>win10-${arch}</RuntimeIdentifier>
    <PublishDir>bin\\$(Configuration)\\$(TargetFramework)\\$(RuntimeIdentifier)\\publish\\</PublishDir>
    <SelfContained>true</SelfContained>
    <PublishSingleFile>False</PublishSingleFile>
    <PublishReadyToRun Condition="'$(Configuration)' == 'Debug'">False</PublishReadyToRun>
    <PublishReadyToRun Condition="'$(Configuration)' != 'Debug'">True</PublishReadyToRun>
   </PropertyGroup>
</Project>`;
      this.createFile(`Properties/PublishProfiles/win-${arch}.pubxml`, content);
    });
  }
}
