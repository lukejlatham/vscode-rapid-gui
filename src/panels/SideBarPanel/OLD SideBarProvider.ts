import {
  CancellationToken,
  Uri,
  Webview,
  WebviewView,
  WebviewViewProvider,
  WebviewViewResolveContext,
  commands
} from "vscode";

export class SideBarProvider implements WebviewViewProvider {
  public static readonly viewType = "sidebarView";

  constructor(private readonly _extensionUri: Uri) {}

  public resolveWebviewView(
    webviewView: WebviewView,
    context: WebviewViewResolveContext,
    _token: CancellationToken
  ) {
    webviewView.webview.options = {
      enableScripts: true,
    };

    webviewView.webview.html = this._getWebviewContent(webviewView.webview);

    this._setWebviewMessageListener(webviewView);
  }

  private _getWebviewContent(webview: Webview): string {
    const nonce = this.getNonce();

    return /*html*/ `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Side Bar View</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 10px;
          }
          .codicon {
            font-family: "Codicon";
          }
        </style>
        <link href="https://unpkg.com/@vscode/codicons/dist/codicon.css" rel="stylesheet">
      </head>
      <body>
        <h1>Side Bar View</h1>
        <p>Template sidebar webview.</p>
        <vscode-button id="open-things-button">
          Open Things
          <span slot="start" class="codicon codicon-add"></span>
        </vscode-button>
        <script type="module" nonce="${nonce}">
          import { provideVSCodeDesignSystem, vsCodeButton } from "https://unpkg.com/@vscode/webview-ui-toolkit@1.0.0/dist/toolkit.min.js";
          provideVSCodeDesignSystem().register(vsCodeButton());

          const vscode = acquireVsCodeApi();
          document.getElementById('open-things-button').addEventListener('click', () => {
            vscode.postMessage({ command: 'Open Main' });
          });
        </script>
      </body>
      </html>
    `;
  }

  private _setWebviewMessageListener(webviewView: WebviewView) {
    webviewView.webview.onDidReceiveMessage((message) => {
      switch (message.command) {
        case 'Open Main':
          commands.executeCommand('mainWebviewPanel.showMainWebviewPanel');
          break;
      }
    });
  }

  private getNonce() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}
