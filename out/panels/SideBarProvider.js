"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SideBarProvider = void 0;
class SideBarProvider {
    constructor(_extensionUri) {
        this._extensionUri = _extensionUri;
        this._disposables = [];
    }
    resolveWebviewView(webviewView, context, _token) {
        this._view = webviewView;
        // Allow scripts in the webview
        webviewView.webview.options = {
            enableScripts: true,
        };
        // Set the HTML content that will fill the webview view
        webviewView.webview.html = this._getSideBarContent(webviewView.webview);
        // Set up message listener
    }
    _getSideBarContent(webview) {
        // Load the webview content here, this is just a basic example
        return /* html */ `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Webview</title>
      </head>
      <body>
        <h1>Hello from the Webview!</h1>
        <p>This is a simple webview example.</p>
      </body>
      </html>`;
    }
}
exports.SideBarProvider = SideBarProvider;
SideBarProvider.viewType = "sidebar.showSideBar";
//# sourceMappingURL=SideBarProvider.js.map