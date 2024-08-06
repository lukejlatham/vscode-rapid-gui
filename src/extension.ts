import * as vscode from "vscode";
import { MainWebviewPanel } from "./panels/MainWebviewPanel";
import { RecentProjectsTreeViewProvider } from "./panels/SideBarPanel/RecentProjectsTreeviewProvider";
import {
  getAzureOpenaiApiKeys,
  getAzureOpenaiApiEndpoint,
  getAzureOpenaiApiKey,
  getGpt4oDeploymentName,
} from "./utilities/azureApiKeyStorage";
import { convertToXaml } from "./utilities/xamlConverter";

export function activate(context: vscode.ExtensionContext) {
  if (MainWebviewPanel.currentPanel) {
    context.subscriptions.push(
      MainWebviewPanel.currentPanel.webview.onDidReceiveMessage(
        async (message) => {
          switch (message.command) {
            case "downloadCode":
              await convertToXaml(message.contents, message.fileNames, context);
              return;
          }
        },
        undefined,
        context.subscriptions
      )
    );
  }

  // Command to show the main webview panel
  context.subscriptions.push(
    vscode.commands.registerCommand("mainWebviewPanel.showMainWebviewPanel", () => {
      MainWebviewPanel.render(context.extensionUri, context);
    })
  );

  // Commands for creating projects
  context.subscriptions.push(
    vscode.commands.registerCommand("extension.createProjectFromScratch", () => {
      vscode.commands.executeCommand("mainWebviewPanel.showMainWebviewPanel");
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.createProjectFromTemplate", () => {
      vscode.commands.executeCommand("mainWebviewPanel.showMainWebviewPanel");
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.createProjectFromSketch", () => {
      vscode.commands.executeCommand("mainWebviewPanel.showMainWebviewPanel");
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.createProjectFromText", () => {
      vscode.commands.executeCommand("mainWebviewPanel.showMainWebviewPanel");
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.testApiKeysCommand", async () => {
      MainWebviewPanel.render(context.extensionUri, context);

      if (MainWebviewPanel.currentPanel) {
        const secrets = await getAzureOpenaiApiKeys(context);
        MainWebviewPanel.currentPanel.postMessage({
          command: "setAzureApiKeys",
          ...secrets,
        });
        vscode.window.showInformationMessage("Testing API keys: " + JSON.stringify(secrets));
      } else {
        vscode.window.showErrorMessage("Failed to open the webview panel.");
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.getAzureOpenaiApiKey", () =>
      getAzureOpenaiApiKey(context)
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.getAzureOpenaiApiEndpoint", () =>
      getAzureOpenaiApiEndpoint(context)
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.getGpt4oDeploymentName", () =>
      getGpt4oDeploymentName(context)
    )
  );

  // Register the custom view with buttons
  const buttonTreeViewProvider = new ButtonTreeViewProvider();
  vscode.window.registerTreeDataProvider("sideBarButtons", buttonTreeViewProvider);

  // Register the tree view provider
  const recentProjectsTreeViewProvider = new RecentProjectsTreeViewProvider(context);
  vscode.window.createTreeView("sideBarTree", { treeDataProvider: recentProjectsTreeViewProvider });
}

export function deactivate() {}

class ButtonTreeViewProvider implements vscode.TreeDataProvider<ButtonItem> {
  constructor() {}

  getTreeItem(element: ButtonItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: ButtonItem): vscode.ProviderResult<ButtonItem[]> {
    if (!element) {
      return [
        new ButtonItem("Create Project from Scratch", "extension.createProjectFromScratch"),
        new ButtonItem("Create Project from Template", "extension.createProjectFromTemplate"),
        new ButtonItem("Create Project from Sketch", "extension.createProjectFromSketch"),
        new ButtonItem("Create Project from Text", "extension.createProjectFromText"),
      ];
    }
    return [];
  }
}

class ButtonItem extends vscode.TreeItem {
  constructor(public readonly label: string, private commandId: string) {
    super(label, vscode.TreeItemCollapsibleState.None);
    this.command = {
      command: this.commandId,
      title: this.label,
      tooltip: this.label,
    };
    this.contextValue = "buttonItem";
    this.iconPath = new vscode.ThemeIcon("play-circle");
  }
}
