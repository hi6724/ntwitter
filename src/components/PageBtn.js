import React from "react";
import { ButtonContainer, ControlButton } from "style/HomeStyle";

export const PageBtn = ({ nweets, setPage }) => {
  const handleClick = (e) => {
    window.scrollTo(0, 0);
    const {
      target: { id },
    } = e;
    if (id == "prev") {
      setPage((prev) => {
        if (prev <= 1) {
          return 1;
        } else {
          return (prev -= 1);
        }
      });
    } else {
      setPage((prev) => {
        if (nweets.length < 5) {
          return prev;
        } else {
          return (prev += 1);
        }
      });
    }
  };
  return (
    <ButtonContainer>
      <ControlButton id="prev" onClick={handleClick}>
        ◀
      </ControlButton>
      <ControlButton id="next" onClick={handleClick}>
        ▶
      </ControlButton>
    </ButtonContainer>
  );
};
