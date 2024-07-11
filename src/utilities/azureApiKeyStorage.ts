import * as vscode from "vscode";

export async function getAzureOpenaiApiKeys(context: vscode.ExtensionContext) {
  const apiKey = await context.secrets.get("AZURE_OPENAI_API_KEY");
  const apiEndpoint = await context.secrets.get("AZURE_OPENAI_API_ENDPOINT");
  const deploymentName = await context.secrets.get("GPT4O_DEPLOYMENT_NAME");

  return { apiKey, apiEndpoint, deploymentName };
}
