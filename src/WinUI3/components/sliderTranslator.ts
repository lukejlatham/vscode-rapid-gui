import { Node } from "../JsonParser";

export function generateSliderXaml(node: Node, indent: string = ""): string {
  const props = node.props;
  let xaml = `${indent}<Slider`;

  xaml += ` Minimum="${props.min || 0}"`;
  xaml += ` Maximum="${props.max || 100}"`;
  xaml += ` Value="${props.value || 50}"`;
  xaml += ` StepFrequency="${props.step || 1}"`;
  xaml += ` Width="${props.width || 200}"`;
  xaml += ` Foreground="${props.color || "{ThemeResource SliderTrackValueFill}"}"`;
  xaml += ` Background="${props.backgroundColor || "{ThemeResource SliderTrackFill}"}"`;

  if (props.orientation === "vertical") {
    xaml += ` Orientation="Vertical"`;
  }

  if (props.header) {
    xaml += `${indent}<TextBlock Text="${props.header}" FontFamily="${
      props.fontFamily || "Segoe UI"
    }" />\n`;
  }

  xaml += ` TickFrequency="${props.tickFrequency || props.step || 1}"`;
  xaml += ` TickPlacement="Outside"`;

  xaml += "></Slider>";

  return xaml + "\n";
}
