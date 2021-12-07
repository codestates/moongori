import React from "react";
import styled from "styled-components";
import unknown from "../images/unknown.png";
const NotFoundBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media all and (max-width: 768px) {
  }
  .NotFoundImg-wrap {
    width: 60%;
    height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    @media all and (max-width: 768px) {
      height: 300px;
    }
    .NotFoundImg {
      width: 60%;
      height: 100%;
    }
  }
`;

export default function NewsPostWrite() {
  return (
    <>
      <NotFoundBox>
        <div className={"NotFounfImg-wrap"}>
          <img src={unknown} className={"NotFoundImg"} alt={"404페이지"}></img>
        </div>
      </NotFoundBox>
    </>
  );
}
