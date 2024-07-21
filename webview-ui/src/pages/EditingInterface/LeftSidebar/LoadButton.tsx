import React, { useEffect } from 'react';
import { Button } from "@fluentui/react-components";
import { Folder24Regular } from '@fluentui/react-icons';
import { useEditor } from "@craftjs/core";
import { vscode } from '../../../utilities/vscode';

const test = {
  "ROOT": {
    "type": {
      "resolvedName": "Background"
    },
    "isCanvas": false,
    "props": {},
    "displayName": "Background",
    "custom": {},
    "hidden": false,
    "nodes": [
      "ContainerID"
    ],
    "linkedNodes": {}
  },
  "ContainerID": {
    "type": {
      "resolvedName": "Container"
    },
    "isCanvas": true,
    "props": {},
    "displayName": "Container",
    "custom": {},
    "hidden": false,
    "nodes": [
      "Rows1"
    ],
    "linkedNodes": {},
    "parent": "ROOT"
  },
  "Rows1": {
    "type": {
      "resolvedName": "Rows"
    },
    "isCanvas": true,
    "props": {
      "numberOfRows": 6,
      "gap": 0
    },
    "displayName": "Rows",
    "custom": {},
    "hidden": false,
    "nodes": [],
    "linkedNodes": {
      "row-0": "Row1",
      "row-1": "Row2",
      "row-2": "Row3",
      "row-3": "Row4",
      "row-4": "Row5",
      "row-5": "Row6"
    },
    "parent": "ContainerID"
  },
  "Row1": {
    "type": {
      "resolvedName": "Row"
    },
    "isCanvas": true,
    "props": {},
    "displayName": "Row",
    "custom": {},
    "hidden": false,
    "nodes": [
      "Columns1"
    ],
    "linkedNodes": {},
    "parent": "Rows1"
  },
  "Columns1": {
    "type": {
      "resolvedName": "Columns"
    },
    "isCanvas": true,
    "props": {},
    "displayName": "Columns",
    "custom": {},
    "hidden": false,
    "nodes": [],
    "linkedNodes": {
      "column-0": "Column1",
      "column-1": "Column2",
      "column-2": "Column3",
      "column-3": "Column4"
    },
    "parent": "Row1"
  },
  "Column1": {
    "type": {
      "resolvedName": "Column"
    },
    "isCanvas": true,
    "props": {},
    "displayName": "Column",
    "custom": {},
    "hidden": false,
    "nodes": [
      "Label1"
    ],
    "linkedNodes": {},
    "parent": "Columns1"
  },
  "Label1": {
    "type": {
      "resolvedName": "Label"
    },
    "isCanvas": false,
    "props": {
      "text": "New Label",
      "textAlign": "left",
      "fontSize": 20,
      "color": "#FFFFFF",
      "userEditable": true
    },
    "displayName": "Label",
    "custom": {},
    "hidden": false,
    "nodes": [],
    "linkedNodes": {},
    "parent": "Column1"
  },
  "Column2": {
    "type": {
      "resolvedName": "Column"
    },
    "isCanvas": true,
    "props": {},
    "displayName": "Column",
    "custom": {},
    "hidden": false,
    "nodes": [
      "Button1"
    ],
    "linkedNodes": {},
    "parent": "Columns1"
  },
  "Button1": {
    "type": {
      "resolvedName": "Button"
    },
    "isCanvas": false,
    "props": {
      "backgroundColor": "#0047AB",
      "fontColor": "white",
      "fontSize": 20,
      "borderRadius": 4,
      "text": "New Button",
      "width": 150,
      "height": 50,
      "alignment": "center"
    },
    "displayName": "Button",
    "custom": {},
    "hidden": false,
    "nodes": [],
    "linkedNodes": {},
    "parent": "Column2"
  },
  "Column3": {
    "type": {
      "resolvedName": "Column"
    },
    "isCanvas": true,
    "props": {},
    "displayName": "Column",
    "custom": {},
    "hidden": false,
    "nodes": [
      "Button2"
    ],
    "linkedNodes": {},
    "parent": "Columns1"
  },
  "Button2": {
    "type": {
      "resolvedName": "Button"
    },
    "isCanvas": false,
    "props": {
      "backgroundColor": "#0047AB",
      "fontColor": "white",
      "fontSize": 20,
      "borderRadius": 4,
      "text": "New Button",
      "width": 150,
      "height": 50,
      "alignment": "center"
    },
    "displayName": "Button",
    "custom": {},
    "hidden": false,
    "nodes": [],
    "linkedNodes": {},
    "parent": "Column3"
  },
  "Column4": {
    "type": {
      "resolvedName": "Column"
    },
    "isCanvas": true,
    "props": {},
    "displayName": "Column",
    "custom": {},
    "hidden": false,
    "nodes": [
      "Button3"
    ],
    "linkedNodes": {},
    "parent": "Columns1"
  },
  "Button3": {
    "type": {
      "resolvedName": "Button"
    },
    "isCanvas": false,
    "props": {
      "backgroundColor": "#0047AB",
      "fontColor": "white",
      "fontSize": 20,
      "borderRadius": 4,
      "text": "New Button",
      "width": 150,
      "height": 50,
      "alignment": "center"
    },
    "displayName": "Button",
    "custom": {},
    "hidden": false,
    "nodes": [],
    "linkedNodes": {},
    "parent": "Column4"
  },
  "Row2": {
    "type": {
      "resolvedName": "Row"
    },
    "isCanvas": true,
    "props": {},
    "displayName": "Row",
    "custom": {},
    "hidden": false,
    "nodes": [
      "Label2"
    ],
    "linkedNodes": {},
    "parent": "Rows1"
  },
  "Label2": {
    "type": {
      "resolvedName": "Label"
    },
    "isCanvas": false,
    "props": {
      "text": "New Label",
      "textAlign": "left",
      "fontSize": 20,
      "color": "#FFFFFF",
      "userEditable": true
    },
    "displayName": "Label",
    "custom": {},
    "hidden": false,
    "nodes": [],
    "linkedNodes": {},
    "parent": "Row2"
  },
  "Row3": {
    "type": {
      "resolvedName": "Row"
    },
    "isCanvas": true,
    "props": {},
    "displayName": "Row",
    "custom": {},
    "hidden": false,
    "nodes": [
      "Columns2"
    ],
    "linkedNodes": {},
    "parent": "Rows1"
  },
  "Columns2": {
    "type": {
      "resolvedName": "Columns"
    },
    "isCanvas": true,
    "props": {},
    "displayName": "Columns",
    "custom": {},
    "hidden": false,
    "nodes": [],
    "linkedNodes": {
      "column-0": "Column5",
      "column-1": "Column6"
    },
    "parent": "Row3"
  },
  "Column5": {
    "type": {
      "resolvedName": "Column"
    },
    "isCanvas": true,
    "props": {},
    "displayName": "Column",
    "custom": {},
    "hidden": false,
    "nodes": [
      "TextBox1"
    ],
    "linkedNodes": {},
    "parent": "Columns2"
  },
  "TextBox1": {
    "type": {
      "resolvedName": "TextBox"
    },
    "isCanvas": false,
    "props": {
      "text": "",
      "fontSize": 16,
      "fontColor": "black",
      "backgroundColor": "white",
      "placeholder": "Placeholder...",
      "rows": 5,
      "cols": 20,
      "borderRadius": 5,
      "alignment": "center"
    },
    "displayName": "TextBox",
    "custom": {},
    "hidden": false,
    "nodes": [],
    "linkedNodes": {},
    "parent": "Column5"
  },
  "Column6": {
    "type": {
      "resolvedName": "Column"
    },
    "isCanvas": true,
    "props": {},
    "displayName": "Column",
    "custom": {},
    "hidden": false,
    "nodes": [
      "TextBox2"
    ],
    "linkedNodes": {},
    "parent": "Columns2"
  },
  "TextBox2": {
    "type": {
      "resolvedName": "TextBox"
    },
    "isCanvas": false,
    "props": {
      "text": "",
      "fontSize": 16,
      "fontColor": "black",
      "backgroundColor": "white",
      "placeholder": "Placeholder...",
      "rows": 5,
      "cols": 20,
      "borderRadius": 5,
      "alignment": "center"
    },
    "displayName": "TextBox",
    "custom": {},
    "hidden": false,
    "nodes": [],
    "linkedNodes": {},
    "parent": "Column6"
  },
  "Row4": {
    "type": {
      "resolvedName": "Row"
    },
    "isCanvas": true,
    "props": {},
    "displayName": "Row",
    "custom": {},
    "hidden": false,
    "nodes": [
      "Columns3"
    ],
    "linkedNodes": {},
    "parent": "Rows1"
  },
  "Columns3": {
    "type": {
      "resolvedName": "Columns"
    },
    "isCanvas": true,
    "props": {},
    "displayName": "Columns",
    "custom": {},
    "hidden": false,
    "nodes": [],
    "linkedNodes": {
      "column-0": "Column7",
      "column-1": "Column8"
    },
    "parent": "Row4"
  },
  "Column7": {
    "type": {
      "resolvedName": "Column"
    },
    "isCanvas": true,
    "props": {},
    "displayName": "Column",
    "custom": {},
    "hidden": false,
    "nodes": [
      "Label3"
    ],
    "linkedNodes": {},
    "parent": "Columns3"
  },
  "Label3": {
    "type": {
      "resolvedName": "Label"
    },
    "isCanvas": false,
    "props": {
      "text": "New Label",
      "textAlign": "left",
      "fontSize": 20,
      "color": "#FFFFFF",
      "userEditable": true
    },
    "displayName": "Label",
    "custom": {},
    "hidden": false,
    "nodes": [],
    "linkedNodes": {},
    "parent": "Column7"
  },
  "Column8": {
    "type": {
      "resolvedName": "Column"
    },
    "isCanvas": true,
    "props": {},
    "displayName": "Column",
    "custom": {},
    "hidden": false,
    "nodes": [
      "TextBox3"
    ],
    "linkedNodes": {},
    "parent": "Columns3"
  },
  "TextBox3": {
    "type": {
      "resolvedName": "TextBox"
    },
    "isCanvas": false,
    "props": {
      "text": "",
      "fontSize": 16,
      "fontColor": "black",
      "backgroundColor": "white",
      "placeholder": "Placeholder...",
      "rows": 5,
      "cols": 20,
      "borderRadius": 5,
      "alignment": "center"
    },
    "displayName": "TextBox",
    "custom": {},
    "hidden": false,
    "nodes": [],
    "linkedNodes": {},
    "parent": "Column8"
  },
  "Row5": {
    "type": {
      "resolvedName": "Row"
    },
    "isCanvas": true,
    "props": {},
    "displayName": "Row",
    "custom": {},
    "hidden": false,
    "nodes": [
      "Columns4"
    ],
    "linkedNodes": {},
    "parent": "Rows1"
  },
  "Columns4": {
    "type": {
      "resolvedName": "Columns"
    },
    "isCanvas": true,
    "props": {},
    "displayName": "Columns",
    "custom": {},
    "hidden": false,
    "nodes": [],
    "linkedNodes": {
      "column-0": "Column9",
      "column-1": "Column10"
    },
    "parent": "Row5"
  },
  "Column9": {
    "type": {
      "resolvedName": "Column"
    },
    "isCanvas": true,
    "props": {},
    "displayName": "Column",
    "custom": {},
    "hidden": false,
    "nodes": [
      "Label4"
    ],
    "linkedNodes": {},
    "parent": "Columns4"
  },
  "Label4": {
    "type": {
      "resolvedName": "Label"
    },
    "isCanvas": false,
    "props": {
      "text": "New Label",
      "textAlign": "left",
      "fontSize": 20,
      "color": "#FFFFFF",
      "userEditable": true
    },
    "displayName": "Label",
    "custom": {},
    "hidden": false,
    "nodes": [],
    "linkedNodes": {},
    "parent": "Column9"
  },
  "Column10": {
    "type": {
      "resolvedName": "Column"
    },
    "isCanvas": true,
    "props": {},
    "displayName": "Column",
    "custom": {},
    "hidden": false,
    "nodes": [
      "TextBox4"
    ],
    "linkedNodes": {},
    "parent": "Columns4"
  },
  "TextBox4": {
    "type": {
      "resolvedName": "TextBox"
    },
    "isCanvas": false,
    "props": {
      "text": "",
      "fontSize": 16,
      "fontColor": "black",
      "backgroundColor": "white",
      "placeholder": "Placeholder...",
      "rows": 5,
      "cols": 20,
      "borderRadius": 5,
      "alignment": "center"
    },
    "displayName": "TextBox",
    "custom": {},
    "hidden": false,
    "nodes": [],
    "linkedNodes": {},
    "parent": "Column10"
  },
  "Row6": {
    "type": {
      "resolvedName": "Row"
    },
    "isCanvas": true,
    "props": {},
    "displayName": "Row",
    "custom": {},
    "hidden": false,
    "nodes": [
      "Columns5"
    ],
    "linkedNodes": {},
    "parent": "Rows1"
  },
  "Columns5": {
    "type": {
      "resolvedName": "Columns"
    },
    "isCanvas": true,
    "props": {},
    "displayName": "Columns",
    "custom": {},
    "hidden": false,
    "nodes": [],
    "linkedNodes": {
      "column-0": "Column11",
      "column-1": "Column12"
    },
    "parent": "Row6"
  },
  "Column11": {
    "type": {
      "resolvedName": "Column"
    },
    "isCanvas": true,
    "props": {},
    "displayName": "Column",
    "custom": {},
    "hidden": false,
    "nodes": [
      "Label5"
    ],
    "linkedNodes": {},
    "parent": "Columns5"
  },
  "Label5": {
    "type": {
      "resolvedName": "Label"
    },
    "isCanvas": false,
    "props": {
      "text": "New Label",
      "textAlign": "left",
      "fontSize": 20,
      "color": "#FFFFFF",
      "userEditable": true
    },
    "displayName": "Label",
    "custom": {},
    "hidden": false,
    "nodes": [],
    "linkedNodes": {},
    "parent": "Column11"
  },
  "Column12": {
    "type": {
      "resolvedName": "Column"
    },
    "isCanvas": true,
    "props": {},
    "displayName": "Column",
    "custom": {},
    "hidden": false,
    "nodes": [
      "TextBox5"
    ],
    "linkedNodes": {},
    "parent": "Columns5"
  },
  "TextBox5": {
    "type": {
      "resolvedName": "TextBox"
    },
    "isCanvas": false,
    "props": {
      "text": "",
      "fontSize": 16,
      "fontColor": "black",
      "backgroundColor": "white",
      "placeholder": "Placeholder...",
      "rows": 5,
      "cols": 20,
      "borderRadius": 5,
      "alignment": "center"
    },
    "displayName": "TextBox",
    "custom": {},
    "hidden": false,
    "nodes": [],
    "linkedNodes": {},
    "parent": "Column12"
  }
}

// const test =  {
//   "ROOT": {
//     "type": { "resolvedName": "Background" },
//     "isCanvas": false,
//     "props": { "backgroundColor": "#333", "height": 100, "width": 60, "id": "background" },
//     "displayName": "Background",
//     "custom": {},
//     "hidden": false,
//     "nodes": ["rapIbdzlcT"],
//     "linkedNodes": {}
//   },
//   "rapIbdzlcT": {
//     "type": { "resolvedName": "Container" },
//     "isCanvas": true,
//     "props": { "id": "root" },
//     "displayName": "Container",
//     "custom": {},
//     "parent": "ROOT",
//     "hidden": false,
//     "nodes": ["zLXtHnJXya"],
//     "linkedNodes": {}
//   },
//   "zLXtHnJXya": {
//     "type": { "resolvedName": "Rows" },
//     "isCanvas": false,
//     "props": { "numberOfRows": 3, "gap": 0 },
//     "displayName": "Rows",
//     "custom": {},
//     "parent": "rapIbdzlcT",
//     "hidden": false,
//     "nodes": [],
//     "linkedNodes": {
//       "row-0": "IyHESmBY19",
//       "row-1": "dog",
//       "row-2": "fsndkfsknfdjkfdksjnjkfs",
//       "row-3": "dZociGKj9X",
//       "row-4": "QOnNNtiCr4",
//       "row-5": "UlCB_WHgAl"
//     }
//   },
//   "IyHESmBY19": {
//     "type": { "resolvedName": "Row" },
//     "isCanvas": true,
//     "props": {},
//     "displayName": "Row",
//     "custom": {},
//     "parent": "zLXtHnJXya",
//     "hidden": false,
//     "nodes": ["G9Rx6I1ERq"],
//     "linkedNodes": {}
//   },
//   "dog": {
//     "type": { "resolvedName": "Row" },
//     "isCanvas": true,
//     "props": {},
//     "displayName": "Row",
//     "custom": {},
//     "parent": "zLXtHnJXya",
//     "hidden": false,
//     "nodes": ["aB78u8Z9lY"],
//     "linkedNodes": {}
//   },
//   "fsndkfsknfdjkfdksjnjkfs": {
//     "type": { "resolvedName": "Row" },
//     "isCanvas": true,
//     "props": {},
//     "displayName": "Row",
//     "custom": {},
//     "parent": "zLXtHnJXya",
//     "hidden": false,
//     "nodes": ["K-dnaU6Xeh"],
//     "linkedNodes": {}
//   },
//   "dZociGKj9X": {
//     "type": { "resolvedName": "Row" },
//     "isCanvas": true,
//     "props": {},
//     "displayName": "Row",
//     "custom": {},
//     "parent": "zLXtHnJXya",
//     "hidden": false,
//     "nodes": [],
//     "linkedNodes": {}
//   },
//   "QOnNNtiCr4": {
//     "type": { "resolvedName": "Row" },
//     "isCanvas": true,
//     "props": {},
//     "displayName": "Row",
//     "custom": {},
//     "parent": "zLXtHnJXya",
//     "hidden": false,
//     "nodes": [],
//     "linkedNodes": {}
//   },
//   "UlCB_WHgAl": {
//     "type": { "resolvedName": "Row" },
//     "isCanvas": true,
//     "props": {},
//     "displayName": "Row",
//     "custom": {},
//     "parent": "zLXtHnJXya",
//     "hidden": false,
//     "nodes": [],
//     "linkedNodes": {}
//   },
//   "G9Rx6I1ERq": {
//     "type": { "resolvedName": "Columns" },
//     "isCanvas": false,
//     "props": { "numberOfCols": 5, "gap": 0 },
//     "displayName": "Columns",
//     "custom": {},
//     "parent": "IyHESmBY19",
//     "hidden": false,
//     "nodes": [],
//     "linkedNodes": {
//       "column-0": "p7sRG2fqd4",
//       "column-1": "tDabBroolk",
//       "column-2": "iT-fkaTtUq",
//       "column-3": "3zF6FTjLve",
//       "column-4": "OTneV6X79O"
//     }
//   },
//   "p7sRG2fqd4": {
//     "isCanvas": true,
//     "type": { "resolvedName": "Column" },
//     "props": { "style": { "gridColumn": "span 5" } },
//     "displayName": "Column",
//     "custom": {},
//     "parent": "G9Rx6I1ERq",
//     "hidden": false,
//     "nodes": ["cbWbnNsFzP"],
//     "linkedNodes": {}
//   },
//   "tDabBroolk": {
//     "type": { "resolvedName": "Column" },
//     "isCanvas": true,
//     "props": { "style": { "gridColumn": "span 5" } },
//     "displayName": "Column",
//     "custom": {},
//     "parent": "G9Rx6I1ERq",
//     "hidden": false,
//     "nodes": ["H9K02Oq6n0"],
//     "linkedNodes": {}
//   },
//   "aB78u8Z9lY": {
//     "type": { "resolvedName": "Columns" },
//     "isCanvas": false,
//     "props": { "numberOfCols": 2, "gap": 7 },
//     "displayName": "Columns",
//     "custom": {},
//     "parent": "dog",
//     "hidden": false,
//     "nodes": [],
//     "linkedNodes": {
//       "column-0": "JUJ5afTIHX",
//       "column-1": "dePkzxWLsv",
//       "column-2": "Bcg-eEQzrd",
//       "column-3": "LCAp8gAJXf",
//       "column-4": "7Sf79JPRfL"
//     }
//   },
//   "JUJ5afTIHX": {
//     "type": { "resolvedName": "Column" },
//     "isCanvas": true,
//     "props": { "style": { "gridColumn": "span 5" } },
//     "displayName": "Column",
//     "custom": {},
//     "parent": "aB78u8Z9lY",
//     "hidden": false,
//     "nodes": ["Cu2p1wBQsc", "Uen1SkItnc"],
//     "linkedNodes": {}
//   },
//   "dePkzxWLsv": {
//     "type": { "resolvedName": "Column" },
//     "isCanvas": true,
//     "props": { "style": { "gridColumn": "span 5" } },
//     "displayName": "Column",
//     "custom": {},
//     "parent": "aB78u8Z9lY",
//     "hidden": false,
//     "nodes": ["sALCvL9RMT"],
//     "linkedNodes": {}
//   },
//   "Bcg-eEQzrd": {
//     "type": { "resolvedName": "Column" },
//     "isCanvas": true,
//     "props": { "style": { "gridColumn": "span 3" } },
//     "displayName": "Column",
//     "custom": {},
//     "parent": "aB78u8Z9lY",
//     "hidden": false,
//     "nodes": [],
//     "linkedNodes": {}
//   },
//   "LCAp8gAJXf": {
//     "type": { "resolvedName": "Column" },
//     "isCanvas": true,
//     "props": { "style": { "gridColumn": "span 2" } },
//     "displayName": "Column",
//     "custom": {},
//     "parent": "aB78u8Z9lY",
//     "hidden": false,
//     "nodes": [],
//     "linkedNodes": {}
//   },
//   "7Sf79JPRfL": {
//     "type": { "resolvedName": "Column" },
//     "isCanvas": true,
//     "props": { "style": { "gridColumn": "span 2" } },
//     "displayName": "Column",
//     "custom": {},
//     "parent": "aB78u8Z9lY",
//     "hidden": false,
//     "nodes": [],
//     "linkedNodes": {}
//   },
//   "Cu2p1wBQsc": {
//     "type": { "resolvedName": "Rows" },
//     "isCanvas": false,
//     "props": { "numberOfRows": 1, "gap": 20 },
//     "displayName": "Rows",
//     "custom": {},
//     "parent": "JUJ5afTIHX",
//     "hidden": false,
//     "nodes": [],
//     "linkedNodes": {
//       "row-0": "zEoDGmZaMK",
//       "row-1": "GpBwYK8_Kd",
//       "row-2": "RSsj1dTGrb",
//       "row-3": "FckNwQwjuQ"
//     }
//   },
//   "zEoDGmZaMK": {
//     "type": { "resolvedName": "Row" },
//     "isCanvas": true,
//     "props": {},
//     "displayName": "Row",
//     "custom": {},
//     "parent": "Cu2p1wBQsc",
//     "hidden": false,
//     "nodes": ["6Ivk_sEuUg"],
//     "linkedNodes": {}
//   },
//   "GpBwYK8_Kd": {
//     "type": { "resolvedName": "Row" },
//     "isCanvas": true,
//     "props": {},
//     "displayName": "Row",
//     "custom": {},
//     "parent": "Cu2p1wBQsc",
//     "hidden": false,
//     "nodes": ["Kj40OoGgr5", "LJdlms-d3t"],
//     "linkedNodes": {}
//   },
//   "RSsj1dTGrb": {
//     "type": { "resolvedName": "Row" },
//     "isCanvas": true,
//     "props": {},
//     "displayName": "Row",
//     "custom": {},
//     "parent": "Cu2p1wBQsc",
//     "hidden": false,
//     "nodes": [],
//     "linkedNodes": {}
//   },
//   "FckNwQwjuQ": {
//     "type": { "resolvedName": "Row" },
//     "isCanvas": true,
//     "props": {},
//     "displayName": "Row",
//     "custom": {},
//     "parent": "Cu2p1wBQsc",
//     "hidden": false,
//     "nodes": [],
//     "linkedNodes": {}
//   },
//   "6Ivk_sEuUg": {
//     "type": { "resolvedName": "Label" },
//     "isCanvas": false,
//     "props": {
//       "text": "New Label",
//       "textAlign": "center",
//       "fontSize": 20,
//       "color": "#FFFFF",
//       "userEditable": true
//     },
//     "displayName": "Label",
//     "custom": {},
//     "parent": "zEoDGmZaMK",
//     "hidden": false,
//     "nodes": [],
//     "linkedNodes": {}
//   },
//   "Kj40OoGgr5": {
//     "type": { "resolvedName": "TextBox" },
//     "isCanvas": false,
//     "props": {
//       "text": "",
//       "fontSize": 16,
//       "fontColor": "black",
//       "backgroundColor": "white",
//       "placeholder": "Placeholder...",
//       "rows": 2,
//       "cols": 47,
//       "borderRadius": 4,
//       "alignment": "center"
//     },
//     "displayName": "TextBox",
//     "custom": {},
//     "parent": "GpBwYK8_Kd",
//     "hidden": false,
//     "nodes": [],
//     "linkedNodes": {}
//   },
//   "sALCvL9RMT": {
//     "type": { "resolvedName": "Image" },
//     "isCanvas": false,
//     "props": {
//       "src": "https://photographylife.com/wp-content/uploads/2023/05/Nikon-Z8-Official-Samples-00002.jpg",
//       "alt": "New image",
//       "width": 480,
//       "height": 320,
//       "alignment": "center"
//     },
//     "displayName": "Image",
//     "custom": {},
//     "parent": "dePkzxWLsv",
//     "hidden": false,
//     "nodes": [],
//     "linkedNodes": {}
//   },
//   "K-dnaU6Xeh": {
//     "type": { "resolvedName": "Columns" },
//     "isCanvas": false,
//     "props": { "numberOfCols": 3, "gap": 0 },
//     "displayName": "Columns",
//     "custom": {},
//     "parent": "fsndkfsknfdjkfdksjnjkfs",
//     "hidden": false,
//     "nodes": [],
//     "linkedNodes": { "column-0": "rX0I2YkN9e", "column-1": "z7u30J1ET5", "column-2": "eKU6BJaAbT" }
//   },
//   "rX0I2YkN9e": {
//     "type": { "resolvedName": "Column" },
//     "isCanvas": true,
//     "props": { "style": { "gridColumn": "span 5" } },
//     "displayName": "Column",
//     "custom": {},
//     "parent": "K-dnaU6Xeh",
//     "hidden": false,
//     "nodes": ["jLywUQxsV2"],
//     "linkedNodes": {}
//   },
//   "z7u30J1ET5": {
//     "type": { "resolvedName": "Column" },
//     "isCanvas": true,
//     "props": { "style": { "gridColumn": "span 5" } },
//     "displayName": "Column",
//     "custom": {},
//     "parent": "K-dnaU6Xeh",
//     "hidden": false,
//     "nodes": ["hTndfI5XvJ"],
//     "linkedNodes": {}
//   },
//   "iT-fkaTtUq": {
//     "type": { "resolvedName": "Column" },
//     "isCanvas": true,
//     "props": { "style": { "gridColumn": "span 3" } },
//     "displayName": "Column",
//     "custom": {},
//     "parent": "G9Rx6I1ERq",
//     "hidden": false,
//     "nodes": ["LLFHcvKNu7"],
//     "linkedNodes": {}
//   },
//   "3zF6FTjLve": {
//     "type": { "resolvedName": "Column" },
//     "isCanvas": true,
//     "props": { "style": { "gridColumn": "span 2" } },
//     "displayName": "Column",
//     "custom": {},
//     "parent": "G9Rx6I1ERq",
//     "hidden": false,
//     "nodes": ["Tn_ZPxCc1s"],
//     "linkedNodes": {}
//   },
//   "OTneV6X79O": {
//     "type": { "resolvedName": "Column" },
//     "isCanvas": true,
//     "props": { "style": { "gridColumn": "span 2" } },
//     "displayName": "Column",
//     "custom": {},
//     "parent": "G9Rx6I1ERq",
//     "hidden": false,
//     "nodes": ["z6v0FRFRSS"],
//     "linkedNodes": {}
//   },
//   "LJdlms-d3t": {
//     "type": { "resolvedName": "TextBox" },
//     "isCanvas": false,
//     "props": {
//       "text": "",
//       "fontSize": 16,
//       "fontColor": "black",
//       "backgroundColor": "white",
//       "placeholder": "Placeholder...",
//       "rows": 2,
//       "cols": 47,
//       "borderRadius": 4,
//       "alignment": "center"
//     },
//     "displayName": "TextBox",
//     "custom": {},
//     "parent": "GpBwYK8_Kd",
//     "hidden": false,
//     "nodes": [],
//     "linkedNodes": {}
//   },
//   "cbWbnNsFzP": {
//     "type": { "resolvedName": "Label" },
//     "isCanvas": false,
//     "props": {
//       "text": "Home",
//       "textAlign": "center",
//       "fontSize": 20,
//       "color": "#FFFFF",
//       "userEditable": true
//     },
//     "displayName": "Label",
//     "custom": {},
//     "parent": "p7sRG2fqd4",
//     "hidden": false,
//     "nodes": [],
//     "linkedNodes": {}
//   },
//   "H9K02Oq6n0": {
//     "type": { "resolvedName": "Button" },
//     "isCanvas": false,
//     "props": {
//       "backgroundColor": "#0047AB",
//       "fontColor": "white",
//       "fontSize": 20,
//       "borderRadius": 4,
//       "text": "New Button",
//       "width": 150,
//       "height": 50,
//       "alignment": "center"
//     },
//     "displayName": "Button",
//     "custom": {},
//     "parent": "tDabBroolk",
//     "hidden": false,
//     "nodes": [],
//     "linkedNodes": {}
//   },
//   "LLFHcvKNu7": {
//     "type": { "resolvedName": "Button" },
//     "isCanvas": false,
//     "props": {
//       "backgroundColor": "#0047AB",
//       "fontColor": "white",
//       "fontSize": 20,
//       "borderRadius": 4,
//       "text": "New Button",
//       "width": 150,
//       "height": 50,
//       "alignment": "center"
//     },
//     "displayName": "Button",
//     "custom": {},
//     "parent": "iT-fkaTtUq",
//     "hidden": false,
//     "nodes": [],
//     "linkedNodes": {}
//   },
//   "Tn_ZPxCc1s": {
//     "type": { "resolvedName": "Button" },
//     "isCanvas": false,
//     "props": {
//       "backgroundColor": "#0047AB",
//       "fontColor": "white",
//       "fontSize": 20,
//       "borderRadius": 4,
//       "text": "New Button",
//       "width": 150,
//       "height": 50,
//       "alignment": "center"
//     },
//     "displayName": "Button",
//     "custom": {},
//     "parent": "3zF6FTjLve",
//     "hidden": false,
//     "nodes": [],
//     "linkedNodes": {}
//   },
//   "z6v0FRFRSS": {
//     "type": { "resolvedName": "Button" },
//     "isCanvas": false,
//     "props": {
//       "backgroundColor": "#0047AB",
//       "fontColor": "white",
//       "fontSize": 20,
//       "borderRadius": 4,
//       "text": "New Button",
//       "width": 150,
//       "height": 50,
//       "alignment": "center"
//     },
//     "displayName": "Button",
//     "custom": {},
//     "parent": "OTneV6X79O",
//     "hidden": false,
//     "nodes": [],
//     "linkedNodes": {}
//   },
//   "Uen1SkItnc": {
//     "type": { "resolvedName": "TextBox" },
//     "isCanvas": false,
//     "props": {
//       "text": "",
//       "fontSize": 16,
//       "fontColor": "black",
//       "backgroundColor": "white",
//       "placeholder": "Placeholder...",
//       "rows": 5,
//       "cols": 20,
//       "borderRadius": 5,
//       "alignment": "center"
//     },
//     "displayName": "TextBox",
//     "custom": {},
//     "parent": "JUJ5afTIHX",
//     "hidden": false,
//     "nodes": [],
//     "linkedNodes": {}
//   },
//   "eKU6BJaAbT": {
//     "type": { "resolvedName": "Column" },
//     "isCanvas": true,
//     "props": { "style": { "gridColumn": "span 3" } },
//     "displayName": "Column",
//     "custom": {},
//     "parent": "K-dnaU6Xeh",
//     "hidden": false,
//     "nodes": ["ahPehOcK9Y"],
//     "linkedNodes": {}
//   },
//   "hTndfI5XvJ": {
//     "type": { "resolvedName": "Button" },
//     "isCanvas": false,
//     "props": {
//       "backgroundColor": "#0047AB",
//       "fontColor": "white",
//       "fontSize": 20,
//       "borderRadius": 4,
//       "text": "Search",
//       "width": 150,
//       "height": 50,
//       "alignment": "left"
//     },
//     "displayName": "Button",
//     "custom": {},
//     "parent": "z7u30J1ET5",
//     "hidden": false,
//     "nodes": [],
//     "linkedNodes": {}
//   },
//   "jLywUQxsV2": {
//     "type": { "resolvedName": "TextBox" },
//     "isCanvas": false,
//     "props": {
//       "text": "",
//       "fontSize": 16,
//       "fontColor": "black",
//       "backgroundColor": "white",
//       "placeholder": "Placeholder...",
//       "rows": 5,
//       "cols": 20,
//       "borderRadius": 5,
//       "alignment": "center"
//     },
//     "displayName": "TextBox",
//     "custom": {},
//     "parent": "rX0I2YkN9e",
//     "hidden": false,
//     "nodes": [],
//     "linkedNodes": {}
//   },
//   "ahPehOcK9Y": {
//     "type": { "resolvedName": "Label" },
//     "isCanvas": false,
//     "props": {
//       "text": "New Label",
//       "textAlign": "left",
//       "fontSize": 20,
//       "color": "#FFFFF",
//       "userEditable": true
//     },
//     "displayName": "Label",
//     "custom": {},
//     "parent": "eKU6BJaAbT",
//     "hidden": false,
//     "nodes": [],
//     "linkedNodes": {}
//   }
// }


const LoadButton: React.FC = () => {
    const { actions } = useEditor();

    const handleLoad = () => {
        actions.deserialize(JSON.stringify(test));
    };

    // useEffect(() => {
    //     const handleMessage = (event: { data: any; }) => {
    //         const message = event.data;

    //         if (message.command === 'loadFile') {
    //             actions.deserialize(JSON.stringify(message.data));
    //         }
    //     };

    //     window.addEventListener('message', handleMessage);

    //     return () => {
    //         window.removeEventListener('message', handleMessage);
    //     };
    // }, [actions]);

    return (
        <Button icon={<Folder24Regular />} appearance='outline' onClick={handleLoad}>Load</Button>
    );
};

export default LoadButton;
