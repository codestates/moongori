import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { useState } from "react";
import logoImg from "./../images/Logo.png";
import menuImg from "./../images/hamberger.png";

const StHeadBoxDiv = styled.div`
  position: sticky;
  border: 1px solid;
  display: flex;
  // phone
  @media all and (max-width: 360px) {
    height: 100%;
    width: auto;
    z-index: 1;
    border: 1px solid;
    justify-content: space-between;
    margin: 0 5% 0 5%;
    img {
      margin-left: 3px;
      width: 20px;
      height: 20px;
    }
    .logoName {
      color: black;
      text-decoration: none;
      font-family: Fredoka One;
    }
    .sidebar {
      margin-top: 5px;
      div {
        text-align: right;
        margin-right: 3px;
        width: 20px;
      }
      img {
        margin: 0 3px 0 0;
        width: 20px;
        height: 15px;
      }
      .header-material {
        width: 33.3%;
        display: flex;
        justify-content: center;
      }
    }
  }
  // web
  @media all and (min-width: 361px) {
    margin: 0 15% 0 15%;
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
  width: 35%;
  position: absolute;
  top: 35%;
  left: 64.5%;
  text-align: right;
  -webkit-padding-start: 0px;
  .menu {
    color: black;
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    font-size: 1rem;
    border-bottom: 1px solid;
    margin: 0 3px 0 3px;
  }
  .menu:hover {
    background: #aae8c5;
  }
  li {
    display: flex;
    justify-content: space-between;
    font-size: 1rem;
    border-bottom: 1px solid;
    margin: 0 3px 0 3px;
    cursor: pointer;
  }
  li:hover {
    background: #aae8c5;
  }
`;

export default function Header() {
  const [menu, isMenu] = useState(false);
  const [login, isLogin] = useState(false);

  const showMenubar = () => {
    isMenu(!menu);
  };

  return (
    <StHeadBoxDiv>
      <Link to={"/"}>
        <img src={logoImg} alt={"logo"} />
      </Link>
      <Link to={"/"} className={"logoName"}>
        <div>moongori</div>
      </Link>
      <div className={"sidebar"}>
        {menu ? (
          <div onClick={showMenubar}>X</div>
        ) : (
          <img src={menuImg} alt={"logo"} onClick={showMenubar} />
        )}
        {menu ? (
          <StMenuBarDiv>
            <Link to="/trade=all" className={"menu"} onClick={showMenubar}>
              중고거래
              <i class="fas fa-arrow-right"></i>
            </Link>
            <Link to="/news=0" className={"menu"} onClick={showMenubar}>
              동네소식
              <i class="fas fa-arrow-right"></i>
            </Link>
            {login ? (
              <Link to={"/mypage"} className={"menu"} onClick={showMenubar}>
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
              <li onClick={showMenubar}>로그아웃</li>
            ) : (
              <li onClick={showMenubar}>
                회원가입
                <i class="fas fa-arrow-right"></i>
              </li>
            )}
          </StMenuBarDiv>
        ) : null}
      </div>
    </StHeadBoxDiv>
  );
}
