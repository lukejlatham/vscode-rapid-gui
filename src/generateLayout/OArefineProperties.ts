// import { OpenAI } from "openai";
// import Instructor from "@instructor-ai/instructor";
// import { layoutSchema } from "../../webview-ui/src/types";

// const systemMessage = {
//   role: "system",
//   content: `You are a UI designer who creates perfect app or website designs from a given sketch or text prompt. FOR EACH COMPONENT - CREATE A NEW SECTION. For backgroundColors prop, you can only use Main, LightAccent, or DarkAccent.' `,
// };

// const textMessage = (textDescription: string) => ({
//   role: "user",
//   content: [
//     {
//       type: "text",
//       text: `Create a UI layout from the following textual description: ${textDescription}. Be creative in your interpretation of the prompt - use many sections`,
//     },
//   ],
// });

// const sketchMessage = (sketch: string) => ({
//   role: "user",
//   content: [
//     {
//       type: "text",
//       text: "Create a UI layout from this sketch: ",
//     },
//     {
//       type: "image_url",
//       image_url: { url: `data:image/png;base64,${sketch}`, detail: "auto" },
//     },
//   ],
// });

// async function getLayout(
//   AZURE_OPENAI_API_ENDPOINT: string,
//   AZURE_OPENAI_API_KEY: string,
//   GPT4O_DEPLOYMENT_NAME: string,
//   contentType: "text" | "sketch",
//   textDescription?: string,
//   sketchUrl?: string
// ) {
//   if (!textDescription && !sketchUrl) {
//     throw new Error("No textual description or sketch provided.");
//   }

//   const client = new OpenAI({
//     apiVersion: "2024-06-01",
//     baseURL: `${AZURE_OPENAI_API_ENDPOINT}/openai/deployments/${GPT4O_DEPLOYMENT_NAME}`,
//     apiKey: AZURE_OPENAI_API_KEY,
//   });

//   const userMessage =
//     contentType === "text" ? textMessage(textDescription!) : sketchMessage(sketchUrl!);

//   const messages = [systemMessage, userMessage];

//   try {
//     const layout = await client.chat.completions.create({
//       model: GPT4O_DEPLOYMENT_NAME,
//       messages: messages,
//       response_model: {
//         schema: layoutSchema,
//         name: "Layout",
//       },
//       max_retries: 2,
//     });

//     return layout;
//   } catch (error) {
//     throw error;
//   }
// }

// export { OArefineProperties };
