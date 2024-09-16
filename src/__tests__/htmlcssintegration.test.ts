import { FileGenerator } from "../HTML/FileGenerator";
import { Page } from "../../webview-ui/src/types";
import * as fs from "fs";
import * as path from "path";
import { generateComponentHtml } from "../HTML/componentGenerator";
import { generateGridHtml } from "../HTML/GridGenerator";
import { generateBackgroundCss } from "../HTML/components/Background";

// Mock vscode module
jest.mock(
  "vscode",
  () => ({
    workspace: {
      workspaceFolders: [{ uri: { fsPath: "/mock/workspace" } }],
    },
    Uri: {
      file: (path: string) => ({ fsPath: path }),
    },
  }),
  { virtual: true }
);

jest.mock("../HTML/TemplateManager", () => {
  return {
    TemplateManager: jest.fn().mockImplementation(() => ({
      getTemplate: jest.fn().mockImplementation((templateName) => {
        if (templateName === "index.html") {
          return "<html><head><title>{{pageTitle}}</title></head><body>{{content}}</body></html>";
        }
        return "mocked template content";
      }),
      fillTemplate: jest.fn().mockReturnValue("filled template content"),
      getTemplatesPath: jest.fn().mockReturnValue("/mock/templates/path"),
    })),
  };
});

jest.mock("fs");
jest.mock("path");
jest.mock("../HTML/componentGenerator");
jest.mock("../HTML/GridGenerator");
jest.mock("../HTML/components/Background");

describe("HTML/CSS Project Generation Integration Test", () => {
  const testProjectName = "TestHTMLProject";
  const testOutputPath = "/test/output/html";
  const mockWorkspaceFolder = "/mock/workspace";

  let fileGenerator: FileGenerator;

  beforeEach(() => {
    fileGenerator = new FileGenerator(
      testProjectName,
      testOutputPath,
      new (jest.requireMock("../HTML/TemplateManager").TemplateManager)(),
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
    (generateComponentHtml as jest.Mock).mockReturnValue("<div>Mocked Component</div>");
    (generateGridHtml as jest.Mock).mockReturnValue("<div>Mocked Grid HTML</div>");
    (generateBackgroundCss as jest.Mock).mockReturnValue("body { background-color: #fff; }");
  });

  test("Generate HTML/CSS project with multiple pages and components", async () => {
    // Arrange
    const testPages: Page[] = [
      {
        id: "1",
        name: "Home",
        content: {
          ROOT: {
            type: { resolvedName: "Background" },
            isCanvas: true,
            props: {
              backgroundColor: "#f0f0f0",
              layout: [
                { i: "Header", x: 0, y: 0, w: 12, h: 2 },
                { i: "MainContent", x: 0, y: 2, w: 12, h: 8 },
                { i: "Footer", x: 0, y: 10, w: 12, h: 2 },
              ],
            },
            displayName: "Background",
            custom: {},
            parent: null,
            hidden: false,
            nodes: [],
            linkedNodes: {
              Header: "Header",
              MainContent: "MainContent",
              Footer: "Footer",
            },
          },
          Header: {
            type: { resolvedName: "Container" },
            isCanvas: true,
            props: { backgroundColor: "#ffffff" },
            displayName: "Header",
            custom: { id: "header" },
            parent: "ROOT",
            hidden: false,
            nodes: ["Logo", "NavMenu"],
            linkedNodes: {},
          },
          Logo: {
            type: { resolvedName: "Image" },
            isCanvas: false,
            props: { src: "logo.png", alt: "Logo" },
            displayName: "Logo",
            custom: { id: "logo" },
            parent: "Header",
            hidden: false,
            nodes: [],
            linkedNodes: {},
          },
          NavMenu: {
            type: { resolvedName: "Container" },
            isCanvas: true,
            props: {},
            displayName: "Navigation",
            custom: { id: "nav-menu" },
            parent: "Header",
            hidden: false,
            nodes: ["NavItem1", "NavItem2"],
            linkedNodes: {},
          },
          NavItem1: {
            type: { resolvedName: "Button" },
            isCanvas: false,
            props: { text: "Home" },
            displayName: "NavItem",
            custom: { id: "nav-home" },
            parent: "NavMenu",
            hidden: false,
            nodes: [],
            linkedNodes: {},
          },
          NavItem2: {
            type: { resolvedName: "Button" },
            isCanvas: false,
            props: { text: "About" },
            displayName: "NavItem",
            custom: { id: "nav-about" },
            parent: "NavMenu",
            hidden: false,
            nodes: [],
            linkedNodes: {},
          },
          MainContent: {
            type: { resolvedName: "Container" },
            isCanvas: true,
            props: {},
            displayName: "Main Content",
            custom: { id: "main-content" },
            parent: "ROOT",
            hidden: false,
            nodes: ["WelcomeText"],
            linkedNodes: {},
          },
          WelcomeText: {
            type: { resolvedName: "Text" },
            isCanvas: false,
            props: { text: "Welcome to our website!" },
            displayName: "Text",
            custom: { id: "welcome-text" },
            parent: "MainContent",
            hidden: false,
            nodes: [],
            linkedNodes: {},
          },
          Footer: {
            type: { resolvedName: "Container" },
            isCanvas: true,
            props: { backgroundColor: "#f0f0f0" },
            displayName: "Footer",
            custom: { id: "footer" },
            parent: "ROOT",
            hidden: false,
            nodes: ["FooterText"],
            linkedNodes: {},
          },
          FooterText: {
            type: { resolvedName: "Text" },
            isCanvas: false,
            props: { text: "© 2023 Test Company" },
            displayName: "Text",
            custom: { id: "footer-text" },
            parent: "Footer",
            hidden: false,
            nodes: [],
            linkedNodes: {},
          },
        },
      },
    ];

    // Act
    await fileGenerator.generateProjectFiles(testPages);

    // Assert
    // Verify index.html was created correctly
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("index.html"),
      expect.stringContaining("<title>Home</title>")
    );

    // Verify Home.html was created correctly
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("Home.html"),
      expect.stringMatching(/Welcome to our website!/)
    );

    // Verify the CSS file was created correctly
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("css/styles.css"),
      expect.any(String)
    );

    // Verify Home.css was created correctly
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("css/Home.css"),
      expect.stringMatching(/#header\s*{\s*background-color:\s*#ffffff;/)
    );

    // Verify the main.js file was created
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("js/main.js"),
      expect.any(String)
    );

    // Verify that the logo image is handled correctly
    expect(fs.copyFileSync).toHaveBeenCalledWith(
      expect.stringContaining("logo.png"),
      expect.stringContaining("images/logo.png")
    );
  });
});
