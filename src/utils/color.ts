import { colors, Faction } from "./phases-types";
import type { Color } from "./phases-types";

export function matchColorsToFactions(input: [string, Faction["colors"]][]): Record<string, Color> {
  // Sort factions by the number of colors they want (ascending) and then by name (alphabetical)
  const factions = [...input].sort((a, b) => {
    const [nameA, colorsA] = a;
    const [nameB, colorsB] = b;
    if (colorsA.length === colorsB.length) {
      return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
    }

    return colorsA.length - colorsB.length;
  });

  const assignedColors: Color[] = [];
  const acc = {} as Record<string, Color>;

  factions.forEach(([name, faction]) => {
    // Find the first available color from the faction's preferred colors
    let assignedColor = faction.find((color) => !assignedColors.includes(color));

    // If no preferred color is available, assign the first available color from all colors
    if (!assignedColor) {
      assignedColor = colors.find((color) => !assignedColors.includes(color));
    }

    // Add the assigned color to the list of used colors
    if (assignedColor) {
      assignedColors.push(assignedColor);
      acc[name] = assignedColor;
    }
  });

  return acc;
}

export const MyColors = {
  black: { r: 0, g: 0, b: 0, a: 1 },
  dark: { r: 32 / 255, g: 29 / 255, b: 29 / 255, a: 1 },
  muted: { r: 183 / 255, g: 178 / 255, b: 144 / 255, a: 1 },
  detail: { r: 255 / 255, g: 255 / 255, b: 255 / 255, a: 1 },
};
