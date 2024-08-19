import { Node, ParsedJSON } from "./JSONParser";
import { Page } from "../../webview-ui/src/types";
import { generateBackgroundHtml, generateBackgroundCss } from "./components/Background";

// Function to generate the full HTML for the grid based on the parsed JSON data
export function generateGridHtml(page: Page, projectPath?: string): string {
  console.log("Generating HTML for page:", JSON.stringify(page, null, 2));

  // Parse the page content if it's a string
  if (typeof page.content === "string") {
    page.content = JSON.parse(page.content);
  }

  // Check if the ROOT node exists in the content
  if (!page.content || !page.content.ROOT) {
    console.error("ROOT node is missing in page content");
    throw new Error("Root node not found");
  }

  // Get the ROOT node from the content
  const rootNode = page.content.ROOT as Node;

  // Generate the background HTML, which includes the dynamic grid
  return generateBackgroundHtml(rootNode, page.content as { [key: string]: Node }, projectPath);
}

// Function to generate the CSS for the grid based on the parsed JSON data
export function generateGridCss(page: Page): string {
  // Get the ROOT node from the content
  const rootNode = page.content.ROOT as Node;

  // Generate the background CSS, which includes the dynamic grid styles
  return generateBackgroundCss(rootNode, page.content as { [key: string]: Node });
}
