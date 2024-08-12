import * as fs from "fs";
import * as path from "path";

export class ProjectStructureGenerator {
  private outputPath: string;

  constructor(outputPath: string, private projectName: string) {
    this.outputPath = path.join(outputPath, projectName);
  }

  generateStructure(): void {
    if (!fs.existsSync(this.outputPath)) {
      fs.mkdirSync(this.outputPath, { recursive: true });
    }

    const folders = ["css", "js", "images"];
    folders.forEach((folder) => {
      const folderPath = path.join(this.outputPath, folder);
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }
    });
  }

  getOutputPath(): string {
    return this.outputPath;
  }
}
