import { z } from "zod";

const ElementSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    type: z.enum(["Container", "Columns", "Column", "Rows", "Row", "Label", "Button"]),
    children: z
      .record(
        z.string(),
        z.lazy(() => ElementSchema)
      )
      .optional(),
    content: z.string().optional(),
  })
);

const RootSchema = z.object({
  type: z.literal("Container"),
  children: z.record(z.string(), ElementSchema).optional(),
});

export { RootSchema, ElementSchema };
