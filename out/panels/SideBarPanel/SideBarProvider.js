"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SideBarProvider = void 0;
class SideBarProvider {
    constructor(_extensionUri) {
        this._extensionUri = _extensionUri;
    }
    resolveWebviewView(webviewView, context, _token) {
        this._view = webviewView;
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri]
        };
        webviewView.webview.html = this._getHtmlForWebview();
    }
    _getHtmlForWebview() {
        return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Sidebar Panel</title>
            </head>
            <body>
                <h1>Hello from the Sidebar!</h1>
            </body>
            </html>`;
    }
}
exports.SideBarProvider = SideBarProvider;
SideBarProvider.viewType = 'sidebar.showSideBar'; // Unique view type ID
//# sourceMappingURL=SideBarProvider.js.map