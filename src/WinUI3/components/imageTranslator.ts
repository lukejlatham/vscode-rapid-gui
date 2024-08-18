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

async function handleImageSource(src: string, projectPath: string): Promise<string> {
  const assetsPath = path.join(projectPath, "Assets");
  if (!fs.existsSync(assetsPath)) {
    fs.mkdirSync(assetsPath, { recursive: true });
  }

  if (isUrl(src)) {
    const fileName = path.basename(new URL(src).pathname);
    const destPath = path.join(assetsPath, fileName);
    await downloadImage(src, destPath);
    return `ms-appx:///Assets/${fileName}`;
  } else {
    const fileName = path.basename(src);
    const destPath = path.join(assetsPath, fileName);
    copyImageToAssets(src, destPath);
    return `ms-appx:///Assets/${fileName}`;
  }
}

async function downloadImage(url: string, destPath: string): Promise<void> {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    fs.writeFileSync(destPath, response.data);
    console.log(`Downloaded image to: ${destPath}`);
  } catch (error) {
    console.error(`Failed to download image: ${error}`);
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
