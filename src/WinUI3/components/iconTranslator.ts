/* eslint-disable @typescript-eslint/naming-convention */
//Icons -> <FontIcon> or <SymbolIcon>
// iconTranslator.ts

import { Node } from "../JsonParser";

// This mapping converts Fluent UI icon names to their corresponding Unicode values
const fluentIconMapping: { [key: string]: string } = {
  Home24Regular: "E80F",
  Person24Regular: "E77B",
  Settings24Regular: "E713",
  Add24Regular: "E710",
  Subtract24Regular: "E711",
  More24Regular: "E712",
  Mail24Regular: "E715",
  Calendar24Regular: "E787",
  Camera24Regular: "E722",
  Phone24Regular: "E717",
  Search24Regular: "E721",
  Share24Regular: "E72D",
  Download24Regular: "E896",
  Upload24Regular: "E898",
};

export function generateIconXaml(node: Node, indent: string = ""): string {
  const props = node.props;
  let xaml = "";

  const iconCode = fluentIconMapping[props.selectedIcon];

  if (iconCode) {
    xaml += `${indent}<FontIcon Glyph="&#xE${iconCode};"`;
    xaml += ` FontFamily="{StaticResource SymbolThemeFontFamily}"`; // This uses the Segoe Fluent Icons font
  } else {
    console.warn(`Icon mapping not found for ${props.selectedIcon}`);
    xaml += `${indent}<FontIcon Glyph="&#xE001;"`; // Default to a generic icon
  }

  // Common properties
  xaml += ` Foreground="${props.iconColor}"`;
  xaml += ` FontSize="${props.iconSize}"`;

  if (props.hyperlink) {
    xaml += ">\n";
    xaml += `${indent}  <FontIcon.ContentTemplate>\n`;
    xaml += `${indent}    <DataTemplate>\n`;
    xaml += `${indent}      <HyperlinkButton NavigateUri="${props.hyperlink}">\n`;
    xaml += `${indent}        <FontIcon Glyph="&#xE${iconCode};" FontSize="${props.iconSize}" Foreground="${props.iconColor}" />\n`;
    xaml += `${indent}      </HyperlinkButton>\n`;
    xaml += `${indent}    </DataTemplate>\n`;
    xaml += `${indent}  </FontIcon.ContentTemplate>\n`;
    xaml += `${indent}</FontIcon>`;
  } else {
    xaml += " />";
  }

  return xaml + "\n";
}
