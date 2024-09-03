// Mock the vscode module
jest.mock(
  "vscode",
  () => ({
    ExtensionContext: jest.fn(),
    Webview: jest.fn(),
  }),
  { virtual: true }
);

import { processSketch } from "../../generateLayout/orchestrator";
import { getOpenaiApiKeys } from "../../utilities/openaiUtilities";
import { generateFromSketch } from "../../generateLayout/generateLayout";
import { buildNodeTree } from "../../generateLayout/buildNodeTree";

// Mock other dependencies
jest.mock("../../utilities/openaiUtilities");
jest.mock("../../generateLayout/generateLayout");
jest.mock("../../generateLayout/buildNodeTree");

describe("orchestrator", () => {
  let mockContext: any;
  let mockWebview: any;

  beforeEach(() => {
    jest.resetAllMocks();

    mockContext = {};
    mockWebview = {
      postMessage: jest.fn(),
    };

    (getOpenaiApiKeys as jest.Mock).mockResolvedValue({ openaiApiKey: "mock-api-key" });
  });

  it("should process a sketch input successfully", async () => {
    const mockSketch = "mock sketch data";
    const mockGeneratedLayout = {
      theme: "microsoftWordBlue",
      fontFamily: "IBM",
      sections: [],
    };
    const mockNodeTree = { type: "root", children: [] };

    (generateFromSketch as jest.Mock).mockResolvedValue(mockGeneratedLayout);
    (buildNodeTree as jest.Mock).mockReturnValue(mockNodeTree);

    const result = await processSketch(mockSketch, mockContext, mockWebview);

    expect(generateFromSketch).toHaveBeenCalledWith(expect.anything(), mockSketch);
    expect(buildNodeTree).toHaveBeenCalledWith(
      mockGeneratedLayout.sections,
      mockGeneratedLayout.theme,
      mockGeneratedLayout.fontFamily
    );
    expect(result).toEqual(mockNodeTree);
  });
});
