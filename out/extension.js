"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const HelloWorldPanel_1 = require("./panels/HelloWorldPanel");
const SideBarProvider_1 = require("./panels/SideBarProvider");
function activate(context) {
    // Existing HelloWorldPanel command
    const showHelloWorldCommand = vscode.commands.registerCommand('hello-world.showHelloWorld', () => {
        HelloWorldPanel_1.HelloWorldPanel.render(context.extensionUri);
    });
    // Add command to the extension context for HelloWorldPanel
    context.subscriptions.push(showHelloWorldCommand);
    // Register the provider for a Webview View
    const sideBarDisposable = vscode.window.registerWebviewViewProvider(SideBarProvider_1.SideBarProvider.viewType, // Use the static property for consistency
    new SideBarProvider_1.SideBarProvider(context.extensionUri));
    context.subscriptions.push(sideBarDisposable);
    // Register the command to show the SideBar View
    const showSideBarViewCommand = vscode.commands.registerCommand('sidebar.showSideBar', () => {
        // This will show the view in the activity bar
        vscode.commands.executeCommand('workbench.view.extension.UIStudio');
    });
    context.subscriptions.push(showSideBarViewCommand);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map