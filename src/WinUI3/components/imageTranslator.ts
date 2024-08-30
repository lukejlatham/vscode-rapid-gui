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

    // Remove the VS Code resource prefix if it exists
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
  } else {
    console.log("Unsupported image source:", src);
    return "";
  }
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
