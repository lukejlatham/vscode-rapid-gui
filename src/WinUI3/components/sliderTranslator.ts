import { Node } from "../JsonParser";

export function generateSliderXaml(node: Node, indent: string = ""): string {
  const props = node.props;
  let xaml = `${indent}<Slider`;

  xaml += ` Minimum="${props.min}"`;
  xaml += ` Maximum="${props.max}"`;
  xaml += ` Value="${props.value}"`;
  xaml += ` StepFrequency="${props.step}"`;
  xaml += ` Width="${props.width}"`;
  xaml += ` Foreground="${props.color}"`;
  xaml += ` Background="${props.backgroundColor}"`;

  if (props.orientation === "vertical") {
    xaml += ` Orientation="Vertical"`;
  }

  xaml += ` TickFrequency="${props.tickFrequency || props.step}"`;
  xaml += ` TickPlacement="Outside"`;

  xaml += " />";

  return xaml + "\n";
}
