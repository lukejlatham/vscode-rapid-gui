import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, Body2, makeStyles, tokens } from '@fluentui/react-components';
import VideoGameSettings from '../data/layout_templates/VideoGameSettings.json'
import Login from '../data/layout_templates/Login.json'
import Website from '../data/layout_templates/Website.json'
import FeedbackForm from '../data/layout_templates/FeedbackForm.json'
import { DesktopRegular, GamesRegular, FormRegular, PersonPasskeyRegular } from '@fluentui/react-icons';
import { v4 as uuidv4 } from 'uuid';

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

const TemplatesGrid: React.FC = () => {
  const styles = useStyles();

  // useEffect(() => {
  //   // Check if we've just navigated to the editing interface
  //   if (location.pathname === '/editing-interface' && location.state?.templateData) {
  //     // After a short delay, send the loadTree message
  //     const timer = setTimeout(() => {
  //       window.postMessage({ command: 'loadTree', data: location.state.templateData }, '*');
  //     }, 100);

  //     return () => clearTimeout(timer);
  //   }
  // }, [location]);

  // function handleTemplateClick(data: any) {
  //   // Navigate to the editing interface with template data in state
  //   console.log('the template:', data);
  //   navigate('/editing-interface', { state: { templateData: data } });
  // }

  return (
    <div className={styles.templateContainer}>
      {templates.map((template) => (
        <Link to="/editing-interface" state={{id: template.data.id, name: template.data.name, content: template.data.content}}key={template.name} className={styles.cardLink}>
        <Card appearance='filled' className={styles.card}>
          <CardHeader title={template.name} image={template.icon} className={styles.icon} />
            <Body2 className={styles.name}>{template.name}</Body2>
        </Card>
        </Link>
      ))}
    </div>
  );
}

export default TemplatesGrid;
