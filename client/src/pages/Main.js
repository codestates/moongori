import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import mainImg1 from "./../images/mainImg1.png";
import mainImg2 from "./../images/mainImg2.png";
import exampleImg1 from "./../images/example1.png";
import exampleImg2 from "./../images/example2.png";
import dongne from "./../images/dongne.png";
import trade from "./../images/trade.png";
import axios from "axios";

axios.defaults.withCredentials = true;

const StBodyDiv = styled.div`
  font-family: S-CoreDream-6Bold;
  width: 100%;
  overflow: hidden;
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
        @media all and (max-width: 768px) {
          margin-bottom: 20px;
        }
        .welcome {
          margin-left: 5px;
          color: gray;
          @media all and (max-width: 768px) {
            margin-left: 6px;
            color: gray;
          }
        }
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
      @media all and (min-width: 769px) {
        display: flex;
        flex-direction: column;
      }
    }
    .main-intro-title-banner {
      font-size: 35px;
      text-align: center;
      @media all and (max-width: 831px) {
        font-size: 28px;
        text-align: center;
      }
    }
    .main-intro-title {
      font-weight: bold;
      font-size: 25px;
      margin-bottom: 20px;
      @media all and (max-width: 768px) {
        text-align: center;
      }
    }
    .main-intro-contents {
      color: gray;
      font-size: 16px;
      text-align: start;
      margin-top: 5px;
      @media all and (max-width: 831px) {
        width: 100%;
        font-size: 15px;
        text-align: center;
      }
    }
    .main-intro-wrap {
      margin-bottom: 10px;
    }
    .main-intro-subtitle {
      margin-top: 30px;
      text-align: center;
      font-weight: bold;
      font-size: 20px;
      margin-bottom: 3px;
    }
    .main-intro-subcontents {
      color: gray;
      font-size: 15px;
      text-align: center;
    }
    .example {
      position: relative;
      width: 100%;
      height: 100%;
      background-color: #f5f5f5;
      .example-contents {
        width: 80%;
        flex-direction: column;
        justify-content: center;
        position: absolute;
        z-index: 2;
        display: flex;
        align-items: center;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        @media all and (max-width: 768px) {
          width: 90%;
        }
      }
    }
  }
  .button {
    margin-top: 10px;
    width: 180px;
    height: 40px;
    background: #ffffff;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    text-decoration: none;
    @media all and (max-width: 768px) {
      width: 120px;
      height: 40px;
    }
  }
  .button-name {
    font-weight: bold;
    font-size: 15px;
    color: #474747;
    @media all and (max-width: 768px) {
      font-size: 13px;
    }
  }
  .question-contents {
    width: 80%;
    display: flex;
    margin-top: 20px;
    justify-content: center;
    align-items: center;
    @media all and (max-width: 768px) {
      flex-direction: column;
      width: 90%;
    }
    .question-wrap {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: start;
      @media all and (max-width: 768px) {
        width: 90%;
        align-items: center;
      }
    }
  }
  .question-img {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: start;
  }
  .question-img-first {
    margin-left: 60px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: start;
    @media all and (max-width: 768px) {
      margin-left: 0px;
    }
  }
  //web
  @media all and (min-width: 769px) {
    .main {
      height: 500px;
      img {
        width: 420px;
        height: 380px;
      }
      .banner {
        flex-direction: row-reverse;
      }
      .example {
        position: relative;
        .example-contents {
          width: 1000px;
          height: 80%;
          position: absolute;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          top: 50%;
          left: 50%;
          @media all and (max-width: 900px) {
            width: 90%;
          }
          transform: translate(-50%, -50%);
        }
        .second {
          flex-direction: row-reverse;
        }
      }
      .main-intro {
      }
      .main-intro-title {
        font-size: 35px;
        text-align: start;
        @media all and (max-width: 768px) {
          font-size: 30px;
          text-align: center;
        }
      }
    }
  }
`;
const StLogoTitle = styled.div`
  font-family: Cafe24Ssurround;
  margin-top: 30px;
  text-align: center;
  font-size: 3em;
`;
const StExampleImg = styled.div`
  width: 400px;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: ${(props) => (props.top ? "50px" : null)};
  margin-left: ${(props) => (props.top ? null : "50px")};
  @media all and (max-width: 900px) {
    margin-right: 0px;
    margin-left: 0px;
    width: 300px;
    font-size: 30px;
  }
`;
const StBackgroundTextDiv = styled.div`
  @media all and (max-width: 768px) {
    display: none;
  }
  @media all and (min-width: 769px) {
    position: absolute;
    /* z-index: 1; */
    font-size: 10em;
    opacity: 0.1;
    top: 0;
    /* left: 0; */
    /* margin-left: ${(props) => (props.second ? "1000px" : null)}; */
    right: ${(props) => (props.second ? "-30%" : null)};
    left: ${(props) => (props.second ? null : "0")};
  }
`;

const StQuestionDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  const [position, setPosition] = useState(0);

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

  function onScroll() {
    setPosition(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <StBodyDiv>
      <div className={"main"}>
        <div className={"banner"} onDragStart={changeImg}>
          {select ? (
            <img src={mainImg1} alt={"소개글1-1 이미지"} />
          ) : (
            <img src={mainImg2} alt={"소개글1-2 이미지"} />
          )}
          {select ? (
            <div className={"banner-intro"}>
              <div className={"welcome"}>Welcome</div>
              <div className={"main-intro-title-banner"}>
                {`사람과 사람을 이어주는\n우리동네 플래폼`}
              </div>
              <StLogoTitle>문고리</StLogoTitle>
              <div className={"main-intro-subcontents"}>
                지금 바로 문고리를 잡아보세요.
              </div>
            </div>
          ) : (
            <div className={"banner-intro"}>
              <div className={"main-intro-title-banner"}>
                우리들의 문고리를 소개합니다.
              </div>
              <div className={"main-intro-wrap"}>
                <div className={"main-intro-subtitle"}>가격제시 거래</div>
                <div className={"main-intro-subcontents"}>
                  기존의 피로했던 중고거래 방식을 벗어난 거래
                </div>
              </div>
              <div className={"main-intro-wrap"}>
                <div className={"main-intro-subtitle"}>동네소식</div>
                <div className={"main-intro-subcontents"}>
                  우리동네의 다양한 소식을 공유
                </div>
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
            <StExampleImg top>
              {" "}
              <img src={exampleImg1} alt={"움짤예시1 이미지"} />
            </StExampleImg>
            <div className={"main-intro"}>
              <div className={"main-intro-title"}>
                {`판매자가\n구매자를 선택하세요`}
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
            <div className={"question-wrap"}>
              {" "}
              <div className={"main-intro-title"}>
                {`가격 제시 시스템이\n궁금하신가요?`}
              </div>
              <Link to={"/trade=all"} className="button">
                <p className={"button-name"}>둘러보기</p>
              </Link>
            </div>

            <div className={"question-img-first"}>
              <img src={trade} alt={"이미지"} />
            </div>
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
            <StExampleImg bottom>
              {" "}
              <img src={exampleImg2} alt={"움짤예시1 이미지"} />
            </StExampleImg>

            <div className={"main-intro"}>
              <div className={"main-intro-title"}>
                {`이웃들과\n동네소식을 나눠봐요`}
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
            <div className={"question-wrap"}>
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
          </div>
        </StQuestionDiv>
      </div>
    </StBodyDiv>
  );
}
