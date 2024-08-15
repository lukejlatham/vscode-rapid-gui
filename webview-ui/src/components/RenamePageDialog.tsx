import * as React from "react";
import {
    Dialog,
    DialogTrigger,
    DialogSurface,
    DialogTitle,
    DialogContent,
    DialogBody,
    DialogActions,
    Button,
    Input,
    Label,
    makeStyles,
} from "@fluentui/react-components";
import { DocumentEditRegular } from "@fluentui/react-icons";
import { FormattedMessage } from "react-intl";
import { Form } from "react-router-dom";

const useStyles = makeStyles({
    content: {
        display: "flex",
        flexDirection: "column",
        rowGap: "10px",
    },
});

interface RenamePageDialogProps {
    currentPageName: string;
    onRename: (newName: string) => void;
    onUpdate: () => void;
}

export const RenamePageDialog: React.FC<RenamePageDialogProps> = ({ currentPageName, onRename, onUpdate }) => {
    const styles = useStyles();
    const [newName, setNewName] = React.useState<string>(currentPageName);
    const [isOpen, setIsOpen] = React.useState<boolean>(false); // Add open state

    const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        onRename(newName);
        // Reset the name after renaming
        setNewName(currentPageName);
        onUpdate();
        setIsOpen(false); // Close the dialog after renaming
    };

    return (
        <>
            <Dialog open={isOpen}>
                <DialogTrigger disableButtonEnhancement>
                    <Button icon={<DocumentEditRegular />} size="medium" onClick={() => setIsOpen(true)}>
                        <FormattedMessage id="pages.rename" defaultMessage="Rename" />
                    </Button>
                </DialogTrigger>
                <DialogSurface aria-describedby={undefined}>
                    <form onSubmit={handleSubmit}>
                        <DialogBody>
                            <DialogTitle></DialogTitle>
                            <DialogContent className={styles.content}>
                                <Label required htmlFor={"name-input"}>
                                    <FormattedMessage id="renameDialog.title" defaultMessage="Rename Page" />:
                                </Label>
                                <Input
                                    required
                                    id={"name-input"}
                                    defaultValue={currentPageName}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewName(e.target.value)}
                                />
                            </DialogContent>
                            <DialogActions>
                                <DialogTrigger disableButtonEnhancement>
                                    <Button appearance="secondary" onClick={() => setIsOpen(false)}>
                                        <FormattedMessage id="renameDialog.cancel" defaultMessage="Cancel" />
                                    </Button>
                                </DialogTrigger>
                                <Button type="submit" appearance="primary">
                                    <FormattedMessage id="renameDialog.rename" defaultMessage="Rename" />
                                </Button>
                            </DialogActions>
                        </DialogBody>
                    </form>
                </DialogSurface>
            </Dialog>
        </>
    );
};