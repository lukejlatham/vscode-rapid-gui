import * as path from "path";
import * as fs from "fs";

import { handleImageGenerate } from "../../generateImage/handleImageGeneration";

jest.mock(
  "vscode",
  () => ({
    workspace: {
      workspaceFolders: [{ uri: { fsPath: "/mock/workspace" } }],
    },
    window: {
      showErrorMessage: jest.fn(),
      showInformationMessage: jest.fn(),
    },
  }),
  { virtual: true }
);

jest.mock("../../utilities/openaiUtilities", () => ({
  getOpenaiApiKeys: jest.fn().mockResolvedValue({ apiKey: "mock-api-key", orgId: "mock-org-id" }),
}));

jest.mock("../../generateImage/openaiGenerateImage", () => ({
  generateImage: jest.fn().mockResolvedValue("data:image/png;base64,mockBase64Data"),
}));

jest.mock("fs", () => ({
  promises: {
    writeFile: jest.fn(),
  },
  existsSync: jest.fn(),
  mkdirSync: jest.fn(),
}));

import * as vscode from "vscode";

describe("handleImageGenerate", () => {
  const mockContext = {
    extensionPath: "/mock/extension/path",
    subscriptions: [],
  } as vscode.ExtensionContext;

  beforeEach(() => {
    jest.clearAllMocks();
    (fs.existsSync as jest.Mock).mockReturnValue(false);
  });

  it("should create directory if it does not exist", async () => {
    await handleImageGenerate("test image", mockContext);
    expect(fs.mkdirSync).toHaveBeenCalledWith(path.join("/mock/workspace", "uploaded_images"), {
      recursive: true,
    });
  });

  it("should generate and save image with sanitized filename", async () => {
    const consoleSpy = jest.spyOn(console, "log");
    const result = await handleImageGenerate("Test Image!", mockContext);

    expect(fs.promises.writeFile).toHaveBeenCalledWith(
      path.join("/mock/workspace", "uploaded_images", "test_image_.png"),
      expect.any(Buffer)
    );
    expect(result).toBe(path.join("/mock/workspace", "uploaded_images", "test_image_.png"));
    expect(consoleSpy).toHaveBeenCalledWith(
      "Generated image has been saved at",
      path.join("/mock/workspace", "uploaded_images", "test_image_.png")
    );
    consoleSpy.mockRestore();
  });

  it("should show error message if no workspace folder is open", async () => {
    const originalWorkspaceFolders = vscode.workspace.workspaceFolders;
    (vscode.workspace as any).workspaceFolders = undefined;

    const result = await handleImageGenerate("test image", mockContext);

    expect(vscode.window.showErrorMessage).toHaveBeenCalledWith("No workspace folder is open");
    expect(result).toBe("");

    (vscode.workspace as any).workspaceFolders = originalWorkspaceFolders;
  });

  it("should handle file write error", async () => {
    (fs.promises.writeFile as jest.Mock).mockRejectedValue(new Error("Write error"));

    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const result = await handleImageGenerate("test image", mockContext);

    expect(vscode.window.showErrorMessage).toHaveBeenCalledWith("Failed to save generated image");
    expect(result).toBe("");
    expect(consoleErrorSpy).toHaveBeenCalledWith("Error saving generated image", expect.any(Error));
    consoleErrorSpy.mockRestore();
  });

  it("should use existing directory if it already exists", async () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);

    await handleImageGenerate("test image", mockContext);

    expect(fs.mkdirSync).not.toHaveBeenCalled();
  });

  it("should show information message when saving image", async () => {
    await handleImageGenerate("test image", mockContext);

    expect(vscode.window.showInformationMessage).toHaveBeenCalledWith("Saving generated image...");
  });
});
