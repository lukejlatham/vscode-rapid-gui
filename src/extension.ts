import * as vscode from 'vscode';
import { HelloWorldPanel } from './panels/HelloWorldPanel';
import { SideBarProvider } from './panels/SideBarProvider';

export function activate(context: vscode.ExtensionContext) {
    // Existing HelloWorldPanel command
    const showHelloWorldCommand = vscode.commands.registerCommand('hello-world.showHelloWorld', () => {
        HelloWorldPanel.render(context.extensionUri);
    });

    // Add command to the extension context for HelloWorldPanel
    context.subscriptions.push(showHelloWorldCommand);
    
    // Register the provider for a Webview View
    const sideBarDisposable = vscode.window.registerWebviewViewProvider(
        SideBarProvider.viewType,  // Use the static property for consistency
        new SideBarProvider(context.extensionUri)
    );
    context.subscriptions.push(sideBarDisposable);

    // Register the command to show the SideBar View
    const showSideBarViewCommand = vscode.commands.registerCommand('sidebar.showSideBar', () => {
        // This will show the view in the activity bar
        vscode.commands.executeCommand('workbench.view.extension.UIStudio');
    });

    context.subscriptions.push(showSideBarViewCommand);
}

export function deactivate() {}
