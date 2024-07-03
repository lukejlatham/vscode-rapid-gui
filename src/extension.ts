import * as vscode from 'vscode';
import { HelloWorldPanel } from './panels/HelloWorldPanel';
import { SideBarProvider } from './panels/SideBarPanel/SideBarProvider';

export function activate(context: vscode.ExtensionContext) {
  // Existing HelloWorldPanel command
  const showHelloWorldCommand = vscode.commands.registerCommand('hello-world.showHelloWorld', () => {
    HelloWorldPanel.render(context.extensionUri);
  });

  // Add command to the extension context for HelloWorldPanel
  context.subscriptions.push(showHelloWorldCommand);

    const sideBarProvider = new SideBarProvider(context.extensionUri);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      SideBarProvider.viewType,
      sideBarProvider
    )
  );

}

export function deactivate() {}
