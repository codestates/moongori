import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import PasswordModal from "../components/PasswordModal";
import WithdrawalModal from "../components/WithdrawalModal";
import axios from "axios";
import mypage from "../images/mypage.png";
import profile from "../images/vegetable.jpeg";
import lock from "../images/locked.png";
import cancel from "../images/cancel.png";

const MypageHead = styled.div`
  width: 100%;
  padding-bottom: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .mypage-master {
    height: 800px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .mypage-box {
    width: 60%;
    height: 60%;
    background-color: #aae8c5;
    border-radius: 15px;
    @media all and (max-width: 768px) {
      width: 90%;
      height: 50%;
    }
    .mypage-wrap {
      width: 100%;
      height: 90%;
      display: flex;
      justify-content: center;
      @media all and (max-width: 768px) {
        height: 70%;
      }
      .mypage-profile-box {
        width: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
        .profile-img {
          width: 50%;
          height: 50%;
          border-radius: 70%;
          overflow: hidden;
        }
      }
      .mypage-userinfo-box {
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .mypage-userinfo-wrap {
          height: 100%;
          width: 100%;
          @media all and (max-width: 768px) {
            height: 90%;
          }
        }
        .mypage-input-box {
          width: 100%;
          height: 30%;
          display: flex;
          justify-content: center;
          align-items: center;
          @media all and (max-width: 768px) {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .input-title {
            text-align: center;
            width: 30%;
            font-size: 16px;
            @media all and (max-width: 768px) {
              text-align: center;
              font-size: 12px;
              margin-bottom: 5px;
            }
          }
          .input-tick {
            width: 80%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            @media all and (max-width: 768px) {
              height: 60%;
              display: flex;
              align-items: start;
            }
            .input-area {
              height: 30%;
              width: 80%;
              border-radius: 5px;
              border: 1px gray;
              @media all and (max-width: 768px) {
                height: 50%;
              }
            }
          }
        }
      }
    }
  }
  .button-wrap {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    @media all and (max-width: 768px) {
      height: 30%;
    }
    .button-box-empty {
      width: 40%;
      @media all and (max-width: 768px) {
        width: 0%;
      }
    }
    .button-box {
      width: 60%;
      height: 100%;
      display: flex;
      justify-content: center;
      border: 1px gray;
      @media all and (max-width: 768px) {
        height: 100%;
        align-items: center;
      }
      .button-area {
        width: 50%;
        display: flex;
        justify-content: center;
        @media all and (max-width: 768px) {
          height: 50%;
        }
        .button-icon {
          width: 12px;
          height: 12px;
          margin-right: 2px;
        }
        .request-button {
          cursor: pointer;
          font-size: 13px;
          color: gray;
        }
      }
    }
  }
  .mypage-category {
    width: 100%;
    height: 30%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .category-wrap {
      width: 80%;
      height: 20%;
      display: flex;
      justify-content: center;
      align-items: center;
      @media all and (max-width: 768px) {
        height: 40%;
        width: 100%;
      }
      .category-box {
        margin-top: 20px;
        height: 100%;
        width: 70%;
        border-top: dashed 1px gray;
        border-bottom: dotted 1px gray;
        display: flex;
        justify-content: center;
        align-items: center;
        .category-align {
          height: 100%;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          @media all and (max-width: 768px) {
            flex-direction: column;
          }
          .category-half {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: 60%;
            @media all and (max-width: 768px) {
              width: 70%;
            }
          }
          .category-tick {
            height: 100%;
            width: 33.3%;
            display: flex;
            justify-content: center;
            align-items: center;
            .category-button {
              font-size: 10px;
              width: 80%;
              height: 60%;
              /* background: #d1d1d1; */
              border-radius: 15px;
              border: 1px gray;
              cursor: pointer;
              &:focus {
                background: #aae8c5;
              }
              @media all and (max-width: 768px) {
                height: 70%;
                width: 90%;
                font-size: 6px;
              }
            }
          }
        }
      }
    }
    .content-wrap {
      width: 100%;
      height: 60%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export default function Mypage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);

  // const [userInfo, setUserInfo] = useState({
  //   nickname: nickname,
  //   email: email,
  //   address: address,
  // });
  const modalClose = () => {
    setModalOpen(!modalOpen);
  };
  const modalClose2 = () => {
    setModalOpen2(!modalOpen2);
  };
  const signupTest = () => {
    axios
      .post("http://localhost:4000/user/signup", {
        email: "1234@1234.com",
        nickname: "김코딩",
        address: "부산시 수영구 광안해변로 386",
        password: "1234",
      })
      .then((res) => {
        console.log(res);
      });
  };
  const signinTest = () => {
    axios
      .post("http://localhost:4000/user/signin", {
        email: "1234@1234.com",
        password: "1234",
      })
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <MypageHead>
      <div className={"mypage-master"}>
        <div className={"mypage-box"}>
          <div className={"mypage-wrap"}>
            <div className={"mypage-profile-box"}>
              <img src={profile} className={"profile-img"}></img>
            </div>
            <div className={"mypage-userinfo-box"}>
              <div className={"mypage-userinfo-wrap"}>
                <div className={"mypage-input-box"}>
                  <div
                    className={"input-title"}
                    onClick={() => {
                      signinTest();
                    }}
                  >
                    닉네임
                  </div>
                  <div className={"input-tick"}>
                    <input type="text" className={"input-area"}></input>
                  </div>
                </div>
                <div className={"mypage-input-box"}>
                  <div
                    className={"input-title"}
                    onClick={() => {
                      signupTest();
                    }}
                  >
                    이메일
                  </div>
                  <div className={"input-tick"}>
                    <input type="text" className={"input-area"}></input>
                  </div>
                </div>
                <div className={"mypage-input-box"}>
                  <div className={"input-title"}>동네</div>
                  <div className={"input-tick"}>
                    <input type="text" className={"input-area"}></input>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={"button-wrap"}>
            <div className={"button-box-empty"}></div>
            <div className={"button-box"}>
              <div className={"button-area"}>
                <img src={lock} className={"button-icon"}></img>
                <div onClick={modalClose} className={"request-button"}>
                  비밀번호 변경
                </div>
                {modalOpen && (
                  <PasswordModal modalClose={modalClose}></PasswordModal>
                )}
              </div>
              <div className={"button-area"}>
                <img src={cancel} className={"button-icon"}></img>
                <div onClick={modalClose2} className={"request-button"}>
                  회원탈퇴
                </div>
                {modalOpen2 && (
                  <WithdrawalModal modalClose2={modalClose2}></WithdrawalModal>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={"mypage-category"}>
          <div className={"category-wrap"}>
            <div className={"category-box"}>
              <div className={"category-align"}>
                <div className={"category-half"}>
                  <div className={"category-tick"}>
                    <button className={"category-button"}>내 게시글</button>
                  </div>
                  <div className={"category-tick"}>
                    <button className={"category-button"}>내 동네소식</button>
                  </div>
                  <div className={"category-tick"}>
                    <button className={"category-button"}>판매내역</button>
                  </div>
                </div>
                <div className={"category-half"}>
                  <div className={"category-tick"}>
                    <button className={"category-button"}>구매내역</button>
                  </div>
                  <div className={"category-tick"}>
                    <button className={"category-button"}>찜한 게시글</button>
                  </div>
                  <div className={"category-tick"}>
                    <button className={"category-button"}>관심 소식</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={"content-wrap"}>
            <div>게시글</div>
          </div>
        </div>
      </div>
    </MypageHead>
  );
}
