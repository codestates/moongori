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

const StBodyDiv = styled.div`
  width: 100%;
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
      @media all and (min-width: 769px) {
      }
    }
    .main-intro-title {
      width: 100%;
      text-align: center;
      font-weight: bold;
      font-size: 30px;
      margin-bottom: 20px;
    }
    .main-intro-contents {
      font-size: 15px;
      text-align: center;
      margin-top: 5px;
      @media all and (min-width: 769px) {
        font-size: 20px;
      }
    }
    .main-intro-wrap {
      margin-bottom: 10px;
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
    }
    .question-wrap {
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      @media all and (max-width: 768px) {
        width: 90%;
      }
    }
  }
  .question-img {
    width: 50%;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  //web
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
        position: relative;
        .example-contents {
          width: 80%;
          height: 80%;
          position: absolute;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          .main-intro {
            width: 50%;
          }
          .example-img-wrap {
            width: 50%;
            height: 80%;
            display: flex;
            justify-content: center;
            align-items: center;
            .example-img {
              width: 80%;
            }
          }
        }
        .second {
          flex-direction: row-reverse;
        }
      }
      .main-intro-title {
        font-size: 50px;
      }
    }
    .welcome {
      margin-left: 5px;
      color: gray;
      @media all and (max-width: 768px) {
        margin-left: 15px;
        color: gray;
      }
    }
  }
`;

const StBackgroundTextDiv = styled.div`
  @media all and (max-width: 768px) {
    display: none;
  }
  @media all and (min-width: 769px) {
    position: absolute;
    z-index: 1;
    font-size: 10em;
    opacity: 0.1;
    margin-left: ${(props) => (props.second ? "1000px" : null)};
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
    // console.log(window.scrollY);
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
              <div className={"main-intro-title"}>
                {`사람과 사람을 이어주는\n우리동네 플래폼`}
              </div>
              <div className={"logo-title"}>문고리</div>
              <div className={"main-intro-subcontents"}>
                지금 바로 문고리를 잡아보세요.
              </div>
            </div>
          ) : (
            <div className={"banner-intro"}>
              <div className={"main-intro-title"}>
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
            <div className={"example-img-wrap"}>
              {" "}
              <img
                src={exampleImg1}
                alt={"움짤예시1 이미지"}
                className={"example-img"}
              />
            </div>
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

            <div className={"question-img"}>
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
            <div className={"example-img-wrap"}>
              {" "}
              <img
                src={exampleImg2}
                alt={"움짤예시1 이미지"}
                className={"example-img"}
              />
            </div>

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
