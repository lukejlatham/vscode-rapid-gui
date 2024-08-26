/* eslint-disable @typescript-eslint/naming-convention */
import { Node } from "../JsonParser";
import { convertColor } from "./colortranslator";

export function generateIconXaml(node: Node, indent: string = ""): string {
  const props = node.props;
  let xaml = `${indent}<FontIcon`;

  const glyph = getGlyphFromVscIcon(props.selectedIcon);

  xaml += ` Glyph="${glyph}"`;
  xaml += ` FontSize="${props.iconSize}"`;

  xaml += ` Foreground="${convertColor(props.iconColor)}"`;

  xaml += "/>";

  return xaml + "\n";
}

function formatColor(color: string): string {
  if (color.startsWith("#")) {
    // If it's a hex color, ensure it has 8 characters (ARGB)
    if (color.length === 7) {
      // If it's a 6-digit hex (RGB), add full opacity
      return "#FF" + color.substring(1);
    } else if (color.length === 9) {
      // If it's already 8-digit hex (ARGB), use as is
      return color;
    }
  } else if (color.startsWith("FF") && color.length === 8) {
    // If it starts with FF and is 8 characters, it's likely meant to be a hex color
    return "#" + color;
  } else {
    // It's likely a named color, return as is
    return color;
  }

  // If we can't parse the color, return a default
  console.warn(`Unrecognized color format: ${color}. Using default.`);
  return "{ThemeResource SystemControlForegroundBaseHighBrush}";
}

function getGlyphFromVscIcon(iconName: string): string {
  const iconMap: { [key: string]: string } = {
    VscAdd: "\uE710",
    VscHome: "\uE80F",
    VscAccount: "\uE77B",
    VscSettings: "\uE713",
    VscSearch: "\uE721",
    VscClose: "\uE711",
    VscCheck: "\uE73E",
    VscInfo: "\uE946",
    VscBell: "\uE7ED",
    VscEdit: "\uE70F",
    VscError: "\uE783",
    VscFile: "\uE8E5",
    VscFolder: "\uE8B7",
    VscLink: "\uE71B",
    VscLock: "\uE72E",
    VscMail: "\uE715",
    VscTrash: "\uE74D",
    VscUndo: "\uE7A7",
    VscRedo: "\uE7A6",
    VscUpload: "\uE898",
    VscDownload: "\uE896",
    VscPlay: "\uE768",
    VscPause: "\uE769",
    VscStop: "\uE71A",
    VscSync: "\uE895",
    VscList: "\uE8A3",
    VscRefresh: "\uE72C",
    VscSave: "\uE74E",
    VscFolderOpen: "\uE838",
    VscChevronRight: "\uE76C",
    VscChevronDown: "\uE76B",
    VscChevronUp: "\uE76A",
    VscChevronLeft: "\uE76D",
    VscLightbulb: "\uE898",
    VscTerminal: "\uE756",
    VscWarning: "\uE814",
    VscGraph: "\uE9D6",
    VscGitBranch: "\uE9BD",
    VscGitCommit: "\uE9B9",
    VscGitPullRequest: "\uE9B8",
    VscGitMerge: "\uE9BC",
    VscGitCompare: "\uE9BB",
    VscPerson: "\uE77B",
    VscThumbsUp: "\uE8FB",
    VscThumbsDown: "\uE8FD",
    VscEye: "\uE8F4",
    VscEyeClosed: "\uE8F5",
    VscCloudUpload: "\uE891",
    VscCloudDownload: "\uE892",
    VscComment: "\uE90A",
    VscCommentAdd: "\uE90B",
  };

  return iconMap[iconName] || "\uE80F"; // Default glyph if not found
}
