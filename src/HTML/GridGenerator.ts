import { Node, ParsedJSON } from "./JSONParser";
import { Page } from "../../webview-ui/src/types";
import { generateBackgroundHtml, generateBackgroundCss } from "./components/Background";

export function generateGridHtml(page: Page, projectPath: string): string {
  //console.log("Generating HTML for page:", JSON.stringify(page, null, 2));
  console.log("Project path:", projectPath);

  if (typeof page.content === "string") {
    page.content = JSON.parse(page.content);
  }

  if (!page.content || !page.content.ROOT) {
    console.error("ROOT node is missing in page content");
    throw new Error("Root node not found");
  }

  const rootNode = page.content.ROOT as Node;

  return generateBackgroundHtml(rootNode, page.content as { [key: string]: Node }, projectPath);
}

export function generateGridCss(page: Page): string {
  const rootNode = page.content.ROOT as Node;

  return generateBackgroundCss(rootNode, page.content as { [key: string]: Node }, page.name);
}
