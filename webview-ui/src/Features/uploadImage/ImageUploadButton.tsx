import React, { useState } from "react";
import { Button } from "@fluentui/react-components";
import { Camera24Filled, Camera24Regular, bundleIcon } from "@fluentui/react-icons";
import { ImageUploadDialog } from "../generateLayout/sketchUpload/ImageUploadDialog";

const CameraIcon = bundleIcon(Camera24Filled, Camera24Regular);

const ImageUploadButton: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleButtonClick() {
    setIsDialogOpen(true);
  }

  return (
    <>
      <Button size="large" onClick={handleButtonClick} appearance="primary" icon={<CameraIcon />}>
        Upload Sketch
      </Button>
      {/* <ImageUploadDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} /> */}
    </>
  );
};

export default ImageUploadButton;
