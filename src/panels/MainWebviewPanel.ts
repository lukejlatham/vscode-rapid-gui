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
import { getAzureOpenaiApiKeys } from "../utilities/azureApiKeyStorage";
import { handleFileSave, handleFileLoad } from "../utilities/projectSaveUtilities";
import { processSketch, processTextDescription } from "../generateLayout/generateLayout";
import { processCopilotMessages } from "../copilot";
import { handleImageUpload } from "../utilities/imageSave";
import { convertToXaml } from "../utilities/xamlConverter";

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
      const panel = window.createWebviewPanel("showMainWebviewPanel", "UI Studio", ViewColumn.One, {
        enableScripts: true,
        localResourceRoots: [
          Uri.joinPath(extensionUri, "out"),
          Uri.joinPath(extensionUri, "webview-ui/build"),
          workspace.workspaceFolders?.[0]?.uri,
        ],
      });

      MainWebviewPanel.currentPanel = new MainWebviewPanel(panel, extensionUri, context);
    }
    return MainWebviewPanel.currentPanel;
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
          case "saveFile":
            await handleFileSave(message.contents, message.fileNames, this._context);
            // check this
            return;
          case "loadFile":
            await handleFileLoad(
              this._context,
              // message.fileName,
              webview
            );
            return;
          case "processSketch":
            const sketchDescription = await processSketch(message.content, this._context, webview);
            webview.postMessage({ command: "sketchProcessed", content: sketchDescription });
            return;
          case "ProcessTextDescription":
            const textDescription = await processTextDescription(
              message.content,
              this._context,
              webview
            );
            webview.postMessage({ command: "textDescriptionProcessed", content: textDescription });
            return;
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
          case "deletedPageAlert":
            window.showErrorMessage(message.message);
            return;
          case "downloadCode":
            await convertToXaml(message.content, message.fileName, this._context);
            return;
        }
      },
      undefined,
      this._disposables
    );
  }

  public postMessage(message: any) {
    this._panel.webview.postMessage(message);
  }

  public get webview(): Webview {
    return this._panel.webview;
  }
}
