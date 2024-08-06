/* eslint-disable @typescript-eslint/naming-convention */
// iconTranslator.ts

import { Node } from "../JsonParser";

export function generateIconXaml(node: Node, indent: string = ""): string {
  const props = node.props;
  let xaml = `${indent}<FontIcon`;

  // Convert the VSCode icon name to a Unicode glyph
  const glyph = getGlyphFromVscIcon(props.selectedIcon);

  xaml += ` Glyph="${glyph}"`;
  xaml += ` FontSize="${props.iconSize}"`;
  xaml += ` Foreground="${props.iconColor}"`;

  if (props.hyperlink) {
    xaml += ">\n";
    xaml += `${indent}  <FontIcon.Resources>\n`;
    xaml += `${indent}    <Style TargetType="FontIcon">\n`;
    xaml += `${indent}      <Setter Property="PointerPressed" Value="OnIconPressed"/>\n`;
    xaml += `${indent}    </Style>\n`;
    xaml += `${indent}  </FontIcon.Resources>\n`;
    xaml += `${indent}</FontIcon>`;
  } else {
    xaml += " />";
  }

  return xaml + "\n";
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
