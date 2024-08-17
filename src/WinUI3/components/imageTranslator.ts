import { Node } from "../JsonParser";
import * as path from "path";
import * as fs from "fs";

export function generateImageXaml(node: Node, indent: string = "", projectPath: string): string {
  const props = node.props;
  let xaml = `${indent}<Image`;

  if (props.src) {
    const imageSource = handleImageSource(props.src, projectPath);
    xaml += ` Source="${imageSource}"`;
  } else {
    console.warn("Image source is missing");
  }

  if (props.alt) {
    xaml += ` AutomationProperties.Name="${props.alt}"`;
  }

  xaml += ` Width="${props.width || "Auto"}"`;
  xaml += ` Height="Auto"`;
  xaml += ` Stretch="Uniform"`;

  if (props.alignment) {
    xaml += ` HorizontalAlignment="${props.alignment}"`;
  }

  xaml += " />";

  return xaml + "\n";
}

function handleImageSource(src: string, projectPath: string): string {
  if (isUrl(src)) {
    return src;
  } else {
    const fileName = path.basename(src);
    const destPath = path.join(projectPath, "Assets", fileName);
    copyImageToAssets(src, destPath);
    return `ms-appx:///Assets/${fileName}`;
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

function copyImageToAssets(sourcePath: string, destPath: string): void {
  try {
    fs.copyFileSync(sourcePath, destPath);
    console.log(`Copied image to: ${destPath}`);
  } catch (error) {
    console.error(`Failed to copy image: ${error}`);
  }
}
