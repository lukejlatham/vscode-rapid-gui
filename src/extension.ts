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
    if (element) {
      return Promise.resolve(this.getMockData(element.label));
    } else {
      // Return the parent items
      return Promise.resolve([
        new TreeItem('Create New Project', vscode.TreeItemCollapsibleState.Collapsed),
        new TreeItem('Recent Projects', vscode.TreeItemCollapsibleState.Collapsed),
        new TreeItem('Settings', vscode.TreeItemCollapsibleState.Collapsed)
      ]);
    }
  }

  private getMockData(section: string): TreeItem[] {
    switch (section) {
      case 'Create New Project':
        return [
          new TreeItem('Create from Scratch', vscode.TreeItemCollapsibleState.None, {
            command: 'vscode-test-2.openWebView',
            title: 'Create from Scratch',
            arguments: []
          }),
          new TreeItem('Create from Sketch', vscode.TreeItemCollapsibleState.None, {
            command: 'vscode-test-2.openWebView',
            title: 'Create from Sketch',
            arguments: []
          }),
          new TreeItem('Create from Prompt', vscode.TreeItemCollapsibleState.None, {
            command: 'vscode-test-2.openWebView',
            title: 'Create from Prompt',
            arguments: []
          }),
          new TreeItem('Create from Template', vscode.TreeItemCollapsibleState.None, {
            command: 'vscode-test-2.openWebView',
            title: 'Create from Template',
            arguments: []
          })
        ];
      case 'Recent Projects':
        return [
          new TreeItem('my-issues.github-issues', vscode.TreeItemCollapsibleState.None, {
            command: 'vscode-test-2.openWebView',
            title: 'my-issues.github-issues',
            arguments: []
          }),
          new TreeItem('fortune500.ipynb', vscode.TreeItemCollapsibleState.None, {
            command: 'vscode-test-2.openWebView',
            title: 'fortune500.ipynb',
            arguments: []
          }),
          new TreeItem('sample.ipynb', vscode.TreeItemCollapsibleState.None, {
            command: 'vscode-test-2.openWebView',
            title: 'sample.ipynb',
            arguments: []
          }),
          new TreeItem('playground.ipynb', vscode.TreeItemCollapsibleState.None, {
            command: 'vscode-test-2.openWebView',
            title: 'playground.ipynb',
            arguments: []
          })
        ];
      case 'Settings':
        return [
          new TreeItem('What\'s New', vscode.TreeItemCollapsibleState.None, {
            command: 'vscode-test-2.openWebView',
            title: 'What\'s New',
            arguments: []
          }),
          new TreeItem('Extension Documentation', vscode.TreeItemCollapsibleState.None, {
            command: 'vscode-test-2.openWebView',
            title: 'Extension Documentation',
            arguments: []
          })
        ];
      default:
        return [];
    }
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
