import { useNode, UserComponent, Element } from "@craftjs/core";
import { useEffect } from "react";
import { GridCellContents } from "./GridCellContents";

interface ContainerProps {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export const GridCell: UserComponent<ContainerProps> = ({ id, x, y, w, h }) => {
  const { actions: { setProp }, } = useNode();

  useEffect(() => {
    setProp((props: ContainerProps) => {
      props.x = x;
      props.y = y;
      props.w = w;
      props.h = h;
    });
  }, [x, y, w, h, setProp]);

  return (
    <Element id={id} is={GridCellContents} canvas >
      {/* Your component content here */}
    </Element>
      );
};

GridCell.craft = {
  displayName: "GridCell",
  props: {
    x: 0,
    y: 0,
    w: 1,
    h: 1,
  },
  isCanvas: true,
};
