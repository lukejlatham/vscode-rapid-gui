import { Node } from "../JsonParser";
import * as path from "path";
import * as fs from "fs";
import axios from "axios";

export async function generateImageXaml(
  node: Node,
  indent: string = "",
  projectPath: string,
  extraImages: string[] = []
): Promise<string> {
  const props = node.props;
  let xaml = `${indent}<Image`;

  xaml += ` Stretch="UniformToFill"`;

  xaml += ` Width="${props.width || 100}"`;
  xaml += ` Height="${props.height || 100}"`;

  if (props.src) {
    const imageSource = await handleImageSource(props.src, projectPath, extraImages);
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

async function handleImageSource(
  src: string,
  projectPath: string,
  extraImages: string[]
): Promise<string> {
  const assetsPath = path.join(projectPath, "Assets");
  if (!fs.existsSync(assetsPath)) {
    fs.mkdirSync(assetsPath, { recursive: true });
  }

  const fileName = path.basename(src);
  const destPath = path.join(assetsPath, fileName);

  if (isUrl(src)) {
    await downloadImage(src, destPath);
  } else {
    copyImageToAssets(src, destPath);
  }

  extraImages.push(destPath);
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
