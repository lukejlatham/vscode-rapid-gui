import * as fs from "fs";
import * as path from "path";

export class TemplateManager {
  private templatesPath: string;
  private templates: Map<string, string>;

  constructor(templatesPath: string) {
    this.templatesPath = templatesPath;
    this.templates = new Map();
    this.loadTemplates();
  }

  private loadTemplates() {
    const templateFiles = fs.readdirSync(this.templatesPath);
    for (const file of templateFiles) {
      const templateName = path.parse(file).name;
      const templateContent = fs.readFileSync(path.join(this.templatesPath, file), "utf-8");
      this.templates.set(templateName, templateContent);
    }
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
}
