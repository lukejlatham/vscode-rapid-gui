"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const MainWebviewPanel_1 = require("./panels/MainWebviewPanel");
const SideBarProvider_1 = require("./panels/SideBarPanel/SideBarProvider");
function activate(context) {
    const showHelloWorldCommand = vscode.commands.registerCommand('mainWebviewPanel.showMainWebviewPanel', () => {
        MainWebviewPanel_1.MainWebviewPanel.render(context.extensionUri);
    });
    context.subscriptions.push(showHelloWorldCommand);
    const sideBarProvider = new SideBarProvider_1.SideBarProvider(context.extensionUri);
    context.subscriptions.push(vscode.window.registerWebviewViewProvider(SideBarProvider_1.SideBarProvider.viewType, sideBarProvider));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map