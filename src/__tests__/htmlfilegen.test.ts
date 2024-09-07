import { FileGenerator } from "../HTML/FileGenerator";
import { TemplateManager } from "../HTML/TemplateManager";
import { Page } from "../../webview-ui/src/types";
import * as fs from "fs";
import * as path from "path";

jest.mock(
  "vscode",
  () => ({
    workspace: {
      workspaceFolders: [{ uri: { fsPath: "/mock/workspace" } }],
    },
  }),
  { virtual: true }
);

jest.mock("fs");
jest.mock("path");
jest.mock("../HTML/TemplateManager");
jest.mock("../HTML/ProjectStructureGenerator");
jest.mock("../HTML/GridGenerator");
jest.mock("../HTML/components/Background");

describe("FileGenerator", () => {
  let fileGenerator: FileGenerator;
  let mockTemplateManager: jest.Mocked<TemplateManager>;
  const mockOutputPath = "/test/output";
  const mockProjectName = "TestProject";
  const mockWorkspaceFolder = "/mock/workspace";

  beforeEach(() => {
    mockTemplateManager = {
      getTemplate: jest.fn().mockImplementation((templateName) => {
        if (templateName === "index.html") {
          return "<html><head><title>{{pageTitle}}</title></head><body>{{content}}</body></html>";
        }
        return "mocked template content";
      }),
      fillTemplate: jest.fn().mockReturnValue("filled template content"),
      getTemplatesPath: jest.fn().mockReturnValue("/mock/templates/path"),
    } as any;

    (TemplateManager as jest.MockedClass<typeof TemplateManager>).mockImplementation(
      () => mockTemplateManager
    );

    fileGenerator = new FileGenerator(
      mockProjectName,
      mockOutputPath,
      mockTemplateManager,
      mockWorkspaceFolder
    );

    jest.clearAllMocks();
    (fs.writeFileSync as jest.Mock).mockImplementation(() => {});
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    (fs.mkdirSync as jest.Mock).mockImplementation(() => {});
    (fs.readdirSync as jest.Mock).mockReturnValue([]);
    (fs.copyFileSync as jest.Mock).mockImplementation(() => {});
    (path.join as jest.Mock).mockImplementation((...args) => args.join("/"));
    (path.dirname as jest.Mock).mockImplementation((p) => p.split("/").slice(0, -1).join("/"));

    // Mock GridGenerator and Background component
    const { generateGridHtml } = require("../HTML/GridGenerator");
    const { generateBackgroundCss } = require("../HTML/components/Background");
    (generateGridHtml as jest.Mock).mockReturnValue("<div>Mocked Grid HTML</div>");
    (generateBackgroundCss as jest.Mock).mockReturnValue("body { background-color: #fff; }");
  });

  test("generateProjectFiles creates all necessary files", () => {
    const mockPages: Page[] = [
      {
        id: "1",
        name: "Home",
        content: {
          ROOT: {
            type: { resolvedName: "Background" },
            isCanvas: true,
            props: { layout: [] },
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
        name: "About",
        content: {
          ROOT: {
            type: { resolvedName: "Background" },
            isCanvas: true,
            props: { layout: [] },
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

    fileGenerator.generateProjectFiles(mockPages);

    // Check if all expected files are created
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("index.html"),
      expect.any(String)
    );
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("Home.html"),
      expect.any(String)
    );
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("About.html"),
      expect.any(String)
    );
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("css/styles.css"),
      expect.any(String)
    );
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("css/Home.css"),
      expect.any(String)
    );
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("css/About.css"),
      expect.any(String)
    );
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("js/main.js"),
      expect.any(String)
    );
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("README.md"),
      expect.any(String)
    );
  });

  test("createMainIndexHtml generates correct content", () => {
    const mockPages: Page[] = [
      { id: "1", name: "Home", content: {} },
      { id: "2", name: "About", content: {} },
    ];

    (fileGenerator as any).createMainIndexHtml(mockPages);

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("index.html"),
      expect.stringContaining('<li><a href="Home.html">Home</a></li>')
    );
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("index.html"),
      expect.stringContaining('<li><a href="About.html">About</a></li>')
    );
  });

  test("createPageFiles generates correct content for each page", () => {
    const mockPages: Page[] = [
      {
        id: "1",
        name: "Home",
        content: {
          ROOT: {
            type: { resolvedName: "Background" },
            isCanvas: true,
            props: { layout: [] },
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

    (fileGenerator as any).createPageFiles(mockPages);

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("Home.html"),
      expect.stringContaining("<title>Home</title>")
    );
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("css/Home.css"),
      expect.any(String)
    );
  });

  test("createMainCssFile generates correct content", () => {
    (fileGenerator as any).createMainCssFile();

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("css/styles.css"),
      expect.stringContaining("mocked template content")
    );
  });

  test("createJsFile generates correct content", () => {
    (fileGenerator as any).createJsFile();

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("js/main.js"),
      expect.stringContaining("mocked template content")
    );
  });

  test("createReadme generates correct content", () => {
    (fileGenerator as any).createReadme();

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("README.md"),
      expect.stringContaining("filled template content")
    );
  });

  test("copyAssetImages copies images correctly", () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readdirSync as jest.Mock).mockReturnValue(["image1.png", "image2.jpg"]);

    (fileGenerator as any).copyAssetImages();

    expect(fs.copyFileSync).toHaveBeenCalledTimes(2);
    expect(fs.copyFileSync).toHaveBeenCalledWith(
      expect.stringContaining("image1.png"),
      expect.stringContaining("image1.png")
    );
    expect(fs.copyFileSync).toHaveBeenCalledWith(
      expect.stringContaining("image2.jpg"),
      expect.stringContaining("image2.jpg")
    );
  });

  test("copyImages copies uploaded images correctly", () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readdirSync as jest.Mock).mockReturnValue(["uploaded1.png", "uploaded2.jpg"]);

    (fileGenerator as any).copyImages();

    expect(fs.copyFileSync).toHaveBeenCalledTimes(2);
    expect(fs.copyFileSync).toHaveBeenCalledWith(
      "/mock/workspace/uploaded_images/uploaded1.png",
      "/test/output/images/uploaded1.png"
    );
    expect(fs.copyFileSync).toHaveBeenCalledWith(
      "/mock/workspace/uploaded_images/uploaded2.jpg",
      "/test/output/images/uploaded2.jpg"
    );
  });
});
