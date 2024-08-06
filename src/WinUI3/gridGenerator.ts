interface NodeProps {
  rows?: number;
  columns?: number;
  backgroundColor?: string;
  layout?: {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
    moved?: boolean;
    static?: boolean;
    maxW?: number;
    maxH?: number;
  }[];
  [key: string]: any;
}

interface CustomNode {
  type: { resolvedName: string };
  isCanvas: boolean;
  props: NodeProps;
  displayName: string;
  custom?: { id?: string };
  parent: string | null;
  hidden: boolean;
  nodes: string[];
  linkedNodes: { [key: string]: string };
}

interface JsonStructure {
  [key: string]: CustomNode;
}

function generateGridXaml(json: JsonStructure): string {
  const root = json["ROOT"];
  let xaml = `<Grid x:Name="RootGrid" Background="${root.props.backgroundColor}">\n`;

  // Set root grid row and column definitions
  if (root.props.rows) {
    xaml += ` <Grid.RowDefinitions>\n`;
    for (let i = 0; i < root.props.rows; i++) {
      xaml += ` <RowDefinition Height="*"/>\n`;
    }
    xaml += ` </Grid.RowDefinitions>\n`;
  }

  if (root.props.columns) {
    xaml += ` <Grid.ColumnDefinitions>\n`;
    for (let i = 0; i < root.props.columns; i++) {
      xaml += ` <ColumnDefinition Width="*"/>\n`;
    }
    xaml += ` </Grid.ColumnDefinitions>\n`;
  }

  // Generate child grids based on the layout
  if (root.props.layout) {
    root.props.layout.forEach((layoutItem) => {
      const nodeId = root.linkedNodes[layoutItem.i];
      const node = json[nodeId];
      xaml += generateGridCellXaml(layoutItem, node, json);
    });
  }

  xaml += "</Grid>\n";
  return xaml;
}

function generateGridCellXaml(layoutItem: any, node: CustomNode, json: JsonStructure): string {
  let xaml = ` <Grid Grid.Row="${layoutItem.y}" Grid.Column="${layoutItem.x}" Grid.RowSpan="${layoutItem.h}" Grid.ColumnSpan="${layoutItem.w}">\n`;

  // Add a StackPanel for cell content
  xaml += `    <StackPanel HorizontalAlignment="Center" VerticalAlignment="Center" Orientation="Vertical" Margin="10">\n`;

  // Add content for each grid cell
  for (const childId of node.nodes) {
    const childNode = json[childId];
    xaml += `      <!-- ${childNode.displayName} -->\n`;
  }

  xaml += "    </StackPanel>\n";
  xaml += "  </Grid>\n";
  return xaml;
}

function mapFlexToAlignment(flexValue: string): string {
  switch (flexValue) {
    case "flex-start":
      return "Left";
    case "flex-end":
      return "Right";
    case "center":
      return "Center";
    case "space-between":
      return "Stretch";
    default:
      return "Stretch";
  }
}

// function generateComponentXaml(node: CustomNode): string {
//   let xaml = "";

//   switch (node.type.resolvedName) {
//     case "Input":
//       xaml += `<TextBox PlaceholderText="${node.props.placeholder}" FontSize="${node.props.fontSize}" Foreground="${node.props.fontColor}" Background="${node.props.backgroundColor}" BorderRadius="${node.props.borderRadius}"/>\n`;
//       break;
//     case "Text":
//       xaml += `<TextBlock Text="${node.props.text}" FontSize="${node.props.fontSize}" Foreground="${node.props.fontColor}" TextAlignment="${node.props.textAlign}" />\n`;
//       break;
//     case "Label":
//       xaml += `<TextBlock Text="${node.props.text}" FontSize="${node.props.fontSize}" Foreground="${node.props.fontColor}" TextAlignment="${node.props.textAlign}" />\n`;
//       break;
//     case "Icon":
//       xaml += `<FontIcon Glyph="${node.props.selectedIcon}" FontSize="${node.props.iconSize}" Foreground="${node.props.iconColor}" />\n`;
//       break;
//     case "RadioButton":
//       xaml += `<StackPanel Orientation="${node.props.direction}">\n`;
//       node.props.optionLabels.forEach((label: string) => {
//         xaml += `<RadioButton Content="${label}" FontSize="${node.props.fontSize}" Foreground="${node.props.fontColor}" />\n`;
//       });
//       xaml += `</StackPanel>\n`;
//       break;
//     case "Container":
//       xaml += `<Border Background="${node.props.backgroundColor}" CornerRadius="${node.props.borderRadius}" BorderBrush="${node.props.borderColor}" Padding="${node.props.padding}" Width="${node.props.width}" Height="${node.props.height}">\n`;
//       xaml += `<StackPanel Orientation="${node.props.flexDirection}" HorizontalAlignment="${node.props.justifyContent}" VerticalAlignment="${node.props.alignItems}">\n`;
//       // Here you would add child elements inside the container if necessary
//       xaml += `</StackPanel>\n`;
//       xaml += `</Border>\n`;
//       break;
//     default:
//       xaml += `<!-- Unknown component type: ${node.type.resolvedName} -->\n`;
//   }

//   return xaml;
// }

function generateXaml(json: JsonStructure): string {
  let xaml = `<Window x:Class="GridExample.MainWindow"
          xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
          xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
          Title="MainWindow" Height="450" Width="800">\n`;
  xaml += generateGridXaml(json);
  xaml += "</Window>";
  return xaml;
}

//   let cellXaml = "";
//   if (json.ROOT.props.layout) {
//     for (const layoutItem of json.ROOT.props.layout) {
//       const nodeId = json.ROOT.linkedNodes[layoutItem.i];
//       const node = json[nodeId];
//       cellXaml += generateGridCellXaml(layoutItem, node, json);
//     }
//   }
//   xaml = xaml.replace("</Grid>", cellXaml + "</Grid>");
//   xaml += "\n</Window>";
//   return xaml;
// }

// Example usage
const json: JsonStructure = {
  "ROOT": {
    type: { resolvedName: "Background" },
    isCanvas: true,
    props: {
      rows: 5,
      columns: 5,
      lockedGrid: false,
      backgroundColor: "#292929",
      layout: [
        {
          w: 1,
          h: 1,
          x: 0,
          y: 0,
          i: "0",
          moved: false,
          static: false,
        },
        {
          w: 1,
          h: 1,
          x: 1,
          y: 0,
          i: "1",
          moved: false,
          static: false,
        },
        {
          w: 1,
          h: 1,
          x: 2,
          y: 0,
          i: "2",
          moved: false,
          static: false,
        },
        {
          w: 1,
          h: 1,
          x: 0,
          y: 1,
          i: "3",
          moved: false,
          static: false,
        },
        {
          w: 1,
          h: 1,
          x: 1,
          y: 1,
          i: "4",
          moved: false,
          static: false,
        },
        {
          w: 1,
          h: 1,
          x: 2,
          y: 1,
          i: "5",
          moved: false,
          static: false,
        },
        {
          w: 1,
          h: 1,
          x: 3,
          y: 0,
          i: "6",
          maxW: 5,
          maxH: 5,
          moved: false,
          static: false,
        },
        {
          w: 1,
          h: 1,
          x: 4,
          y: 0,
          i: "7",
          maxW: 5,
          maxH: 5,
          moved: false,
          static: false,
        },
        {
          w: 1,
          h: 1,
          x: 3,
          y: 1,
          i: "8",
          maxW: 5,
          maxH: 5,
          moved: false,
          static: false,
        },
        {
          w: 1,
          h: 1,
          x: 4,
          y: 1,
          i: "9",
          maxW: 5,
          maxH: 5,
          moved: false,
          static: false,
        },
        {
          w: 1,
          h: 1,
          x: 0,
          y: 2,
          i: "10",
          maxW: 5,
          maxH: 5,
          moved: false,
          static: false,
        },
        {
          w: 2,
          h: 1,
          x: 1,
          y: 2,
          i: "11",
          maxW: 5,
          maxH: 5,
          moved: false,
          static: false,
        },
        {
          w: 2,
          h: 1,
          x: 3,
          y: 2,
          i: "12",
          maxW: 5,
          maxH: 5,
          moved: false,
          static: false,
        },
      ],
    },
    displayName: "Background",
    custom: {},
    parent: null,
    hidden: false,
    nodes: [],
    linkedNodes: {
      "0": "3q3SjD9wIE",
      "1": "3TIilnliOM",
      "2": "luDnnEeOQB",
      "3": "ibzieLXfUr",
      "4": "S1yn6IcYu0",
      "5": "sPR6gLeUYh",
      "6": "B6gedZQbJK",
      "7": "jj1BIJjqrv",
      "8": "-zYeoALOFj",
      "9": "50JbJxdjD-",
      "10": "bVM1dEwvfB",
      "11": "Z6zl7VmWwi",
      "12": "3KZyY-FYbF",
    },
  },
  "3q3SjD9wIE": {
    type: { resolvedName: "GridCell" },
    isCanvas: true,
    props: {
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      gap: 10,
    },
    displayName: "Grid Cell",
    custom: { id: "0" },
    parent: "ROOT",
    hidden: false,
    nodes: [],
    linkedNodes: {},
  },
  "3TIilnliOM": {
    type: { resolvedName: "GridCell" },
    isCanvas: true,
    props: {
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      gap: 10,
    },
    displayName: "Grid Cell",
    custom: { id: "1" },
    parent: "ROOT",
    hidden: false,
    nodes: [],
    linkedNodes: {},
  },
  "luDnnEeOQB": {
    type: { resolvedName: "GridCell" },
    isCanvas: true,
    props: {
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      gap: 10,
    },
    displayName: "Grid Cell",
    custom: { id: "2" },
    parent: "ROOT",
    hidden: false,
    nodes: [],
    linkedNodes: {},
  },
  "ibzieLXfUr": {
    type: { resolvedName: "GridCell" },
    isCanvas: true,
    props: {
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      gap: 10,
    },
    displayName: "Grid Cell",
    custom: { id: "3" },
    parent: "ROOT",
    hidden: false,
    nodes: [],
    linkedNodes: {},
  },
  "S1yn6IcYu0": {
    type: { resolvedName: "GridCell" },
    isCanvas: true,
    props: {
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      gap: 10,
    },
    displayName: "Grid Cell",
    custom: { id: "4" },
    parent: "ROOT",
    hidden: false,
    nodes: [],
    linkedNodes: {},
  },
  "sPR6gLeUYh": {
    type: { resolvedName: "GridCell" },
    isCanvas: true,
    props: {
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      gap: 10,
    },
    displayName: "Grid Cell",
    custom: { id: "5" },
    parent: "ROOT",
    hidden: false,
    nodes: [],
    linkedNodes: {},
  },
  "B6gedZQbJK": {
    type: { resolvedName: "GridCell" },
    isCanvas: true,
    props: {
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      gap: 10,
    },
    displayName: "Grid Cell",
    custom: { id: "6" },
    parent: "ROOT",
    hidden: false,
    nodes: [],
    linkedNodes: {},
  },
  "jj1BIJjqrv": {
    type: { resolvedName: "GridCell" },
    isCanvas: true,
    props: {
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      gap: 10,
    },
    displayName: "Grid Cell",
    custom: { id: "7" },
    parent: "ROOT",
    hidden: false,
    nodes: [],
    linkedNodes: {},
  },
  "-zYeoALOFj": {
    type: { resolvedName: "GridCell" },
    isCanvas: true,
    props: {
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      gap: 10,
    },
    displayName: "Grid Cell",
    custom: { id: "8" },
    parent: "ROOT",
    hidden: false,
    nodes: [],
    linkedNodes: {},
  },
  "50JbJxdjD-": {
    type: { resolvedName: "GridCell" },
    isCanvas: true,
    props: {
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      gap: 10,
    },
    displayName: "Grid Cell",
    custom: { id: "9" },
    parent: "ROOT",
    hidden: false,
    nodes: [],
    linkedNodes: {},
  },
  "bVM1dEwvfB": {
    type: { resolvedName: "GridCell" },
    isCanvas: true,
    props: {
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      gap: 10,
    },
    displayName: "Grid Cell",
    custom: { id: "10" },
    parent: "ROOT",
    hidden: false,
    nodes: [],
    linkedNodes: {},
  },
  "Z6zl7VmWwi": {
    type: { resolvedName: "GridCell" },
    isCanvas: true,
    props: {
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      gap: 10,
    },
    displayName: "Grid Cell",
    custom: { id: "11" },
    parent: "ROOT",
    hidden: false,
    nodes: [],
    linkedNodes: {},
  },
  "3KZyY-FYbF": {
    type: { resolvedName: "GridCell" },
    isCanvas: true,
    props: {
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      gap: 10,
    },
    displayName: "Grid Cell",
    custom: { id: "12" },
    parent: "ROOT",
    hidden: false,
    nodes: [],
    linkedNodes: {},
  },
};

const xamlOutput = generateGridXaml(json);
console.log(xamlOutput);
