import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import logoWhite from "./../images/흰색 로고.png";

const FooterBox = styled.div`
  background-color: #777777;
  color: #ffffff;
  position: absolute;
  bottom: 0px;
  border: 1px solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 15%;

  // phone
  @media all and (max-width: 767px) {
    border: 1px solid;
    margin: 0 5% 0 5%;
    width: 90%;
  }
  .LogoName {
    margin-top: 3px;
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
    width: 100%;
    height: 25%;
    display: flex;
    justify-content: center;
  }
  .footer-material {
    width: 40%;
    border-bottom: 1px solid #8f8f8f;
    flex-direction: row;
    display: flex;
    justify-content: center;
    align-items: center;
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
  .About-wrap {
    color: #ffffff;
    font-size: 9px;
    font-weight: bold;
    margin-bottom: 2px;
  }
  .About-content {
    font-size: 7px;
    font-weight: normal;
  }
  .Contact-title {
    margin-top: 5px;
    font-size: 9px;
    font-weight: bold;
    margin-bottom: 2px;
  }
  .Contact-content {
    font-size: 7px;
    font-weight: normal;
  }
  .Copyright {
    margin-bottom: 10px;
    width: 100%;
    height: 15%;
    font-size: 5px;
    font-weight: normal;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .footer-wrap {
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  // web
  @media all and (min-width: 768px) {
    bottom: 0px;
    height: 20%;
    margin: 0 15% 0 15%;
    width: 70%;
  }
  .footer-master {
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
  }
  .footer-material {
    width: 60%;
    border-bottom: 1px solid #8f8f8f;
    flex-direction: row;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .Footer-content {
    width: 100%;
    height: 60%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
  }
  .About-wrap {
    margin-top: 20px;
    width: 50%;
    font-size: 9px;
    font-weight: bold;
    margin-bottom: 2px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    text-align: start;
  }

  .content-wrap {
    width: 60%;
    display: flex;
    flex-direction: row;
  }

  .About-us {
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .About-content {
    margin-top: 10px;
  }
  .Contact-us {
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .Contact-wrap {
    text-align: start;
    margin-top: 20px;
    width: 60%;
    font-size: 9px;
    font-weight: bold;
    margin-bottom: 2px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    text-align: start;
  }
  .Contact-content {
    margin-top: 10px;
  }
`;

export default function Footer() {
  return (
    <FooterBox>
      <div className={"footer-wrap"}>
        <div className={"footer-master"}>
          <div className={"footer-material"}>
            <img src={logoWhite}></img>
            <div className={"LogoName"}>moongori</div>
          </div>
        </div>
        <div className={"Footer-content"}>
          <div className={"content-wrap"}>
            <div className={"About-us"}>
              <div className={"About-wrap"}>
                <div className={"About-title"}>About us</div>
                <div className={"About-content"}>
                  <div>Moongori Wiki</div>
                  <div>Repository</div>
                </div>
              </div>
            </div>
            <div className={"Contact-us"}>
              <div className={"Contact-wrap"}>
                <div className={"Contact-comment"}>Contact us</div>
                <div className={"Contact-content"}>
                  사범기 김정훈 이성민 이승준
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={"Copyright"}>
          <div>Copyright The Moon project Team</div>
        </div>
      </div>
    </FooterBox>
  );
}
