import { FileGenerator } from "../WinUI3/fileGenerator";
import { Page } from "../../webview-ui/src/types";
import * as fs from "fs";
import * as path from "path";
import { handleImageSource, findImageNodes } from "../WinUI3/components/imageTranslator";
import { generateGridXaml } from "../WinUI3/gridGenerator";

// Mock TemplateManager to provide XAML content
jest.mock("../WinUI3/TemplateManager", () => {
  return {
    TemplateManager: jest.fn().mockImplementation(() => ({
      getTemplate: jest.fn().mockImplementation((templateName) => {
        if (templateName === "MainPage.xaml") {
          return `<Grid>Mocked Grid Content</Grid><Button Content="Click me" Background="#0078D4" Foreground="#FFFFFF" FontSize="16" CornerRadius="4" />`;
        }
        return "mocked template content";
      }),
      fillTemplate: jest.fn().mockReturnValue(`<Button Content="Click me"`),
      getTemplatesPath: jest.fn().mockReturnValue("/mock/templates/path"),
      loadTemplates: jest.fn(),
    })),
  };
});

jest.mock("fs");
jest.mock("path");
jest.mock("../WinUI3/components/imageTranslator");
jest.mock("../WinUI3/gridGenerator");

describe("WinUI 3 Project Generation Integration Test", () => {
  const testProjectName = "TestWinUI3Project";
  const testOutputPath = "/test/output/winui3";
  const testNamespace = "TestNamespace";
  const testAppDescription = "Test WinUI 3 App";
  const testPublisher = "TestPublisher";

  let fileGenerator: FileGenerator;

  beforeEach(() => {
    fileGenerator = new FileGenerator(
      testProjectName,
      testOutputPath,
      new (jest.requireMock("../WinUI3/TemplateManager").TemplateManager)(),
      testNamespace,
      testAppDescription,
      testPublisher
    );

    jest.clearAllMocks();
    (fs.writeFileSync as jest.Mock).mockImplementation(() => {});
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    (fs.mkdirSync as jest.Mock).mockImplementation(() => {});
    (fs.readdirSync as jest.Mock).mockReturnValue([]);
    (fs.copyFileSync as jest.Mock).mockImplementation(() => {});
    (fs.readFileSync as jest.Mock).mockReturnValue("<Project></Project>");
    (path.join as jest.Mock).mockImplementation((...args) => args.join("/"));
    (path.dirname as jest.Mock).mockImplementation((p) => p.split("/").slice(0, -1).join("/"));
    (path.basename as jest.Mock).mockImplementation((p) => p.split("/").pop());
    (path.relative as jest.Mock).mockImplementation((from, to) => to);
    (handleImageSource as jest.Mock).mockResolvedValue("/Assets/test-image.png");
    (findImageNodes as jest.Mock).mockReturnValue([
      { props: { src: "https://example.com/image.jpg" } },
    ]);
    (generateGridXaml as jest.Mock).mockResolvedValue("<Grid>Mocked Grid Content</Grid>");
  });

  test("Generate WinUI 3 project with multiple pages and components", async () => {
    // Arrange
    const testPages: Page[] = [
      {
        id: "1",
        name: "MainPage",
        content: {
          ROOT: {
            type: { resolvedName: "Background" },
            isCanvas: true,
            props: {
              rows: 2,
              columns: 2,
              backgroundColor: "#FFFFFF",
              layout: [
                { i: "Button1", x: 0, y: 0, w: 1, h: 1 },
                { i: "TextBlock1", x: 1, y: 1, w: 1, h: 1 },
              ],
            },
            displayName: "Background",
            custom: {},
            parent: null,
            hidden: false,
            nodes: [],
            linkedNodes: {
              Button1: "Button1",
              TextBlock1: "TextBlock1",
            },
          },
          Button1: {
            type: { resolvedName: "Button" },
            isCanvas: false,
            props: {
              text: "Click me",
              backgroundColor: "#0078D4",
              fontColor: "#FFFFFF",
              fontSize: 16,
              borderRadius: 4,
            },
            displayName: "Button",
            custom: { id: "button1" },
            parent: "ROOT",
            hidden: false,
            nodes: [],
            linkedNodes: {},
          },
          TextBlock1: {
            type: { resolvedName: "Text" },
            isCanvas: false,
            props: {
              text: "Hello, WinUI 3!",
              fontSize: 24,
              fontColor: "#000000",
              bold: true,
              italic: false,
              underline: false,
              textAlign: "center",
            },
            displayName: "Text",
            custom: { id: "text1" },
            parent: "ROOT",
            hidden: false,
            nodes: [],
            linkedNodes: {},
          },
        },
      },
    ];

    // Act
    await fileGenerator.generateProjectFiles(testPages, testOutputPath);

    // Assert
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
      expect.stringContaining(`${testProjectName}.csproj`),
      expect.any(String)
    );
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("Views/MainPage.xaml"),
      expect.any(String)
    );
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining("Views/MainPage.xaml.cs"),
      expect.any(String)
    );

    // Check if the grid generator was called
    expect(generateGridXaml).toHaveBeenCalledWith(testPages[0], testOutputPath);

    // Check if the image processor was called
    expect(findImageNodes).toHaveBeenCalled();
    expect(handleImageSource).toHaveBeenCalled();

    // Verify the content of MainPage.xaml
    const mainPageXamlCalls = (fs.writeFileSync as jest.Mock).mock.calls.filter((call) =>
      call[0].includes("Views/MainPage.xaml")
    );
    expect(mainPageXamlCalls.length).toBe(2);
    const mainPageXamlContent = mainPageXamlCalls[0][1];

    // Check for mocked grid content and button XAML
    expect(mainPageXamlContent).toContain("<Grid>Mocked Grid Content</Grid>");
    expect(mainPageXamlContent).toContain('<Button Content="Click me"');
    expect(mainPageXamlContent).toContain('Background="#0078D4"');
    expect(mainPageXamlContent).toContain('Foreground="#FFFFFF"');
    expect(mainPageXamlContent).toContain('FontSize="16"');
    expect(mainPageXamlContent).toContain('CornerRadius="4"');

    // Check for TextBlock XAML
    expect(mainPageXamlContent).toContain('<TextBlock Text="Hello, WinUI 3!"');
    expect(mainPageXamlContent).toContain('FontSize="24"');
    expect(mainPageXamlContent).toContain('Foreground="#000000"');
    expect(mainPageXamlContent).toContain('FontWeight="Bold"');
    expect(mainPageXamlContent).toContain('TextAlignment="Center"');
  });
});
