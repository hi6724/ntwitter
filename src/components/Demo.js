import React, { useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Button11, StyledNweet, EditButtons } from "style/NweetStyle";

export const Demo = ({ attachment, setAttachment, setIsCrop }) => {
  const [image, setImage] = useState(attachment);
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setAttachment(cropper.getCroppedCanvas().toDataURL());
      setIsCrop(false);
    }
  };

  return (
    <>
      <StyledNweet>
        <div>
          <Cropper
            style={{ height: 400, width: "100%", zIndex: 1 }}
            zoomTo={0.1}
            initialAspectRatio={1}
            preview=".img-preview"
            src={image}
            viewMode={1}
            dragMode={"move"}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            cropBoxResizable={false}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
            onInitialized={(instance) => {
              setCropper(instance);
            }}
            guides={true}
          />
          <EditButtons>
            <Button11 onClick={getCropData}>Crop Image</Button11>
          </EditButtons>
        </div>
      </StyledNweet>
    </>
  );
};

export default Demo;
