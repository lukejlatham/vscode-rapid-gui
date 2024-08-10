import { Node } from "../JsonParser";

export function generateImageXaml(node: Node, indent: string = ""): string {
  const props = node.props;
  let xaml = `${indent}<Image`;

  if (props.src) {
    xaml += ` Source="${props.src}"`;
  } else {
    console.warn("Image source is missing");
  }

  if (props.alt) {
    xaml += ` AutomationProperties.Name="${props.alt}"`;
  }

  xaml += ` Width="${props.width}*"`;
  // Note: Height is set to Auto to maintain aspect ratio
  xaml += ` Height="Auto"`;

  xaml += ` Stretch="Uniform"`;

  xaml += " />";

  return xaml + "\n";
}
