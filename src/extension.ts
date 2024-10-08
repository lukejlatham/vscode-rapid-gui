import * as vscode from "vscode";
import { MainWebviewPanel } from "./panels/MainWebviewPanel";
import {
  getAzureOpenaiApiKeys,
  getAzureOpenaiApiEndpoint,
  getAzureOpenaiApiKey,
  getGpt4oDeploymentName,
} from "./utilities/azureUtilities";
import { getOpenaiApiKey, getOpenaiApiEndpoint } from "./utilities/openaiUtilities";

export function activate(context: vscode.ExtensionContext) {
  if (!vscode.workspace.workspaceFolders || vscode.workspace.workspaceFolders.length === 0) {
    vscode.window.showErrorMessage("Please open a workspace before using this extension.");
    return;
  }
  context.subscriptions.push(
    vscode.commands.registerCommand("mainWebviewPanel.showMainWebviewPanel", () => {
      MainWebviewPanel.render(context.extensionUri, context);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.getOpenaiApiKey", () => getOpenaiApiKey(context))
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.getOpenaiApiEndpoint", () =>
      getOpenaiApiEndpoint(context)
    )
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
}

export function deactivate() {}
