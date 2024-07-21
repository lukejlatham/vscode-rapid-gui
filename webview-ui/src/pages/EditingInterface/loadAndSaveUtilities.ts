import { useEditor } from "@craftjs/core";

export const useLoadAndSaveUtilities = () => {
  const { query, actions } = useEditor();

  const deserializeNodes = (serializedNodes: string) => {
    actions.deserialize(serializedNodes);
  };

  const serializeNodes = () => {
    return query.serialize();
  };

  return {
    deserializeNodes,
    serializeNodes,
  };
};
