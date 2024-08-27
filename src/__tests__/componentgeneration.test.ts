import { generateComponentHtml } from "../HTML/componentGenerator";
import { Node } from "../HTML/JSONParser";

describe("Component Generation", () => {
  test("generateButtonHtml creates correct button HTML", () => {
    const buttonNode: Node = {
      type: { resolvedName: "Button" },
      props: {
        text: "Click me",
        backgroundColor: "#007bff",
        fontColor: "#ffffff",
        fontSize: 16,
        borderRadius: 5,
      },
      custom: { id: "button1" },
      isCanvas: false,
      parent: null,
      displayName: "Button",
      hidden: false,
      nodes: [],
      linkedNodes: {},
    };

    const expectedHtml = `
    <button id="button1" class="custom-button button1">
      Click me
    </button>
    `.trim();

    const generatedHtml = generateComponentHtml(
      { pages: { temp: { components: { button1: buttonNode }, root: buttonNode, layout: [] } } },
      "temp"
    ).trim();

    expect(generatedHtml).toBe(expectedHtml);
  });
});
