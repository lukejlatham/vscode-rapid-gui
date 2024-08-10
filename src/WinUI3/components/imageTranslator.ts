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
  xaml += ` Height="${props.height}*"`;

  xaml += ` Stretch="Uniform"`;

  if (props.alignment) {
    xaml += ` HorizontalAlignment="${capitalizeFirstLetter(props.alignment)}"`;
  }

  xaml += " />";

  return xaml + "\n";
}

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
