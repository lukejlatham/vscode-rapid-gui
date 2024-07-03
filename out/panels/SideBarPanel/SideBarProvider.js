"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SideBarProvider = void 0;
const vscode_1 = require("vscode");
class SideBarProvider {
    constructor(_extensionUri) {
        this._extensionUri = _extensionUri;
    }
    resolveWebviewView(webviewView, context, _token) {
        webviewView.webview.options = {
            enableScripts: true,
        };
        webviewView.webview.html = this._getWebviewContent(webviewView.webview);
        this._setWebviewMessageListener(webviewView);
    }
    _getWebviewContent(webview) {
        const nonce = this.getNonce();
        return `
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
        </style>
      </head>
      <body>
        <h1>Side Bar View</h1>
        <p>This is a basic sidebar webview.</p>
        <button onclick="sendMessage()">Send Message</button>
        <script nonce="${nonce}">
          const vscode = acquireVsCodeApi();
          function sendMessage() {
            vscode.postMessage({ command: 'alert', text: 'Hello from the sidebar!' });
          }
        </script>
      </body>
      </html>
    `;
    }
    _setWebviewMessageListener(webviewView) {
        webviewView.webview.onDidReceiveMessage((message) => {
            switch (message.command) {
                case 'alert':
                    vscode_1.window.showInformationMessage(message.text);
                    break;
            }
        });
    }
    getNonce() {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 32; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}
exports.SideBarProvider = SideBarProvider;
SideBarProvider.viewType = "sidebarView";
//# sourceMappingURL=SideBarProvider.js.map