"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SideBarPanel = void 0;
const vscode_1 = require("vscode");
const getUri_1 = require("../utilities/getUri");
const getNonce_1 = require("../utilities/getNonce");
class SideBarPanel {
    constructor(_extensionUri) {
        this._extensionUri = _extensionUri;
    }
    resolveWebviewView(webviewView, context, _token) {
        // Allow scripts in the webview
        webviewView.webview.options = {
            // Enable JavaScript in the webview
            enableScripts: true,
            // Restrict the webview to only load resources from the `out` directory
            localResourceRoots: [vscode_1.Uri.joinPath(this._extensionUri, "out")],
        };
        // Set the HTML content that will fill the webview view
        webviewView.webview.html = this._getWebviewContent(webviewView.webview, this._extensionUri);
        // Sets up an event listener to listen for messages passed from the webview view context
        // and executes code based on the message that is recieved
        // this._setWebviewMessageListener(webviewView);
    }
    _getWebviewContent(webview, extensionUri) {
        const webviewUri = (0, getUri_1.getUri)(webview, extensionUri, ["out", "webview.js"]);
        const stylesUri = (0, getUri_1.getUri)(webview, extensionUri, ["out", "styles.css"]);
        const nonce = (0, getNonce_1.getNonce)();
        // Tip: Install the es6-string-html VS Code extension to enable code highlighting below
        return /*html*/ `
			<!DOCTYPE html>
			<html lang="en">
				<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
					<link rel="stylesheet" href="${stylesUri}">
					<title>Weather Checker</title>
				</head>
				<body>
          <h1>Weather Checker</h1>
          <section id="search-container">
            <vscode-text-field
              id="location"
              placeholder="Location"
              value="Seattle, WA">
            </vscode-text-field>
            <vscode-dropdown id="unit">
              <vscode-option value="F">Fahrenheit</vscode-option>
              <vscode-option value="C">Celsius</vscode-option>
            </vscode-dropdown>
          </section>
          <vscode-button id="check-weather-button">Check</vscode-button>
          <h2>Current Weather</h2>
          <section id="results-container">
            <vscode-progress-ring id="loading" class="hidden"></vscode-progress-ring>
            <p id="icon"></p>
            <p id="summary"></p>
          </section>
          <script type="module" nonce="${nonce}" src="${webviewUri}"></script>
				</body>
			</html>
		`;
    }
}
exports.SideBarPanel = SideBarPanel;
SideBarPanel.viewType = "sidebar.SidebarView";
//# sourceMappingURL=SideBarPanel.js.map