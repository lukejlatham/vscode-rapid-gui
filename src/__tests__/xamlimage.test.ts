import * as fs from "fs";
import * as path from "path";
import fetch from "node-fetch";
import { handleImageSource } from "../WinUI3/components/imageTranslator";

// Mock the fs module
jest.mock("fs", () => ({
  existsSync: jest.fn(),
  mkdirSync: jest.fn(),
  copyFileSync: jest.fn(),
  writeFileSync: jest.fn(),
}));

// Mock the path module
jest.mock("path", () => ({
  join: jest.fn((...args) => args.join("/")),
  basename: jest.fn((filePath) => filePath.split("/").pop()),
  normalize: jest.fn((filePath) => filePath),
}));

// Mock node-fetch
jest.mock("node-fetch");

describe("handleImageSource", () => {
  const mockProjectPath = "/mock/project/path";
  const mockAssetsPath = "/mock/project/path/Assets";

  beforeEach(() => {
    jest.clearAllMocks();
    (fs.existsSync as jest.Mock).mockReturnValue(true);
  });

  test("handles vscode-resource URL correctly", async () => {
    const mockSrc = "https://file+.vscode-resource.vscode-cdn.net/path/to/image.png";
    (fs.existsSync as jest.Mock).mockReturnValueOnce(false).mockReturnValueOnce(true);

    const result = await handleImageSource(mockSrc, mockProjectPath);

    expect(result).toBe("/Assets/image.png");
    expect(fs.copyFileSync).toHaveBeenCalledWith(
      "path/to/image.png", // Remove the leading slash here
      "/mock/project/path/Assets/image.png"
    );
  });

  test("handles uploaded_images URL correctly", async () => {
    const mockSrc = "https://file+.vscode-resource.vscode-cdn.net/uploaded_images/image.png";
    (fs.existsSync as jest.Mock)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);

    const result = await handleImageSource(mockSrc, mockProjectPath);

    expect(result).toBe("/Assets/image.png");
    expect(fs.copyFileSync).toHaveBeenCalledWith(
      "/mock/project/path/../../uploaded_images/image.png",
      "/mock/project/path/Assets/image.png"
    );
  });

  test("handles http/https URL correctly", async () => {
    const mockSrc = "https://example.com/image.png";
    const mockBuffer = Buffer.from("mock image data");
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      buffer: () => Promise.resolve(mockBuffer),
    } as any);

    const result = await handleImageSource(mockSrc, mockProjectPath);

    expect(result).toBe("/Assets/image.png");
    expect(fetch).toHaveBeenCalledWith(mockSrc);
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      "/mock/project/path/Assets/image.png",
      mockBuffer
    );
  });

  test("creates Assets folder if it does not exist", async () => {
    const mockSrc = "https://example.com/image.png";
    (fs.existsSync as jest.Mock).mockReturnValueOnce(false);
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      buffer: () => Promise.resolve(Buffer.from("mock image data")),
    } as any);

    await handleImageSource(mockSrc, mockProjectPath);

    expect(fs.mkdirSync).toHaveBeenCalledWith(mockAssetsPath, { recursive: true });
  });

  test("handles unsupported image source", async () => {
    const mockSrc = "unsupported://example.com/image.png";

    const result = await handleImageSource(mockSrc, mockProjectPath);

    expect(result).toBe("");
  });

  test("handles error when downloading image", async () => {
    const mockSrc = "https://example.com/image.png";
    (fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(
      new Error("Download failed")
    );

    const result = await handleImageSource(mockSrc, mockProjectPath);

    expect(result).toBe("");
  });

  test("handles error when file not found for vscode-resource", async () => {
    const mockSrc = "https://file+.vscode-resource.vscode-cdn.net/path/to/image.png";
    (fs.existsSync as jest.Mock).mockReturnValue(false);

    const result = await handleImageSource(mockSrc, mockProjectPath);

    expect(result).toBe("");
    expect(fs.copyFileSync).not.toHaveBeenCalled();
  });
});
