import * as fs from "fs";
import * as path from "path";
import { Node } from "../JSONParser";

export function generateImageHtml(node: Node, projectPath: string): string {
  console.log("generateImageHtml called with projectPath:", projectPath);
  const props = node.props;
  const imagePath = getImagePath(props.src, node, projectPath);
  console.log("Original src:", props.src);
  console.log("Processed imagePath:", imagePath);

  return `
<div id="${node.custom.id}" class="image-container ${node.custom.id}">
  <img src="${imagePath}" alt="${props.alt}" class="image ${node.custom.id}" />
</div>
`;
}

export function generateImageCss(node: Node): string {
  const props = node.props;
  return `
.image-container.${node.custom.id} {
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props.width}%;
}

.image.${node.custom.id} {
  width: 100%;
  height: auto;
  max-width: 100%;
}
`;
}

function getImagePath(src: string, node: Node, projectPath?: string): string {
  console.log("getImagePath called with src:", src);
  console.log("projectPath:", projectPath);

  if (!projectPath) {
    console.log("No projectPath provided, returning original src");
    return src;
  }

  const imagesFolder = path.join(projectPath, "images");

  if (!fs.existsSync(imagesFolder)) {
    console.log("Creating images folder:", imagesFolder);
    fs.mkdirSync(imagesFolder, { recursive: true });
  }

  if (src.startsWith("https://file%2B.vscode-resource.vscode-cdn.net")) {
    console.log("Processing VSCode resource URL");
    const decodedSrc = decodeURIComponent(src);
    const urlParts = decodedSrc.split("/uploaded_images/");
    if (urlParts.length > 1) {
      const fileName = urlParts[1];
      const sourcePath = path.join(projectPath, "..", "uploaded_images", fileName);
      const destPath = path.join(imagesFolder, fileName);
      console.log("Copying from:", sourcePath);
      console.log("Copying to:", destPath);
      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destPath);
        console.log("File copied successfully");
      } else {
        console.log("Source file not found");
      }
      return `images/${fileName}`;
    }
  } else if (src.startsWith("http://") || src.startsWith("https://")) {
    console.log("External URL detected, returning as is");
    return src;
  } else {
    console.log("Processing local file path");
    const fileName = path.basename(src);
    const sourcePath = path.join(projectPath, "..", "uploaded_images", fileName);
    const destPath = path.join(imagesFolder, fileName);
    console.log("Copying from:", sourcePath);
    console.log("Copying to:", destPath);
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, destPath);
      console.log("File copied successfully");
    } else {
      console.log("Source file not found");
    }
    return `images/${fileName}`;
  }

  console.log("Unhandled case, returning original src");
  return src;
}
