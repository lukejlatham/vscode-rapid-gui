import * as fs from "fs";
import * as path from "path";
import { Node } from "../WinUI3/JsonParser";
import { TemplateManager } from "./TemplateManager";
import { generateGridXaml } from "./gridGenerator";
import { Page } from "../../webview-ui/src/types";
import { v4 as uuidv4 } from "uuid";
import { findImageNodes, handleImageSource } from "./components/imageTranslator";

export class FileGenerator {
  private projectPath: string;
  private projectName: string;
  private outputPath: string;
  private templateManager: TemplateManager;
  private namespace: string;
  private appDescription: string;
  private defaultPublisher = "CN=DefaultPublisher";
  private extraImages: string[] = [];

  constructor(
    projectName: string,
    outputPath: string,
    templateManager: TemplateManager,
    namespace: string,
    appDescription: string,
    defaultPublisher?: string
  ) {
    this.projectName = projectName;
    this.outputPath = outputPath;
    this.templateManager = templateManager;
    this.namespace = namespace;
    this.appDescription = appDescription;
    if (defaultPublisher) {
      this.defaultPublisher = defaultPublisher;
    }
  }

  public async generateProjectFiles(pages: Page[]) {
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
    this.createReadme();
    this.copyAssetImages();
    this.createVSCodeFiles();
    this.addImagesToProjectFile();
    await this.processAllImages(pages);

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
    content = content.replace(/\{\{namespace\}\}/g, this.namespace);

    const navigationItems = pages
      .map((page) => {
        const sanitizedPageName = this.sanitizePageName(page.name);
        return `            <NavigationViewItem Content="${page.name}" Tag="${sanitizedPageName}"/>`;
      })
      .join("\n");

    content = content.replace("{{navigationItems}}", navigationItems);

    this.createFile("MainWindow.xaml", content);
  }

  private createMainWindowXamlCs(pages: Page[]) {
    let content = this.templateManager.getTemplate("MainWindow.xaml.cs");
    content = content.replace(/\{\{namespace\}\}/g, this.namespace);

    const defaultPage = this.sanitizePageName(pages[0].name);
    content = content.replace("{{defaultPage}}", defaultPage);

    const pageTypeCases = pages
      .map((page) => {
        const sanitizedPageName = this.sanitizePageName(page.name);
        return `                    case "${sanitizedPageName}": pageType = typeof(${sanitizedPageName}); break;`;
      })
      .join("\n");

    content = content.replace("{{pageTypeCases}}", pageTypeCases);

    this.createFile("MainWindow.xaml.cs", content);
  }

  private generateUniqueAppId(): string {
    return uuidv4();
  }

  private createPackageAppxmanifest() {
    let content = this.templateManager.getTemplate("Package.appxmanifest");
    const uniqueAppId = this.generateUniqueAppId();
    const uniquePublisherId = this.generateUniqueAppId();

    content = content.replace(/Name="{{appId}}"/g, `Name="${uniqueAppId}"`);
    content = content.replace(/Publisher="CN=Georges"/g, `Publisher="CN=${this.defaultPublisher}"`);
    content = content.replace(
      /PhoneIdentity Publisher=""/g,
      `PhoneIdentity Publisher="${uniquePublisherId}"`
    );
    content = content.replace(/\{\{appName\}\}/g, this.projectName);
    content = content.replace(/\{\{YourPublisher\}\}/g, this.defaultPublisher);
    content = content.replace(/\{\{appDescription\}\}/g, `${this.projectName} Description`);

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
    const solutionGuid = uuidv4().toUpperCase();
    let content = this.templateManager.getTemplate("SolutionFile.sln");
    content = content.replace(/\{\{projectName\}\}/g, this.projectName);
    content = content.replace(/\{\{projectGuid\}\}/g, projectGuid);
    content = content.replace(/\{\{solutionGuid\}\}/g, solutionGuid);
    const solutionFilePath = path.join(
      path.dirname(this.outputPath),
      `${this.projectName}.generated.sln`
    );
    fs.writeFileSync(solutionFilePath, content);
  }

  private createDirectoryBuildProps() {
    const content = this.templateManager.getTemplate("Directory.Build.props");
    this.createFile("Directory.Build.props", content);
  }

  async createPageXaml(page: Page, sanitizedPageName: string) {
    const gridXaml = await generateGridXaml(page);
    let content = this.templateManager.getTemplate("Page.xaml");
    content = content.replace(/\{\{namespace\}\}/g, this.namespace);
    content = content.replace(/\{\{pageName\}\}/g, sanitizedPageName);
    content = content.replace("{{PAGE_CONTENT}}", gridXaml);

    this.createFile(`Views/${sanitizedPageName}.xaml`, content);
  }

  private createPageXamlCs(sanitizedPageName: string) {
    let content = this.templateManager.getTemplate("Page.xaml.cs");
    content = content.replace(/\{\{namespace\}\}/g, this.namespace);
    content = content.replace(/pageName/g, sanitizedPageName);
    this.createFile(`Views/${sanitizedPageName}.xaml.cs`, content);
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

  private createVSCodeFiles() {
    const vscodeDir = path.join(path.dirname(this.outputPath), ".vscode");
    if (!fs.existsSync(vscodeDir)) {
      fs.mkdirSync(vscodeDir, { recursive: true });
    }

    const launchJson = {
      version: "0.2.0",
      configurations: [
        {
          name: ".NET Core Launch (console)",
          type: "coreclr",
          request: "launch",
          preLaunchTask: "build",
          program: `\${workspaceFolder}/${this.projectName}/bin/x64/Debug/net6.0-windows10.0.19041.0/win10-x64/${this.projectName}.exe`,
          args: [],
          cwd: `\${workspaceFolder}/${this.projectName}`,
          console: "internalConsole",
          stopAtEntry: false,
        },
        {
          name: ".NET Core Attach",
          type: "coreclr",
          request: "attach",
        },
      ],
    };

    const tasksJson = {
      version: "2.0.0",
      tasks: [
        {
          label: "build",
          command: "dotnet",
          type: "process",
          args: [
            "build",
            `\${workspaceFolder}/${this.projectName}/${this.projectName}.csproj`,
            "/property:GenerateFullPaths=true",
            "/consoleloggerparameters:NoSummary",
          ],
          problemMatcher: "$msCompile",
        },
        {
          label: "publish",
          command: "dotnet",
          type: "process",
          args: [
            "publish",
            `\${workspaceFolder}/${this.projectName}/${this.projectName}.csproj`,
            "/property:GenerateFullPaths=true",
            "/consoleloggerparameters:NoSummary",
          ],
          problemMatcher: "$msCompile",
        },
        {
          label: "watch",
          command: "dotnet",
          type: "process",
          args: [
            "watch",
            "run",
            "--project",
            `\${workspaceFolder}/${this.projectName}/${this.projectName}.csproj`,
          ],
          problemMatcher: "$msCompile",
        },
      ],
    };

    fs.writeFileSync(path.join(vscodeDir, "launch.json"), JSON.stringify(launchJson, null, 2));
    fs.writeFileSync(path.join(vscodeDir, "tasks.json"), JSON.stringify(tasksJson, null, 2));
  }

  private async processAllImages(pages: Page[]) {
    for (const page of pages) {
      const imageNodes = findImageNodes(page.content);
      for (const node of imageNodes) {
        if (node.props.src) {
          const imagePath = await handleImageSource(node.props.src, this.projectPath);
          this.extraImages.push(imagePath);
        }
      }
    }
  }

  private copyAssetImages() {
    const templateAssetsPath = path.join(this.templateManager.getTemplatesPath(), "Assets");
    const projectAssetsPath = path.join(this.outputPath, "Assets");

    if (!fs.existsSync(projectAssetsPath)) {
      fs.mkdirSync(projectAssetsPath, { recursive: true });
    }

    // Copy template assets
    if (fs.existsSync(templateAssetsPath)) {
      const assetFiles = fs.readdirSync(templateAssetsPath);
      for (const file of assetFiles) {
        const srcPath = path.join(templateAssetsPath, file);
        const destPath = path.join(projectAssetsPath, file);
        fs.copyFileSync(srcPath, destPath);
      }
    }

    // Copy extra images (including downloaded, uploaded, and AI-generated)
    for (const imagePath of this.extraImages) {
      const fileName = path.basename(imagePath);
      const destPath = path.join(projectAssetsPath, fileName);
      fs.copyFileSync(imagePath, destPath);
    }
  }

  private addImagesToProjectFile() {
    const projectFilePath = path.join(this.outputPath, `${this.projectName}.csproj`);
    let projectContent = fs.readFileSync(projectFilePath, "utf8");

    const assetsPath = path.join(this.outputPath, "Assets");
    if (fs.existsSync(assetsPath)) {
      const imageFiles = fs
        .readdirSync(assetsPath)
        .filter((file) =>
          [".png", ".jpg", ".jpeg", ".gif", ".bmp"].includes(path.extname(file).toLowerCase())
        );

      let imageItemGroup = "  <ItemGroup>\n";
      imageFiles.forEach((file) => {
        imageItemGroup += `    <Content Include="Assets\\${file}">\n`;
        imageItemGroup += "      <CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>\n";
        imageItemGroup += "    </Content>\n";
      });
      imageItemGroup += "  </ItemGroup>\n";

      projectContent = projectContent.replace("</Project>", `${imageItemGroup}</Project>`);

      fs.writeFileSync(projectFilePath, projectContent);
      console.log("Added images to project file");
    }
  }
}
