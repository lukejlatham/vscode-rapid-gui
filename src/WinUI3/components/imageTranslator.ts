import { Node } from "../JsonParser";
import * as path from "path";
import * as fs from "fs";

export async function generateImageXaml(
  node: Node,
  indent: string = "",
  projectPath: string
): Promise<string> {
  const props = node.props;
  let xaml = `${indent}<Image`;

  xaml += ` Stretch="UniformToFill"`;
  xaml += ` Width="${props.width || 100}"`;
  xaml += ` Height="${props.height || 100}"`;

  if (props.src && projectPath) {
    try {
      const imageSource = await handleImageSource(props.src, projectPath);
      if (imageSource) {
        xaml += ` Source="${imageSource}"`;
      } else {
        console.warn(`Invalid image source for: ${props.alt || "unnamed image"}`);
      }
    } catch (error) {
      console.error("Error handling image source:", error);
    }
  }

  if (props.alt) {
    xaml += ` AutomationProperties.Name="${props.alt}"`;
  }

  xaml += " />";

  return xaml + "\n";
}

export async function handleImageSource(src: string, projectPath: string): Promise<string> {
  console.log("handleImageSource called with src:", src);
  console.log("projectPath:", projectPath);

  const assetsPath = path.join(projectPath, "Assets");
  if (!fs.existsSync(assetsPath)) {
    console.log("Creating Assets folder:", assetsPath);
    fs.mkdirSync(assetsPath, { recursive: true });
  }

  let fileName = path.basename(decodeURIComponent(src));
  const destPath = path.join(assetsPath, fileName);

  if (src.startsWith("https://file+.vscode-resource.vscode-cdn.net")) {
    console.log("Processing VSCode resource URL");
    const decodedSrc = decodeURIComponent(src);
    const urlParts = decodedSrc.split("/uploaded_images/");
    if (urlParts.length > 1) {
      fileName = urlParts[1];
      const sourcePath = path.join(projectPath, "..", "..", "uploaded_images", fileName);
      console.log("Copying from:", sourcePath);
      console.log("Copying to:", destPath);
      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destPath);
        console.log("File copied successfully");
      } else {
        console.log("Source file not found");
        return "";
      }
    }
  } else if (src.startsWith("http://") || src.startsWith("https://")) {
    if (!src.includes("vscode-resource.vscode-cdn.net")) {
      console.log("External URL detected, downloading image");
      try {
        await downloadImage(src, destPath);
        console.log("Image downloaded successfully");
      } catch (error) {
        console.error("Failed to download image:", error);
        return "";
      }
    } else {
      console.log("VSCode resource URL detected, skipping download");
      return "";
    }
  } else {
    console.log("Processing local file path");
    const sourcePath = path.join(projectPath, "..", "..", "uploaded_images", fileName);
    console.log("Copying from:", sourcePath);
    console.log("Copying to:", destPath);
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, destPath);
      console.log("File copied successfully");
    } else {
      console.log("Source file not found");
      return "";
    }
  }

  return `/Assets/${fileName}`;
}

async function downloadImage(url: string, destPath: string): Promise<void> {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFileSync(destPath, buffer);
}

export function isUrl(str: string): boolean {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

export function copyImageToAssets(sourcePath: string, destPath: string): void {
  try {
    fs.copyFileSync(sourcePath, destPath);
    console.log(`Copied image to: ${destPath}`);
  } catch (error) {
    console.error(`Failed to copy image: ${error}`);
  }
}

export function findImageNodes(content: any): Node[] {
  const imageNodes: Node[] = [];

  function traverse(node: any) {
    if (node.type && node.type.resolvedName === "Image") {
      imageNodes.push(node);
    }
    if (node.nodes) {
      node.nodes.forEach(traverse);
    }
    if (node.linkedNodes) {
      Object.values(node.linkedNodes).forEach(traverse);
    }
  }

  traverse(content);
  return imageNodes;
}
