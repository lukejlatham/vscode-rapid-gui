"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const MainWebviewPanel_1 = require("./panels/MainWebviewPanel");
const RecentProjectsTreeviewProvider_1 = require("./panels/SideBarPanel/RecentProjectsTreeviewProvider");
function activate(context) {
    const showHelloWorldCommand = vscode.commands.registerCommand('mainWebviewPanel.showMainWebviewPanel', () => {
        MainWebviewPanel_1.MainWebviewPanel.render(context.extensionUri);
    });
    context.subscriptions.push(showHelloWorldCommand);
    // Register the commands for buttons
    context.subscriptions.push(vscode.commands.registerCommand('extension.createProjectFromScratch', () => {
        vscode.commands.executeCommand('mainWebviewPanel.showMainWebviewPanel');
    }));
    context.subscriptions.push(vscode.commands.registerCommand('extension.createProjectFromTemplate', () => {
        vscode.commands.executeCommand('mainWebviewPanel.showMainWebviewPanel');
    }));
    context.subscriptions.push(vscode.commands.registerCommand('extension.createProjectFromSketch', () => {
        vscode.commands.executeCommand('mainWebviewPanel.showMainWebviewPanel');
    }));
    context.subscriptions.push(vscode.commands.registerCommand('extension.createProjectFromText', () => {
        vscode.commands.executeCommand('mainWebviewPanel.showMainWebviewPanel');
    }));
    // Register the custom view with buttons
    const buttonTreeViewProvider = new ButtonTreeViewProvider();
    vscode.window.registerTreeDataProvider('sideBarButtons', buttonTreeViewProvider);
    // Register the tree view provider
    const recentProjectsTreeViewProvider = new RecentProjectsTreeviewProvider_1.RecentProjectsTreeViewProvider(context);
    vscode.window.createTreeView('sideBarTree', { treeDataProvider: recentProjectsTreeViewProvider });
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
class ButtonTreeViewProvider {
    constructor() { }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        if (!element) {
            return [
                new ButtonItem('Create Project from Scratch', 'extension.createProjectFromScratch'),
                new ButtonItem('Create Project from Template', 'extension.createProjectFromTemplate'),
                new ButtonItem('Create Project from Sketch', 'extension.createProjectFromSketch'),
                new ButtonItem('Create Project from Text', 'extension.createProjectFromText')
            ];
        }
        return [];
    }
}
class ButtonItem extends vscode.TreeItem {
    constructor(label, commandId) {
        super(label, vscode.TreeItemCollapsibleState.None);
        this.label = label;
        this.commandId = commandId;
        this.command = {
            command: this.commandId,
            title: this.label,
            tooltip: this.label
        };
        this.contextValue = 'buttonItem';
        this.iconPath = new vscode.ThemeIcon('play-circle');
    }
}
//# sourceMappingURL=extension.js.map