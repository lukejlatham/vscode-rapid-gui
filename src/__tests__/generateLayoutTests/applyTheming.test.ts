import { ColorScheme } from "../../../webview-ui/src/types";
import {
  applyThemeToSchema,
  mapColor,
  hasBackgroundColor,
  hasFontColor,
  hasIconColor,
  getRandomValue,
} from "../../generateLayout/applyTheming";

// Mock color scheme for testing, based on the provided redairbnb scheme
const mockColorScheme: ColorScheme = {
  shadows: true,
  backgroundColor: "#FFFFFF",
  sectionColors: {
    main: "#ffffff",
    lightaccent: "#00A699",
    darkaccent: "#FF5A5F",
  },
  sectionBorderColors: {
    main: "#767676",
    lightaccent: "#00A699",
    darkaccent: "#484848",
  },
  elementColors: {
    main: "#FF5A5F",
    lightaccent: "#ffffff",
    darkaccent: "#7f4f24",
  },
  elementBorderColors: {
    main: "#767676",
    lightaccent: "#00A699",
    darkaccent: "#484848",
  },
  fontColors: {
    main: "#484848",
    lightaccent: "#767676",
    darkaccent: "#484848",
  },
};

describe("applyThemeToSchema", () => {
  it("should apply theme colors to sections and children", () => {
    const mockData = [
      {
        backgroundColor: "Main" as const,
        children: [
          {
            backgroundColor: "LightAccent" as const,
            fontColor: "DarkAccent" as const,
            iconColor: "Main" as const,
          },
        ],
      },
    ];

    const result = applyThemeToSchema(mockData, mockColorScheme);

    expect(result[0].backgroundColor).toBe("#ffffff");
    expect(result[0].borderColor).toBe("#767676");
    expect(result[0].children[0].backgroundColor).toBe("#ffffff");
    expect(result[0].children[0].borderColor).toBe("#00A699");
    expect(result[0].children[0].fontColor).toBe("#484848");
    expect(result[0].children[0].iconColor).toBe("#484848");
  });

  it("should throw an error if color scheme is not provided", () => {
    const mockData = [{ backgroundColor: "Main" as const, children: [] }];
    expect(() => applyThemeToSchema(mockData, null as any)).toThrow("Theme not found");
  });
});

describe("Helper functions", () => {
  describe("hasBackgroundColor", () => {
    it("should return true for objects with valid backgroundColor", () => {
      expect(hasBackgroundColor({ backgroundColor: "Main" })).toBe(true);
      expect(hasBackgroundColor({ backgroundColor: "LightAccent" })).toBe(true);
      expect(hasBackgroundColor({ backgroundColor: "DarkAccent" })).toBe(true);
    });

    it("should return false for objects without valid backgroundColor", () => {
      expect(hasBackgroundColor({})).toBe(false);
      expect(hasBackgroundColor({ backgroundColor: "Invalid" })).toBe(false);
      expect(hasBackgroundColor({ backgroundColor: 123 })).toBe(false);
    });
  });

  describe("getRandomValue", () => {
    it("should return the input string if not an array", () => {
      expect(getRandomValue("test")).toBe("test");
    });

    it("should return the input string for color values", () => {
      expect(getRandomValue("#484848")).toBe("#484848");
    });
  });

  describe("mapColor", () => {
    it("should map colors correctly", () => {
      expect(mapColor("Main", "sectionColors", mockColorScheme)).toBe("#ffffff");
      expect(mapColor("LightAccent", "elementColors", mockColorScheme)).toBe("#ffffff");
      expect(mapColor("DarkAccent", "fontColors", mockColorScheme)).toBe("#484848");
    });
  });
});

describe("Type guard functions", () => {
  describe("hasBackgroundColor", () => {
    it("should return true for objects with valid backgroundColor", () => {
      expect(hasBackgroundColor({ backgroundColor: "Main" })).toBe(true);
      expect(hasBackgroundColor({ backgroundColor: "LightAccent" })).toBe(true);
      expect(hasBackgroundColor({ backgroundColor: "DarkAccent" })).toBe(true);
    });

    it("should return false for objects without valid backgroundColor", () => {
      expect(hasBackgroundColor({})).toBe(false);
      expect(hasBackgroundColor({ backgroundColor: "Invalid" })).toBe(false);
      expect(hasBackgroundColor({ backgroundColor: 123 })).toBe(false);
    });
  });

  describe("hasFontColor", () => {
    it("should return true for objects with valid fontColor", () => {
      expect(hasFontColor({ fontColor: "Main" })).toBe(true);
      expect(hasFontColor({ fontColor: "LightAccent" })).toBe(true);
      expect(hasFontColor({ fontColor: "DarkAccent" })).toBe(true);
    });

    it("should return false for objects without valid fontColor", () => {
      expect(hasFontColor({})).toBe(false);
      expect(hasFontColor({ fontColor: "Invalid" })).toBe(false);
      expect(hasFontColor({ fontColor: 123 })).toBe(false);
    });
  });

  describe("hasIconColor", () => {
    it("should return true for objects with valid iconColor", () => {
      expect(hasIconColor({ iconColor: "Main" })).toBe(true);
      expect(hasIconColor({ iconColor: "LightAccent" })).toBe(true);
      expect(hasIconColor({ iconColor: "DarkAccent" })).toBe(true);
    });

    it("should return false for objects without valid iconColor", () => {
      expect(hasIconColor({})).toBe(false);
      expect(hasIconColor({ iconColor: "Invalid" })).toBe(false);
      expect(hasIconColor({ iconColor: 123 })).toBe(false);
    });
  });
});
