import * as vscode from 'vscode';
import { MainWebviewPanel } from './panels/MainWebviewPanel';
import { SideBarProvider } from './panels/SideBarPanel/SideBarProvider';
import { RecentProjectsTreeViewProvider } from './panels/SideBarPanel/RecentProjectsTreeviewProvider';

export function activate(context: vscode.ExtensionContext) {
  const showHelloWorldCommand = vscode.commands.registerCommand('mainWebviewPanel.showMainWebviewPanel', () => {
    MainWebviewPanel.render(context.extensionUri);
  });

  context.subscriptions.push(showHelloWorldCommand);

  const sideBarProvider = new SideBarProvider(context.extensionUri);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      SideBarProvider.viewType,
      sideBarProvider
    )
  );
  // Register the tree view provider
  const recentProjectsTreeViewProvider = new RecentProjectsTreeViewProvider(context);
  vscode.window.createTreeView('sideBarTree', { treeDataProvider: recentProjectsTreeViewProvider });
}

export function deactivate() {}
