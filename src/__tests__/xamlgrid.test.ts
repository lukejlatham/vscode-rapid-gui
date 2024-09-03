import { generateGridXaml } from "../WinUI3/gridGenerator";
import { Page } from "../../webview-ui/src/types";

describe("Grid Generator", () => {
  test("generateGridXaml", async () => {
    const mockPage: Page = {
      id: "page1",
      name: "Page 1",
      content: {
        ROOT: {
          type: { resolvedName: "Background" },
          isCanvas: true,
          props: {
            rows: 10,
            columns: 10,
            backgroundColor: "#1e2124",
            layout: [
              { i: "0", x: 0, y: 0, w: 1, h: 9 },
              { i: "1", x: 1, y: 0, w: 9, h: 1 },
              { i: "2", x: 1, y: 1, w: 7, h: 8 },
            ],
          },
          displayName: "Background",
          custom: {},
          parent: null,
          hidden: false,
          nodes: [],
          linkedNodes: {
            "0": "SidebarGridCell",
            "1": "HeaderGridCell",
            "2": "MainContentGridCell",
          },
        },
        SidebarGridCell: {
          type: { resolvedName: "GridCell" },
          isCanvas: true,
          props: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          },
          displayName: "Grid Cell",
          custom: { id: "0" },
          parent: "ROOT",
          hidden: false,
          nodes: ["SidebarContainer"],
          linkedNodes: {},
        },
        SidebarContainer: {
          type: { resolvedName: "Container" },
          isCanvas: true,
          props: {
            height: 100,
            width: 100,
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            gap: 10,
            backgroundColor: "#1e2124",
            borderRadius: 5,
            borderColor: "#414833",
            padding: 5,
          },
          displayName: "Container",
          custom: {},
          parent: "SidebarGridCell",
          hidden: false,
          nodes: ["SidebarButton0"],
          linkedNodes: {},
        },
        SidebarButton0: {
          type: { resolvedName: "Button" },
          isCanvas: false,
          props: {
            backgroundColor: "#7289da",
            fontSize: 18,
            fontFamily: "Lato",
            fontColor: "#ffffff",
            borderRadius: 4,
            width: 10,
            height: 5,
            alignment: "left",
            displayName: "Button",
            iconPosition: "left",
            vscIcon: "VscServer",
          },
          displayName: "Button",
          custom: {},
          parent: "SidebarContainer",
          hidden: false,
          nodes: [],
          linkedNodes: {},
        },
      },
    };

    const result = await generateGridXaml(mockPage, "/mock/project/path");

    // Test the overall structure
    expect(result).toContain('<Grid x:Name="RootGrid" Background="#1e2124">');
    expect(result).toContain("</Grid>");

    // Test row and column definitions
    expect(result).toContain("<Grid.RowDefinitions>");
    expect(result).toContain("<Grid.ColumnDefinitions>");
    expect(result.match(/<RowDefinition Height="\*"\/>/g)).toHaveLength(10);
    expect(result.match(/<ColumnDefinition Width="\*"\/>/g)).toHaveLength(10);

    // Test grid cell
    expect(result).toContain('<Grid Grid.Row="0" Grid.Column="0" Grid.RowSpan="9">');

    // Test container
    expect(result).toContain(
      '<Border Background="#1e2124" BorderBrush="#414833" BorderThickness="1" CornerRadius="5" Padding="5">'
    );
    expect(result).toContain(
      '<StackPanel Orientation="Vertical" Spacing="10" HorizontalAlignment="Center" VerticalAlignment="Center">'
    );

    // Test button
    expect(result).toContain(
      '<Button Foreground="#ffffff" Background="#7289da" HorizontalAlignment="Stretch" VerticalAlignment="Stretch" FontFamily="Lato" BorderBrush="{ThemeResource ButtonBorderThemeBrush}" BorderThickness="1" CornerRadius="4" Padding="10,5" Width="50" Height="52" FontSize="18">'
    );
    expect(result).toContain(
      '<FontIcon Glyph="&#xE7E6;" FontFamily="Segoe MDL2 Assets" Foreground="#ffffff" />'
    );

    // Test nesting
    expect(result.indexOf('Grid Grid.Row="0" Grid.Column="0" Grid.RowSpan="9"')).toBeLessThan(
      result.indexOf('Border Background="#1e2124"')
    );
    expect(result.indexOf('Border Background="#1e2124"')).toBeLessThan(
      result.indexOf('Button Foreground="#ffffff"')
    );
  });
});
