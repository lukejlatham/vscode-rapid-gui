/* eslint-disable @typescript-eslint/naming-convention */
import { Node } from "../JsonParser";
import { convertColor } from "../../utilities/colortranslator";

export function generateIconXaml(node: Node, indent: string = ""): string {
  const props = node.props;
  let xaml = `${indent}<FontIcon`;

  const glyph = getGlyphFromVscIcon(props.vscIcon);

  xaml += ` Glyph="${glyph}"`;
  xaml += ` FontSize="${props.iconSize || 16}"`;
  xaml += ` Foreground="${convertColor(props.iconColor)}"`;
  xaml += ` FontFamily="{StaticResource SymbolThemeFontFamily}"`;
  xaml += ` HorizontalAlignment="Center" VerticalAlignment="Center"`;
  xaml += ` Margin="1"`;

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
    return color;
  }
  return "{ThemeResource SystemControlForegroundBaseHighBrush}";
}

export function getGlyphFromVscIcon(iconName: string): string {
  const iconMap: { [key: string]: string } = {
    VscAdd: "E710",
    VscHome: "E80F",
    VscAccount: "E77B",
    VscSettings: "E713",
    VscSearch: "E721",
    VscClose: "E711",
    VscCheck: "E73E",
    VscInfo: "E946",
    VscBell: "E7ED",
    VscEdit: "E70F",
    VscError: "E783",
    VscFile: "E8E5",
    VscFolder: "E8B7",
    VscLink: "E71B",
    VscLock: "E72E",
    VscMail: "E715",
    VscTrash: "E74D",
    VscUndo: "E7A7",
    VscRedo: "E7A6",
    VscUpload: "E898",
    VscDownload: "E896",
    VscPlay: "E768",
    VscPause: "E769",
    VscStop: "E71A",
    VscSync: "E895",
    VscList: "E8A3",
    VscRefresh: "E72C",
    VscSave: "E74E",
    VscFolderOpen: "E838",
    VscChevronRight: "E76C",
    VscChevronDown: "E76B",
    VscChevronUp: "E76A",
    VscChevronLeft: "E76D",
    VscLightbulb: "E898",
    VscTerminal: "E756",
    VscWarning: "E814",
    VscGraph: "E9D6",
    VscGitBranch: "E9BD",
    VscGitCommit: "E9B9",
    VscGitPullRequest: "E9B8",
    VscGitMerge: "E9BC",
    VscGitCompare: "E9BB",
    VscPerson: "E77B",
    VscThumbsUp: "E8FB",
    VscThumbsDown: "E8FD",
    VscEye: "E8F4",
    VscEyeClosed: "E8F5",
    VscCloudUpload: "E891",
    VscCloudDownload: "E892",
    VscComment: "E90A",
    VscCommentAdd: "E90B",
    VscArrowUp: "E700",
    VscArrowDown: "E701",
    VscArrowLeft: "E704",
    VscArrowRight: "E703",
    VscArrowBoth: "E80C",
    VscArrowSwap: "E72F",
    VscBookmark: "E8A4",
    VscCalendar: "E787",
    VscChart: "E9D3",
    VscCode: "E943",
    VscCollapseAll: "EF2D",
    VscCopy: "E8C8",
    VscCut: "E8C6",
    VscDashboard: "E9A6",
    VscDesktopDownload: "E896",
    VscEllipsis: "E10C",
    VscExpandAll: "EF2C",
    VscExtensions: "EBA5",
    VscFileBinary: "EAF4",
    VscFileCode: "E8B5",
    VscFileMedia: "EBC3",
    VscFilePdf: "EA90",
    VscFiles: "E8B7",
    VscFilter: "E71C",
    VscFolderActive: "E838",
    VscFolderLibrary: "E8D4",
    VscFoldDown: "E74B",
    VscFoldUp: "E74C",
    VscGear: "EAD4",
    VscGift: "ECA6",
    VscHeart: "EB51",
    VscHistory: "EA2A",
    VscLightbulbAutofix: "EAAD",
    VscListFlat: "EF0B",
    VscListSelection: "EF0E",
    VscListTree: "EF0C",
    VscLockSmall: "E72E",
    VscMicroscope: "EA92",
    VscMute: "E78F",
    VscNoNewline: "EC1D",
    VscNote: "E70B",
    VscNotebook: "EDA4",
    VscOutput: "EF1A",
    VscPass: "EBE8",
    VscPin: "E718",
    VscPinned: "E840",
    VscPlug: "EABA",
    VscPreview: "E70E",
    VscProject: "EBCB",
    VscPulse: "E9A5",
    VscRepo: "E2AF",
    VscRocket: "E9A5",
    VscRss: "E920",
    VscRun: "E768",
    VscServer: "E7E6",
    VscSettingsGear: "E713",
    VscShield: "EA18",
    VscSignIn: "E748",
    VscSignOut: "E749",
    VscSmiley: "E8F3",
    VscSplitHorizontal: "EF42",
    VscSplitVertical: "EF44",
    VscSymbolArray: "EB4C",
    VscSymbolBoolean: "EB52",
    VscSymbolClass: "EB53",
    VscSymbolColor: "EB55",
    VscSymbolConstant: "EB56",
    VscSymbolEnum: "EB57",
    VscSymbolField: "EB63",
    VscSymbolFile: "EB66",
    VscSymbolKey: "EB6E",
    VscSymbolMethod: "EB7C",
    VscSymbolNamespace: "EB7D",
    VscSymbolNumeric: "EB7E",
    VscSymbolParameter: "EB81",
    VscSymbolProperty: "EB85",
    VscSymbolSnippet: "EB94",
    VscSymbolString: "EB98",
    VscSymbolVariable: "EBD1",
    VscTasklist: "EACB",
    VscTextSize: "E8A4",
    VscThumbtack: "E840",
    VscTools: "E7AD",
    VscTriangleDown: "E74B",
    VscTriangleLeft: "E76D",
    VscTriangleRight: "E76C",
    VscTriangleUp: "E74A",
    VscTypeHierarchy: "EF62",
    VscUnfold: "EF2E",
    VscUnmute: "E7F3",
    VscWand: "E776",
    VscWarningOutline: "E814",
    VscZap: "E9AF",
    VscBeaker: "F0A0",
    VscBroadcast: "F0A1",
    VscBug: "F0A2",
    VscCallIncoming: "F0A3",
    VscCallOutgoing: "F0A4",
    VscCases: "F0A5",
    VscCheckAll: "F0A6",
    VscChecklist: "F0A7",
    VscChevronSmallDown: "F0A8",
    VscChevronSmallLeft: "F0A9",
    VscChevronSmallRight: "F0AA",
    VscChevronSmallUp: "F0AB",
    VscChromeClose: "F0AC",
    VscChromeMaximize: "F0AD",
    VscChromeMinimize: "F0AE",
    VscChromeRestore: "F0AF",
    VscCircleOutline: "F0B0",
    VscCircleSlash: "F0B1",
    VscCircuitBoard: "F0B2",
    VscClearAll: "F0B3",
    VscClippy: "F0B4",
    VscCloseAll: "F0B5",
    VscCloud: "F0B6",
    VscCloudUploadOutline: "F0B7",
    VscCollapse: "F0B8",
    VscColorMode: "F0B9",
    VscCombine: "F0BA",
    VscCommentDiscussion: "F0BB",
    VscCompass: "F0BC",
    VscCreditCard: "F0BD",
    VscDash: "F0BE",
    VscDatabase: "F0BF",
    VscDebug: "F0C0",
    VscDebugAlt: "F0C1",
    VscDebugAltSmall: "F0C2",
    VscDebugBreakpointConditionalUnverified: "F0C3",
    VscDebugBreakpointFunctionUnverified: "F0C4",
    VscDebugBreakpointLogUnverified: "F0C5",
    VscDebugConsole: "F0C6",
    VscDebugDisconnect: "F0C7",
    VscDebugPause: "F0C8",
    VscDebugRestart: "F0C9",
    VscDebugRestartFrame: "F0CA",
    VscDebugReverseContinue: "F0CB",
    VscDebugStackframe: "F0CC",
    VscDebugStackframeDot: "F0CD",
    VscDebugStart: "F0CE",
    VscDebugStepBack: "F0CF",
    VscDebugStepInto: "F0D0",
    VscDebugStepOut: "F0D1",
    VscDebugStepOver: "F0D2",
    VscDebugStop: "F0D3",
    VscDesktopDownloadOutline: "F0D4",
    VscDeviceCamera: "F0D5",
    VscDeviceCameraVideo: "F0D6",
    VscDeviceMobile: "F0D7",
    VscDiff: "F0D8",
    VscDiffAdded: "F0D9",
    VscDiffIgnored: "F0DA",
    VscDiffModified: "F0DB",
    VscDiffRemoved: "F0DC",
    VscDiffRenamed: "F0DD",
    VscEllipsisOutline: "F0DE",
    VscEmptyWindow: "F0DF",
    VscExclude: "F0E0",
    VscExpand: "F0E1",
    VscExtensionsOutline: "F0E2",
    VscFileDirectoryCreate: "F0E3",
    VscFileSymlinkDirectory: "F0E4",
    VscFileSymlinkFile: "F0E5",
    VscFileZip: "F0E6",
    VscFilesOutline: "F0E7",
    VscFlame: "F0E8",
    VscFold: "F0E9",
    VscFoldDownOutline: "F0EA",
    VscFoldUpOutline: "F0EB",
    VscFolderOutline: "F0EC",
    VscFolderOpened: "F0ED",
    VscFolderSymlink: "F0EE",
    VscGearOutline: "F0EF",
    VscGist: "F0F0",
    VscGistSecret: "F0F1",
    VscGitCommitOutline: "F0F2",
    VscGitMergeOutline: "F0F3",
    VscGitPullRequestOutline: "F0F4",
    VscGlobe: "F0F5",
    VscGoToFile: "F0F6",
    VscGrabber: "F0F7",
    VscGraphOutline: "F0F8",
    VscHeartOutline: "F0F9",
    VscHistoryOutline: "F0FA",
    VscHomeOutline: "F0FB",
    VscHorizontalRule: "F0FC",
    VscHubot: "F0FD",
    VscInbox: "F0FE",
    VscIssueClosed: "F0FF",
    VscIssueDraft: "F100",
    VscIssueReopened: "F101",
    VscIssues: "F102",
    VscItalic: "F103",
    VscJersey: "F104",
    VscJson: "F105",
    VscKebabHorizontal: "F106",
    VscKebabVertical: "F107",
    VscKey: "F108",
    VscLaw: "F109",
    VscLayers: "F10A",
    VscLibrary: "F10B",
    VscLightbulbOutline: "F10C",
    VscLinkExternal: "F10D",
    VscListOrdered: "F10E",
    VscListUnordered: "F10F",
    VscLiveShare: "F110",
    VscLoading: "F111",
    VscLocation: "F112",
    VscMailOutline: "F113",
    VscMailRead: "F114",
    VscMarkdown: "F115",
    VscMegaphone: "F116",
    VscMention: "F117",
    VscMilestone: "F118",
    VscMortarBoard: "F119",
    VscMove: "F11A",
    VscMultipleWindows: "F11B",
    VscMuteOutline: "F11C",
    VscNo: "F11D",
    VscNotebookOutline: "F11E",
    VscNotebookTemplate: "F11F",
    VscOctoface: "F120",
    VscOpenPreview: "F121",
    VscOrganization: "F122",
    VscOrganizationOutline: "F123",
    VscPackage: "F124",
    VscPackageOutline: "F125",
    VscPaintcan: "F126",
    VscPassOutline: "F127",
    VscPaste: "F128",
    VscPersonAdd: "F129",
    VscPersonOutline: "F12A",
    VscPinOutline: "F12B",
    VscPinnedOutline: "F12C",
    VscPlugOutline: "F12D",
    VscPreserveCase: "F12E",
    VscPreviewOutline: "F12F",
    VscProjectOutline: "F130",
    VscPulseOutline: "F131",
    VscQuestion: "F132",
    VscQuote: "F133",
    VscRadioTower: "F134",
    VscReactions: "F135",
    VscReferences: "F136",
    VscRefreshOutline: "F137",
    VscRegex: "F138",
    VscRemote: "F139",
    VscRemove: "F13A",
    VscRepl: "F13B",
    VscRepoClone: "F13C",
    VscRepoForcePush: "F13D",
    VscRepoForked: "F13E",
    VscRepoOutline: "F13F",
    VscRepoPull: "F140",
    VscRepoPush: "F141",
    VscReport: "F142",
    VscRequestChanges: "F143",
    VscRocketOutline: "F144",
    VscRssOutline: "F145",
    VscRuby: "F146",
    VscRunAbove: "F147",
    VscRunAll: "F148",
    VscRunBelow: "F149",
    VscRunOutline: "F14A",
    VscSaveAll: "F14B",
    VscSaveAs: "F14C",
    VscScreenFull: "F14D",
    VscScreenNormal: "F14E",
    VscSearchStop: "F14F",
    VscServerOutline: "F150",
    VscSettingsOutline: "F151",
    VscShieldOutline: "F152",
    VscSignInOutline: "F153",
    VscSignOutOutline: "F154",
    VscSmileyOutline: "F155",
    VscSortPrecedence: "F156",
    VscSourceControl: "F157",
    VscSplitHorizontalOutline: "F158",
    VscSplitVerticalOutline: "F159",
    VscSquirrel: "F15A",
    VscStarFull: "F15B",
    VscStarHalf: "F15C",
    VscSymbolBracket: "F15D",
    VscSymbolColorOutline: "F15E",
    VscSymbolNamespaceOutline: "F15F",
    VscSymbolPropertyOutline: "F160",
    VscSymbolSnippetOutline: "F161",
    VscSyncIgnored: "F162",
    VscSyncOutline: "F163",
    VscTab: "F164",
    VscTag: "F165",
    VscTagOutline: "F166",
    VscTasklistOutline: "F167",
    VscTerminalBash: "F168",
    VscTerminalCmd: "F169",
    VscTerminalDebian: "F16A",
    VscTerminalLinux: "F16B",
    VscTerminalPowershell: "F16C",
    VscTerminalTmux: "F16D",
    VscTerminalUbuntu: "F16E",
    VscTerminalZsh: "F16F",
    VscThumbsUpOutline: "F170",
    VscThumbsDownOutline: "F171",
    VscToolsOutline: "F172",
    VscTriangleDownOutline: "F173",
    VscTriangleLeftOutline: "F174",
    VscTriangleRightOutline: "F175",
    VscTriangleUpOutline: "F176",
    VscTwitter: "F177",
    VscTypeHierarchyOutline: "F178",
    VscUnfoldOutline: "F179",
    VscUngroupByRefType: "F17A",
    VscUnlock: "F17B",
    VscUnmuteOutline: "F17C",
    VscVersions: "F17D",
    VscVm: "F17E",
    VscVmActive: "F17F",
    VscVmOutline: "F180",
    VscWandOutline: "F181",
    VscWarningOutline2: "F182",
    VscWhitespace: "F183",
    VscWholeWord: "F184",
    VscWindow: "F185",
    VscWindowMaximize: "F186",
    VscWindowMinimize: "F187",
    VscWindowRestore: "F188",
    VscWordWrap: "F189",
    VscWorkspaceTrusted: "F18A",
    VscWorkspaceUnknown: "F18B",
    VscWorkspaceUntrusted: "F18C",
    VscWrench: "F18D",
    VscX: "F18E",
    VscZoomIn: "F18F",
    VscZoomOut: "F190",
    VscQuestionOutline: "F191",
    VscChecklistOutline: "F192",
    VscSymbolStructure: "F193",
    VscSymbolRuler: "F194",
    VscServerEnvironment: "F195",
    VscServerProcess: "F196",
    VscTextAlignCenter: "F197",
    VscTextAlignLeft: "F198",
    VscTextAlignRight: "F199",
    VscTasklistAdd: "F19A",
    VscSourceControlMultiRoot: "F19B",
    VscStarEmpty: "F19C",
    VscTerminalOutline: "F19D",
    VscSymbolInterface: "F19E",
    VscSymbolMisc: "F19F",
    VscSymbolStructureOutline: "F1A0",
    VscSymbolRulerOutline: "F1A1",
    VscTextAlignJustify: "F1A2",
    VscDiffDeletedOutline: "F1A3",
    VscServerEnvironmentOutline: "F1A4",
    VscServerProcessOutline: "F1A5",
    VscAzure: "F1A6",
    VscBeakerStop: "F1A7",
    VscBeakerDelete: "F1A8",
    VscBeakerTemplate: "F1A9",
    VscBeakerWarning: "F1AA",
    VscBellDot: "F1AB",
    VscBriefcase: "F1AC",
    VscChartDonut: "F1AD",
    VscChartLine: "F1AE",
    VscChevronDoubleDown: "F1AF",
    VscChevronDoubleLeft: "F1B0",
    VscChevronDoubleRight: "F1B1",
    VscChevronDoubleUp: "F1B2",
    VscCircle: "F1B3",
    VscCloseCircle: "F1B4",
    VscCloseCircleOutline: "F1B5",
    VscCloudOutline: "F1B6",
    VscCloudSync: "F1B7",
    VscCloudSyncOutline: "F1B8",
    VscCollapseAllOutline: "F1B9",
    VscColorModeOutline: "F1BA",
    VscCombineOutline: "F1BB",
    VscCompassOutline: "F1BC",
    VscCreditCardOutline: "F1BD",
    VscDashOutline: "F1BE",
    VscDatabaseOutline: "F1BF",
    VscDebugPauseOutline: "F1C0",
    VscDebugRestartOutline: "F1C1",
    VscDebugRestartFrameOutline: "F1C2",
    VscDebugReverseContinueOutline: "F1C3",
    VscDebugStackframeOutline: "F1C4",
    VscDebugStackframeDotOutline: "F1C5",
    VscDebugStartOutline: "F1C6",
    VscDebugStepBackOutline: "F1C7",
    VscDebugStepIntoOutline: "F1C8",
    VscDebugStepOutOutline: "F1C9",
    VscDebugStepOverOutline: "F1CA",
    VscDebugStopOutline: "F1CB",
    VscDeviceCameraOutline: "F1CC",
    VscDeviceCameraVideoOutline: "F1CD",
    VscDeviceMobileOutline: "F1CE",
    VscDiffAddedOutline: "F1CF",
    VscDiffIgnoredOutline: "F1D0",
    VscDiffModifiedOutline: "F1D1",
    VscDiffRemovedOutline: "F1D2",
    VscDiffRenamedOutline: "F1D3",
    VscEllipsisOutline2: "F1D4",
    VscEmptyWindowOutline: "F1D5",
    VscExcludeOutline: "F1D6",
    VscExpandOutline: "F1D7",
    VscExtensionsOutline2: "F1D8",
    VscFileBinaryOutline: "F1D9",
    VscFileCodeOutline: "F1DA",
    VscFileDirectoryCreateOutline: "F1DB",
    VscFileMediaOutline: "F1DC",
    VscFilePdfOutline: "F1DD",
    VscFileSymlinkDirectoryOutline: "F1DE",
    VscFileSymlinkFileOutline: "F1DF",
    VscFileZipOutline: "F1E0",
    VscFilesOutline2: "F1E1",
    VscFlameOutline: "F1E2",
    VscFoldOutline: "F1E3",
    VscFolderOutline2: "F1E4",
    VscFolderOpenedOutline: "F1E5",
    VscFolderSymlinkOutline: "F1E6",
    VscGearOutline2: "F1E7",
    VscGistOutline: "F1E8",
    VscGistSecretOutline: "F1E9",
    VscGitCommitOutline2: "F1EA",
    VscGitMergeOutline2: "F1EB",
    VscGitPullRequestOutline2: "F1EC",
    VscGlobeOutline: "F1ED",
    VscGoToFileOutline: "F1EE",
    VscGrabberOutline: "F1EF",
    VscGraphOutline2: "F1F0",
    VscHeartOutline2: "F1F1",
    VscHistoryOutline2: "F1F2",
    VscHomeOutline2: "F1F3",
    VscHorizontalRuleOutline: "F1F4",
    VscHubotOutline: "F1F5",
    VscInboxOutline: "F1F6",
    VscIssueClosedOutline: "F1F7",
    VscIssueDraftOutline: "F1F8",
    VscIssueReopenedOutline: "F1F9",
    VscIssuesOutline: "F1FA",
    VscItalicOutline: "F1FB",
    VscJerseyOutline: "F1FC",
    VscJsonOutline: "F1FD",
    VscKebabHorizontalOutline: "F1FE",
    VscKebabVerticalOutline: "F1FF",
    VscHeartFilled: "F200",
    VscLawFill: "F201",
    VscLayersFill: "F202",
    VscLibraryFill: "F203",
    VscLightbulbFill: "F204",
    VscLinkExternalFill: "F205",
    VscListOrderedFill: "F206",
    VscMailFill: "F207",
    VscMentionFill: "F208",
    VscMilestoneFill: "F209",
    VscChip: "F20A",
  };

  const glyph = iconMap[iconName];
  if (glyph) {
    return `&#x${glyph};`;
  } else {
    console.warn(`Icon not found: ${iconName}. Using default glyph.`);
    return "&#xE80F;";
  }
}
