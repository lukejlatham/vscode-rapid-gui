import * as fs from "fs";
import * as path from "path";

export class ProjectStructureGenerator {
  private outputPath: string;

  constructor(outputPath: string) {
    this.outputPath = outputPath;
  }

  public createProjectStructure() {
    this.createDirectory("");
    this.createDirectory("Assets");
    this.createDirectory("Views");
    this.createDirectory("Styles");
    this.createDirectory("Properties\\PublishProfiles");
    this.createDirectory("Strings\\en-US");
  }

  private createDirectory(dirPath: string) {
    const fullPath = path.join(this.outputPath, dirPath);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
  }
}
