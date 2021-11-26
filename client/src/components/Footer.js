import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import logoWhite from "./../images/흰색 로고.png";

const FooterBox = styled.div`
  position: absolute;
  bottom: 0px;
  border: 1px solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 15%;
  width: 90%;
  // phone
  @media all and (max-width: 360px) {
    border: 1px solid;
    margin: 0 5% 0 5%;
  }
  .LogoName {
    margin-top: 3px;
    color: black;
    text-decoration: none;
    font-family: Fredoka One;
  }
  img {
    margin-top: 5px;
    margin-bottom: 5px;
    margin-right: 3px;
    width: 20px;
    height: 20px;
  }
  .footer-master {
    width: 80%;
  }
  .footer-material {
    border-bottom: 1px solid gray;
    flex-direction: row;
    display: flex;
    justify-content: center;
    text-align: center;
  }
  .Footer-content {
    height: 60%;
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
  .About-title {
    font-size: 9px;
    font-weight: bold;
    margin-bottom: 2px;
  }
  .About-content {
    font-size: 7px;
    color: gray;
    font-weight: normal;
  }
  .Contact-title {
    margin-top: 5px;
    font-size: 9px;
    font-weight: bold;
    margin-bottom: 2px;
  }
  .Contact-content {
    color: gray;
    font-size: 7px;
    font-weight: normal;
  }
  .Copyright {
    height: 5%;
    color: gray;
    font-size: 5px;
    font-weight: normal;
  }
  // web
  @media all and (min-width: 361px) {
    bottom: 0px;
    height: 10%;
  }
`;

export default function Footer() {
  return (
    <FooterBox>
      <div className={"footer-master"}>
        <div className={"footer-material"}>
          <img src={logoWhite}></img>
          <div className={"LogoName"}>moongori</div>
        </div>
      </div>
      <div className={"Footer-content"}>
        <div className={"About-us"}>
          <div className={"About-title"}>
            About us
            <div className={"About-content"}>Moongori Wiki</div>
            <div className={"About-content"}>Repository</div>
          </div>
        </div>
        <div className={"Contact-us"}>
          <div className={"Contact-title"}>
            Contact us
            <div className={"Contact-content"}></div>
            <div className={"Contact-content"}>사범기 김정훈 이성민 이승준</div>
          </div>
        </div>
      </div>
      <div className={"Copyright"}>
        <div>Copyright The Moon project Team</div>
      </div>
    </FooterBox>
  );
}
