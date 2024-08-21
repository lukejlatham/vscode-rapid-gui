import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

export class TemplateManager {
  private templatesPath: string;
  private templates: Map<string, string>;

  constructor(context: vscode.ExtensionContext) {
    this.templatesPath = path.join(context.extensionPath, "templateshtml");
    this.templates = new Map();
    this.loadTemplates();
  }

  private loadTemplates() {
    const templateFiles = fs.readdirSync(this.templatesPath);
    for (const file of templateFiles) {
      const filePath = path.join(this.templatesPath, file);
      if (fs.statSync(filePath).isFile()) {
        const templateName = path.parse(file).name;
        const templateContent = fs.readFileSync(filePath, "utf-8");
        this.templates.set(templateName, templateContent);
      }
    }
  }

  public checkRequiredTemplates(requiredTemplates: string[]): boolean {
    for (const template of requiredTemplates) {
      if (!this.templates.has(template)) {
        console.error(`Required template not found: ${template}`);
        return false;
      }
    }
    return true;
  }

  public fillTemplate(templateName: string, data: Record<string, string>): string {
    const template = this.templates.get(templateName);
    if (!template) {
      throw new Error(`Template not found: ${templateName}`);
    }

    let filledTemplate = template;
    for (const [key, value] of Object.entries(data)) {
      const placeholder = `{{${key}}}`;
      filledTemplate = filledTemplate.replace(new RegExp(placeholder, "g"), value);
    }

    return filledTemplate;
  }

  public getTemplate(templateName: string): string {
    const template = this.templates.get(templateName);
    if (!template) {
      throw new Error(`Template not found: ${templateName}`);
    }
    return template;
  }

  public addTemplate(templateName: string, templateContent: string) {
    this.templates.set(templateName, templateContent);
  }

  public getTemplatesPath(): string {
    return this.templatesPath;
  }
}
