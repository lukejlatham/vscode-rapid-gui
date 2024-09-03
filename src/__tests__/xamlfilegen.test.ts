/* eslint-disable @typescript-eslint/naming-convention */
import { FileGenerator } from "../WinUI3/fileGenerator";
import { TemplateManager } from "../WinUI3/TemplateManager";
import { Page } from "../../webview-ui/src/types";
import * as fs from "fs";
import * as path from "path";

const vscode = {
  ExtensionContext: class {},
  Uri: {
    file: (path: string) => ({ fsPath: path }),
    joinPath: (...segments: string[]) => ({ fsPath: segments.join("/") }),
  },
};

const templateManager = new TemplateManager(vscode as any);

jest.mock("fs");
jest.mock("path");
jest.mock("uuid", () => ({ v4: () => "mocked-uuid" }));

describe("FileGenerator", () => {
  let fileGenerator: FileGenerator;
  let mockTemplateManager: jest.Mocked<TemplateManager>;
  const mockOutputPath = "/test/output";
  const mockProjectName = "TestProject";
  const mockNamespace = "TestNamespace";
  const mockAppDescription = "Test Description";
  const mockPublisher = "TestPublisher";

  beforeEach(() => {
    mockTemplateManager = {
      getTemplate: jest.fn().mockReturnValue("mocked template content"),
      fillTemplate: jest.fn().mockReturnValue("filled template content"),
      getTemplatesPath: jest.fn().mockReturnValue("/mock/templates/path"),
    } as any;

    fileGenerator = new FileGenerator(
      mockProjectName,
      mockOutputPath,
      mockTemplateManager,
      mockNamespace,
      mockAppDescription,
      mockPublisher
    );

    jest.clearAllMocks();
    (fs.writeFileSync as jest.Mock).mockImplementation(() => {});
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    (fs.mkdirSync as jest.Mock).mockImplementation(() => {});
    (fs.readdirSync as jest.Mock).mockReturnValue([]);
    (fs.copyFileSync as jest.Mock).mockImplementation(() => {});
    (path.join as jest.Mock).mockImplementation((...args) => args.join("/"));
    (path.dirname as jest.Mock).mockImplementation((p) => p.split("/").slice(0, -1).join("/"));
    (path.basename as jest.Mock).mockImplementation((p) => p.split("/").pop());
  });

  test("generateProjectFiles creates all necessary files", async () => {
    const mockPages: Page[] = [
      {
        id: "1",
        name: "Page1",
        content: {
          ROOT: {
            type: { resolvedName: "Background" },
            isCanvas: true,
            props: {},
            displayName: "Background",
            custom: {},
            parent: null,
            hidden: false,
            nodes: [],
            linkedNodes: {},
          },
        },
      },
      {
        id: "2",
        name: "Page2",
        content: {
          ROOT: {
            type: { resolvedName: "Background" },
            isCanvas: true,
            props: {},
            displayName: "Background",
            custom: {},
            parent: null,
            hidden: false,
            nodes: [],
            linkedNodes: {},
          },
        },
      },
    ];
    const mockProjectPath = "/test/project";

    await fileGenerator.generateProjectFiles(mockPages, mockProjectPath);

    // Check if all expected files are created
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("app.manifest"),
      expect.any(String)
    );
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("App.xaml"),
      expect.any(String)
    );
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("App.xaml.cs"),
      expect.any(String)
    );
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("MainWindow.xaml"),
      expect.any(String)
    );
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("MainWindow.xaml.cs"),
      expect.any(String)
    );
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("Package.appxmanifest"),
      expect.any(String)
    );
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining(`${mockProjectName}.csproj`),
      expect.any(String)
    );
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("launchSettings.json"),
      expect.any(String)
    );
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("Resources.resw"),
      expect.any(String)
    );
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining(`${mockProjectName}.generated.sln`),
      expect.any(String)
    );
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("Directory.Build.props"),
      expect.any(String)
    );
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("README.md"),
      expect.any(String)
    );
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("launch.json"),
      expect.any(String)
    );
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("tasks.json"),
      expect.any(String)
    );

    // Check if page files are created
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("Views/Page1.xaml"),
      expect.any(String)
    );
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("Views/Page1.xaml.cs"),
      expect.any(String)
    );
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("Views/Page2.xaml"),
      expect.any(String)
    );
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("Views/Page2.xaml.cs"),
      expect.any(String)
    );

    // Check if publish profiles are created
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("win-x86.pubxml"),
      expect.any(String)
    );
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("win-x64.pubxml"),
      expect.any(String)
    );
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("win-arm64.pubxml"),
      expect.any(String)
    );
  });

  // ... (keep all other tests as they were) ...

  test("processAllImages handles image processing correctly", async () => {
    const mockPages: Page[] = [
      {
        id: "1",
        name: "Page1",
        content: {
          ROOT: {
            type: { resolvedName: "Background" },
            isCanvas: true,
            props: {},
            displayName: "Background",
            custom: {},
            parent: null,
            hidden: false,
            nodes: ["ImageNode"],
            linkedNodes: {},
          },
          ImageNode: {
            type: { resolvedName: "Image" },
            isCanvas: false,
            props: { src: "https://example.com/image.jpg" },
            displayName: "Image",
            custom: {},
            parent: "ROOT",
            hidden: false,
            nodes: [],
            linkedNodes: {},
          },
        },
      },
    ];

    await (fileGenerator as any).processAllImages(mockPages, "/test/project");

    expect(fs.copyFileSync).toHaveBeenCalled();
  });

  // ... (keep all other tests as they were) ...
});
