type LayoutItem = {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

export function adjustLayoutToFitGrid(
  layout: LayoutItem[],
  gridWidth: number,
  gridHeight: number
): LayoutItem[] {
  console.log("Original layout:", JSON.stringify(layout, null, 2));

  const adjustedLayout = layout.map((item) => ({ ...item }));
  adjustedLayout.sort((a, b) => a.y - b.y || a.x - b.x);

  const occupiedCells: boolean[][] = Array(gridHeight)
    .fill(null)
    .map(() => Array(gridWidth).fill(false));

  for (let item of adjustedLayout) {
    const originalItem = { ...item };
    fitItemInGrid(item, occupiedCells, gridWidth, gridHeight);

    // Log if the item was changed
    if (
      originalItem.x !== item.x ||
      originalItem.y !== item.y ||
      originalItem.w !== item.w ||
      originalItem.h !== item.h
    ) {
      console.log(`Item ${item.i} was adjusted:`);
      console.log(
        `  Before: x=${originalItem.x}, y=${originalItem.y}, w=${originalItem.w}, h=${originalItem.h}`
      );
      console.log(`  After:  x=${item.x}, y=${item.y}, w=${item.w}, h=${item.h}`);
    }
  }

  console.log("Final adjusted layout:", JSON.stringify(adjustedLayout, null, 2));

  return adjustedLayout;
}

function fitItemInGrid(
  item: LayoutItem,
  occupiedCells: boolean[][],
  gridWidth: number,
  gridHeight: number
): void {
  // Find the first available position for the item
  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      if (canFitItem(item, x, y, occupiedCells, gridWidth, gridHeight)) {
        placeItem(item, x, y, occupiedCells);
        return;
      }
    }
  }

  console.log(
    `Unable to fit item ${item.i} (${item.w}x${item.h}) in its original size. Attempting to resize.`
  );

  // If we can't fit the item as is, we need to resize it
  const originalW = item.w;
  const originalH = item.h;
  item.w = Math.min(item.w, gridWidth);
  item.h = Math.min(item.h, gridHeight);

  while (item.w > 1 || item.h > 1) {
    if (item.w > item.h && item.w > 1) item.w--;
    else if (item.h > 1) item.h--;

    for (let y = 0; y < gridHeight; y++) {
      for (let x = 0; x < gridWidth; x++) {
        if (canFitItem(item, x, y, occupiedCells, gridWidth, gridHeight)) {
          placeItem(item, x, y, occupiedCells);
          console.log(
            `Resized item ${item.i} from ${originalW}x${originalH} to ${item.w}x${item.h} and placed at (${x}, ${y})`
          );
          return;
        }
      }
    }
  }

  // If we still can't fit, place it in the first available cell
  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      if (!occupiedCells[y][x]) {
        placeItem(item, x, y, occupiedCells);
        console.log(
          `Forced to place item ${item.i} as 1x1 at (${x}, ${y}). Original size was ${originalW}x${originalH}`
        );
        return;
      }
    }
  }

  console.log(`WARNING: Could not place item ${item.i} anywhere in the grid!`);
}

function canFitItem(
  item: LayoutItem,
  x: number,
  y: number,
  occupiedCells: boolean[][],
  gridWidth: number,
  gridHeight: number
): boolean {
  if (x + item.w > gridWidth || y + item.h > gridHeight) return false;

  for (let dy = 0; dy < item.h; dy++) {
    for (let dx = 0; dx < item.w; dx++) {
      if (occupiedCells[y + dy][x + dx]) return false;
    }
  }

  return true;
}

function placeItem(item: LayoutItem, x: number, y: number, occupiedCells: boolean[][]): void {
  item.x = x;
  item.y = y;

  for (let dy = 0; dy < item.h; dy++) {
    for (let dx = 0; dx < item.w; dx++) {
      occupiedCells[y + dy][x + dx] = true;
    }
  }
}
