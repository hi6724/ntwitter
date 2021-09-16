import React from "react";

export const ImgInput = ({ setIsCrop, setAttachment }) => {
  const onFileChange = (event) => {
    setIsCrop(true);
    setAttachment(null);
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    //용량 체크
    const maxSize = 2 * 1024 * 1024;
    if (theFile.size > maxSize) {
      alert("첨부파일 사이즈는 2MB 이내로 등록 가능합니다.");
      setAttachment(null);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
    event.target.value = "";
  };

  return (
    <input
      id="file-upload"
      onChange={onFileChange}
      type="file"
      accept="image/*"
    />
  );
};
