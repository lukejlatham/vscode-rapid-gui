import { z } from "zod";

// Define the schema for button properties
const buttonPropsSchema = z.object({
    backgroundColor: z.string().regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/),
    fontSize: z.number().int().min(1),
    fontColor: z.string().regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/),
    borderRadius: z.number().int().min(0),
    width: z.number(),
    height: z.number(),
    text: z.string(),
    alignment: z.enum(["left", "center", "right"])
});

// Define the schema for textbox properties
const textBoxPropsSchema = z.object({
    text: z.string(),
    fontSize: z.number().int().min(1),
    fontColor: z.string().regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/),
    backgroundColor: z.string().regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/),
    placeholder: z.string(),
    borderRadius: z.number().int().min(0),
    rows: z.number().int().min(1),
    cols: z.number().int().min(1),
    alignment: z.enum(["left", "center", "right"])
});

const imagePropsSchema = z.object({
    src: z.string().url().optional(),
    alt: z.string(),
    width: z.number().int().min(1),
    height: z.number().int().min(1),
    alignment: z.enum(["left", "center", "right"])
});

const labelPropsSchema = z.object({
    text: z.string(),
    textAlign: z.enum(["left", "center", "right"]),
    fontSize: z.number().int().min(1),
    color: z.string().regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/),
    userEditable: z.boolean()
});

const rowsPropsSchema = z.object({
    numberOfRows: z.number().int().min(1).max(10),
    gap: z.number().int().min(0).max(10),
});

const columnsPropsSchema = z.object({
    numberOfColumns: z.number().int().min(1).max(10),
    gap: z.number().int().min(0).max(10),
});


// Define base element types
const baseElementTypes = ["Button", "Image", "Textbox", "Label", "Rows", "Columns"] as const;
const elementIDPattern = new RegExp(`(${baseElementTypes.join("|")})\\d+`);
const elementID = z.string().regex(elementIDPattern);

// Define the discriminated union schema for node properties
const elementSchema = z.object({
    id: elementID,
    props: z.union([
        buttonPropsSchema,
        textBoxPropsSchema,
        imagePropsSchema,
        labelPropsSchema,
        rowsPropsSchema,
        columnsPropsSchema
    ])
});

const layoutSchema = z.object({
    nodes: z.array(elementSchema)
  });


const Example = JSON.stringify({
    nodes: [
        {
            id: "Button1",
            props: {
                backgroundColor: "#0047AB",
                fontSize: 20,
                fontColor: "#FFFFFF",
                borderRadius: 4,
                width: 150,
                height: 50,
                text: "New Button",
                alignment: "center"
            }
        },
        {
            id: "Label1",
            props: {
                text: "New Label",
                textAlign: "left",
                fontSize: 20,
                color: "#FFFFF",
                userEditable: true
            }
        },
        {
            id: "Image1",
            props: {
                src: "https://photographylife.com/wp-content/uploads/2023/05/Nikon-Z8-Official-Samples-00002.jpg",
                alt: "New image",
                width: 480,
                height: 320,
                alignment: "center"
            }
        },
        {
            id: "Rows1",
            props: {
                numberOfRows: 5,
                gap: 10
            }
        },
        {
            id: "Columns1",
            props: {
                numberOfColumns: 3,
                gap: 10
            }
        }
    ]
});