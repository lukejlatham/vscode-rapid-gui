import {
  buildNodeTree,
  calculateLayoutDimensions,
  generateSectionNodes,
  createBackgroundNode,
} from "../../generateLayout/buildNodeTree"; // Update this import path
import { themeList, sectionsSchema, fontList } from "../../../webview-ui/src/types";
import { adjustLayoutToFitGrid } from "../../generateLayout/gridLayoutCorrection";
import { applyThemeToSchema } from "../../generateLayout/applyTheming";
import { z } from "zod";

// Mock the imported functions
jest.mock("../../generateLayout/gridLayoutCorrection");
jest.mock("../../generateLayout/applyTheming");

describe("buildNodeTree", () => {
  const mockSections: z.infer<typeof sectionsSchema> = [
    {
      section: "Header",
      xPosition: 0,
      yPosition: 0,
      width: 10,
      height: 1,
      flexDirection: "row",
      backgroundColor: "Main",
      children: [
        {
          element: "Label",
          text: "My App",
          bold: true,
          fontColor: "DarkAccent",
          fontSize: 14,
        },
      ],
    },
  ];

  beforeEach(() => {
    (adjustLayoutToFitGrid as jest.Mock).mockReturnValue([{ i: "0", x: 0, y: 0, w: 10, h: 1 }]);
    (applyThemeToSchema as jest.Mock).mockReturnValue(mockSections);
  });

  it("should generate a valid node tree", () => {
    const result = buildNodeTree(mockSections, "redairbnb", "GoogleTwitter");
    const parsedResult = JSON.parse(result);

    expect(parsedResult).toHaveProperty("ROOT");
    expect(parsedResult).toHaveProperty("HeaderGridCell");
    expect(parsedResult).toHaveProperty("HeaderContainer");
    expect(parsedResult).toHaveProperty("HeaderLabel0");
  });

  it("should throw an error for invalid theme", () => {
    expect(() => buildNodeTree(mockSections, "invalidTheme", "GoogleTwitter")).toThrow();
  });

  it("should apply correct font to all nodes with fontFamily prop", () => {
    console.log("Available fonts:", fontList);
    const result = buildNodeTree(mockSections, "redairbnb", "GoogleTwitter");
    const parsedResult = JSON.parse(result);

    const expectedFont =
      fontList.find((font) => font.name === "GoogleTwitter")?.displayName || "Roboto";
    console.log("Expected font:", expectedFont);

    Object.entries(parsedResult).forEach(([key, node]: [string, any]) => {
      if (node.props && "fontFamily" in node.props) {
        console.log(`Node ${key} fontFamily:`, node.props.fontFamily);
        expect(node.props.fontFamily).toBe(expectedFont);
      }
    });
  });

  it("should apply shadows when theme has shadows", () => {
    const themeName =
      themeList.find((theme) => theme.scheme.shadows)?.themeGenerationName || "redairbnb";
    const result = buildNodeTree(mockSections, themeName, "GoogleTwitter");
    const parsedResult = JSON.parse(result);

    Object.values(parsedResult).forEach((node: any) => {
      if (node.props && "shadowColor" in node.props) {
        expect(node.props.shadowColor).toBe("rgba(0, 0, 0, 0.6)");
        expect(node.props.shadowOffsetX).toBe(2);
        expect(node.props.shadowOffsetY).toBe(2);
        expect(node.props.shadowBlur).toBe(2);
      }
    });
  });
});

describe("calculateLayoutDimensions", () => {
  it("should calculate correct dimensions", () => {
    const layout: z.infer<typeof sectionsSchema> = [
      {
        section: "A",
        xPosition: 0,
        yPosition: 0,
        width: 5,
        height: 5,
        flexDirection: "row",
        backgroundColor: "Main",
        children: [],
      },
      {
        section: "B",
        xPosition: 5,
        yPosition: 5,
        width: 5,
        height: 5,
        flexDirection: "row",
        backgroundColor: "Main",
        children: [],
      },
    ];
    const result = calculateLayoutDimensions(layout);
    expect(result).toEqual({ rows: 10, columns: 10, ids: ["A", "B"] });
  });
});

describe("generateSectionNodes", () => {
  it("should generate correct nodes for a section", () => {
    const sections: z.infer<typeof sectionsSchema> = [
      {
        section: "Header",
        xPosition: 0,
        yPosition: 0,
        width: 10,
        height: 1,
        flexDirection: "row",
        backgroundColor: "Main",
        children: [
          {
            element: "Label",
            text: "My App",
            bold: true,
            fontColor: "DarkAccent",
            fontSize: 14,
          },
        ],
      },
    ];
    const result = generateSectionNodes(sections);
    expect(result).toHaveProperty("HeaderGridCell");
    expect(result).toHaveProperty("HeaderContainer");
    expect(result).toHaveProperty("HeaderLabel0");
  });
});

describe("createBackgroundNode", () => {
  it("should create a valid background node", () => {
    const dimensions = { rows: 10, columns: 10, ids: ["A", "B"] };
    const layout = [
      { i: "0", x: 0, y: 0, w: 5, h: 5 },
      { i: "1", x: 5, y: 5, w: 5, h: 5 },
    ];
    const backgroundColor = "#FFFFFF";
    const result = createBackgroundNode(dimensions, layout, backgroundColor);
    expect(result.type.resolvedName).toBe("Background");
    expect(result.props.rows).toBe(10);
    expect(result.props.columns).toBe(10);
    expect(result.props.backgroundColor).toBe("#FFFFFF");
    expect(result.linkedNodes).toEqual({ "0": "AGridCell", "1": "BGridCell" });
  });
});
