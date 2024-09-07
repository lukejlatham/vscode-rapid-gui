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

  const commands = [
    { command: "uiCopilot.navigateTab1", callback: () => navigateTab(1) },
    { command: "uiCopilot.navigateTab2", callback: () => navigateTab(2) },
    { command: "uiCopilot.navigateTab3", callback: () => navigateTab(3) },
    { command: "uiCopilot.navigateTab4", callback: () => navigateTab(4) },
    { command: "uiCopilot.navigateTab5", callback: () => navigateTab(5) },
    { command: "uiCopilot.addComponent", callback: addComponent },
    { command: "uiCopilot.focusPropertyInspector", callback: focusPropertyInspector },
    { command: "uiCopilot.toggleGrid", callback: toggleGrid },
    { command: "uiCopilot.increaseRows", callback: () => adjustGrid("rows", 1) },
    { command: "uiCopilot.decreaseRows", callback: () => adjustGrid("rows", -1) },
    { command: "uiCopilot.increaseColumns", callback: () => adjustGrid("columns", 1) },
    { command: "uiCopilot.decreaseColumns", callback: () => adjustGrid("columns", -1) },
    { command: "uiCopilot.addPage", callback: addPage },
    { command: "uiCopilot.renamePage", callback: renamePage },
    { command: "uiCopilot.deletePage", callback: deletePage },
    { command: "uiCopilot.resetPage", callback: resetPage },
    { command: "uiCopilot.nextPage", callback: () => switchPage("next") },
    { command: "uiCopilot.previousPage", callback: () => switchPage("previous") },
    { command: "uiCopilot.applyFont", callback: applyFont },
    { command: "uiCopilot.applyTheme", callback: applyTheme },
    { command: "uiCopilot.undo", callback: undo },
    { command: "uiCopilot.redo", callback: redo },
    { command: "uiCopilot.saveProject", callback: saveProject },
    { command: "uiCopilot.loadProject", callback: loadProject },
    { command: "uiCopilot.exportProject", callback: exportProject },
    { command: "uiCopilot.restartProject", callback: restartProject },
    { command: "uiCopilot.toggleAccessibility", callback: toggleAccessibility },
  ];

  commands.forEach(({ command, callback }) => {
    context.subscriptions.push(vscode.commands.registerCommand(command, callback));
  });
}

function navigateTab(tabNumber: number) {
  MainWebviewPanel.postMessage({ command: "navigateTab", tabNumber });
}

export function deactivate() {}
