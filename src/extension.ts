import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('vscode-test-2.openWebView', () => {
      const panel = vscode.window.createWebviewPanel(
        'testWebview', // Identifies the type of the webview. Used internally
        'Test Webview', // Title of the panel displayed to the user
        vscode.ViewColumn.One, // Editor column to show the new webview panel in
        {} // Webview options
      );

      panel.webview.html = getWebviewContent();
    })
  );

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      'vscodeTest2View',
      new TestViewProvider(context)
    )
  );
}

function getWebviewContent() {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Test Webview</title>
    </head>
    <body>
      <h1>Hello from Webview</h1>
      <p>This is your webview content.</p>
    </body>
    </html>`;
}

class TestViewProvider implements vscode.WebviewViewProvider {
  constructor(private readonly context: vscode.ExtensionContext) {}

  resolveWebviewView(webviewView: vscode.WebviewView) {
    webviewView.webview.options = {
      enableScripts: true,
    };

    webviewView.webview.html = getWebviewContent();
  }
}

export function deactivate() {}
