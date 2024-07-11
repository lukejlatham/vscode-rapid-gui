import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const secretStorage = context.secrets;

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.storeSecrets", async () => {
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
        await secretStorage.store("AZURE_OPENAI_API_KEY", apiKey);
        await secretStorage.store("AZURE_OPENAI_API_ENDPOINT", apiEndpoint);
        await secretStorage.store("GPT4O_DEPLOYMENT_NAME", deploymentName);
        vscode.window.showInformationMessage("Added API keys to storage.");
      }
    })
  );
}

async function getAzureOpenaiApiKeys(context: vscode.ExtensionContext) {
  const apiKey = await context.secrets.get("AZURE_OPENAI_API_KEY");
  const apiEndpoint = await context.secrets.get("AZURE_OPENAI_API_ENDPOINT");
  const deploymentName = await context.secrets.get("GPT4O_DEPLOYMENT_NAME");

  return { apiKey, apiEndpoint, deploymentName };
}
