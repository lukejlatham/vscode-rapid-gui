// import axios from "axios";

// // Function to call OpenAI
// async function callOpenAI(
//   text: any,
//   apiKey: string,
//   endpoint: string,
//   model: string
// ): Promise<string> {
//   try {
//     const response = await axios.post(
//       `${endpoint}/openai/deployments/${model}/chat/completions?api-version=2024-02-01`,
//       {
//         messages: text,
//         temperature: 0.0,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "api-key": apiKey,
//         },
//       }
//     );
//     return response.data.choices[0].message.content;
//   } catch (error) {
//     console.error("Error in callOpenAI:", error);
//     throw error;
//   }
// }

// // Function to get UI Description
// export async function getUIDescription(
//   base64Image: string,
//   apiKey: string,
//   endpoint: string,
//   model: string
// ) {
//   const messages = [
//     {
//       role: "system",
//       content:
//         "You are a helpful assistant that gives the layout of a UI sketch. Output a JSON object.",
//     },
//     {
//       role: "user",
//       content: [
//         { type: "text", text: "What is the layout of this UI sketch?" },
//         { type: "image_url", image_url: { url: `data:image/png;base64,${base64Image}` } },
//       ],
//     },
//   ];

//   return await callOpenAI(messages, apiKey, endpoint, model);
// }

// // Function to encode image
// export function encodeImage(file: File): Promise<string> {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const result = reader.result as string;
//       const base64 = result.split(",")[1]; // Remove the data URL prefix
//       resolve(base64);
//     };
//     reader.onerror = reject;
//     reader.readAsDataURL(file);
//   });
// }

// // Function to handle sketch upload
// export async function handleSketchUpload(
//   file: File,
//   apiKey: string,
//   endpoint: string,
//   model: string
// ) {
//   try {
//     const base64Image = await encodeImage(file);
//     const description = await getUIDescription(base64Image, apiKey, endpoint, model);
//     return description;
//   } catch (error) {
//     console.error("Error processing sketch upload:", error);
//     throw error;
//   }
// }
