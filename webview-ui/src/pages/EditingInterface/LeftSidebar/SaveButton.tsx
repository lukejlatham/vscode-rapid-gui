import { Button } from "@fluentui/react-components";
import { DocumentSave24Regular } from '@fluentui/react-icons';
import { useEditor } from "@craftjs/core";
import { vscode } from '../../../utilities/vscode';

const SaveButton: React.FC<{classes: any}> = ({classes}) => {
    const { query } = useEditor();

    const handleSave = () => {
        const serializedData = query.serialize();
        vscode.postMessage({
            command: 'saveFile',
            content: serializedData,
        });
    };

    return (
        <>
            <Button className={classes.button} icon={<DocumentSave24Regular />} appearance='outline' onClick={handleSave}>Save</Button>
        </>
    );
};

export default SaveButton;
