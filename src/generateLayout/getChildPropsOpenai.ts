import { AzureOpenAI } from "openai";
import Instructor from "@instructor-ai/instructor";
import { generatedAllSectionsChildren } from "../../webview-ui/src/types";

const exampleLayout = {
  sections: [
    {
      sectionName: "Form Section",
      children: [
        {
          type: "Button",
          props: {
            width: 150,
            height: 40,
            text: "Submit",
            icon: "VscAccount",
          },
        },
        {
          type: "Checkbox",
          props: {
            optionLabels: ["Option 1", "Option 2", "Option 3"],
            numberOfBoxes: 3,
            direction: "column",
          },
        },
        {
          type: "Input",
          props: {
            backgroundColor: "Main",
            placeholder: "Enter your name",
          },
        },
        {
          type: "Label",
          props: {
            text: "Username",
            fontcolor: "Accent1",
            bold: true,
            italic: false,
            underline: false,
          },
        },
        {
          type: "RadioButton",
          props: {
            header: "Gender",
            numberOfButtons: 2,
            optionLabels: ["Male", "Female"],
            direction: "row",
          },
        },
      ],
    },
    {
      sectionName: "Profile Section",
      children: [
        {
          type: "Image",
          props: {
            src: "https://example.com/profile.jpg",
            alt: "Profile Picture",
            width: 100,
            height: 100,
          },
        },
        {
          type: "TextBox",
          props: {
            text: "Bio",
            backgroundColor: "Accent2",
            height: 150,
            width: 300,
          },
        },
        {
          type: "Text",
          props: {
            text: "Welcome to your profile",
          },
        },
        {
          type: "Icon",
          props: {
            selectedIcon: "VscAccount",
            iconSize: 32,
            iconColor: "Main",
          },
        },
      ],
    },
  ],
};

const systemMessage = {
  role: "system",
  content: `You are a UI designer who fills in layouts. You will provide the children elements and their props for each section, based on the description. Height and width refer to percentage of their respective container. An example output is shown below:\n\n${exampleLayout}`,
};

const textMessage = (textDescription: string) => ({
  role: "user",
  content: [
    {
      type: "text",
      text: `Create a UI layout from the following textual description: ${textDescription}`,
    },
  ],
});

async function getSectionChildren(
  AZURE_OPENAI_API_ENDPOINT: string,
  AZURE_OPENAI_API_KEY: string,
  GPT4O_DEPLOYMENT_NAME: string,
  layout: string
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
    debug: true,
  });

  const userMessage = textMessage(layout);

  const messages = [systemMessage, userMessage];

  try {
    const childProps = await instructor.chat.completions.create({
      model: GPT4O_DEPLOYMENT_NAME,
      messages: messages,
      response_model: {
        schema: generatedAllSectionsChildren,
        name: "Layout",
      },
      max_retries: 2,
    });

    return JSON.stringify(childProps);
  } catch (error) {
    throw error;
  }
}

export { getSectionChildren };
