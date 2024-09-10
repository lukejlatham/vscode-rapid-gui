import { Node } from "../JsonParser";
import * as path from "path";
import * as fs from "fs";
import fetch from "node-fetch";

export async function generateImageXaml(
  node: Node,
  indent: string = "",
  projectPath: string
): Promise<string> {
  const props = node.props;
  let xaml = `${indent}<Image`;

  xaml += ` Stretch="Uniform"`;
  xaml += ` Width="${props.width * 3}"`;
  xaml += ` Height="${props.height || 300}"`;

  if (props.src && projectPath) {
    try {
      const imageSource = await handleImageSource(props.src, projectPath);
      if (imageSource) {
        xaml += ` Source="${imageSource}"`;
      } else {
        console.warn(`Invalid image source for: ${props.alt || "unnamed image"}`);
        // Set a default image
        xaml += ` Source="/Assets/default_image.png"`;
      }
    } catch (error) {
      console.error("Error handling image source:", error);
      xaml += ` Source="/Assets/error_image.png"`;
    }
  } else {
    // If no source is provided, use a default image
    xaml += ` Source="/Assets/default_image.png"`;
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

  if (src.includes("vscode-resource") || src.includes("uploaded_images")) {
    console.log("Processing VSCode resource or uploaded image URL");
    let localPath = decodeURIComponent(src);

    if (localPath.startsWith("https://file+.vscode-resource.vscode-cdn.net")) {
      localPath = localPath.replace("https://file+.vscode-resource.vscode-cdn.net", "");
    }

    // Handle Windows-style paths
    if (localPath.startsWith("/")) {
      localPath = localPath.slice(1);
    }

    localPath = localPath.replace(/^[A-Za-z]:/, ""); // Remove drive letter if present
    localPath = path.normalize(localPath);

    console.log("Normalized local path:", localPath);

    const possiblePaths = [
      localPath,
      path.join(projectPath, "..", "..", "uploaded_images", fileName),
      path.join(projectPath, "..", "uploaded_images", fileName),
      path.join(projectPath, "uploaded_images", fileName),
    ];

    for (const pathToTry of possiblePaths) {
      console.log("Trying path:", pathToTry);
      if (fs.existsSync(pathToTry)) {
        fs.copyFileSync(pathToTry, destPath);
        console.log("File copied successfully to:", destPath);
        return `/Assets/${fileName}`;
      }
    }

    console.log("Source file not found at any of the possible paths");
    return "";
  } else if (src.startsWith("http://") || src.startsWith("https://")) {
    console.log("Downloading image from URL:", src);
    try {
      await downloadImage(src, destPath);
      console.log("Image downloaded successfully to:", destPath);
      return `/Assets/${fileName}`;
    } catch (error) {
      console.error("Failed to download image:", error);
      return "";
    }
  } else {
    console.log("Unsupported image source:", src);
    return "";
  }
}

async function downloadImage(url: string, destPath: string): Promise<void> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`unexpected response ${response.statusText}`);
  }
  const buffer = await response.buffer();
  fs.writeFileSync(destPath, buffer);
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
