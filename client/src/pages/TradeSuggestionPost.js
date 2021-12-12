import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import {
  faEllipsisV,
  faWifi,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faStar as rStar, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import SimpleSlider from "../components/Slider";
import { tradeState } from "../components/Trade";
import { StContentInfoDiv } from "../components/News";
axios.defaults.withCredentials = true;


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
    .trad-price {
      color: #b7b7b7;
      height: 30%;
    }
    .price {
        border-bottom: 1px solid #b7b7b7;
      height: 70%;
      font-size: 35px;
      font-weight: 800;
    }
    .c-price {
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
      border-radius: 10px;
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


//댓글
const StCommentInputDiv = styled.div`
  width: 100%;
  text-align: left;
  margin-top: 40px;
  .comment-cnt {
    font-size: 1.5em;
    margin-bottom: 10px;
  }
  .input-button {
    border: 1px solid;
    height: 100px;
    input {
      border: none;
      height: 60%;
      width: 98%;
      font-size: 1em;
    }
    div {
      border-top: 1px solid #c4c4c4;
      text-align: right;
      button {
        border-radius: 30px;
        background: #92e3a9;
        height: 30px;
        margin: 3px 10px 0 0;
        width: 70px;
      }
    }
  }
`;
const StCommentListDiv = styled.div`
  margin-top: 40px;
  width: 100%;
`;
const StPostHeaderDiv = styled.div`
  border-bottom: 1px solid;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding: 20px;
  .icon {
    padding: 10px 10px 0 0;
    font-size: 20px;
    @media all and (max-width: 540px) {
      font-size: 15px;
    }
    svg {
      cursor: pointer;
      margin-right: 10px;
    }
  }
`;
const StPostHeaderReUse = styled(StPostHeaderDiv)`
  border-bottom: 1px solid #c4c4c4;
  width: 95%;
  img {
    padding-top: 10px;
  }
  input {
    width: 300px;
    height: 20px;
    font-size: 1em;
    outline-color: #aae8c5;
  }
`;
const StPostUserDiv = styled.div`
  flex: 0.9 0 0;
  width: 200px;
  display: flex;
  img {
    height: 35px;
    width: 35px;
    margin: 10px 10px 0 0;
    @media all and (max-width: 540px) {
      height: 30px;
      width: 30px;
    }
  }
  .info {
    margin: 10px 10px 0 0;
    text-align: left;
    font-size: 0.8em;
    span {
      margin-right: 20px;
    }
  }
`;
const StCommentButtonDiv = styled.div`
  padding: 30px 0 0 30px;
  text-align: right;
  button {
    border-radius: 30px;
    background: #92e3a9;
    height: 30px;
    margin-right: 10px;
    width: 70px;
    cursor: pointer;
  }
`;



export default function TradeSuggestionPost({ login, userinfo }) {
  const { id } = useParams();
  const [edit, setEdit] = useState(true);
  const [priceList, setPriceList] = useState([]);
  const [option, setOption] = useState(false);
  const [priceId, setPriceId] = useState(null);
  const inputPriceRef = useRef(null);
  const inputRevisedPriceRef = useRef(null);
  const [postInfo, setPostInfo] = useState({
    title: "",
    sCost: "",
    img: "",
    user: {
      img: "",
      nickname: "",
      town: "",
    },
    likes_cnt: 0,
    content: "",
  });
  const [likeState, setLikeState] = useState(false);
  const [cCost, setCCost] = useState(0)

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

  const changeState = async (s) => {
    await axios
      .patch(`${process.env.REACT_APP_API_URL}/trade/state/${id}`, {
        state: s,
      })
      .then((res) => {
        console.log(res.data.data.state);
        setCheck(res.data.data.state);
      });
  };

  const like = async () => {
    console.log("likeState;;", likeState)
    if (likeState) {
      await axios
        .delete(`${process.env.REACT_APP_API_URL}/trade/like`, {
          data: { tradePost_Id: id }
        }).then((res) => {
          setPostInfo({ ...postInfo, likes_cnt: postInfo.likes_cnt - 1 })
          console.log("/trade/like", res.data);
          setLikeState(false);
        }).catch((err) => {
          Swal.fire({
            icon: "error",
            title: "로그인 후 이용가능합니다",
            text: "",
            footer: "",
          });
        })
    } else {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/trade/like`, {
          tradePost_Id: id
        }).then((res) => {
          setPostInfo({ ...postInfo, likes_cnt: postInfo.likes_cnt + 1 })
          console.log("/trade/like", res.data);
          setLikeState(true);
        }).catch((err) => {
          Swal.fire({
            icon: "error",
            title: "로그인 후 이용가능합니다",
            text: "",
            footer: "",
          });
        })
    }
  }
  // 서버에 금액을 추가하는 함수
  const registerComment = () => {
    console.log("inputPriceRef;;;", inputPriceRef)
    if (login) {
      if (inputPriceRef.current.value >= postInfo.sCost) {
        axios
          .post(`${process.env.REACT_APP_API_URL}/trade/suggestion`, {
            tradePost_Id: id,
            cost: inputPriceRef.current.value,
          })
          .then((res) => {
            console.log(priceList);
            setPriceList([{ ...res.data.data.createSuggestion, user: { img: userinfo.img, nickname: userinfo.nickname, town: userinfo.town } }, ...priceList]);
            setCCost(res.data.data.currentCost)
          })
          .catch();
        inputPriceRef.current.focus();
        inputPriceRef.current.value = "";
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "로그인이 필요한 기능입니다.",
      });
    }
  };
  // 금액 수정 아이콘을 눌렀을 때 실행하는 함수
  const handleRevise = (price_id) => {
    setPriceId(price_id);
  };

  // 금액 수정하는 함수
  const reviseComment = (price_id) => {
    axios
      .patch(`${process.env.REACT_APP_API_URL}/trade/suggestion/${price_id}`, {
        tradePost_Id: id,
        cost: inputRevisedPriceRef.current.value,
      })
      .then((res) => {
        console.log(priceList);
        console.log(res.data.data);
        setPriceList([...res.data.data.updateSuggestion].reverse());
        setCCost(res.data.data.currentCost);
        setPriceId(null);
      });
  };
  // 댓글을 삭제하는 함수
  const deleteComment = (price_id) => {
    console.log(price_id);
    axios
      .delete(`${process.env.REACT_APP_API_URL}/trade/suggestion/${price_id}`, {
        data: { tradePost_Id: id },
      })
      .then((res) => {
        console.log(res.data.data.list);
        setPriceList([...res.data.data.list].reverse());
        setCCost(res.data.data.currentCost);
      });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/trade/post/${id}`)
      .then((res) => {
        setCheck(res.data.data.postInfo.state);
        console.log(res.data.data.postInfo);
        setCCost(res.data.data.postInfo.cCost)
        setPostInfo(res.data.data.postInfo);
        setPriceList(res.data.data.postInfo.suggestions.reverse());
        res.data.data.postInfo.likes.map((el) => {
          if (login) {
            if (el.user_Id === userinfo.id) {
              setLikeState(true)
            }
          }
        }
        )
      }
      )
  }, [login]);

  console.log(priceList);

  return (
    <>
      {option ? (
        <StOptionMenuDiv>
          {edit ? (postInfo.id === userinfo.id ? (
            <li
              onClick={() => {
                if (postInfo.id === userinfo.id) {
                  setEdit(!edit);
                }
              }}
            >
              게시글 수정
              <i class="fas fa-arrow-right"></i>
            </li>
          ) : null)
            : (
              <li
                onClick={() => {
                  if (postInfo.id === userinfo.id) {
                    setEdit(!edit);
                  }
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
      {
        edit ? (
          //기본 상태
          <>
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
                      <div className={"trad-price"}>제시금액</div>
                      <div className={"price"}>{postInfo.sCost} 원</div>
                    </div>
                    <div className={"content-tail"}>
                      <div className={"nickname-box"}>
                        <div className={"profile-img"}>
                          <img src={postInfo.user.img} className={"image"}></img>
                        </div>
                        <div className={"nickname"}>{postInfo.user.nickname}</div>
                        <div className={"towninfo"}>{postInfo.user.town}</div>
                      </div>
                      <div className={"trade-info-box"}>
                        <div className={"trade-cnt"}>판매 103</div>
                        <div className={"trade-reliability"}>
                          거래안정도 <FontAwesomeIcon icon={faWifi} />
                        </div>
                      </div>
                      <div className={"like-box"}>
                        <div className={"like-star"}>
                          {likeState ? <FontAwesomeIcon icon={rStar} onClick={like} />
                            : <FontAwesomeIcon icon={faStar} onClick={like} />
                          }
                        </div>
                        <div className={"like-cnt"}>찜 {postInfo.likes_cnt}</div>
                      </div>
                    </div>
                  </div>
                  <div className={"content-body"}>
                    <div className={"trad-price"}>현재금액</div>
                    <div className={"c-price"}>{cCost} 원</div>
                  </div>
                </StContentDiv>
              </StTradeBoxDiv>
              <div className={"explain-wrap"}>
                <div className={"trade-explain"}>
                  {/* 본문 */}
                  {postInfo.content}
                </div>
              </div>
            </StTradeBodyDiv>
            <StCommentInputDiv>
              <div className="comment-cnt">제시 금액 {priceList.length}</div>
              <div className="input-button">
                <input
                  type={"text"}
                  placeholder={"금액 제시"}
                  ref={inputPriceRef}
                ></input>
                <div>
                  <button type={"button"} onClick={registerComment}>
                    등 록
                  </button>
                </div>
              </div>
            </StCommentInputDiv>
            <StCommentListDiv>
              {priceList.map((price, index) => (
                <StPostHeaderReUse key={index}>
                  <StPostUserDiv>
                    <img src={price.user.img} alt="프로필사진"></img>
                    <div className={"info"}>
                      <StContentInfoDiv>
                        <span>{price.user.nickname}</span>
                        <span>{price.user.town}</span>
                      </StContentInfoDiv>
                      {price.id === priceId ? (
                        <input
                          type={"text "}
                          defaultValue={price.cost}
                          ref={inputRevisedPriceRef}
                        />
                      ) : (
                        <div>{price.cost}</div>
                      )}
                    </div>
                  </StPostUserDiv>
                  {login && userinfo.id === price.user_Id ? (
                    price.id === priceId ? (
                      <StCommentButtonDiv>
                        <button
                          type={"button"}
                          onClick={() => setPriceId(null)}
                        >
                          취소
                        </button>
                        <button onClick={() => reviseComment(price.id)}>
                          확인
                        </button>
                      </StCommentButtonDiv>
                    ) : (
                      <div className={"icon"}>
                        <FontAwesomeIcon
                          icon={faPencilAlt}
                          onClick={() => handleRevise(price.id)}
                        />
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          onClick={() => deleteComment(price.id)}
                        />
                      </div>
                    )
                  ) : null}
                </StPostHeaderReUse>
              ))}
            </StCommentListDiv>
          </>

        ) : (
          //수정 상태
          <>
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
                      <div className={"trad-price"}>제시금액</div>
                      <input
                        className={"price"}
                        defaultValue={postInfo.sCost}
                      ></input>
                    </div>
                    <div className={"content-tail"}>
                      <div className={"nickname-box"}>
                        <div className={"profile-img"}>
                          <img src={postInfo.user.img} className={"image"}></img>
                        </div>
                        <div className={"nickname"}>{postInfo.user.nickname}</div>
                        <div className={"towninfo"}>{postInfo.user.town}</div>
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
          </>
        )
      }
    </>
  );
}