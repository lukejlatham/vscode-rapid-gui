import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

export class TemplateManager {
  private context: vscode.ExtensionContext;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
  }

  public getTemplate(templateName: string): string {
    const templatePath = vscode.Uri.joinPath(
      this.context.extensionUri,
      "templates",
      `${templateName}.template`
    );
    return fs.readFileSync(templatePath.fsPath, "utf8");
  }

  public applyTemplate(template: string, placeholders: Record<string, string>): string {
    let output = template;
    for (const [key, value] of Object.entries(placeholders)) {
      const regex = new RegExp(`{{${key}}}`, "g");
      output = output.replace(regex, value);
    }
    return output;
  }
}
