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

  xaml += " />";

  return xaml + "\n";
}

export async function handleImageSource(src: string, projectPath: string): Promise<string> {
  const uploadedImagesPath = path.join(projectPath, "..", "uploaded_images");
  const assetsPath = path.join(projectPath, "Assets");

  if (!fs.existsSync(assetsPath)) {
    fs.mkdirSync(assetsPath, { recursive: true });
  }

  let fileName = path.basename(decodeURIComponent(src));
  const destPath = path.join(assetsPath, fileName);

  if (isUrl(src)) {
    await downloadImage(src, destPath);
  } else {
    const sourcePath = path.join(uploadedImagesPath, fileName);
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, destPath);
      console.log(`Image copied from ${sourcePath} to ${destPath}`);
    } else {
      console.error(`Source file not found: ${sourcePath}`);
      return "";
    }
  }

  return `/Assets/${fileName}`;
}

async function downloadImage(url: string, destPath: string): Promise<void> {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    fs.writeFileSync(destPath, Buffer.from(response.data));
    console.log(`Downloaded image from ${url} to ${destPath}`);
  } catch (error) {
    console.error(`Failed to download image from ${url}:`, error);
    throw error;
  }
}

function isUrl(str: string): boolean {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
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
