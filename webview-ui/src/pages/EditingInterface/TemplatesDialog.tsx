import React from 'react';
import {
  Card, CardHeader, Body2, makeStyles, tokens, Dialog,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@fluentui/react-components';
import VideoGameSettings from '../../data/layout_templates/VideoGameSettings.json'
import Login from '../../data/layout_templates/Login.json'
import Website from '../../data/layout_templates/Website.json'
import FeedbackForm from '../../data/layout_templates/FeedbackForm.json'
import { DesktopRegular, GamesRegular, FormRegular, PersonPasskeyRegular, ArrowLeftFilled } from '@fluentui/react-icons';
import { v4 as uuidv4 } from 'uuid';
import { Page } from '../../types';
import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles({
  templateContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '10px',
    padding: '20px',
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
  { key: 1, name: 'Website Homepage', icon: <DesktopRegular />, data: { id: uuidv4(), name: 'Website', content: Website } as Page, testId: 'website-card' },
  { key: 2, name: 'Login Page', icon: <PersonPasskeyRegular />, data: { id: uuidv4(), name: 'Login Page', content: Login } as Page, testId: 'login-card' },
  { key: 3, name: 'Video Game Settings', icon: <GamesRegular />, data: { id: uuidv4(), name: 'Video Game Settings', content: VideoGameSettings } as Page, testId: 'video-game-card' },
  { key: 4, name: 'Feedback Form', icon: <FormRegular />, data: { id: uuidv4(), name: 'Feedback Form', content: FeedbackForm } as Page, testId: 'feedback-card' },
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
          <DialogTitle data-testid="templatesDialog-title">
            <FormattedMessage id="templatesDialog.title" defaultMessage={"Choose a Template"} />
            </DialogTitle>
          <DialogContent data-testid="templatesDialog-content">
            <div className={styles.templateContainer}>
              {templates.map((template) => (
                <Card key={template.key} appearance='filled' className={styles.card} onClick={() => handleTemplateClick(template)} data-testid={template.testId}>
                  <CardHeader title={template.name} image={template.icon} className={styles.icon} />
                  <Body2 className={styles.name}>{template.name}</Body2>
                </Card>
              ))}
            </div>
          </DialogContent>
        </DialogBody>
        <DialogActions>
          <Button 
            data-testid="cancel-button"
            size="large"
            icon={<ArrowLeftFilled />}
            onClick={onClose}>
            <FormattedMessage id="templatesDialog.cancel" defaultMessage={"Cancel"} />
          </Button>
        </DialogActions>
      </DialogSurface>
    </Dialog>
  )
}