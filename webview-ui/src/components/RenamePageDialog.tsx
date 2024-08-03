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
}

export const RenamePageDialog: React.FC<RenamePageDialogProps> = ({ currentPageName, onRename }) => {
    const styles = useStyles();
    const [newName, setNewName] = React.useState<string>(currentPageName);
    const [isOpen, setIsOpen] = React.useState<boolean>(false); // Add open state

    const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        onRename(newName);
        // Reset the name after renaming
        setNewName(currentPageName);
        setIsOpen(false); // Close the dialog after renaming
    };

    return (
        <>
            <Dialog open={isOpen}>
                <DialogTrigger disableButtonEnhancement>
                    <Button icon={<DocumentEditRegular />} size="large" onClick={() => setIsOpen(true)}>Rename</Button>
                </DialogTrigger>
                <DialogSurface aria-describedby={undefined}>
                    <form onSubmit={handleSubmit}>
                        <DialogBody>
                            <DialogTitle></DialogTitle>
                            <DialogContent className={styles.content}>
                                <Label required htmlFor={"name-input"}>
                                    Rename Page
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
                                    <Button appearance="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
                                </DialogTrigger>
                                <Button type="submit" appearance="primary">
                                    Rename
                                </Button>
                            </DialogActions>
                        </DialogBody>
                    </form>
                </DialogSurface>
            </Dialog>
        </>
    );
};