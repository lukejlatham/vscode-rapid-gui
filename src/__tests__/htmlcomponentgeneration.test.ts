import { generateComponentHtml } from "../HTML/componentGenerator";
import { Node } from "../HTML/JSONParser";
import * as path from "path";

jest.mock("fs", () => ({
  existsSync: jest.fn(),
  mkdirSync: jest.fn(),
  copyFileSync: jest.fn(),
}));

function normalizeWhitespace(html: string): string {
  return html.replace(/>\s+</g, "><").replace(/\s+/g, " ").trim();
}

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
        icon: "left",
        hyperlink: "https://example.com",
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
      <a href="https://example.com" class="button-link">
        <button id="-button1" class="custom-button -button1">
          Click me
        </button>
      </a>
    `
      .trim()
      .replace(/\s+/g, " ");

    const generatedHtml = generateComponentHtml(
      { pages: { temp: { components: { button1: buttonNode }, root: buttonNode, layout: [] } } },
      "temp"
    );

    expect(normalizeWhitespace(generatedHtml)).toBe(normalizeWhitespace(expectedHtml));
  });

  test("generateInputHtml creates correct input HTML", () => {
    const inputNode: Node = {
      type: { resolvedName: "Input" },
      props: {
        placeholder: "Enter text",
        fontColor: "#333333",
        fontSize: 14,
        backgroundColor: "#f0f0f0",
        borderColor: "#cccccc",
        borderRadius: 3,
      },
      custom: { id: "input1" },
      isCanvas: false,
      parent: null,
      displayName: "Input",
      hidden: false,
      nodes: [],
      linkedNodes: {},
    };

    const expectedHtml = `
    <input id="-input1" class="custom-input -input1" placeholder="Enter text">
    `.trim();

    const generatedHtml = generateComponentHtml(
      { pages: { temp: { components: { input1: inputNode }, root: inputNode, layout: [] } } },
      "temp"
    ).trim();

    expect(generatedHtml).toBe(expectedHtml);
  });

  test("generateTextHtml creates correct text HTML", () => {
    const textNode: Node = {
      type: { resolvedName: "Text" },
      props: {
        text: "Hello, world!",
        fontColor: "#000000",
        fontSize: 18,
        bold: true,
        italic: true,
        underline: true,
        textAlign: "center",
      },
      custom: { id: "text1" },
      isCanvas: false,
      parent: null,
      displayName: "Text",
      hidden: false,
      nodes: [],
      linkedNodes: {},
    };

    const expectedHtml = `
      <p id="-text1" class="custom-text -text1">
        Hello, world!
      </p>
    `
      .trim()
      .replace(/\s+/g, " ");

    const generatedHtml = generateComponentHtml(
      { pages: { temp: { components: { text1: textNode }, root: textNode, layout: [] } } },
      "temp"
    )
      .trim()
      .replace(/\s+/g, " ");

    expect(generatedHtml).toBe(expectedHtml);
  });

  test("generateLabelHtml creates correct label HTML", () => {
    const labelNode: Node = {
      type: { resolvedName: "Label" },
      props: {
        text: "Username:",
        fontColor: "#333333",
        fontSize: 16,
        bold: true,
        textAlign: "left",
      },
      custom: { id: "label1" },
      isCanvas: false,
      parent: null,
      displayName: "Label",
      hidden: false,
      nodes: [],
      linkedNodes: {},
    };

    const expectedHtml = `
      <label id="-label1" class="custom-label -label1">
        Username:
      </label>
    `
      .trim()
      .replace(/\s+/g, " ");

    const generatedHtml = generateComponentHtml(
      { pages: { temp: { components: { label1: labelNode }, root: labelNode, layout: [] } } },
      "temp"
    )
      .trim()
      .replace(/\s+/g, " ");

    expect(generatedHtml).toBe(expectedHtml);
  });

  test("generateIconHtml creates correct icon HTML", () => {
    const iconNode: Node = {
      type: { resolvedName: "Icon" },
      props: {
        iconName: "home",
        color: "#007bff",
        size: 24,
        hyperlink: "https://example.com",
      },
      custom: { id: "icon1" },
      isCanvas: false,
      parent: null,
      displayName: "Icon",
      hidden: false,
      nodes: [],
      linkedNodes: {},
    };

    const expectedHtml = `
      <a href="https://example.com" class="icon-link">
        <i id="-icon1" class="icon fa-solid fa-question -icon1"></i>
      </a>
    `
      .trim()
      .replace(/\s+/g, " ");

    const generatedHtml = generateComponentHtml(
      { pages: { temp: { components: { icon1: iconNode }, root: iconNode, layout: [] } } },
      "temp"
    );

    expect(normalizeWhitespace(generatedHtml)).toBe(normalizeWhitespace(expectedHtml));
  });

  test("generateRadioButtonHtml creates correct radio button HTML", () => {
    const radioButtonNode: Node = {
      type: { resolvedName: "RadioButtons" },
      props: {
        header: "Choose an option:",
        optionLabels: ["Option 1", "Option 2", "Option 3"],
        fontColor: "#333333",
        fontSize: 14,
        direction: "column",
      },
      custom: { id: "radio1" },
      isCanvas: false,
      parent: null,
      displayName: "RadioButtons",
      hidden: false,
      nodes: [],
      linkedNodes: {},
    };

    const expectedHtml = `
    <div class="radio-group-container -radiobuttons1">
      <label class="radio-group-label">Choose an option:</label>
      <div class="radio-options column">
        <div class="radio-option">
          <input type="radio" id="-radiobuttons1-0" name="Choose an option:" value="Option 1">
          <label for="-radiobuttons1-0">Option 1</label>
        </div>
        <div class="radio-option">
          <input type="radio" id="-radiobuttons1-1" name="Choose an option:" value="Option 2">
          <label for="-radiobuttons1-1">Option 2</label>
        </div>
        <div class="radio-option">
          <input type="radio" id="-radiobuttons1-2" name="Choose an option:" value="Option 3">
          <label for="-radiobuttons1-2">Option 3</label>
        </div>
      </div>
    </div>
    `
      .trim()
      .replace(/\s+/g, " ");

    const generatedHtml = generateComponentHtml(
      {
        pages: {
          temp: { components: { radio1: radioButtonNode }, root: radioButtonNode, layout: [] },
        },
      },
      "temp"
    )
      .trim()
      .replace(/\s+/g, " ");

    expect(generatedHtml).toBe(expectedHtml);
  });

  test("generateContainerHtml creates correct container HTML", () => {
    const containerNode: Node = {
      type: { resolvedName: "Container" },
      props: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundColor: "#f0f0f0",
        width: 80,
        height: 200,
        borderColor: "#cccccc",
        borderRadius: 5,
        padding: 10,
      },
      custom: { id: "container1" },
      isCanvas: false,
      parent: null,
      displayName: "Container",
      hidden: false,
      nodes: ["child1"],
      linkedNodes: {},
    };

    const childNode: Node = {
      type: { resolvedName: "Text" },
      props: { text: "Child element" },
      custom: { id: "child1" },
      isCanvas: false,
      parent: "container1",
      displayName: "Text",
      hidden: false,
      nodes: [],
      linkedNodes: {},
    };

    const expectedHtml = `
      <div id="-container1" class="container -container1">
        <p id="-text2" class="custom-text -text2">
          Child element
        </p>
      </div>
    `;

    const generatedHtml = generateComponentHtml(
      {
        pages: {
          temp: {
            components: { container1: containerNode, child1: childNode },
            root: containerNode,
            layout: [],
          },
        },
      },
      "temp"
    );

    expect(normalizeWhitespace(generatedHtml)).toBe(normalizeWhitespace(expectedHtml));
  });
});
test("generateCheckboxHtml creates correct checkbox HTML", () => {
  const checkboxNode: Node = {
    type: { resolvedName: "Checkboxes" },
    props: {
      header: "Select options:",
      optionLabels: ["Option A", "Option B", "Option C"],
      fontColor: "#333333",
      fontSize: 14,
      direction: "row",
    },
    custom: { id: "checkbox1" },
    isCanvas: false,
    parent: null,
    displayName: "Checkboxes",
    hidden: false,
    nodes: [],
    linkedNodes: {},
  };

  const expectedHtml = `
    <div class="checkbox-group-container -checkboxes1">
      <label class="checkbox-group-label">Select options:</label>
      <div class="checkbox-options row">
        <div class="checkbox-option">
          <input type="checkbox" id="-checkboxes1-0" name="Select options:" value="Option A">
          <label for="-checkboxes1-0">Option A</label>
        </div>
        <div class="checkbox-option">
          <input type="checkbox" id="-checkboxes1-1" name="Select options:" value="Option B">
          <label for="-checkboxes1-1">Option B</label>
        </div>
        <div class="checkbox-option">
          <input type="checkbox" id="-checkboxes1-2" name="Select options:" value="Option C">
          <label for="-checkboxes1-2">Option C</label>
        </div>
      </div>
    </div>
    `
    .trim()
    .replace(/\s+/g, " ");

  const generatedHtml = generateComponentHtml(
    {
      pages: {
        temp: { components: { checkbox1: checkboxNode }, root: checkboxNode, layout: [] },
      },
    },
    "temp"
  )
    .trim()
    .replace(/\s+/g, " ");

  expect(generatedHtml).toBe(expectedHtml);
});

test("generateSliderHtml creates correct slider HTML", () => {
  const sliderNode: Node = {
    type: { resolvedName: "Slider" },
    props: {
      header: "Select value:",
      min: 1,
      max: 100,
      step: 5,
      fontColor: "#333333",
      fontSize: 14,
      backgroundColor: "#007bff",
    },
    custom: { id: "slider1" },
    isCanvas: false,
    parent: null,
    displayName: "Slider",
    hidden: false,
    nodes: [],
    linkedNodes: {},
  };

  const expectedHtml = `
    <div class="slider-container -slider1">
      <label>Select value:</label>
      <input type="range" id="-slider1" min="1" max="100" step="5">
      <output for="-slider1"></output>
    </div>
    `
    .trim()
    .replace(/\s+/g, " ");

  const generatedHtml = generateComponentHtml(
    { pages: { temp: { components: { slider1: sliderNode }, root: sliderNode, layout: [] } } },
    "temp"
  )
    .trim()
    .replace(/\s+/g, " ");

  expect(generatedHtml).toBe(expectedHtml);
});

test("generateTextBoxHtml creates correct text box HTML", () => {
  const textBoxNode: Node = {
    type: { resolvedName: "TextBox" },
    props: {
      label: "Your message:",
      placeholder: "Type your message here",
      fontColor: "#333333",
      fontSize: 14,
      backgroundColor: "#ffffff",
      borderColor: "#cccccc",
      borderRadius: 4,
      width: 300,
      height: 100,
    },
    custom: { id: "textbox1" },
    isCanvas: false,
    parent: null,
    displayName: "TextBox",
    hidden: false,
    nodes: [],
    linkedNodes: {},
  };

  const expectedHtml = `
    <div class="textbox-container -textbox1">
      <label for="-textbox1">Your message:</label>
      <textarea id="-textbox1" placeholder="Type your message here"></textarea>
    </div>
    `
    .trim()
    .replace(/\s+/g, " ");

  const generatedHtml = generateComponentHtml(
    { pages: { temp: { components: { textbox1: textBoxNode }, root: textBoxNode, layout: [] } } },
    "temp"
  )
    .trim()
    .replace(/\s+/g, " ");

  expect(generatedHtml).toBe(expectedHtml);
});

test("generateDropdownHtml creates correct dropdown HTML", () => {
  const dropdownNode: Node = {
    type: { resolvedName: "Dropdown" },
    props: {
      header: "Select an option:",
      optionLabels: ["Option 1", "Option 2", "Option 3"],
      fontColor: "#333333",
      fontSize: 14,
    },
    custom: { id: "dropdown1" },
    isCanvas: false,
    parent: null,
    displayName: "Dropdown",
    hidden: false,
    nodes: [],
    linkedNodes: {},
  };

  const expectedHtml = `
    <div class="dropdown-container -dropdown1">
      <label for="-dropdown1">Select an option:</label>
      <select id="-dropdown1">
        <option value="Option 1">Option 1</option>
        <option value="Option 2">Option 2</option>
        <option value="Option 3">Option 3</option>
      </select>
    </div>
    `
    .trim()
    .replace(/\s+/g, " ");

  const generatedHtml = generateComponentHtml(
    {
      pages: {
        temp: { components: { dropdown1: dropdownNode }, root: dropdownNode, layout: [] },
      },
    },
    "temp"
  )
    .trim()
    .replace(/\s+/g, " ");

  expect(generatedHtml).toBe(expectedHtml);
});

test("generateImageHtml creates correct image HTML for external URL", () => {
  const imageNode: Node = {
    type: { resolvedName: "Image" },
    props: {
      src: "https://example.com/image.jpg",
      alt: "Example image",
      width: 300,
    },
    custom: { id: "image1" },
    isCanvas: false,
    parent: null,
    displayName: "Image",
    hidden: false,
    nodes: [],
    linkedNodes: {},
  };

  const expectedHtml = `
  <div id="-image1" class="image-container -image1">
    <img src="https://example.com/image.jpg" alt="Example image" class="image -image1" />
  </div>
  `
    .trim()
    .replace(/\s+/g, " ");

  const generatedHtml = generateComponentHtml(
    { pages: { temp: { components: { image1: imageNode }, root: imageNode, layout: [] } } },
    "temp"
  )
    .trim()
    .replace(/\s+/g, " ");

  expect(generatedHtml).toBe(expectedHtml);
});

test("generateImageHtml creates correct image HTML for local file", () => {
  const imageNode: Node = {
    type: { resolvedName: "Image" },
    props: {
      src: "local_image.jpg",
      alt: "Local image",
      width: 300,
    },
    custom: { id: "image2" },
    isCanvas: false,
    parent: null,
    displayName: "Image",
    hidden: false,
    nodes: [],
    linkedNodes: {},
  };

  const projectPath = "/path/to/project";
  const expectedImagePath = path.join("images", "local_image.jpg");

  const expectedHtml = `
  <div id="-image2" class="image-container -image2">
    <img src="${expectedImagePath}" alt="Local image" class="image -image2" />
  </div>
  `
    .trim()
    .replace(/\s+/g, " ");

  const generatedHtml = generateComponentHtml(
    { pages: { temp: { components: { image2: imageNode }, root: imageNode, layout: [] } } },
    "temp",
    projectPath
  )
    .trim()
    .replace(/\s+/g, " ");

  expect(generatedHtml).toBe(expectedHtml);
});
