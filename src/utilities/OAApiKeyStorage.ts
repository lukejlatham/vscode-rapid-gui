import * as vscode from "vscode";

export async function getOpenaiApiKeys(context: vscode.ExtensionContext) {
  console.log("Getting OpenAI API keys");
  const openaiApiKey = await context.secrets.get("OPENAI_API_KEY");

  return { openaiApiKey };
}

export async function getOpenaiApiKey(context: vscode.ExtensionContext) {
  const apiKey = await vscode.window.showInputBox({
    prompt: "Enter your OpenAI API Key",
  });

  if (apiKey) {
    await context.secrets.store("OPENAI_API_KEY", apiKey);
    vscode.window.showInformationMessage("OpenAI API key added to storage.");
  }
}

export async function getOpenaiApiEndpoint(context: vscode.ExtensionContext) {
  const apiEndpoint = await vscode.window.showInputBox({
    prompt: "Enter your OpenAI API Endpoint",
  });

  if (apiEndpoint) {
    await context.secrets.store("OPENAI_API_ENDPOINT", apiEndpoint);
    vscode.window.showInformationMessage("OpenAI API endpoint added to storage.");
  }
}
