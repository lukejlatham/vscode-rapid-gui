type LayoutItem = {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  original?: { x: number; y: number; w: number; h: number };
};

export function adjustLayoutToFitGrid(
  layout: LayoutItem[],
  gridWidth: number,
  gridHeight: number
): LayoutItem[] {
  console.log("Original layout:", JSON.stringify(layout, null, 2));

  const adjustedLayout = layout.map((item) => ({
    ...item,
    original: { x: item.x, y: item.y, w: item.w, h: item.h },
  }));

  // Sort items by their original position (top to bottom, left to right)
  adjustedLayout.sort((a, b) => a.original!.y - b.original!.y || a.original!.x - b.original!.x);

  const occupiedCells: boolean[][] = Array(gridHeight)
    .fill(null)
    .map(() => Array(gridWidth).fill(false));

  for (let item of adjustedLayout) {
    fitItemInGrid(item, occupiedCells, gridWidth, gridHeight);
  }

  // Final pass to fill gaps
  fillGaps(adjustedLayout, occupiedCells, gridWidth, gridHeight);

  logLayoutChanges(adjustedLayout);
  console.log("Final adjusted layout:", JSON.stringify(adjustedLayout, null, 2));

  adjustedLayout.forEach((item) => delete item.original);

  return adjustedLayout;
}

function fitItemInGrid(
  item: LayoutItem,
  occupiedCells: boolean[][],
  gridWidth: number,
  gridHeight: number
): void {
  let bestFit = { x: 0, y: 0, w: 1, h: 1 };
  let minDistanceFromOriginal = Infinity;

  // Try to fit the item as close to its original position and size as possible
  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      for (let w = Math.min(item.original!.w, gridWidth - x); w >= 1; w--) {
        for (let h = Math.min(item.original!.h, gridHeight - y); h >= 1; h--) {
          if (canFitItem({ ...item, x, y, w, h }, occupiedCells, gridWidth, gridHeight)) {
            const distance = Math.abs(x - item.original!.x) + Math.abs(y - item.original!.y);
            const sizeDiff = Math.abs(w - item.original!.w) + Math.abs(h - item.original!.h);
            if (distance + sizeDiff < minDistanceFromOriginal) {
              minDistanceFromOriginal = distance + sizeDiff;
              bestFit = { x, y, w, h };
            }
          }
        }
      }
    }
  }

  // Place the item in its best fit position
  item.x = bestFit.x;
  item.y = bestFit.y;
  item.w = bestFit.w;
  item.h = bestFit.h;
  placeItem(item, occupiedCells);

  if (minDistanceFromOriginal > 0) {
    console.log(
      `Adjusted item ${item.i}: (${item.original!.x},${item.original!.y}) ${item.original!.w}x${
        item.original!.h
      } -> (${item.x},${item.y}) ${item.w}x${item.h}`
    );
  }
}

function canFitItem(
  item: LayoutItem,
  occupiedCells: boolean[][],
  gridWidth: number,
  gridHeight: number
): boolean {
  if (item.x + item.w > gridWidth || item.y + item.h > gridHeight) return false;

  for (let dy = 0; dy < item.h; dy++) {
    for (let dx = 0; dx < item.w; dx++) {
      if (occupiedCells[item.y + dy][item.x + dx]) return false;
    }
  }

  return true;
}

function placeItem(item: LayoutItem, occupiedCells: boolean[][]): void {
  for (let dy = 0; dy < item.h; dy++) {
    for (let dx = 0; dx < item.w; dx++) {
      occupiedCells[item.y + dy][item.x + dx] = true;
    }
  }
}

function fillGaps(
  layout: LayoutItem[],
  occupiedCells: boolean[][],
  gridWidth: number,
  gridHeight: number
): void {
  for (let item of layout) {
    // Try to expand right
    while (item.x + item.w < gridWidth && canExpandRight(item, occupiedCells)) {
      item.w++;
    }
    // Try to expand down
    while (item.y + item.h < gridHeight && canExpandDown(item, occupiedCells)) {
      item.h++;
    }
    placeItem(item, occupiedCells);
  }
}

function canExpandRight(item: LayoutItem, occupiedCells: boolean[][]): boolean {
  for (let y = item.y; y < item.y + item.h; y++) {
    if (occupiedCells[y][item.x + item.w]) return false;
  }
  return true;
}

function canExpandDown(item: LayoutItem, occupiedCells: boolean[][]): boolean {
  for (let x = item.x; x < item.x + item.w; x++) {
    if (occupiedCells[item.y + item.h][x]) return false;
  }
  return true;
}

function logLayoutChanges(adjustedLayout: LayoutItem[]): void {
  adjustedLayout.forEach((item) => {
    if (
      item.x !== item.original!.x ||
      item.y !== item.original!.y ||
      item.w !== item.original!.w ||
      item.h !== item.original!.h
    ) {
      console.log(`Item ${item.i} was adjusted:`);
      console.log(
        `  Before: x=${item.original!.x}, y=${item.original!.y}, w=${item.original!.w}, h=${
          item.original!.h
        }`
      );
      console.log(`  After:  x=${item.x}, y=${item.y}, w=${item.w}, h=${item.h}`);
    }
  });
}
