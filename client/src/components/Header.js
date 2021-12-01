import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import logoImg from "./../images/Logo.png";

const StHeadBoxDiv = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: sticky;
  top: 0px;
  .wrap {
    display: flex;
    width: 70%;
  }
  img {
    height: 40px;
    width: 40px;
    margin-top: 8px;
    margin-bottom: 5px;
  }
  .logoName {
    margin: 10px 10px 0 10px;
    text-align: center;
    color: black;
    text-decoration: none;
    font-size: 1.6em;
    font-family: Fredoka One;
  }
  @media all and (max-width: 768px) {
    height: 100%;
    width: auto;
    z-index: 1;
    .wrap {
      position: relative;
      justify-content: space-between;
    }
    .nav {
      display: none;
    }
    .sidebar {
      .icon {
        margin-top: 15px;
        text-align: right;
        margin-right: 10px;
        width: 38px;
      }
    }
  }
  @media all and (min-width: 769px) {
    .nav {
      display: flex;
      justify-content: space-between;
      width: 100%;
      .navMenu {
        display: flex;
        a,
        div {
          color: black;
          text-decoration: none;
          padding: 20px 10px 0 10px;
          font-size: 1em;
          cursor: pointer;
        }
      }
    }
    .sidebar {
      display: none;
    }
  }
`;

// 햄버거 메뉴 모달
const StMenuBarDiv = styled.ul`
  z-index: 2;
  background: #f2f2f2;
  list-style: none;
  border: 1px solid;
  width: 30%;
  position: absolute;
  top: 75%;
  left: 69.8%;
  text-align: right;
  -webkit-padding-start: 0px;
  a,
  li {
    color: black;
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9em;
    border-bottom: 1px solid;
    padding: 5px 3px 5px 3px;
  }
  a:hover,
  li:hover {
    background: #aae8c5;
  }
  .lastli {
    border: none;
  }
  @media all and (max-width: 557px) {
    a,
    li {
      justify-content: center;
      i {
        display: none;
      }
    }
  }
`;

export default function Header() {
  const [menu, isMenu] = useState(false);
  const [login, isLogin] = useState(true);

  const showMenubar = () => {
    isMenu(!menu);
  };

  return (
    <StHeadBoxDiv>
      <div className="wrap">
        <Link to={"/"}>
          <img src={logoImg} alt={"logo"} />
        </Link>
        <Link to={"/"} className={"logoName"}>
          <div>moongori</div>
        </Link>
        <div className={"nav"}>
          <div className={"navMenu"}>
            <Link to="/trade=all">중고거래</Link>
            <Link to="/news=0">동네소식</Link>
          </div>
          <div className={"navMenu"}>
            {login ? <Link to={"/mypage"}>마이페이지</Link> : <div>로그인</div>}
            {login ? <div>로그아웃</div> : <div>회원가입</div>}
          </div>
        </div>
        <div className={"sidebar"}>
          {menu ? (
            <FontAwesomeIcon
              className="icon"
              icon={faTimes}
              size={"2x"}
              onClick={showMenubar}
            />
          ) : (
            <FontAwesomeIcon
              className="icon"
              icon={faBars}
              size={"2x"}
              onClick={showMenubar}
            />
          )}
          {menu ? (
            <StMenuBarDiv>
              <Link to="/trade=all" onClick={showMenubar}>
                중고거래
                <i class="fas fa-arrow-right"></i>
              </Link>
              <Link to="/news=0" onClick={showMenubar}>
                동네소식
                <i class="fas fa-arrow-right"></i>
              </Link>
              {login ? (
                <Link to={"/mypage"} onClick={showMenubar}>
                  마이페이지
                  <i class="fas fa-arrow-right"></i>
                </Link>
              ) : (
                <li onClick={showMenubar}>
                  로그인
                  <i class="fas fa-arrow-right"></i>
                </li>
              )}
              {login ? (
                <li className={"lastli"} onClick={showMenubar}>
                  로그아웃
                  <i class="fas fa-arrow-right"></i>
                </li>
              ) : (
                <li className={"lastli"} onClick={showMenubar}>
                  회원가입
                  <i class="fas fa-arrow-right"></i>
                </li>
              )}
            </StMenuBarDiv>
          ) : null}
        </div>
      </div>
    </StHeadBoxDiv>
  );
}
