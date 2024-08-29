import { Node } from "../JsonParser";
import * as path from "path";
import * as fs from "fs";
import axios from "axios";
import { convertToXaml } from "../xamlConverter";

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

  console.log("Image props:", props);
  console.log("Project path:", projectPath);

  if (props.src && projectPath) {
    try {
      const imageSource = await handleImageSource(props.src, projectPath);
      xaml += ` Source="${imageSource}"`;
    } catch (error) {
      console.error("Error handling image source:", error);
    }
  } else {
    console.warn("Image source or project path is missing", { src: props.src, projectPath });
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

  let fileName = path.basename(decodeURIComponent(src));
  const destPath = path.join(assetsPath, fileName);

  if (src.startsWith("https://file+.vscode-resource.vscode-cdn.net/")) {
    // Handle VSCode resource URLs (uploaded and AI-generated images)
    const localPath = decodeURIComponent(
      src.replace("https://file+.vscode-resource.vscode-cdn.net", "")
    );
    if (fs.existsSync(localPath)) {
      fs.copyFileSync(localPath, destPath);
      console.log(`Copied image from ${localPath} to ${destPath}`);
    } else {
      console.error(`Image not found: ${localPath}`);
      return "";
    }
  } else if (isUrl(src)) {
    try {
      await downloadImage(src, destPath);
    } catch (error) {
      console.error(`Failed to download image: ${error.message}`);
      return "";
    }
  } else {
    // Handle local file paths (this case should not occur with your current setup)
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, destPath);
      console.log(`Copied image from ${src} to ${destPath}`);
    } else {
      console.error(`Image not found: ${src}`);
      return "";
    }
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
