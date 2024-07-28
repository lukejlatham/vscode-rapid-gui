import React, { useEffect } from 'react';
import { useNode, UserComponent, Element } from "@craftjs/core";
import { GridCellContents } from "./GridCellContents";

interface ContainerProps {
}

export const GridCell: UserComponent<ContainerProps> = () => {

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Element id="GridCellContents" is={GridCellContents} canvas >
        {/* Pass data-grid properties if necessary */}
      </Element>

    </div>
  );
};

GridCell.craft = {
  displayName: "GridCell",
};

export default GridCell;
