import * as fs from "fs";
import * as path from "path";

export class TemplateManager {
  private templatesPath: string;

  constructor(templatesPath: string) {
    this.templatesPath = templatesPath;
  }

  public fillTemplate(templateName: string, data: Record<string, string>): string {
    const templatePath = path.join(this.templatesPath, templateName);

    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template file not found: ${templatePath}`);
    }

    let templateContent = fs.readFileSync(templatePath, "utf-8");

    for (const [key, value] of Object.entries(data)) {
      const placeholder = `{{${key}}}`;
      templateContent = templateContent.replace(new RegExp(placeholder, "g"), value);
    }

    return templateContent;
  }
}

// Factory function to create and return a TemplateManager instance
export function createTemplateManager(templatesPath: string): TemplateManager {
  return new TemplateManager(templatesPath);
}
