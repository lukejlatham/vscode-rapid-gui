import React from 'react';
import { makeStyles } from "@fluentui/react-components";
import { ThemeDropdown } from './ThemeDropdown'; // Adjust the import path as necessary
import { FontDropdown } from './FontDropdown'; // Adjust the import path as necessary

const useStyles = makeStyles({
  container: {
    width: '100%'
  },
  marginDiv: {
    marginBottom: '10px',
    marginTop: '10px',
  },
  gapDiv: {
    height: '20px', // Adjust the height to control the gap size
  },
});

export const ThemingDropdowns: React.FC = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.marginDiv} />
      <ThemeDropdown />

      <div className={styles.gapDiv} />

      <FontDropdown />
      <div className={styles.marginDiv} />
    </div>
  );
};

export default ThemingDropdowns;
