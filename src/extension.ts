import * as vscode from "vscode";
import { MainWebviewPanel } from "./panels/MainWebviewPanel";
import { RecentProjectsTreeViewProvider } from "./panels/SideBarPanel/RecentProjectsTreeviewProvider";
import { getAzureOpenaiApiKeys } from "./utilities/azureApiKeyStorage";

export function activate(context: vscode.ExtensionContext) {
  // Command to show the main webview panel
  context.subscriptions.push(
    vscode.commands.registerCommand("mainWebviewPanel.showMainWebviewPanel", () => {
      MainWebviewPanel.render(context.extensionUri);
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

  // Command to test API keys
  context.subscriptions.push(
    vscode.commands.registerCommand("extension.testApiKeysCommand", async () => {
      MainWebviewPanel.render(context.extensionUri);

      if (MainWebviewPanel.currentPanel) {
        const secrets = await getAzureOpenaiApiKeys(context);
        MainWebviewPanel.currentPanel.postMessage({ command: "setAzureApiKeys", ...secrets });
        vscode.window.showInformationMessage("Testing API keys: " + JSON.stringify(secrets));
      } else {
        vscode.window.showErrorMessage("Failed to open the webview panel.");
      }
    })
  );

  // Command to store secrets
  context.subscriptions.push(
    vscode.commands.registerCommand("extension.getAzureApiKeys", async () => {
      const apiKey = await vscode.window.showInputBox({
        prompt: "Enter your AZURE_OPENAI_API_KEY",
      });
      const apiEndpoint = await vscode.window.showInputBox({
        prompt: "Enter your AZURE_OPENAI_API_ENDPOINT",
      });
      const deploymentName = await vscode.window.showInputBox({
        prompt: "Enter your GPT4O_DEPLOYMENT_NAME",
      });

      if (apiKey && apiEndpoint && deploymentName) {
        await context.secrets.store("AZURE_OPENAI_API_KEY", apiKey);
        await context.secrets.store("AZURE_OPENAI_API_ENDPOINT", apiEndpoint);
        await context.secrets.store("GPT4O_DEPLOYMENT_NAME", deploymentName);
        vscode.window.showInformationMessage("Added API keys to storage.");
      }
    })
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
