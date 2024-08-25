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
  adjustedLayout.sort((a, b) => a.y - b.y || a.x - b.x);

  const occupiedCells: string[][] = Array(gridHeight)
    .fill(null)
    .map(() => Array(gridWidth).fill(""));

  for (let item of adjustedLayout) {
    placeItemAndResolveConflicts(item, adjustedLayout, occupiedCells, gridWidth, gridHeight);
  }

  logLayoutChanges(adjustedLayout);
  console.log("Final adjusted layout:", JSON.stringify(adjustedLayout, null, 2));

  adjustedLayout.forEach((item) => delete item.original);

  return adjustedLayout;
}

function placeItemAndResolveConflicts(
  item: LayoutItem,
  allItems: LayoutItem[],
  occupiedCells: string[][],
  gridWidth: number,
  gridHeight: number
): void {
  // Ensure the item is within grid boundaries
  item.x = Math.min(item.x, gridWidth - 1);
  item.y = Math.min(item.y, gridHeight - 1);
  item.w = Math.min(item.w, gridWidth - item.x);
  item.h = Math.min(item.h, gridHeight - item.y);

  for (let y = item.y; y < item.y + item.h; y++) {
    for (let x = item.x; x < item.x + item.w; x++) {
      if (occupiedCells[y][x] !== "" && occupiedCells[y][x] !== item.i) {
        const conflictingItem = allItems.find((i) => i.i === occupiedCells[y][x])!;
        resolveConflict(item, conflictingItem, occupiedCells, gridWidth, gridHeight);
      }
    }
  }

  placeItem(item, occupiedCells);
}

function resolveConflict(
  item1: LayoutItem,
  item2: LayoutItem,
  occupiedCells: string[][],
  gridWidth: number,
  gridHeight: number
): void {
  const item1Area = item1.w * item1.h;
  const item2Area = item2.w * item2.h;
  const largerItem = item1Area >= item2Area ? item1 : item2;
  const smallerItem = item1Area >= item2Area ? item2 : item1;

  // Remove the larger item from the grid
  for (let y = largerItem.y; y < largerItem.y + largerItem.h; y++) {
    for (let x = largerItem.x; x < largerItem.x + largerItem.w; x++) {
      if (occupiedCells[y][x] === largerItem.i) {
        occupiedCells[y][x] = "";
      }
    }
  }

  // Resize the larger item
  if (largerItem.w > largerItem.h) {
    largerItem.w = Math.max(1, largerItem.w - 1);
  } else {
    largerItem.h = Math.max(1, largerItem.h - 1);
  }

  // Recursively place the larger item
  placeItemAndResolveConflicts(
    largerItem,
    [smallerItem, largerItem],
    occupiedCells,
    gridWidth,
    gridHeight
  );
}

function placeItem(item: LayoutItem, occupiedCells: string[][]): void {
  for (let y = item.y; y < item.y + item.h; y++) {
    for (let x = item.x; x < item.x + item.w; x++) {
      occupiedCells[y][x] = item.i;
    }
  }
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
