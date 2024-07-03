"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const HelloWorldPanel_1 = require("./panels/HelloWorldPanel");
const SideBarProvider_1 = require("./panels/SideBarPanel/SideBarProvider");
function activate(context) {
    // Existing HelloWorldPanel command
    const showHelloWorldCommand = vscode.commands.registerCommand('hello-world.showHelloWorld', () => {
        HelloWorldPanel_1.HelloWorldPanel.render(context.extensionUri);
    });
    // Add command to the extension context for HelloWorldPanel
    context.subscriptions.push(showHelloWorldCommand);
    const sideBarProvider = new SideBarProvider_1.SideBarProvider(context.extensionUri);
    context.subscriptions.push(vscode.window.registerWebviewViewProvider(SideBarProvider_1.SideBarProvider.viewType, sideBarProvider));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map