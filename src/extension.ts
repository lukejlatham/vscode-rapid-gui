import * as vscode from "vscode";
import { MainWebviewPanel } from "./panels/MainWebviewPanel";
import {
  getAzureOpenaiApiKeys,
  getAzureOpenaiApiEndpoint,
  getAzureOpenaiApiKey,
  getGpt4oDeploymentName,
} from "./utilities/azureApiKeyStorage";
import { getOpenaiApiKey, getOpenaiApiEndpoint } from "./utilities/OAApiKeyStorage";

export function activate(context: vscode.ExtensionContext) {
  // Command to show the main webview panel
  context.subscriptions.push(
    vscode.commands.registerCommand("mainWebviewPanel.showMainWebviewPanel", () => {
      MainWebviewPanel.render(context.extensionUri, context);
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
