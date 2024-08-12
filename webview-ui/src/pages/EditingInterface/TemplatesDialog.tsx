import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, Body2, makeStyles, tokens,  Dialog,
    DialogSurface,
    DialogBody,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Spinner,
    Text,
    Input } from '@fluentui/react-components';
import VideoGameSettings from '../../data/layout_templates/VideoGameSettings.json'
import Login from '../../data/layout_templates/Login.json'
import Website from '../../data/layout_templates/Website.json'
import FeedbackForm from '../../data/layout_templates/FeedbackForm.json'
import { DesktopRegular, GamesRegular, FormRegular, PersonPasskeyRegular } from '@fluentui/react-icons';
import { v4 as uuidv4 } from 'uuid';
import { Page } from '../../types';

const useStyles = makeStyles({
    cardLink: {
      textDecoration: 'none',
    },
    newProjectButton: {
      color: tokens.colorNeutralForeground1,
    },
    templateContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      paddingTop: '20px',
    },
    card: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '200px',
      height: '100px',
      ":hover": {
        scale: 1.10,
        transition: '0.3s',
        backgroundColor: tokens.colorNeutralBackground1Hover,
      }
    },
    icon: {
      fontSize: '48px',
    },
    name: {
      textAlign: 'center',
    }
  });

const templates = [
    { name: 'Website Homepage', icon: <DesktopRegular/>, data: {id: uuidv4(), name: 'Website', content: Website }},
    { name: 'Login Page', icon: <PersonPasskeyRegular/>, data: {id: uuidv4(), name: 'Login Page', content: Login }},
    { name: 'Video Game Settings', icon: <GamesRegular/>, data: {id: uuidv4(), name: 'Video Game Settings', content: VideoGameSettings }},
    { name: 'Feedback Form', icon: <FormRegular/>, data: {id: uuidv4(), name: 'Feedback Form', content: FeedbackForm }},
  ];

interface TemplatesDialogProps {
    isOpen: boolean;
    onClose: () => void;
    closeStartDialog: () => void;
    mode: string;
    pages: Page[];
    setPages: (pages: Page[]) => void;
}

export const TemplatesDialog: React.FC<TemplatesDialogProps> = ({ isOpen, onClose, closeStartDialog, mode, pages, setPages }) => {

    const navigate = useNavigate();
    const styles = useStyles();

    const handleTemplateClick = (t: any) => {
        if (mode === 'start') {
            setPages([t.data])
        }
        else if (mode === 'add') {
            setPages([...pages, t.data])
        }
        onClose();
        closeStartDialog();
    }
   
    return (
        <Dialog open={isOpen} onOpenChange={(event, data) => onClose()}>
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>Choose a Template</DialogTitle>
                    <DialogContent>
                        <div className={styles.templateContainer}>
                            {templates.map((template) => (
                                <Card appearance='filled' className={styles.card} onClick={() => handleTemplateClick(template)}>
                                    <CardHeader title={template.name} image={template.icon} className={styles.icon} />
                                    <Body2 className={styles.name}>{template.name}</Body2>
                                </Card>

                            ))}
                        </div>
                    </DialogContent>
                </DialogBody>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                </DialogActions>
            </DialogSurface>
        </Dialog>
    )
}