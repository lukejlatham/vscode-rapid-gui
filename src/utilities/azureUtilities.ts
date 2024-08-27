import * as vscode from "vscode";

export async function getAzureOpenaiApiKeys(context: vscode.ExtensionContext) {
  const apiKey = await context.secrets.get("AZURE_OPENAI_API_KEY");
  const apiEndpoint = await context.secrets.get("AZURE_OPENAI_API_ENDPOINT");
  const deploymentName = await context.secrets.get("GPT4O_DEPLOYMENT_NAME");

  return { apiKey, apiEndpoint, deploymentName };
}

export async function getAzureOpenaiApiKey(context: vscode.ExtensionContext) {
  const apiKey = await vscode.window.showInputBox({
    prompt: "Enter your AZURE_OPENAI_API_KEY",
  });

  if (apiKey) {
    await context.secrets.store("AZURE_OPENAI_API_KEY", apiKey);
    vscode.window.showInformationMessage("AZURE_OPENAI_API_KEY added to storage.");
  }
}

export async function getAzureOpenaiApiEndpoint(context: vscode.ExtensionContext) {
  const apiEndpoint = await vscode.window.showInputBox({
    prompt: "Enter your AZURE_OPENAI_API_ENDPOINT",
  });

  if (apiEndpoint) {
    await context.secrets.store("AZURE_OPENAI_API_ENDPOINT", apiEndpoint);
    vscode.window.showInformationMessage("AZURE_OPENAI_API_ENDPOINT added to storage.");
  }
}

export async function getGpt4oDeploymentName(context: vscode.ExtensionContext) {
  const deploymentName = await vscode.window.showInputBox({
    prompt: "Enter your GPT4O_DEPLOYMENT_NAME",
  });

  if (deploymentName) {
    await context.secrets.store("GPT4O_DEPLOYMENT_NAME", deploymentName);
    vscode.window.showInformationMessage("GPT4O_DEPLOYMENT_NAME added to storage.");
  }
}
