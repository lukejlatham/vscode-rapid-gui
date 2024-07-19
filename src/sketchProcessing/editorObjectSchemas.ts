import { z } from "zod";

// Define element types
const baseElementTypes = ["Button", "Image", "Textbox", "Label"];
const elementIDPattern = new RegExp(`(${baseElementTypes.join("|")})\\d+`);
const elementID = z.string().regex(elementIDPattern);

// Define schemas for elements
const elementSchema = z.object({
  id: elementID,
  type: z.enum([
    baseElementTypes[0],
    baseElementTypes[1],
    baseElementTypes[2],
    baseElementTypes[3],
  ]),
});

// Define Row schema
const rowID = z.string().regex(/Row\d+/);
const rowSchema = z.object({
  id: rowID,
  type: z.literal("Row"),
  nodes: z.array(z.union([elementID, z.string().regex(/Columns\d+/)])),
});

// Define Rows schema
const rowsSchema = z.object({
  id: z.string().regex(/Rows\d+/),
  type: z.literal("Rows"),
  numberOfRows: z.number().int().min(1).max(10),
  linked_nodes: z.record(z.string().regex(/row-\d+/), rowID),
});

// Define Column schema
const columnID = z.string().regex(/Column\d+/);
const columnSchema = z.object({
  id: columnID,
  type: z.literal("Column"),
  nodes: z.array(elementID).max(1),
});

// Define Columns schema
const columnsSchema = z.object({
  id: z.string().regex(/Columns\d+/),
  type: z.literal("Columns"),
  numberOfColumns: z.number().int().min(1).max(10),
  linked_nodes: z.record(z.string().regex(/column-\d+/), columnID),
});

// Define Background schema
const backgroundSchema = z.object({
  id: z.literal("ROOT"),
  type: z.literal("Background"),
  nodes: z.array(z.literal("ContainerID")).max(1),
});

// Define Container schema
const containerSchema = z.object({
  id: z.literal("ContainerID"),
  type: z.literal("Container"),
  nodes: z.array(z.string().regex(/Rows\d+/)).max(1),
});

// Define the overall layout schema
export const layoutSchema = z.object({
  nodes: z
    .array(
      z.union([
        elementSchema,
        rowSchema,
        rowsSchema,
        columnSchema,
        columnsSchema,
        backgroundSchema,
        containerSchema,
      ])
    )
    .describe("Only one Background element and one Container element are allowed."),
});

// Ensure only one Background and one Container are present
layoutSchema.superRefine((data, ctx) => {
  const ids = data.nodes.map((node) => node.id);
  if (!ids.includes("ROOT")) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Background element with id 'ROOT' is required",
    });
  }
  if (!ids.includes("ContainerID")) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Container element with id 'ContainerID' is required",
    });
  }
  const rootCount = ids.filter((id) => id === "ROOT").length;
  const containerCount = ids.filter((id) => id === "ContainerID").length;
  if (rootCount > 1) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Only one Background element with id 'ROOT' is allowed",
    });
  }
  if (containerCount > 1) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Only one Container element with id 'ContainerID' is allowed",
    });
  }
});

// Prompt and example
const uiPrompt: string =
  `Please generate a JSON representation of a UI component tree following these rules: 1. Root Node (Background) - ID: ROOT - Type: Background - Contains one Container node. 2. Container Node - ID: ContainerID - Type: Container - Contains one Rows node. 3. Rows Node - Type: Rows - ID follows the pattern Rows<number>, e.g., Rows1 - Contains 1 to 5 Row nodes, referenced by linked_nodes. - Each Row node's ID follows the pattern row-<number>, e.g., row-0, row-1, etc. 4. Row Node - Type: Row - ID follows the pattern Row<number>, e.g., Row1 - Contains one Columns node. 5. Columns Node - Type: Columns - ID follows the pattern Columns<number>, e.g., Columns1 - Contains 1 to 5 Column nodes, referenced by linked_nodes. - Each Column node's ID follows the pattern column-<number>, e.g., column-0, column-1, etc. 6. Column Node - Type: Column - ID follows the pattern Column<number>, e.g., Column1 - Contains one of the following element types: Button, Image, Textbox, or Label. - Each element's ID follows the pattern <type><number>, e.g., Button1, Image2. 7. Element Nodes - Types: Button, Image, Textbox, Label - Each element has an ID following the pattern <type><number>, e.g., Button1, Image2. Here is an example structure: `;

const uiExample = JSON.stringify({
  nodes: [
    {
      id: "ROOT",
      type: "Background",
      nodes: ["ContainerID"],
    },
    {
      id: "ContainerID",
      type: "Container",
      nodes: ["Rows1"],
    },
    {
      id: "Rows1",
      type: "Rows",
      numberOfRows: 3,
      linked_nodes: {
        "row-0": "Row1",
        "row-1": "Row2",
        "row-2": "Row3",
      },
    },
    {
      id: "Row1",
      type: "Row",
      nodes: ["Columns1"],
    },
    {
      id: "Columns1",
      type: "Columns",
      numberOfColumns: 2,
      linked_nodes: {
        "column-0": "Column1",
        "column-1": "Column2",
      },
    },
    {
      id: "Column1",
      type: "Column",
      nodes: ["Button1"],
    },
    {
      id: "Button1",
      type: "Button",
    },
    {
      id: "Column2",
      type: "Column",
      nodes: ["Image1"],
    },
    {
      id: "Image1",
      type: "Image",
    },
    {
      id: "Row2",
      type: "Row",
      nodes: ["Columns2"],
    },
    {
      id: "Columns2",
      type: "Columns",
      numberOfColumns: 3,
      linked_nodes: {
        "column-0": "Column3",
        "column-1": "Column4",
        "column-2": "Column5",
      },
    },
    {
      id: "Column3",
      type: "Column",
      nodes: ["Textbox1"],
    },
    {
      id: "Textbox1",
      type: "Textbox",
    },
    {
      id: "Column4",
      type: "Column",
      nodes: ["Label1"],
    },
    {
      id: "Label1",
      type: "Label",
    },
    {
      id: "Column5",
      type: "Column",
      nodes: ["Button2"],
    },
    {
      id: "Button2",
      type: "Button",
    },
    {
      id: "Row3",
      type: "Row",
      nodes: ["Columns3"],
    },
    {
      id: "Columns3",
      type: "Columns",
      numberOfColumns: 1,
      linked_nodes: {
        "column-0": "Column6",
      },
    },
    {
      id: "Column6",
      type: "Column",
      nodes: ["Image2"],
    },
    {
      id: "Image2",
      type: "Image",
    },
  ],
});

const uiFinisher: string =
  "Ensure the generated JSON follows these rules, including unique IDs for each node and correct nesting of elements. Ensure the elements present in the JSON match those present in the textual description.";

export { uiPrompt, uiExample, uiFinisher };
