import { OpenAI } from "openai";
import { generateFromText, generateFromSketch } from "../../generateLayout/generateLayout";
import { checkForObscenities } from "../../utilities/obscenityChecker";
import {
  layoutSchema,
  themeGenerationNames,
  fontGenerationNames,
} from "../../../webview-ui/src/types";

// Mock the OpenAI client and checkForObscenities function
jest.mock("openai");
jest.mock("../../utilities/obscenityChecker");

describe("Layout Generator", () => {
  let mockOpenAIClient: jest.Mocked<OpenAI>;

  beforeEach(() => {
    mockOpenAIClient = {
      beta: {
        chat: {
          completions: {
            parse: jest.fn(),
          } as any,
        },
      },
    } as any;

    (checkForObscenities as jest.Mock).mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const validMockLayout = {
    theme: themeGenerationNames[0],
    fontFamily: fontGenerationNames[0],
    sections: [
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
            fontSize: "Title",
          },
        ],
      },
    ],
  };

  describe("generateFromText", () => {
    it("should generate a layout from text description", async () => {
      (mockOpenAIClient.beta.chat.completions.parse as jest.Mock).mockResolvedValue({
        choices: [{ message: { parsed: validMockLayout } }],
        usage: { prompt_tokens: 100, completion_tokens: 200 },
      });

      const result = await generateFromText(mockOpenAIClient, "Create a simple app layout");

      expect(result).toEqual(validMockLayout);
      expect(mockOpenAIClient.beta.chat.completions.parse).toHaveBeenCalledTimes(1);
      expect(checkForObscenities).toHaveBeenCalledTimes(2);
      expect(() => layoutSchema.parse(result)).not.toThrow();
    });

    it("should throw an error if OpenAI client fails", async () => {
      (mockOpenAIClient.beta.chat.completions.parse as jest.Mock).mockRejectedValue(
        new Error("API Error")
      );

      await expect(
        generateFromText(mockOpenAIClient, "Create a simple app layout")
      ).rejects.toThrow("API Error");
    });

    it("should throw an error if obscenity is detected", async () => {
      (checkForObscenities as jest.Mock).mockImplementation(() => {
        throw new Error("Obscenity detected");
      });

      await expect(
        generateFromText(mockOpenAIClient, "Create a simple app layout")
      ).rejects.toThrow("Obscenity detected");
    });
  });

  describe("generateFromSketch", () => {
    it("should generate a layout from a sketch", async () => {
      (mockOpenAIClient.beta.chat.completions.parse as jest.Mock).mockResolvedValue({
        choices: [{ message: { parsed: validMockLayout } }],
        usage: { prompt_tokens: 150, completion_tokens: 250 },
      });

      const result = await generateFromSketch(mockOpenAIClient, "base64EncodedImageString");

      expect(result).toEqual(validMockLayout);
      expect(mockOpenAIClient.beta.chat.completions.parse).toHaveBeenCalledTimes(1);
      expect(checkForObscenities).toHaveBeenCalledTimes(1);
      expect(() => layoutSchema.parse(result)).not.toThrow();
    });

    it("should throw an error if OpenAI client fails", async () => {
      (mockOpenAIClient.beta.chat.completions.parse as jest.Mock).mockRejectedValue(
        new Error("API Error")
      );

      await expect(
        generateFromSketch(mockOpenAIClient, "base64EncodedImageString")
      ).rejects.toThrow("API Error");
    });

    it("should throw an error if obscenity is detected in the response", async () => {
      (mockOpenAIClient.beta.chat.completions.parse as jest.Mock).mockResolvedValue({
        choices: [{ message: { parsed: validMockLayout } }],
        usage: { prompt_tokens: 150, completion_tokens: 250 },
      });

      (checkForObscenities as jest.Mock).mockImplementation(() => {
        throw new Error("Obscenity detected");
      });

      await expect(
        generateFromSketch(mockOpenAIClient, "base64EncodedImageString")
      ).rejects.toThrow("Obscenity detected");
    });
  });

  describe("Layout Schema Validation", () => {
    it("should validate the generated layout against the schema", async () => {
      (mockOpenAIClient.beta.chat.completions.parse as jest.Mock).mockResolvedValue({
        choices: [{ message: { parsed: validMockLayout } }],
        usage: { prompt_tokens: 100, completion_tokens: 200 },
      });

      const result = await generateFromText(mockOpenAIClient, "Create a simple app layout");

      expect(() => layoutSchema.parse(result)).not.toThrow();
    });

    it("should throw an error for invalid theme", async () => {
      const invalidThemeLayout = { ...validMockLayout, theme: "InvalidTheme" };
      (mockOpenAIClient.beta.chat.completions.parse as jest.Mock).mockResolvedValue({
        choices: [{ message: { parsed: invalidThemeLayout } }],
        usage: { prompt_tokens: 100, completion_tokens: 200 },
      });

      const result = await generateFromText(mockOpenAIClient, "Create a simple app layout");

      expect(() => layoutSchema.parse(result)).toThrow();
    });

    it("should throw an error for invalid fontFamily", async () => {
      const invalidFontLayout = { ...validMockLayout, fontFamily: "InvalidFont" };
      (mockOpenAIClient.beta.chat.completions.parse as jest.Mock).mockResolvedValue({
        choices: [{ message: { parsed: invalidFontLayout } }],
        usage: { prompt_tokens: 100, completion_tokens: 200 },
      });

      const result = await generateFromText(mockOpenAIClient, "Create a simple app layout");

      expect(() => layoutSchema.parse(result)).toThrow();
    });
  });
});
