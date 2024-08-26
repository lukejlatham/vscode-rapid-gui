type LayoutItem = {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

export function adjustLayoutToFitGrid(layout: LayoutItem[]): LayoutItem[] {
  const gridSize = 10;
  console.log("Original layout:", JSON.stringify(layout, null, 2));

  // First, adjust items that go past the edges
  for (let item of layout) {
    if (item.x + item.w > gridSize) item.w = gridSize - item.x;
    if (item.y + item.h > gridSize) item.h = gridSize - item.y;
  }

  // Then, resolve overlaps
  for (let i = 0; i < layout.length; i++) {
    for (let j = i + 1; j < layout.length; j++) {
      if (itemsOverlap(layout[i], layout[j])) {
        resolveOverlap(layout[i], layout[j]);
      }
    }
  }

  console.log("Adjusted layout:", JSON.stringify(layout, null, 2));
  return layout;
}

function itemsOverlap(a: LayoutItem, b: LayoutItem): boolean {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function resolveOverlap(a: LayoutItem, b: LayoutItem): void {
  const overlapX = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
  const overlapY = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);

  if (overlapX < overlapY) {
    // Adjust horizontally
    if (a.x < b.x) {
      a.w -= overlapX;
    } else {
      b.w -= overlapX;
    }
  } else {
    // Adjust vertically
    if (a.y < b.y) {
      a.h -= overlapY;
    } else {
      b.h -= overlapY;
    }
  }
}
