import { useEditor } from "@craftjs/core";
import { Subtitle1 } from "@fluentui/react-components";

export const PropertyInspector: React.FC = () => {
    const { actions, selected, isEnabled } = useEditor((state, query) => {
        const currentNodeId = query.getEvent("selected").last();
    
        let selected;
    
        if (currentNodeId) {
          selected = {
            id: currentNodeId,
            name: state.nodes[currentNodeId].data.name,
            settings:
              state.nodes[currentNodeId].related &&
              state.nodes[currentNodeId].related.settings,
            isDeletable: query.node(currentNodeId).isDeletable(),
          };
        }
    
        return {
          selected,
          isEnabled: state.options.enabled,
        };
      });

    return (
        selected ? (
        <div style={{padding: '10px', border: '1px solid #FFFFFF', borderRadius: '10px'}}>
            <Subtitle1>Property Inspector</Subtitle1>
        </div>
        ) : null
    );
}

export default PropertyInspector;
