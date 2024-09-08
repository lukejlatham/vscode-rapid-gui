import { OpenAI } from "openai";
import { generateFromText } from "../../generateLayout/generateLayout";
import { buildNodeTree } from "../../generateLayout/buildNodeTree";
import { checkForObscenities } from "../../utilities/obscenityChecker";
import { layoutSchema } from "../../../webview-ui/src/types";

jest.mock("openai");
jest.mock("../../utilities/obscenityChecker");

describe("Layout Generation Orchestrator Integration Test", () => {
  let mockOpenAIClient: jest.Mocked<OpenAI>;

  beforeEach(() => {
    // Mock OpenAI client
    mockOpenAIClient = {
      beta: { chat: { completions: { parse: jest.fn() } as any } },
    } as any;

    // Mock obscenity checker
    (checkForObscenities as jest.Mock).mockImplementation(() => true);
  });

  it("should generate a layout, transform it into a node tree, and validate it", async () => {
    // Mock layout returned by OpenAI API (with fontSize as string before transformation)
    const mockGeneratedLayout = {
      theme: "microsoftWordBlue",
      fontFamily: "IBM",
      sections: [
        {
          section: "Header",
          xPosition: 0,
          yPosition: 0,
          width: 10,
          height: 1,
          flexDirection: "row",
          backgroundColor: "DarkAccent",
          children: [
            {
              element: "Label",
              text: "Microsoft Word",
              bold: true,
              fontColor: "Main",
              fontSize: "Title",
            },
          ],
        },
        {
          section: "Sidebar",
          xPosition: 0,
          yPosition: 1,
          width: 1,
          height: 9,
          flexDirection: "column",
          backgroundColor: "Main",
          children: [
            { element: "Icon", vscIcon: "document", iconSize: 32, iconColor: "DarkAccent" },
            { element: "Icon", vscIcon: "folder", iconSize: 32, iconColor: "DarkAccent" },
            { element: "Icon", vscIcon: "settings", iconSize: 32, iconColor: "DarkAccent" },
          ],
        },
        {
          section: "Main Document Area",
          xPosition: 1,
          yPosition: 1,
          width: 7,
          height: 7,
          flexDirection: "column",
          backgroundColor: "LightAccent",
          children: [
            { element: "Text", fontColor: "DarkAccent" },
            { element: "Input", placeholder: "Type your document here..." },
          ],
        },
        {
          section: "Page Layout",
          xPosition: 8,
          yPosition: 1,
          width: 2,
          height: 3,
          flexDirection: "column",
          backgroundColor: "Main",
          children: [{ element: "RadioButtons", optionLabels: ["Portrait", "Landscape"] }],
        },
        {
          section: "Font Settings",
          xPosition: 8,
          yPosition: 4,
          width: 2,
          height: 2,
          flexDirection: "column",
          backgroundColor: "Main",
          children: [
            { element: "Dropdown", optionLabels: ["Arial", "Times New Roman", "Calibri"] },
            { element: "Slider", header: "Font Size", backgroundColor: "LightAccent" },
          ],
        },
        {
          section: "Footer",
          xPosition: 1,
          yPosition: 8,
          width: 9,
          height: 2,
          flexDirection: "row",
          backgroundColor: "DarkAccent",
          children: [
            {
              element: "Label",
              text: "Status: Ready",
              bold: false,
              fontColor: "Main",
              fontSize: "Label",
            },
          ],
        },
      ],
    };

    (mockOpenAIClient.beta.chat.completions.parse as jest.Mock).mockResolvedValue({
      choices: [{ message: { parsed: mockGeneratedLayout } }],
      usage: { prompt_tokens: 100, completion_tokens: 200 },
    });

    // Step 1: Generate the layout using the mocked OpenAI API
    const layout = await generateFromText(mockOpenAIClient, "Create a layout for VS Code");

    // Ensure layout is parsed via Zod schema before passing to buildNodeTree
    const parsedLayout = layoutSchema.parse(layout); // This will apply transformations

    // Step 2: Pass the parsed layout through buildNodeTree
    const nodeTree = buildNodeTree(
      parsedLayout.sections,
      parsedLayout.theme,
      parsedLayout.fontFamily
    );

    expect(nodeTree).toMatchSnapshot(); // Snapshot to validate the structure
  });
});
