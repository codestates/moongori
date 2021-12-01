import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import mainImg1 from "./../images/mainImg1.png";
import mainImg2 from "./../images/mainImg2.png";
import exampleImg1 from "./../images/example1.png";
import exampleImg2 from "./../images/example2.png";
import dongne from "./../images/dongne.png";
import trade from "./../images/trade.png";
import queryString from "query-string";
import kakaoImg from "../images/kakao_login_medium_narrow.png";
import googleImg from "../images/btn_google_signin_light_normal_web.png";
import axios from "axios";
axios.defaults.withCredentials = true;

const StBodyDiv = styled.div`
  width: 100%;
  padding-bottom: 200px;
  .main {
    height: 570px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .banner {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px 0 0 0;
      .banner-intro {
        height: 180px;
      }
      .logo-title {
        text-align: center;
        font-size: 3em;
        margin: 5px 0 5px 0;
      }
    }
    img {
      width: 272px;
      height: 295px;
    }
    .selectIcon {
      display: flex;
      justify-content: space-between;
      width: 30px;
      padding: 10px 0 40px 0;
      svg {
        color: #c4c4c4;
      }
      .selected {
        color: #aae8c5;
      }
    }
    div {
      white-space: pre-line;
    }
    .main-intro {
      margin-top: 20px;
    }
    .main-intro-title {
      text-align: center;
      font-weight: bold;
      font-size: 25px;
      margin-bottom: 20px;
    }
    .main-intro-contents {
      font-size: 14px;
      text-align: center;
      margin-top: 5px;
    }
    .main-intro-subtitle {
      text-align: center;
      font-weight: bold;
      font-size: 20px;
      margin-bottom: 3px;
    }
    .main-intro-subcontents {
      font-size: 15px;
      text-align: center;
    }
    .example {
      position: relative;
      width: 100%;
      height: 100%;
      background-color: #f5f5f5;
      display: flex;
      justify-content: center;
      flex-direction: column;
      .example-contents {
        position: absolute;
        z-index: 2;
        top: 7%;
        left: 30%;
        display: flex;
        align-items: center;
        flex-direction: column;
        margin: 40px 0 40px 0;
      }
    }
  }
  .button {
    margin-top: 10px;
    width: 100px;
    height: 32px;
    background: #ffffff;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .button-name {
    font-weight: bold;
    font-size: 11px;
    color: #474747;
  }
  .question-contents {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .question-img {
    margin-bottom: 20px;
  }
  @media all and (min-width: 769px) {
    .main {
      height: 500px;
      img {
        width: 410px;
        height: 380px;
      }
      .banner {
        flex-direction: row-reverse;
      }
      .example {
        .example-contents {
          top: 4%;
          left: 19%;
          flex-direction: row;
          justify-content: center;
        }
        .second {
          flex-direction: row-reverse;
        }
      }
      .main-intro-title {
        padding-left: 20px;
        padding-right: 20px;
      }
    }
    .welcome {
      margin-left: 22px;
      color: gray;
    }
  }
`;

const StBackgroundTextDiv = styled.div`
  @media all and (max-width: 768px) {
    display: none;
  }
  @media all and (min-width: 769px) {
    position: relative;
    z-index: 1;
    font-size: 10em;
    opacity: 0.1;
    margin-top: -250px;
    margin-left: ${(props) => (props.second ? "1000px" : null)};
  }
`;

const StQuestionDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${(props) => {
    return props.color || "#aae8c5";
  }};
  @media all and (min-width: 769px) {
    flex-direction: row;
    justify-content: center;
  }
`;

export default function Main() {
  const [select, isSelect] = useState(true);

  const changeImg = () => {
    isSelect(!select);
  };

  useEffect(() => {
    const switchIndex = setTimeout(() => {
      if (select) isSelect(false);
      else isSelect(true);
    }, 4000);

    return () => clearTimeout(switchIndex);
  }, [select]);

  const [position, setPosition] = useState(0);

  function onScroll() {
    setPosition(window.scrollY);
    console.log(window.scrollY);
  }
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // const handlekakaoLoginBtn = async () => {
  //   await window.location.assign("http://localhost:80/user/kakao");
  // };
  // const handlegoogleLoginBtn = async () => {
  //   await window.location.assign("http://localhost:80/user/google");
  // };

  // useEffect(() => {
  //   const query = queryString.parse(window.location.search);
  //   if (query.access_token) {
  //     axios.get("http://localhost:80/user/info").then((res) => {
  //       console.log(res.data.data);
  //     });
  //   }
  // }, [window.location]);

  return (
    <StBodyDiv>
      <div className={"main"}>
        {/* <div
        onClick={() => {
          handlekakaoLoginBtn();
        }}
      >
        <img src={kakaoImg} />
      </div> */}

        {/* <div
        onClick={() => {
          handlegoogleLoginBtn();
        }}
      >
        <img src={googleImg} />
      </div> */}

        {/* <img
        src={`http://`}
      /> */}

        {/* <img
        src={`http://k.kakaocdn.net/dn/ec5JId/btqBDYf4uEv/4n4rER4879ROYlsfVit82K/img_640x640.jpg`}
      /> */}
        <div className={"banner"} onDragStart={changeImg}>
          {select ? (
            <img src={mainImg1} alt={"소개글1-1 이미지"} />
          ) : (
            <img src={mainImg2} alt={"소개글1-2 이미지"} />
          )}
          {select ? (
            <div className={"banner-intro"}>
              <div className={"welcome"}>Welcome</div>
              <div className={"main-intro-title"}>
                사람과 사람을 이어주는 우리동네 플래폼
              </div>
              <div className={"logo-title"}>문 고 리</div>
              <div className={"main-intro-subcontents"}>
                지금 바로 문고리를 잡아보세요.
              </div>
            </div>
          ) : (
            <div className={"banner-intro"}>
              <div className={"main-intro-title"}>
                우리들의 문고리를 소개합니다.
              </div>
              <div className={"main-intro-subtitle"}>가격제시 거래</div>
              <div className={"main-intro-subcontents"}>
                기존의 피로했던 중고거래 방식을 벗어난 거래
              </div>
              <div className={"main-intro-subtitle"}>동네소식</div>
              <div className={"main-intro-subcontents"}>
                우리동네의 다양한 소식을 공유
              </div>
            </div>
          )}
        </div>
        <div className={"selectIcon"}>
          {select ? (
            <FontAwesomeIcon
              className={"selected"}
              icon={faCircle}
              size={"xs"}
            />
          ) : (
            <FontAwesomeIcon icon={faCircle} size={"xs"} onClick={changeImg} />
          )}
          {select ? (
            <FontAwesomeIcon icon={faCircle} size={"xs"} onClick={changeImg} />
          ) : (
            <FontAwesomeIcon
              className={"selected"}
              icon={faCircle}
              size={"xs"}
            />
          )}
        </div>
      </div>
      <div className={"main"}>
        <div className={"example"}>
          <StBackgroundTextDiv
            style={{ transform: `translateX(${position}px)` }}
          >
            Suggestion
          </StBackgroundTextDiv>
          <div className={"example-contents"}>
            <img src={exampleImg1} alt={"움짤예시1 이미지"} />
            <div className={"main-intro"}>
              <div className={"main-intro-title"}>
                판매자가 구매자를 선택하세요
              </div>
              <div
                className={"main-intro-contents"}
              >{`복잡하고 피로했던 기존 중고 거래방식에서 벗어나\n가격 제시를 통해 선택된 구매자와 거래할 수 있는\n프라이빗한 공간을 만들어드립니다`}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={"main"}>
        <StQuestionDiv>
          <div className={"question-contents"}>
            <div className={"main-intro-title"}>
              {`가격 제시 시스템이\n궁금하신가요?`}
            </div>
            <Link to={"/trade=all"} className="button">
              <p className={"button-name"}>둘러보기</p>
            </Link>
          </div>
          <div className={"question-img"}>
            <img src={trade} alt={"이미지"} />
          </div>
        </StQuestionDiv>
      </div>
      <div className={"main"}>
        <div className={"example"}>
          <StBackgroundTextDiv
            second
            style={{ transform: `translateX(${-position}px)` }}
          >
            Community
          </StBackgroundTextDiv>
          <div className={"example-contents second"}>
            <img src={exampleImg2} alt={"움짤예시1 이미지"} />
            <div className={"main-intro"}>
              <div className={"main-intro-title"}>
                이웃들과 동네소식을 나눠봐요
              </div>
              <div
                className={"main-intro-contents"}
              >{`우리동네의 핫한 소식은 무엇일까요?\n궁금했지만 알 방법이 없었던\n소식을 자유롭게 나눠보아요`}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={"main"}>
        <StQuestionDiv color="#AAE8E1">
          <div className={"question-contents"}>
            <div className={"main-intro-title"}>
              {`우리 동네에서 이웃들과\n무엇을 공유할까요?`}
            </div>
            <Link to={"/news=0"} className="button">
              <p className={"button-name"}>둘러보기</p>
            </Link>
          </div>
          <div className={"question-img"}>
            <img src={dongne} alt={"동네 소식 이미지"} />
          </div>
        </StQuestionDiv>
      </div>
    </StBodyDiv>
  );
}
