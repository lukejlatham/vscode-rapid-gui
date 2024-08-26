import { Node } from "../JsonParser";
import * as path from "path";
import * as fs from "fs";
import axios from "axios";

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

  if (props.src) {
    const imageSource = await handleImageSource(props.src, projectPath);
    xaml += ` Source="${imageSource}"`;
  } else {
    console.warn("Image source is missing");
  }

  if (props.alt) {
    xaml += ` AutomationProperties.Name="${props.alt}"`;
  }

  if (props.alignment) {
    xaml += ` HorizontalAlignment="${props.alignment}"`;
  }

  xaml += " />";

  return xaml + "\n";
}

export async function handleImageSource(src: string, projectPath: string): Promise<string> {
  const assetsPath = path.join(projectPath, "Assets");
  if (!fs.existsSync(assetsPath)) {
    fs.mkdirSync(assetsPath, { recursive: true });
  }

  const fileName = path.basename(decodeURIComponent(src));
  const destPath = path.join(assetsPath, fileName);

  if (src.startsWith("https://file+.vscode-resource.vscode-cdn.net/")) {
    // Handle VSCode resource URLs
    const localPath = decodeURIComponent(
      src.replace("https://file+.vscode-resource.vscode-cdn.net/", "")
    );
    fs.copyFileSync(localPath, destPath);
  } else if (isUrl(src)) {
    await downloadImage(src, destPath);
  } else if (src.startsWith("data:image")) {
    // Handle base64 encoded images (uploaded or AI-generated)
    const base64Data = src.split(",")[1];
    fs.writeFileSync(destPath, base64Data, "base64");
  } else {
    // Handle local file paths (including uploaded_images folder)
    copyImageToAssets(src, destPath);
  }

  return `/Assets/${fileName}`;
}

export async function downloadImage(url: string, destPath: string): Promise<void> {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    fs.writeFileSync(destPath, response.data);
    console.log(`Downloaded image to: ${destPath}`);
  } catch (error) {
    console.error(`Failed to download image: ${error}`);
  }
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
