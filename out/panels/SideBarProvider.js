"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SideBarProvider = void 0;
const vscode = require("vscode");
class SideBarProvider {
    constructor(_extensionUri) {
        this._extensionUri = _extensionUri;
    }
    resolveWebviewView(webviewView, context, _token) {
        this._view = webviewView;
        webviewView.webview.options = {
            enableScripts: true
        };
        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
        webviewView.webview.onDidReceiveMessage((message) => {
            switch (message.command) {
                case 'alert':
                    vscode.window.showInformationMessage(message.text);
                    return;
            }
        }, undefined, []);
    }
    _getHtmlForWebview(webview) {
        const nonce = this.getNonce();
        return /*html*/ `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
          }
        </style>
        <title>Side Bar View</title>
      </head>
      <body>
        <h1>Side Bar View</h1>
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
SideBarProvider.viewType = 'sidebarView';
//# sourceMappingURL=SideBarProvider.js.map