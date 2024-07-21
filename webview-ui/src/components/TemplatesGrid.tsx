import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, Text, Body2, makeStyles, tokens } from '@fluentui/react-components';

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
    padding: '90px',
    paddingRight: '50px',
    margin: '5px',
    },
  mobileCard: {
    width: '170px',
    height: '250px',
    color: tokens.colorNeutralForeground2,
    background: tokens.colorNeutralBackground1,
    transition: 'transform 0.2s',
    ':hover': {
      transform: 'scale(1.05)',
    string: 'hover',
    },
  },
  squareCard: {
    width: '250px',
    height: '250px',
    color: tokens.colorNeutralForeground2,
    background: tokens.colorNeutralBackground1,
    transition: 'transform 0.2s',
    ':hover': {
      transform: 'scale(1.05)',
    string: 'hover',
    },
  },
  landscapeCard: {
    width: '300px',
    height: '250px',
    color: tokens.colorNeutralForeground2,
    background: tokens.colorNeutralBackground1,
    transition: 'transform 0.2s',
    ':hover': {
      transform: 'scale(1.05)',
    string: 'hover',
    },
  },
  textContainer: {
    bottom: '4px',
    left: '10px',
    color: '#8F8F8F',
    position: 'absolute',
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
  { name: 'Web App', size: '1920 x 1080 px', className: 'webAppCard' },
  { name: 'Mobile', size: '1080 x 1920 px', className: 'mobileCard' },
  { name: 'Square', size: '1080 x 1080 px', className: 'squareCard' },
  { name: 'Landscape', size: '1920 x 1080 px', className: 'landscapeCard' },
];

const TemplatesGrid: React.FC = () => {
  const styles = useStyles();
  return (
    <div className={styles.templateContainer}>
      {templates.map((template) => (
        <Link to="/templates" key={template.name} className={styles.cardLink}>
          <Card className={`${styles[template.className as keyof typeof styles]}`} appearance='filled'>
          <div className={styles.borderBoxed}></div>
            <div className={styles.textContainer}>
              <Body2 className={styles.title}>{template.name}</Body2>
              <div>
              <Text className={styles.description}>{template.size}</Text>
              </div>
            </div>
          </Card>
        </Link>
        ))}
    </div>
    );
}

export default TemplatesGrid;
