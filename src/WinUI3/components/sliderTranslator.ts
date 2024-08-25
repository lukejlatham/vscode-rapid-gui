import { Node } from "../JsonParser";
import { convertColor } from "./colortranslator";

export function generateSliderXaml(node: Node, indent: string = ""): string {
  const props = node.props;
  let xaml = `${indent}<StackPanel Orientation="Horizontal" Spacing="10">\n`;

  if (props.header) {
    xaml += `${indent}  <TextBlock Text="${props.header}" VerticalAlignment="Center" Width="120" FontFamily="${props.fontFamily || "Segoe UI"}" FontSize="${props.fontSize || 14}" Foreground="${convertColor(props.fontColor) || "{ThemeResource SystemControlForegroundBaseHighBrush}"}" />\n`;
  }

  xaml += `${indent}  <Slider`;
  xaml += ` Minimum="${props.min || 0}"`;
  xaml += ` Maximum="${props.max || 100}"`;
  xaml += ` Value="${props.value || 50}"`;
  xaml += ` StepFrequency="${props.step || 1}"`;
  xaml += ` Width="${props.width || 200}"`;
  xaml += ` TickFrequency="${props.tickFrequency || props.step || 1}"`;
  xaml += ` TickPlacement="Outside"`;
  if (props.orientation === "vertical") {
    xaml += ` Orientation="Vertical"`;
  }
  xaml += `>\n`;

  xaml += `<Slider.Resources>
    <SolidColorBrush x:Key="SliderTrackValueFill" Color="${props.color}"/>
    <SolidColorBrush x:Key="SliderTrackFill" Color="${props.backgroundColor}"/>
    </Slider.Resources>`;

  xaml += `${indent}  </Slider>\n`;
  xaml += `${indent}</StackPanel>`;

  return xaml + "\n";
}