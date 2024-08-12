import { AzureOpenAI } from "openai";
import Instructor from "@instructor-ai/instructor";
import { ZodObject } from "zod";

// const example = [
//   {
//     section: "Header",
//     children: [
//       {
//         type: "Button",
//         description:
//           "A large, prominently displayed submit button located at the top right corner of the header, designed for form submission with a blue background and white text.",
//       },
//       {
//         type: "Label",
//         description:
//           "A descriptive label for the username input field, providing clear and concise information for users to understand what information is required.",
//       },
//       {
//         type: "Image",
//         description:
//           "The company logo image, positioned centrally within the header, featuring the company's brand colors and tagline to reinforce brand identity.",
//       },
//       {
//         type: "TextBox",
//         description:
//           "A wide search bar textbox that allows users to enter search queries, complete with placeholder text and an auto-suggestion feature for enhanced user experience.",
//       },
//     ],
//   },
//   {
//     section: "MainContent",
//     children: [
//       {
//         type: "RadioButton",
//         description:
//           "An option A radio button, part of a group of options, enabling users to select a single choice from multiple options in a survey or form.",
//       },
//       {
//         type: "Checkbox",
//         description:
//           "A checkbox labeled 'Accept terms and conditions,' which users must check to agree to the terms before proceeding with their registration or purchase.",
//       },
//       {
//         type: "Input",
//         description:
//           "An email input field designed for users to enter their email addresses, complete with validation to ensure the input follows proper email formatting rules.",
//       },
//       {
//         type: "Text",
//         description:
//           "A welcome message text that greets users upon landing on the page, providing a warm introduction and an overview of the website's purpose and features.",
//       },
//     ],
//   },
//   {
//     section: "Footer",
//     children: [
//       {
//         type: "Icon",
//         description:
//           "A social media icon set, including icons for popular platforms like Facebook, Twitter, and Instagram, allowing users to easily navigate to the company's social media pages.",
//       },
//       {
//         type: "Button",
//         description:
//           "A contact us button located in the footer, designed to guide users to the contact page, featuring a sleek design with contrasting colors for visibility.",
//       },
//       {
//         type: "Image",
//         description:
//           "A footer background image that spans the entire width of the footer, enhancing the visual appeal of the page with a subtle pattern or gradient.",
//       },
//     ],
//   },
// ];

const systemMessage = {
  role: "system",
  content: `You are a UI designer who fills in provided layouts. For each section, you determine child elements and give them names that explain what they are for.

Elements you can use more than once per component:
- Button
- Label (titles)
- Input (field)
- Icon
- Dropdown 
- Slider
- Image 
- Text (paragraph)

Elements that fill out a whole section:
- RadioButtons
- Checkbox (this is a series of checkboxes)

You make sections varied but limit the complexity within each section. Use lots of icons`,
};

const textMessage = (layout: string) => ({
  role: "user",
  content: [
    {
      type: "text",
      text: `Provide the child elements for the following layout:\n\n ${layout}`,
    },
  ],
});

async function getSectionChildren(
  AZURE_OPENAI_API_ENDPOINT: string,
  AZURE_OPENAI_API_KEY: string,
  GPT4O_DEPLOYMENT_NAME: string,
  layout: string,
  outputSchema: ZodObject<any>
) {
  if (!layout) {
    throw new Error("No layout provided.");
  }

  const client = new AzureOpenAI({
    apiVersion: "2024-06-01",
    baseURL: `${AZURE_OPENAI_API_ENDPOINT}/openai/deployments/${GPT4O_DEPLOYMENT_NAME}`,
    apiKey: AZURE_OPENAI_API_KEY,
  });

  const instructor = Instructor({
    client: client,
    mode: "TOOLS",
  });

  const userMessage = textMessage(layout);

  const messages = [systemMessage, userMessage];

  try {
    const children = await instructor.chat.completions.create({
      model: GPT4O_DEPLOYMENT_NAME,
      messages: messages,
      response_model: {
        schema: outputSchema,
        name: "Layout",
      },
      max_retries: 2,
    });

    return children;
  } catch (error) {
    throw error;
  }
}

export { getSectionChildren };
