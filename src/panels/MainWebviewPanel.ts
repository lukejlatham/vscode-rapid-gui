import {
  Disposable,
  Webview,
  WebviewPanel,
  window,
  Uri,
  ViewColumn,
  ExtensionContext,
  workspace,
} from "vscode";
import { getUri } from "../utilities/getUri";
import { getNonce } from "../utilities/getNonce";
import { getAzureOpenaiApiKeys } from "../utilities/azureUtilities";
import { handleFileSave, handleFileLoad } from "../projectManagement/projectSaveUtilities";
import { processSketch, processTextDescription } from "../generateLayout/orchestrator";
import { processCopilotMessages } from "../copilot";
import { handleImageUpload } from "../uploadImage/imageSave";
import { handleImageGenerate } from "../generateImage/handleImageGeneration";
import { handleGetUploadedImages } from "../uploadImage/handleGetUploadedImages";
import { convertToXaml } from "../WinUI3/xamlConverter";
import { convertToHtml } from "../HTML/convertToHtml";

export class MainWebviewPanel {
  public static currentPanel: MainWebviewPanel | undefined;
  private readonly _panel: WebviewPanel;
  private readonly _context: ExtensionContext;
  private _disposables: Disposable[] = [];
  private static allowedUrls: Set<string> = new Set();

  private constructor(panel: WebviewPanel, extensionUri: Uri, context: ExtensionContext) {
    this._panel = panel;
    this._context = context;

    // Set an event listener to listen for when the panel is disposed (i.e. when the user closes
    // the panel or when the panel is closed programmatically)
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    // Fetch the API endpoint and set the HTML content for the webview panel
    this._setWebviewContent(extensionUri);

    // Set an event listener to listen for messages passed from the webview context
    this._setWebviewMessageListener(this._panel.webview);
  }

  public static render(extensionUri: Uri, context: ExtensionContext) {
    if (MainWebviewPanel.currentPanel) {
      MainWebviewPanel.currentPanel._panel.reveal(ViewColumn.One);
    } else {
      const panel = window.createWebviewPanel(
        "showMainWebviewPanel",
        "UI Copilot",
        ViewColumn.One,
        {
          enableScripts: true,
          retainContextWhenHidden: true, // This preserves the webview state.
          localResourceRoots: [
            Uri.joinPath(extensionUri, "out"),
            Uri.joinPath(extensionUri, "webview-ui/build"),
            workspace.workspaceFolders?.[0]?.uri,
          ],
        }
      );

      panel.iconPath = {
        light: Uri.joinPath(extensionUri, "assets", "sparkle_lightmode_icon.svg"),
        dark: Uri.joinPath(extensionUri, "assets", "sparkle_darkmode_icon.svg"),
      };

      MainWebviewPanel.currentPanel = new MainWebviewPanel(panel, extensionUri, context);
    }
  }

  /**
   * Cleans up and disposes of webview resources when the webview panel is closed.
   */
  public dispose() {
    MainWebviewPanel.currentPanel = undefined;

    // Dispose of the current webview panel
    this._panel.dispose();

    // Dispose of all disposables (i.e. commands) for the current webview panel
    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }
  /**
   * Fetches the API endpoint from secrets and sets the HTML content for the webview panel.
   *
   * @param extensionUri The URI of the directory containing the extension
   */
  private async _setWebviewContent(extensionUri: Uri) {
    // const apiEndpoint = (await this._context.secrets.get("AZURE_OPENAI_API_ENDPOINT")) || "";
    // const connectSrcUrls = apiEndpoint;

    const connectSrcUrls = ""; // If we need to add URLs, we can add them here
    this._panel.webview.html = this._getWebviewContent(
      this._panel.webview,
      extensionUri,
      connectSrcUrls
    );
  }

  /**
   * Defines and returns the HTML that should be rendered within the webview panel.
   *
   * @remarks This is also the place where references to the React webview build files
   * are created and inserted into the webview HTML.
   *
   * @param webview A reference to the extension webview
   * @param extensionUri The URI of the directory containing the extension
   * @param connectSrcUrls The URLs allowed for connect-src in CSP
   * @returns A template string literal containing the HTML that should be
   * rendered within the webview panel
   */
  private _getWebviewContent(webview: Webview, extensionUri: Uri, connectSrcUrls: string): string {
    // The CSS file from the React build output
    const stylesUri = webview.asWebviewUri(
      Uri.joinPath(extensionUri, "webview-ui", "build", "static", "css", "main.css")
    );

    // The JS file from the React build output
    const scriptUri = webview.asWebviewUri(
      Uri.joinPath(extensionUri, "webview-ui", "build", "static", "js", "main.js")
    );
    const nonce = getNonce();

    return /* html */ `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
          <meta name="theme-color" content="#000000">
                    <meta http-equiv="Content-Security-Policy" content="
            default-src 'none'; 
            img-src vscode-resource: https:; 
            script-src 'nonce-${nonce}' vscode-resource:; 
            style-src 'unsafe-inline' vscode-resource:;
            font-src *;
            connect-src ${connectSrcUrls};
          ">
          <link rel="stylesheet" type="text/css" href="${stylesUri}">
  
          <title>Hello World</title>
        </head>
        <body>
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <div id="root"></div>
          <script nonce="${nonce}" src="${scriptUri}"></script>
        </body>
      </html>
    `;
  }

  /**
   * Sets up an event listener to listen for messages passed from the webview context and
   * executes code based on the message that is received.
   *
   * @param webview A reference to the extension webview
   */
  private _setWebviewMessageListener(webview: Webview) {
    webview.onDidReceiveMessage(
      async (message: any) => {
        const command = message.command;

        switch (command) {
          case "getAzureKeys":
            const secrets = await getAzureOpenaiApiKeys(this._context);
            webview.postMessage({ command: "setAzureApiKeys", ...secrets });
            window.showInformationMessage("Azure API keys received.");
            return;
          case "getOpenaiApiKeys":
            const openaiSecrets = await getAzureOpenaiApiKeys(this._context);
            webview.postMessage({ command: "setOpenaiApiKeys", ...openaiSecrets });
            window.showInformationMessage("OpenAI API keys received.");
          case "saveFile":
            await handleFileSave(message.contents, message.fileNames, this._context);
            return;
          case "loadFile":
            await handleFileLoad(
              this._context,
              // message.fileName,
              webview
            );
            return;
          case "processSketch":
            try {
              const sketchDescription = await processSketch(
                message.content,
                this._context,
                webview
              );
              webview.postMessage({ command: "sketchProcessed", content: sketchDescription });
              return;
            } catch (error) {
              console.error("Error in processSketch:", error);
              window.showErrorMessage("Error processing sketch:\n" + error.message);
              webview.postMessage({ command: "ProcessSketchError", error: error.message });
              return;
            }
          case "ProcessTextDescription":
            try {
              const textDescription = await processTextDescription(
                message.content,
                this._context,
                webview
              );
              webview.postMessage({
                command: "textDescriptionProcessed",
                content: textDescription,
              });
              return;
            } catch (error) {
              console.error("Error in processTextDescription:", error);
              window.showErrorMessage("Error processing text prompt:\n" + error.message);
              webview.postMessage({ command: "ProcessTextError", error: error.message });
              return;
            }
          case "aiUserMessage":
            const updatedMessages = await processCopilotMessages(message.content, this._context);
            webview.postMessage({ command: "aiCopilotMessage", content: updatedMessages });
            return;
          case "uploadImage":
            const filePath = await handleImageUpload(
              message.content,
              message.filename,
              this._context
            );
            if (filePath) {
              const imageUri = webview.asWebviewUri(Uri.file(filePath)).toString();
              window.showInformationMessage("Image saving command received.");
              webview.postMessage({ command: "imageUploaded", filePath: imageUri });
            }
            return;
          case "generateImage":
            try {
              console.log("Generate image command received.");
              const generatedImageFilePath = await handleImageGenerate(message.alt, this._context);
              console.log("Generated image file path:", generatedImageFilePath);
              if (generatedImageFilePath) {
                const generatedImageUri = webview
                  .asWebviewUri(Uri.file(generatedImageFilePath))
                  .toString();
                window.showInformationMessage("Image saving command received.");
                webview.postMessage({ command: "imageGenerated", filePath: generatedImageUri });
              }
              return;
            } catch (error) {
              console.error("Error in generateImage:", error);
              window.showErrorMessage("Error generating image:\n" + error.message);
              webview.postMessage({ command: "imageGenerationError", error: error.message });
              return;
            }
          case "deletedPageAlert":
            window.showErrorMessage(message.message);
            return;
          case "keyboardShortcut":
            this._handleKeyboardShortcut(message.key, message.ctrlKey, message.shiftKey);
            return;
          case "downloadCode":
            try {
              if (message.outputType === "html") {
                await convertToHtml(message.contents, message.fileNames, this._context);
              } else if (message.outputType === "winui3") {
                await convertToXaml(message.contents, message.fileNames, this._context);
              }
              webview.postMessage({ command: "codeDownloaded", success: true });
            } catch (error) {
              console.error("Error in downloadCode:", error);
              webview.postMessage({
                command: "codeDownloaded",
                success: false,
                error: error.message,
              });
            }
            return;
          case "scratch":
            webview.postMessage({ command: "projectStarted", type: "scratch" });
            break;
          case "templates":
            webview.postMessage({ command: "projectStarted", type: "templates" });
            break;
          case "text":
            webview.postMessage({ command: "projectStarted", type: "text" });
            break;
          case "sketch":
            webview.postMessage({ command: "projectStarted", type: "sketch" });
            break;
          case "getUploadedImages":
            // const uploadedImages = await handleGetUploadedImages(this._context);
            // get uploaded images as uri
            const filepaths = await handleGetUploadedImages(this._context);
            const uploadedImages = filepaths.map((filepath) =>
              webview.asWebviewUri(Uri.file(filepath)).toString()
            );

            webview.postMessage({ command: "setUploadedImages", content: uploadedImages });
        }
      },
      undefined,
      this._disposables
    );
  }

  private _handleKeyboardShortcut(key: string, ctrlKey: boolean, shiftKey: boolean) {
    if (ctrlKey) {
      switch (key) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
          this._panel.webview.postMessage({ command: "navigateTab", tabNumber: parseInt(key) });
          break;
        case "a":
          this._panel.webview.postMessage({ command: "addComponent" });
          break;
        case "p":
          this._panel.webview.postMessage({ command: "focusPropertyInspector" });
          break;
        case "g":
          this._panel.webview.postMessage({ command: "toggleGrid" });
          break;
        case "s":
          this._handleSaveProject();
          this.postMessage({ command: "save" });
          break;
        case "o":
          this._handleLoadProject();
          break;
        case "e":
          this._handleExportProject();
          break;
        case "z":
          this._panel.webview.postMessage({ command: "undo" });
          break;
        case "y":
          this._panel.webview.postMessage({ command: "redo" });
          break;
        case "r":
          this._panel.webview.postMessage({ command: "restartProject" });
          break;
        case "t":
          this._panel.webview.postMessage({ command: "toggleAccessibility" });
          break;
        case "n":
          this._panel.webview.postMessage({ command: "addPage" });
          break;
        case "x":
          this._panel.webview.postMessage({ command: "deletePage" });
          break;
        case "m":
          this._panel.webview.postMessage({ command: "renamePage" });
          break;
        case "u":
          this._panel.webview.postMessage({ command: "resetPage" });
          break;
        case "f":
          this._panel.webview.postMessage({ command: "applyFont" });
          break;
        case "h":
          this._panel.webview.postMessage({ command: "applyTheme" });
          break;
        case "i":
          this._panel.webview.postMessage({ command: "increaseRows" });
          break;
        case "k":
          this._panel.webview.postMessage({ command: "decreaseRows" });
          break;
        case "j":
          this._panel.webview.postMessage({ command: "increaseColumns" });
          break;
        case "l":
          this._panel.webview.postMessage({ command: "decreaseColumns" });
          break;
        case "s":
          this._panel.webview.postMessage({ command: "scratch" });
          break;
        case "t":
          this._panel.webview.postMessage({ command: "templates" });
          break;
        case "x":
          this._panel.webview.postMessage({ command: "text" });
          break;
        case "k":
          this._panel.webview.postMessage({ command: "sketch" });
          break;
      }
    }
    if (key === "Tab") {
      if (shiftKey) {
        this._panel.webview.postMessage({ command: "switchPage", direction: "previous" });
      } else {
        this._panel.webview.postMessage({ command: "switchPage", direction: "next" });
      }
    }
  }

  private async _handleSaveProject() {
    // Implement save project logic
    // You might want to send a message to the webview to get the current state
    this._panel.webview.postMessage({ command: "requestSaveState" });
    // Then handle the response in _setWebviewMessageListener
  }

  private async _handleLoadProject() {
    // Implement load project logic
    // You might want to show a file picker dialog here
    const result = await window.showOpenDialog({
      canSelectFiles: true,
      canSelectFolders: false,
      canSelectMany: false,
      filters: {
        "UI Copilot Projects": ["json"],
      },
    });
    if (result && result[0]) {
      // Read the file and send its contents to the webview
      const fileContent = await workspace.fs.readFile(result[0]);
      this._panel.webview.postMessage({ command: "loadProject", content: fileContent.toString() });
    }
  }

  private _handleExportProject() {
    // Implement export project logic
    this._panel.webview.postMessage({ command: "requestExportState" });
    // Then handle the response in _setWebviewMessageListener
  }

  public postMessage(message: any) {
    this._panel.webview.postMessage(message);
  }
}
