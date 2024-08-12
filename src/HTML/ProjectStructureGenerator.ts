import * as fs from "fs";
import * as path from "path";

export class ProjectStructureGenerator {
  constructor(private projectFolder: string, private projectName: string) {}

  generateStructure(): void {
    // Create main project folder
    if (!fs.existsSync(this.projectFolder)) {
      fs.mkdirSync(this.projectFolder, { recursive: true });
    }

    // Create subfolders
    const folders = ["css", "js", "images"];
    folders.forEach((folder) => {
      const folderPath = path.join(this.projectFolder, folder);
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }
    });

    // Create initial files
    this.createFile(
      "index.html",
      '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>' +
        this.projectName +
        '</title>\n  <link rel="stylesheet" href="css/styles.css">\n</head>\n<body>\n  <script src="js/main.js"></script>\n</body>\n</html>'
    );
    this.createFile("css/styles.css", "/* Styles for " + this.projectName + " */");
    this.createFile("js/main.js", "// Main JavaScript for " + this.projectName);
  }

  private createFile(relativePath: string, content: string): void {
    const filePath = path.join(this.projectFolder, relativePath);
    fs.writeFileSync(filePath, content);
  }
}
