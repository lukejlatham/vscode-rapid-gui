import { generateButtonXaml } from "../WinUI3/components/buttonTranslator";
import { generateLabelXaml } from "../WinUI3/components/labelTranslator";
import { generateIconXaml } from "../WinUI3/components/iconTranslator";
import { generateInputXaml } from "../WinUI3/components/inputTranslator";
import { generateTextXaml } from "../WinUI3/components/paragraphTranslator";
import { generateRadioButtonXaml } from "../WinUI3/components/radioButtonTranslator";
import { generateContainerXaml } from "../WinUI3/components/containerTranslator";
import { generateCheckboxXaml } from "../WinUI3/components/checkboxTranslator";
import { generateSliderXaml } from "../WinUI3/components/sliderTranslator";
import { generateTextBoxXaml } from "../WinUI3/components/textBoxGenerator";
import { generateDropdownXaml } from "../WinUI3/components/dropdownTranslator";
import { convertColor } from "../utilities/colortranslator";
import { escapeXml } from "../WinUI3/components/specialchar";
import { generateComponentXaml } from "../WinUI3/componentGenerator";
import { Node } from "../WinUI3/JsonParser";

describe("Component Generators", () => {
  test("generateButtonXaml", () => {
    const node: Node = {
      type: { resolvedName: "Button" },
      isCanvas: false,
      props: {
        text: "Click me",
        backgroundColor: "#FF0000",
        fontColor: "#FFFFFF",
        fontSize: 16,
        borderRadius: 5,
        width: 100,
        height: 40,
        alignment: "center",
        vscIcon: "VscAdd",
        iconPosition: "left",
      },
      displayName: "Button",
      custom: { id: "button1" },
      parent: null,
      hidden: false,
      nodes: [],
      linkedNodes: {},
    };
    const result = generateButtonXaml(node);

    expect(result).toContain("<Button");
    expect(result).toContain('Foreground="#FFFFFF"');
    expect(result).toContain('Background="#FF0000"');
    expect(result).toContain('HorizontalAlignment="Stretch"');
    expect(result).toContain('VerticalAlignment="Stretch"');
    expect(result).toContain('FontFamily="Segoe UI, Sans-Serif"');
    expect(result).toContain('BorderBrush="{ThemeResource ButtonBorderThemeBrush}"');
    expect(result).toContain('BorderThickness="1"');
    expect(result).toContain('CornerRadius="5"');
    expect(result).toContain('Padding="10,5"');

    expect(result).toContain('Width="300"');
    expect(result).toContain('Height="200"');
    expect(result).toContain('FontSize="16"');

    expect(result).toContain("<Grid>");
    expect(result).toContain(
      '<StackPanel Orientation="Horizontal" HorizontalAlignment="Center" VerticalAlignment="Center">'
    );
    expect(result).toContain(
      '<FontIcon Glyph="&#xE710;" FontFamily="Segoe MDL2 Assets" Foreground="#FFFFFF" Margin="0,0,5,0"/>'
    );
    expect(result).toContain('<TextBlock Text="Click me" VerticalAlignment="Center" />');
    expect(result).toContain("</StackPanel>");
    expect(result).toContain("</Grid>");
    expect(result).toContain("</Button>");
  });

  test("generateLabelXaml", () => {
    const node: Node = {
      type: { resolvedName: "Label" },
      isCanvas: false,
      props: {
        text: "Hello, World!",
        fontSize: 24,
        fontColor: "#000000",
        fontFamily: "Arial",
        bold: true,
        italic: false,
        underline: true,
        textAlign: "center",
      },
      displayName: "Label",
      custom: { id: "label1" },
      parent: null,
      hidden: false,
      nodes: [],
      linkedNodes: {},
    };
    const result = generateLabelXaml(node);
    expect(result).toContain('Text="Hello, World!"');
    expect(result).toContain('FontSize="24"');
    expect(result).toContain('Foreground="#000000"');
    expect(result).toContain('FontFamily="Arial"');
    expect(result).toContain('FontWeight="Bold"');
    expect(result).toContain('TextDecorations="Underline"');
    expect(result).toContain('TextAlignment="Center"');
  });

  test("generateIconXaml", () => {
    const node: Node = {
      type: { resolvedName: "Icon" },
      isCanvas: false,
      props: {
        vscIcon: "VscHome",
        iconSize: 32,
        iconColor: "#0000FF",
      },
      displayName: "Icon",
      custom: { id: "icon1" },
      parent: null,
      hidden: false,
      nodes: [],
      linkedNodes: {},
    };
    const result = generateIconXaml(node);
    expect(result).toContain('Glyph="&#xE80F;"');
    expect(result).toContain('FontSize="32"');
    expect(result).toContain('Foreground="#0000FF"');
  });

  test("generateInputXaml", () => {
    const node: Node = {
      type: { resolvedName: "Input" },
      isCanvas: false,
      props: {
        placeholder: "Enter text",
        fontSize: 14,
        fontColor: "#000000",
        backgroundColor: "#FFFFFF",
        borderColor: "#CCCCCC",
        borderRadius: 4,
      },
      displayName: "Input",
      custom: { id: "input1" },
      parent: null,
      hidden: false,
      nodes: [],
      linkedNodes: {},
    };
    const result = generateInputXaml(node);
    expect(result).toContain('PlaceholderText="Enter text"');
    expect(result).toContain('FontSize="14"');
    expect(result).toContain('Foreground="#000000"');
    expect(result).toContain('Background="#FFFFFF"');
    expect(result).toContain('CornerRadius="4"');
  });

  test("generateTextXaml", () => {
    const node: Node = {
      type: { resolvedName: "Text" },
      isCanvas: false,
      props: {
        text: "Paragraph text",
        fontSize: 16,
        fontColor: "#333333",
        fontFamily: "Georgia",
        bold: true,
        italic: true,
        underline: false,
        textAlign: "justify",
      },
      displayName: "Text",
      custom: { id: "text1" },
      parent: null,
      hidden: false,
      nodes: [],
      linkedNodes: {},
    };
    const result = generateTextXaml(node);
    expect(result).toContain('<Run Text="Paragraph text" />');
    expect(result).toContain('FontSize="16"');
    expect(result).toContain('Foreground="#333333"');
    expect(result).toContain('FontFamily="Georgia"');
    expect(result).toContain("<Bold>");
    expect(result).toContain("<Italic>");
    expect(result).toContain('TextAlignment="Justify"');
  });

  test("generateRadioButtonXaml", () => {
    const node: Node = {
      type: { resolvedName: "RadioButtons" },
      isCanvas: false,
      props: {
        optionLabels: ["Option 1", "Option 2", "Option 3"],
        fontSize: 14,
        fontColor: "#000000",
        direction: "vertical",
        defaultSelected: 1,
      },
      displayName: "RadioButtons",
      custom: { id: "radioButtons1" },
      parent: null,
      hidden: false,
      nodes: [],
      linkedNodes: {},
    };
    const result = generateRadioButtonXaml(node);
    expect(result).toContain('Content="Option 1"');
    expect(result).toContain('Content="Option 2"');
    expect(result).toContain('Content="Option 3"');
    expect(result).toContain('FontSize="14"');
    expect(result).toContain('Foreground="#000000"');
    expect(result).toContain('Orientation="Vertical"');
    expect(result).toContain('IsChecked="True"');
  });

  test("generateContainerXaml", async () => {
    const node: Node = {
      type: { resolvedName: "Container" },
      isCanvas: true,
      props: {
        backgroundColor: "#FFFFFF",
        borderColor: "#000000",
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
      },
      displayName: "Container",
      custom: { id: "container1" },
      parent: null,
      hidden: false,
      nodes: [],
      linkedNodes: {},
    };
    const content = { container1: node };
    const result = await generateContainerXaml(node, content, "", new Set(), "");
    expect(result).toContain('Background="#FFFFFF"');
    expect(result).toContain('BorderBrush="#000000"');
    expect(result).toContain('BorderThickness="1"');
    expect(result).toContain('CornerRadius="8"');
    expect(result).toContain('Padding="10"');
    expect(result).toContain('Orientation="Horizontal"');
    expect(result).toContain('HorizontalAlignment="Center"');
    expect(result).toContain('VerticalAlignment="Center"');
    expect(result).toContain('Spacing="5"');
  });

  test("generateCheckboxXaml", () => {
    const node: Node = {
      type: { resolvedName: "Checkboxes" },
      isCanvas: false,
      props: {
        optionLabels: ["Check 1", "Check 2", "Check 3"],
        fontSize: 14,
        fontColor: "#000000",
        direction: "row",
        numberOfBoxes: 3,
      },
      displayName: "Checkboxes",
      custom: { id: "checkboxes1" },
      parent: null,
      hidden: false,
      nodes: [],
      linkedNodes: {},
    };
    const result = generateCheckboxXaml(node);

    expect(result).toContain('<StackPanel Orientation="Horizontal">');
    expect(result).toContain(
      '<CheckBox x:Name="Option1CheckBox" Content="Check 1" Margin="0,0,0,8"'
    );
    expect(result).toContain('FontSize="14"');
    expect(result).toContain('FontFamily="Segoe UI, Sans-Serif"');
    expect(result).toContain('Foreground="#000000"');
    expect(result).toContain('Background="Transparent"');
    expect(result).toContain("</StackPanel>");
  });

  test("generateSliderXaml", () => {
    const node: Node = {
      type: { resolvedName: "Slider" },
      isCanvas: false,
      props: {
        min: 0,
        max: 100,
        value: 50,
        step: 5,
        width: 200,
        orientation: "horizontal",
        color: "#007AFF",
        backgroundColor: "#E0E0E0",
      },
      displayName: "Slider",
      custom: { id: "slider1" },
      parent: null,
      hidden: false,
      nodes: [],
      linkedNodes: {},
    };
    const result = generateSliderXaml(node);
    expect(result).toContain('<StackPanel Orientation="Horizontal" Spacing="10">');
    expect(result).toContain("<Slider");
    expect(result).toContain('Minimum="0"');
    expect(result).toContain('Maximum="100"');
    expect(result).toContain('Value="50"');
    expect(result).toContain('StepFrequency="5"');
    expect(result).toContain('Width="200"');
    expect(result).toContain('TickFrequency="5"');
    expect(result).toContain('TickPlacement="Outside"');
    expect(result).toContain('<SolidColorBrush x:Key="SliderTrackValueFill" Color="#007AFF"/>');
    expect(result).toContain('<SolidColorBrush x:Key="SliderTrackFill" Color="#E0E0E0"/>');
    expect(result).toContain("</Slider>");
    expect(result).toContain("</StackPanel>");
  });

  test("generateTextBoxXaml", () => {
    const node: Node = {
      type: { resolvedName: "TextBox" },
      isCanvas: false,
      props: {
        text: "Multiline text",
        placeholder: "Enter text here",
        fontSize: 16,
        fontColor: "#000000",
        backgroundColor: "#FFFFFF",
        borderColor: "#CCCCCC",
        borderRadius: 4,
        width: 300,
        height: 100,
      },
      displayName: "TextBox",
      custom: { id: "textBox1" },
      parent: null,
      hidden: false,
      nodes: [],
      linkedNodes: {},
    };
    const result = generateTextBoxXaml(node);
    expect(result).toContain('Text="Multiline text"');
    expect(result).toContain('PlaceholderText="Enter text here"');
    expect(result).toContain('FontSize="16"');
    expect(result).toContain('Foreground="#000000"');
    expect(result).toContain('Background="#FFFFFF"');
    expect(result).toContain('BorderBrush="#CCCCCC"');
    expect(result).toContain('CornerRadius="4"');
    expect(result).toContain('Width="300"');
    expect(result).toContain('Height="100"');
  });

  test("generateDropdownXaml", () => {
    const node: Node = {
      type: { resolvedName: "Dropdown" },
      isCanvas: false,
      props: {
        optionLabels: ["Option 1", "Option 2", "Option 3"],
        fontSize: 14,
        fontColor: "#000000",
        backgroundColor: "#FFFFFF",
        width: 200,
        height: 40,
        borderRadius: 4,
        placeholder: "Select an option",
      },
      displayName: "Dropdown",
      custom: { id: "dropdown1" },
      parent: null,
      hidden: false,
      nodes: [],
      linkedNodes: {},
    };
    const result = generateDropdownXaml(node);
    expect(result).toContain('<ComboBoxItem Content="Option 1" />');
    expect(result).toContain('<ComboBoxItem Content="Option 2" />');
    expect(result).toContain('<ComboBoxItem Content="Option 3" />');
    expect(result).toContain('FontSize="14"');
    expect(result).toContain('Foreground="#000000"');
    expect(result).toContain('Background="#FFFFFF"');
    expect(result).toContain('Width="200"');
    expect(result).toContain('Height="40"');
    expect(result).toContain('CornerRadius="4"');
    expect(result).toContain('PlaceholderText="Select an option"');
  });
});

describe("Utility Functions", () => {
  test("convertColor", () => {
    expect(convertColor("#FF0000")).toBe("#FF0000");
    expect(convertColor("Transparent")).toBe("Transparent");
    expect(convertColor("#80FFFFFF")).toBe("#80FFFFFF");
  });

  test("escapeXml", () => {
    expect(escapeXml('Text with <special> & "characters"')).toBe(
      "Text with &lt;special&gt; &amp; &quot;characters&quot;"
    );
    expect(escapeXml("No special chars")).toBe("No special chars");
    expect(escapeXml("<tag>'apostrophe'</tag>")).toBe(
      "&lt;tag&gt;&apos;apostrophe&apos;&lt;/tag&gt;"
    );
  });
});

describe("Component Generator", () => {
  test("generateComponentXaml", async () => {
    const node: Node = {
      type: { resolvedName: "Label" },
      isCanvas: false,
      props: {
        text: "Hello, World!",
        fontSize: 24,
        fontColor: "#000000",
        fontFamily: "Arial",
        bold: true,
        textAlign: "center",
      },
      displayName: "Label",
      custom: { id: "label1" },
      parent: null,
      hidden: false,
      nodes: [],
      linkedNodes: {},
    };
    const content = { label1: node };
    const result = await generateComponentXaml(node, content, "", new Set(), "");
    expect(result).toContain('Text="Hello, World!"');
    expect(result).toContain('FontSize="24"');
    expect(result).toContain('Foreground="#000000"');
    expect(result).toContain('FontFamily="Arial"');
    expect(result).toContain('FontWeight="Bold"');
    expect(result).toContain('TextAlignment="Center"');
  });
});
