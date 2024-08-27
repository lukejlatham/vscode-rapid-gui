import React from "react";
import { Title1, Body2, makeStyles } from "@fluentui/react-components";

import { StartProjectDialog } from "../EditingInterface/StartProjectDialog";
import TemplatesGrid from "./TemplatesGrid";
import ImageUploadButton from "../../Features/uploadImage/ImageUploadButton";

const useStyles = makeStyles({
  projectsContainer: {
    paddingTop: "40px",
    minWidth: "100px",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
});

const Home: React.FC = () => {
  const styles = useStyles();
  return (
    <>
      <Title1 color="e8ebfa">Welcome to UI Studio</Title1>
      <div style={{ paddingTop: "15px" }}>
        <ImageUploadButton />
        {/* <StartProjectDialog /> */}
      </div>
      <div style={{ paddingTop: "30px" }}>
        <Body2>Project Templates</Body2>
        <TemplatesGrid />
      </div>
    </>
  );
};

export default Home;
