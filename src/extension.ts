import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('extension.openDragDropEditor', () => {
      const panel = vscode.window.createWebviewPanel(
        'dragDropEditor',
        'Drag and Drop Editor',
        vscode.ViewColumn.One,
        {
          enableScripts: true,
          localResourceRoots: [
            vscode.Uri.file(path.join(context.extensionPath, 'media'))
          ]
        }
      );

      const scriptPath = panel.webview.asWebviewUri(
        vscode.Uri.file(path.join(context.extensionPath, 'media', 'main.js'))
      );

      const stylePath = panel.webview.asWebviewUri(
        vscode.Uri.file(path.join(context.extensionPath, 'media', 'style.css'))
      );

      panel.webview.html = getWebviewContent(scriptPath, stylePath);
    })
  );
}

function getWebviewContent(scriptUri: vscode.Uri, styleUri: vscode.Uri): string {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="${styleUri}" rel="stylesheet">
        <title>Drag and Drop Editor</title>
    </head>
    <body>
        <div id="editor" class="editor"></div>
        <script src="${scriptUri}"></script>
    </body>
    </html>`;
}

export function deactivate() {}
