import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import {
  faEllipsisV,
  faWifi,
  faTimes,
  faLessThanEqual,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import SimpleSlider from "../components/Slider";

const StTradeBodyDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  margin-bottom: 250px;
  .explain-wrap {
    width: 50%;
    display: flex;
    align-items: start;
  }
`;

const StTradeBoxDiv = styled.div`
  width: 60%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media all and (min-width: 2000px) {
    width: 50%;
    height: 650px;
  }
  @media all and (max-width: 1024px) {
    width: 80%;
    height: 650px;
  }
  @media all and (max-width: 768px) {
    width: 100%;
    height: 1000px;
    display: flex;
    flex-direction: column;
  }
`;
const StPictureDiv = styled.div`
  width: 60%;
  height: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media all and (max-width: 768px) {
    width: 90%;
    height: 50%;
  }

  .tradeImg {
    width: 80%;
  }
`;
const StContentDiv = styled.div`
  margin-left: 20px;
  width: 40%;
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media all and (max-width: 768px) {
    width: 90%;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .content-wrap {
    width: 100%;
    height: 100%;
    @media all and (max-width: 768px) {
      width: 90%;
    }
  }
  .content-head {
    margin-bottom: 10px;
    width: 100%;
    height: 15%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    .content-state-wrap {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
      .option {
        color: #b7b7b7;
        @media all and (max-width: 1024px) {
          /* margin-right: 100px; */
        }
      }
      .now-state {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        border-radius: 10px;
        text-align: center;
        width: 53px;
        height: 20px;
        background: #aae8c5;
      }
    }

    .trade-title {
      height: 70%;
      font-size: 20px;
      font-weight: 700;
    }
  }
  .content-body {
    width: 100%;
    height: 30%;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #b7b7b7;
    .trad-price {
      color: #b7b7b7;
      height: 30%;
    }
    .price {
      height: 70%;
      font-size: 35px;
      font-weight: 800;
    }
  }
  .content-tail {
    height: 40%;
    width: 100%;
    display: flex;
    flex-direction: column;
    .nickname-box {
      height: 50%;
      display: flex;
      .profile-img {
        width: 10%;
        margin-right: 5px;
      }
      .image {
        height: 23px;
      }
      .nickname {
        margin-right: 20px;
        font-size: 17px;
      }
      .towninfo {
        font-size: 15px;
        color: #b7b7b7;
      }
    }
    .trade-info-box {
      height: 20%;
      display: flex;
      justify-content: space-between;
      .trade-cnt {
        font-size: 15px;
        margin-right: 10px;
        color: gray;
      }
      .trade-reliability {
        font-size: 15px;
        color: gray;
      }
    }
    .like-box {
      margin-top: 10px;
      height: 30%;
      display: flex;
      .like-star {
        margin-right: 10px;
      }
      .like-cnt {
        font-size: 16px;
      }
    }
  }

  .StContactButton {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: start;
    .contact {
      background: #aae8c5;
      border: 1px solid #b7b7b7;
      border-radius: 15px;
      width: 100%;
      height: 40px;
      @media all and (max-width: 768px) {
        width: 90%;
        height: 50px;
      }
    }
  }
`;
//옵션 메뉴
const StOptionMenuDiv = styled.ul`
  z-index: 4;
  background: #f2f2f2;
  list-style: none;
  border: 1px solid;
  width: 15%;
  position: absolute;
  top: 13%;
  left: 79%;
  text-align: right;
  -webkit-padding-start: 0px;
  @media all and (max-width: 769px) {
    top: 35.5%;
    left: 77.5%;
  }
  @media all and (max-width: 557px) {
    top: 34.5%;
    left: 63.4%;
    width: 20%;
  }
  li {
    height: 25px;
    color: black;
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9em;
    border-bottom: 1px solid;
    padding: 5px 3px 5px 3px;
  }
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

export default function TradeRead() {
  //const { id } = useParams();
  const [edit, setEdit] = useState(false);
  const [option, setOption] = useState(false);
  const [postInfo, setPostInfo] = useState({
    title: "",
    sCost: "",
    img: "",
    nickname: "",
    town: "",
    user_img: "",
    likes_cnt: "",
    content: "",
  });

  //판매 상태 true면 판매중, false면 예약중
  const [state, setState] = useState(true);
  //판매완료 상태변경
  const [soldout, setSoldout] = useState(false);
  //상태 변경 요청할때 사용

  const [check, setCheck] = useState(null);

  const soldoutHandler = () => {
    setSoldout(!soldout);
  };

  const openOption = () => {
    setOption(!option);
  };
  const changeToreservation = () => {
    setState(false);
  };
  const changeToselling = () => {
    setState(true);
  };
  const tradeState = {
    1: "판매중",
    2: "예약중",
    3: "판매완료",
  };

  const changeState = async (s) => {
    await axios
      .patch(`${process.env.REACT_APP_API_URL}/trade/state/1`, {
        state: s,
      })
      .then((res) => {
        console.log(res.data.data.state);
        setCheck(res.data.data.state);
      });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/trade/post/${1}`)
      .then((res) => {
        setCheck(res.data.data.postInfo.state);
        setPostInfo(res.data.data);
        setPostInfo({
          title: res.data.data.postInfo.title,
          sCost: res.data.data.postInfo.sCost,
          img: res.data.data.postInfo.img,
          nickname: res.data.data.postInfo.user.nickname,
          town: res.data.data.postInfo.user.town,
          user_img: res.data.data.postInfo.user.img,
          likes_cnt: res.data.data.like_cnt.length,
          content: res.data.data.postInfo.content,
        });
        console.log(res.data.data);
      });
  }, []);

  console.log(check);

  return (
    <>
      {option ? (
        <StOptionMenuDiv>
          {edit ? (
            <li
              onClick={() => {
                setEdit(!edit);
              }}
            >
              게시글 수정
              <i class="fas fa-arrow-right"></i>
            </li>
          ) : (
            <li
              onClick={() => {
                setEdit(!edit);
              }}
            >
              수정 완료
              <i class="fas fa-arrow-right"></i>
            </li>
          )}

          {check === 1 ? (
            <li
              value={2}
              onClick={() => {
                changeToreservation();
                changeState(2);
              }}
            >
              {tradeState[2]}으로 변경
              <i class="fas fa-arrow-right"></i>
            </li>
          ) : (
            <li
              value={1}
              onClick={() => {
                changeToselling();
                changeState(1);
              }}
            >
              {tradeState[1]}으로 변경
              <i class="fas fa-arrow-right"></i>
            </li>
          )}

          <li
            onClick={() => {
              Swal.fire({
                title: "판매완료로 변경하시겠습니까?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                cancelButtonText: "취소",
                confirmButtonText: "확인",
              }).then((result) => {
                if (result.isConfirmed) {
                  soldoutHandler(true);
                  changeState(3);
                  Swal.fire("변경완료!", "");
                }
              });
            }}
          >
            {tradeState[3]}로 변경
            <i class="fas fa-arrow-right"></i>
          </li>
          <li>
            게시글 삭제
            <i class="fas fa-arrow-right"></i>
          </li>
        </StOptionMenuDiv>
      ) : null}
      {edit ? (
        //기본 상태
        <StTradeBodyDiv>
          <StTradeBoxDiv>
            <StPictureDiv>
              <SimpleSlider />
            </StPictureDiv>
            <StContentDiv>
              <div className={"content-wrap"}>
                <div className={"content-head"}>
                  <div className={"content-state-wrap"}>
                    <div className={"now-state"}>
                      {soldout
                        ? tradeState[3]
                        : check === 1
                        ? tradeState[1]
                        : tradeState[2]}
                    </div>

                    {option ? (
                      <FontAwesomeIcon
                        icon={faTimes}
                        className={"option"}
                        onClick={() => openOption()}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faEllipsisV}
                        className={"option"}
                        onClick={() => openOption()}
                      />
                    )}
                  </div>
                  <div className={"trade-title"}>{postInfo.title}</div>
                </div>
                <div className={"content-body"}>
                  <div className={"trad-price"}>판매금액</div>
                  <div className={"price"}>{postInfo.sCost} 원</div>
                </div>
                <div className={"content-tail"}>
                  <div className={"nickname-box"}>
                    <div className={"profile-img"}>
                      <img src={postInfo.user_img} className={"image"}></img>
                    </div>
                    <div className={"nickname"}>{postInfo.nickname}</div>
                    <div className={"towninfo"}>{postInfo.town}</div>
                  </div>
                  <div className={"trade-info-box"}>
                    <div className={"trade-cnt"}>판매 103</div>
                    <div className={"trade-reliability"}>
                      거래안정도 <FontAwesomeIcon icon={faWifi} />
                    </div>
                  </div>
                  <div className={"like-box"}>
                    <div className={"like-star"}>
                      <FontAwesomeIcon icon={faStar} />
                    </div>
                    <div className={"like-cnt"}>찜 {postInfo.likes_cnt}</div>
                  </div>
                </div>
              </div>
              <div className={"StContactButton"}>
                <button className={"contact"}>연락하기</button>
              </div>
            </StContentDiv>
          </StTradeBoxDiv>
          <div className={"explain-wrap"}>
            <div className={"trade-explain"}>
              {/* LG gram 15 노트북 팝니다.20년 6월에 구매하였습니다. 성능 os - 윈도우
           (64비트) CPU - i5-1035G7 메모리 - 9GB / DDR 3200 MHz(8GBx1) + 확장
           슬롯1 SSD - 256 GB 새로운 노트북을 구매해서 팔려고 합니다. 상태
           S급입니다.{" "} */}
              {postInfo.content}
            </div>
          </div>
        </StTradeBodyDiv>
      ) : (
        //수정 상태
        <StTradeBodyDiv>
          <StTradeBoxDiv>
            <StPictureDiv>
              <SimpleSlider />
            </StPictureDiv>
            <StContentDiv>
              <div className={"content-wrap"}>
                <div className={"content-head"}>
                  <div className={"content-state-wrap"}>
                    <div className={"now-state"}>
                      {soldout
                        ? tradeState[3]
                        : check === 1
                        ? tradeState[1]
                        : tradeState[2]}
                    </div>

                    {option ? (
                      <FontAwesomeIcon
                        icon={faTimes}
                        className={"option"}
                        onClick={() => openOption()}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faEllipsisV}
                        className={"option"}
                        onClick={() => openOption()}
                      />
                    )}
                  </div>
                  <input
                    defaultValue={postInfo.title}
                    className={"trade-title"}
                  ></input>
                </div>
                <div className={"content-body"}>
                  <div className={"trad-price"}>판매금액</div>
                  <input
                    className={"price"}
                    defaultValue={postInfo.sCost}
                  ></input>
                </div>
                <div className={"content-tail"}>
                  <div className={"nickname-box"}>
                    <div className={"profile-img"}>
                      <img src={postInfo.user_img} className={"image"}></img>
                    </div>
                    <div className={"nickname"}>{postInfo.nickname}</div>
                    <div className={"towninfo"}>{postInfo.town}</div>
                  </div>
                  <div className={"trade-info-box"}>
                    <div className={"trade-cnt"}>판매 103</div>
                    <div className={"trade-reliability"}>
                      거래안정도 <FontAwesomeIcon icon={faWifi} />
                    </div>
                  </div>
                  <div className={"like-box"}>
                    <div className={"like-star"}>
                      <FontAwesomeIcon icon={faStar} />
                    </div>
                    <div className={"like-cnt"}>찜 {postInfo.likes_cnt}</div>
                  </div>
                </div>
              </div>
              <div className={"StContactButton"}>
                <button className={"contact"}>연락하기</button>
              </div>
            </StContentDiv>
          </StTradeBoxDiv>
          <div className={"explain-wrap"}>
            <textarea
              className={"trade-explain"}
              defaultValue={postInfo.content}
            ></textarea>
          </div>
        </StTradeBodyDiv>
      )}
    </>
  );
}
