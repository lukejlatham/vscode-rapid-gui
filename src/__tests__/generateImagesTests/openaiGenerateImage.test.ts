import { OpenAI } from "openai";
import { generateImage } from "../../generateImage/openaiGenerateImage";
import { getOpenaiApiKeys } from "../../utilities/openaiUtilities";
import { checkForObscenities } from "../../utilities/obscenityChecker";
import { ImagesResponse } from "openai/resources/images";

// Mock the vscode module
jest.mock(
  "vscode",
  () => ({
    ExtensionContext: class {},
  }),
  { virtual: true }
);

// Mock the utility functions
jest.mock("../../utilities/openaiUtilities");
jest.mock("../../utilities/obscenityChecker");

// Mock the OpenAI client
jest.mock("openai");

describe("generateImage", () => {
  let mockOpenAIClient: jest.Mocked<OpenAI>;
  const mockContext = {} as any;
  const mockAlt = "test image";
  const mockBase64 = "base64EncodedImageString";

  beforeEach(() => {
    jest.clearAllMocks();
    (getOpenaiApiKeys as jest.Mock).mockResolvedValue({ openaiApiKey: "mock-api-key" });
    (checkForObscenities as jest.Mock).mockImplementation(() => {});

    mockOpenAIClient = {
      images: {
        generate: jest.fn().mockResolvedValue({
          data: [{ b64_json: mockBase64 }],
        }) as jest.MockedFunction<OpenAI["images"]["generate"]>,
      },
    } as any;

    (OpenAI as jest.MockedClass<typeof OpenAI>).mockImplementation(() => mockOpenAIClient);
  });

  it("should generate an image successfully", async () => {
    const result = await generateImage(mockAlt, mockContext);

    expect(checkForObscenities).toHaveBeenCalledWith(mockAlt);
    expect(getOpenaiApiKeys).toHaveBeenCalledWith(mockContext);
    expect(OpenAI).toHaveBeenCalledWith({ apiKey: "mock-api-key" });
    expect(result).toBe(mockBase64);
  });

  it("should use the correct OpenAI parameters", async () => {
    await generateImage(mockAlt, mockContext);

    expect(mockOpenAIClient.images.generate).toHaveBeenCalledWith({
      model: "dall-e-3",
      prompt: expect.stringContaining(mockAlt),
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
      style: "natural",
    });
  });

  it("should include the safety prompt", async () => {
    await generateImage(mockAlt, mockContext);

    expect(mockOpenAIClient.images.generate).toHaveBeenCalledWith(
      expect.objectContaining({
        prompt: expect.stringContaining(
          "Generate an image that is safe, ethical, and appropriate for all audiences"
        ),
      })
    );
  });

  it("should throw an error if obscenities are detected", async () => {
    const obscenityError = new Error("Obscenity detected");
    (checkForObscenities as jest.Mock).mockImplementation(() => {
      throw obscenityError;
    });

    await expect(generateImage(mockAlt, mockContext)).rejects.toThrow(obscenityError);
  });

  it("should throw an error if OpenAI API call fails", async () => {
    const apiError = new Error("API Error");
    (
      mockOpenAIClient.images.generate as jest.MockedFunction<
        typeof mockOpenAIClient.images.generate
      >
    ).mockRejectedValue(apiError);

    await expect(generateImage(mockAlt, mockContext)).rejects.toThrow(apiError);
  });

  it("should log an error message if an error occurs", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const error = new Error("Test error");
    (
      mockOpenAIClient.images.generate as jest.MockedFunction<
        typeof mockOpenAIClient.images.generate
      >
    ).mockRejectedValue(error);

    await expect(generateImage(mockAlt, mockContext)).rejects.toThrow(error);
    expect(consoleErrorSpy).toHaveBeenCalledWith("Error in generateImage:", error);

    consoleErrorSpy.mockRestore();
  });

  it("should log a success message when image is generated", async () => {
    const consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    await generateImage(mockAlt, mockContext);

    expect(consoleLogSpy).toHaveBeenCalledWith(
      "Image generated. Please ensure the content is appropriate."
    );

    consoleLogSpy.mockRestore();
  });
});
