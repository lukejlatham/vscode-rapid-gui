import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  // Register the command to open the home page
  context.subscriptions.push(
    vscode.commands.registerCommand('vscode-test-2.openWebView', () => {
      const panel = vscode.window.createWebviewPanel(
        'reactWebview', // Identifies the type of the webview. Used internally
        'React Webview', // Title of the panel displayed to the user
        vscode.ViewColumn.One, // Editor column to show the new webview panel in
        {
          enableScripts: true
        }
      );

      const appPath = path.join(context.extensionPath, 'dist');
      const bundleUri = panel.webview.asWebviewUri(
        vscode.Uri.file(path.join(appPath, 'bundle.js'))
      );

      const html = `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>React Webview</title>
        </head>
        <body>
          <div id="root"></div>
          <script src="${bundleUri}"></script>
        </body>
        </html>`;

      panel.webview.html = html;
    })
  );

  // Register the tree view provider
  const treeDataProvider = new TestViewProvider();
  vscode.window.registerTreeDataProvider('vscodeTest2View', treeDataProvider);

  context.subscriptions.push(
    vscode.commands.registerCommand('vscode-test-2.refreshTree', () => treeDataProvider.refresh())
  );
}

class TestViewProvider implements vscode.TreeDataProvider<TreeItem> {
  private _onDidChangeTreeData: vscode.EventEmitter<TreeItem | undefined | null> = new vscode.EventEmitter<TreeItem | undefined | null>();
  readonly onDidChangeTreeData: vscode.Event<TreeItem | undefined | null> = this._onDidChangeTreeData.event;

  getTreeItem(element: TreeItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: TreeItem): Thenable<TreeItem[]> {
    return Promise.resolve(this.getMockData());
  }

  private getMockData(): TreeItem[] {
    const item = new TreeItem('Open Home Page', vscode.TreeItemCollapsibleState.None, {
      command: 'vscode-test-2.openWebView',
      title: 'Open Home Page',
      arguments: []
    });
    return [item];
  }

  refresh(): void {
    this._onDidChangeTreeData.fire(undefined);
  }
}

class TreeItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly command?: vscode.Command
  ) {
    super(label, collapsibleState);
    this.command = command;
  }
}

export function deactivate() {}
