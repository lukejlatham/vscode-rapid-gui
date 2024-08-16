// import { OpenAI } from "openai";
// import { zodFunction, zodResponseFormat } from "openai/helpers/zod";
// import { generatedLayout, generateLayoutSchema } from "../../webview-ui/src/types";
// import { z, ZodObject } from "zod";

// // Step 1 - Generate Layout

// export const generatedSections = z.array(
//   z.object({
//     sectionName: z.string(),
//     xPosition: z.number(),
//     yPosition: z.number(),
//     width: z.number(),
//     height: z.number(),
//     backgroundColor: z.enum(["Main", "LightAccent", "DarkAccent"]),
//     flexDirection: z.enum(["row", "column"]),
//     childComponentsDescription: z.string(),
//   })
// );

// export const generatedLayout = z.object({
//   layout: generatedSections,
// });

// // Step 2 - Generate Section Children Schema from output of step 1

// export function generateLayoutSchema(layout: z.infer<typeof generatedLayout>) {
//   const schemaObject: { [key: string]: z.ZodType } = {};

//   layout.layout.forEach((section) => {
//     // Explicitly define the array schema for each section
//     schemaObject[section.sectionName] = z.array(
//       z.enum([
//         "Button",
//         "Label",
//         "Image",
//         "RadioButtons",
//         "Checkboxes",
//         "Input",
//         "Text",
//         "Icon",
//         "Slider",
//         "Dropdown",
//       ])
//     );
//   });

//   return z
//     .object({
//       sections: z.object(schemaObject).strict(),
//     })
//     .strict();
// }

// async function generateSectionsChildren(
//   client: OpenAI,
//   inputLayout: z.infer<typeof generatedLayout>,
//   textDescription?: string
// ) {
//   if (!inputLayout) {
//     throw new Error("No generated layout provided.");
//   }

//   const outputSchema = await generateLayoutSchema(inputLayout);

//   const baseMessage = `Generate the child elements.`;

//   const baseMessageWithDescription = `Generate the child elements to make this ${textDescription}`;

//   const userMessage = textDescription ? baseMessage : baseMessageWithDescription;

//   console.log(zodResponseFormat(outputSchema, "layoutChildren"));

//   try {
//     const completion = await client.beta.chat.completions.parse({
//       model: "gpt-4o-2024-08-06",
//       messages: [
//         {
//           role: "system",
//           content:
//             "You are a UI designer who chooses elements for a given layout. Use a wide variety of elements",
//         },
//         {
//           role: "user",
//           content: userMessage,
//         },
//       ],
//       response_format: zodResponseFormat(outputSchema, "layoutChildren"),
//     });

//     const outputtedLayout = completion.choices[0].message.parsed;
//     console.log(outputtedLayout);
//     console.log(completion.usage.prompt_tokens);
//     console.log(completion.usage.completion_tokens);
//     return outputtedLayout;
//   } catch (error) {
//     throw error;
//   }
// }

// export { generateSectionsChildren };
