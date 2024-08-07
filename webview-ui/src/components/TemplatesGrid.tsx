import React, {useEffect} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Card, CardHeader, Text, Body2, makeStyles, tokens } from '@fluentui/react-components';
import loginImage from '../assets/Login.png'
import VideoGameSettings from '../data/layout_templates/VideoGameSettings.json'
import Login from '../data/layout_templates/Login.json'
import Website from '../data/layout_templates/Website.json'
import FeedbackForm from '../data/layout_templates/FeedbackForm.json'
import { useEditor } from '@craftjs/core';
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
  webAppCard: {
    width: '280px',
    height: '250px',
    color: tokens.colorNeutralForeground2,
    background: tokens.colorNeutralBackground1,
    transition: 'transform 0.2s',
    ':hover': {
      transform: 'scale(1.05)',
      string: 'hover',
    },
  },
  borderBoxed: {
    border: '2px dashed #d6d6d6',
    borderRadius: '1px',
    padding: '80px',
    paddingRight: '50px',
    margin: '5px',
  },
  textContainer: {
    bottom: '4px',
    left: '10px',
    color: '#8F8F8F',
  },
  title: {
    fontSize: '16px',
    color: '#FFFFFF',
    paddingInlineStart: '5px',
  },
  description: {
    fontSize: '14px',
    color: '#8F8F8F',
    paddingInlineStart: '5px',
  },
});

const templates = [
  { name: 'Website', data: {id: uuidv4(), name: 'Website', content: Website }},
  { name: 'Login', data: {id: uuidv4(), name: 'Login Page', content: Login }},
  { name: 'Video Game Settings', data: {id: uuidv4(), name: 'Video Game Settings', content: VideoGameSettings }},
  { name: 'Feedback Form', data: {id: uuidv4(), name: 'Feedback Form', content: FeedbackForm }},
];

const TemplatesGrid: React.FC = () => {
  
  const navigate = useNavigate();
  const location = useLocation();
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
        <Card appearance='filled' 
        // onClick={() => handleTemplateClick(template.data)}
        >
          <div className={styles.borderBoxed}></div>
          {/* <CardHeader image={loginImage} /> */}
          <div className={styles.textContainer}>
            <Body2 className={styles.title}>{template.name}</Body2>
          </div>
        </Card>
        </Link>
      ))}
    </div>
  );
}

export default TemplatesGrid;
