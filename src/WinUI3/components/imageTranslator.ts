import { Node } from "../JsonParser";
import * as path from "path";
import * as fs from "fs";
import * as vscode from "vscode";

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

  // Check if the src is a VS Code resource URL or contains 'uploaded_images'
  if (src.includes("vscode-resource") || src.includes("uploaded_images")) {
    console.log("Processing VSCode resource or uploaded image URL");
    let localPath = decodeURIComponent(src);

    // Remove the VS Code resource prefix if it exists
    if (localPath.startsWith("https://file+.vscode-resource.vscode-cdn.net")) {
      localPath = localPath.replace("https://file+.vscode-resource.vscode-cdn.net", "");
    }

    console.log("Local path:", localPath);

    if (fs.existsSync(localPath)) {
      fs.copyFileSync(localPath, destPath);
      console.log("File copied successfully to:", destPath);
    } else {
      // If the direct path doesn't work, try to construct it from projectPath
      const altPath = path.join(projectPath, "..", "..", "uploaded_images", fileName);
      console.log("Trying alternative path:", altPath);

      if (fs.existsSync(altPath)) {
        fs.copyFileSync(altPath, destPath);
        console.log("File copied successfully from alternative path to:", destPath);
      } else {
        console.log("Source file not found at either path");
        return "";
      }
    }
  } else {
    console.log("Unsupported image source:", src);
    return "";
  }

  return `/Assets/${fileName}`;
}

// async function downloadImage(url: string, destPath: string): Promise<void> {
//   return new Promise((resolve, reject) => {
//     const file = fs.createWriteStream(destPath);
//     https
//       .get(url, { rejectUnauthorized: false }, (response) => {
//         console.log(`Response status code: ${response.statusCode}`);
//         console.log(`Response headers: ${JSON.stringify(response.headers)}`);

//         if (response.statusCode === 200) {
//           response.pipe(file);
//           file.on("finish", () => {
//             file.close();
//             const stats = fs.statSync(destPath);
//             console.log(`Downloaded file size: ${stats.size} bytes`);
//             resolve();
//           });
//         } else {
//           file.close();
//           fs.unlink(destPath, () => {});
//           reject(new Error(`Server responded with status code: ${response.statusCode}`));
//         }
//       })
//       .on("error", (error) => {
//         console.error(`Download error: ${error.message}`);
//         fs.unlink(destPath, () => reject(error));
//       });
//   });
// }

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
