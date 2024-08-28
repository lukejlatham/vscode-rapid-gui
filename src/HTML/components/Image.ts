import * as fs from "fs";
import * as path from "path";
import { Node } from "../JSONParser";

export function generateImageHtml(node: Node, projectPath?: string): string {
  const props = node.props;
  const imagePath = getImagePath(props.src, node, projectPath);

  return `
<div id="${node.custom.id}" class="image-container ${node.custom.id}">
  <img src="${imagePath}" alt="${props.alt}" class="image ${node.custom.id}" />
</div>
`;
}

export function generateImageCss(node: Node): string {
  const props = node.props;
  return `
.image-container.${node.custom.id} {
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props.width}%;
}

.image.${node.custom.id} {
  width: 100%;
  height: auto;
  max-width: 100%;
}
`;
}

function getImagePath(src: string, node: Node, projectPath?: string): string {
  if (!projectPath) {
    return src;
  }

  const imagesFolder = path.join(projectPath, "images");

  if (!fs.existsSync(imagesFolder)) {
    fs.mkdirSync(imagesFolder, { recursive: true });
  }

  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  } else {
    const fileName = path.basename(src);
    return `images/${fileName}`;
  }
}
