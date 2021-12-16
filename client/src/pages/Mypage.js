import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PasswordModal from "../components/PasswordModal";
import WithdrawalModal from "../components/WithdrawalModal";
import axios from "axios";
import lock from "../images/locked.png";
import cancel from "../images/cancel.png";
import editImg from "../images/edit.png";
import Swal from "sweetalert2";
import DaumPostcode from "react-daum-postcode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import News from "./../components/News";
import Trade from "./../components/Trade";
import { getDistance } from "./../components/Signup";

import {
  faCheckSquare,
  faWindowClose,
  faImage,
} from "@fortawesome/free-regular-svg-icons";

const Body = styled.div`
  width: 100%;
  height: 100%;
`;
const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
`;
const StMypageHead = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .content-head {
    width: 65%;
    height: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
    @media all and (max-width: 768px) {
      width: 90%;
    }
    .content-wrap {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      @media all and (max-width: 768px) {
        width: 90%;
      }
    }
  }
  .mypage-master {
    width: 100%;
    height: 700px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .mypage-box {
    width: 50%;
    height: 80%;
    background-color: #aae8c5;
    border-radius: 15px;
    @media all and (max-width: 768px) {
      width: 90%;
      height: 50%;
    }

    .mypage-wrap {
      width: 100%;
      height: 80%;
      display: flex;
      justify-content: center;
      @media all and (max-width: 768px) {
        height: 70%;
      }
      .mypage-profile-box {
        width: 40%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .profile-img {
          width: 60%;
          height: 45%;
          border-radius: 70%;
          overflow: hidden;
        }
        .imgButton {
          margin-top: 10px;
          width: 30px;
          height: 30px;
          cursor: pointer;
        }
      }
      .mypage-userinfo-box {
        width: 60%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .edit-wrap {
          margin-right: 42px;
          width: 100%;
          height: 10%;
          display: flex;
          align-items: center;
          justify-content: end;
          .edit-img {
            width: 20px;
            height: 20px;
            cursor: pointer;
          }
          .edit-back-img {
            width: 20px;
            height: 20px;
            margin-right: 10px;
            cursor: pointer;
          }
          @media all and (max-width: 768px) {
            margin-right: 82px;
            margin-top: 5px;
          }
        }
        .mypage-userinfo-wrap {
          height: 80%;
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
          .nicknameNotice {
            font-size: 10px;
          }
          .input-title {
            text-align: center;
            width: 30%;
            font-size: 20px;
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
              display: flex;
              align-items: center;
              justify-content: center;
              background: white;
              height: 30%;
              width: 80%;
              border-radius: 5px;
              border: 1px gray;
              @media all and (max-width: 768px) {
                height: 50%;
              }
              .userinfo-contents {
                text-align: center;
                font-size: 12px;
                @media all and (max-width: 768px) {
                  font-size: 9px;
                }
              }
            }
            .edit {
              width: 50%;
              border-top-right-radius: 0;
              border-bottom-right-radius: 0;
              text-align: center;
              @media all and (max-width: 768px) {
                font-size: 9px;
              }
              .edit-wrap {
                width: 100%;
                display: flex;
                .edit-box {
                  width: 100%;
                  display: flex;
                }
              }
            }
            .dupicate-wrap {
              width: 30%;
              height: 32%;
              @media all and (max-width: 768px) {
                height: 55%;
              }
              .dupicate-button {
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px gray;
                background: #d9f9e7;
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
                width: 100%;
                height: 100%;
                .dupicate-check {
                  font-weight: bold;
                  font-size: 10px;
                  cursor: pointer;
                }
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
    height: 10%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    @media all and (max-width: 768px) {
      height: 25%;
    }
    .category-wrap {
      margin-top: 10px;
      width: 62%;
      height: 80%;
      display: flex;
      justify-content: center;
      align-items: center;
      @media all and (max-width: 768px) {
        height: 40%;
        width: 100%;
      }
      .category-box {
        height: 100%;
        width: 80%;
        border-top: solid 1px #b7b7b7;
        border-bottom: solid 1px #b7b7b7;
        display: flex;
        justify-content: center;
        align-items: center;
        @media all and (max-width: 768px) {
          width: 90%;
        }
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
            /* .category-button {
              font-size: 9px;
              width: 80%;
              height: 60%;
              background: #aae8c5;
              border-radius: 15px;
              border: 1px gray;
              cursor: pointer;
              @media all and (max-width: 768px) {
                height: 70%;
                width: 90%;
                font-size: 6px;
              }
            } */
          }
        }
      }
    }
  }
  .nicknameNotice {
    font-size: 10px;
    margin-left: 110px;
  }
`;

const StCategoryButton = styled.button.attrs((props) => ({
  type: "button",
}))`
  background: ${(props) => (props.select ? "#92E3A9" : "#EFEFEF")};
  font-size: 9px;
  width: 80%;
  height: 60%;
  border-radius: 10px;
  border: 1px gray;
  cursor: pointer;
  @media all and (max-width: 768px) {
    height: 70%;
    width: 90%;
    font-size: 6px;
  }
`;

export default function Mypage({
  userinfo,
  isAuthenticated,
  login,
  handleWithdrawl,
}) {
  const navigate = useNavigate();
  //카테고리 별 게시글 받아오기
  const [myNews, SetMyNews] = useState([]);
  const [myComment, setMyComment] = useState([]);
  const [myTrade, setMyTrade] = useState([]);
  const [myLikeTrade, setMyLikeTrade] = useState([]);

  const [checkNickname, setCheckNickname] = useState({
    nickname: false,
    duplicate: false,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [category, setCategory] = useState({ number: null });
  const [edit, setEdit] = useState(true);
  const [editInfo, setEditInfo] = useState({
    img: userinfo.img,
    nickname: userinfo.nickname,
    address: userinfo.address,
    town: userinfo.town,
    latitude: userinfo.latitude,
    longitude: userinfo.longitude,
  });
  //이미지 보낼때 사용
  const [image, setImage] = useState("");

  //이미지 보이기용
  const [imgFile, setImgFile] = useState(null); //파일

  //번경 유무
  const [checkEdit, setCheckEdit] = useState(false);
  //주소 변경유무
  const [checkEditAddress, setCheckEditAddress] = useState(false);
  const nickname = editInfo.nickname;
  const address = editInfo.address;
  const town = editInfo.town;

  const [duplicate, setDuplicate] = useState(false);
  const [openPost, isOpenPost] = useState(false);

  // 구글에서 받아온 위치정보
  const [googleCoordinate, setGoogleCoordinate] = useState({
    lat: null,
    log: null,
  });
  // 입력한 위치 정보
  const [kakaoCoordinate, setKakaoCoordinate] = useState({
    lat: null,
    log: null,
  });
  const [nicknameChange, setNicknameChange] = useState(true);
  const handleInputValue = (key, e) => {
    setNicknameChange(false);
    setEditInfo({ ...editInfo, [key]: e.target.value });
    if (e.target.value === userinfo.nickname) {
      console.log(e.target.value);
      setNicknameChange(true);
    } else {
      if (isNickname(e.target.value)) {
        setCheckNickname({
          ...checkNickname,
          nickname: true,
          duplicate: false,
        });
      } else {
        setCheckNickname({
          ...checkNickname,
          nickname: false,
          duplicate: false,
        });
      }
    }
  };

  const modalClose = () => {
    setModalOpen(!modalOpen);
  };
  const modalClose2 = () => {
    setModalOpen2(!modalOpen2);
  };
  const modalClose3 = () => {
    isOpenPost(!openPost);
  };
  const editHandler = () => {
    setEdit(!edit);
  };
  const cancelEdit = () => {
    setImage("");
    setImgFile(null);
    setCheckEdit(false);
    setCheckNickname({ ...checkNickname, nickname: false, duplicate: false });
    setEdit(!edit);
  };

  const checkDuplicate = () => {
    console.log(nickname, userinfo.nickname);
    if (userinfo.nickname === nickname) {
      Swal.fire({
        icon: "success",
        title: "기존 닉네임과 동일한 닉네임입니다",
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (checkNickname.nickname !== true) {
      Swal.fire({
        icon: "error",
        title: "유효하지 않은 닉네임입니다",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/user/nickname`, {
          nickname: editInfo.nickname,
        })
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "사용 가능한 닉네임입니다",
            showConfirmButton: false,
            timer: 1500,
          });
          setCheckNickname({ ...checkNickname, duplicate: true });
          setNicknameChange(true);
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "중복된 닉네임입니다",
            text: "",
            footer: "",
          });
        });
    }
  };
  const photoChange = (e) => {
    const imageFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);

    setImage(imageFile);
    setImgFile(imageUrl); // 파일 상태 업데이트
    setCheckEdit(true);
    setEditInfo({ ...editInfo, img: imageFile });
  };

  //수정 요청
  const submitEditInfo = async () => {
    const formData = new FormData();
    if (image !== "") formData.append("img", image);
    if (
      nickname !== userinfo.nickname &&
      checkNickname.nickname &&
      checkNickname.duplicate
    ) {
      formData.append("nickname", nickname);
    }
    formData.append("address", address);
    formData.append("town", town);
    if (checkEditAddress) {
      formData.append("latitude", kakaoCoordinate.lat);
    }
    if (checkEditAddress) {
      formData.append("longitude", kakaoCoordinate.log);
    }

    const config = {
      Headers: {
        "content-type": "multipart/form-data",
      },
    };
    console.log("!!!", checkNickname);
    if (
      checkEdit === true ||
      checkEditAddress === true ||
      (checkNickname.nickname && checkNickname.duplicate)
    ) {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/user`, formData, config)
        .then((res) => {
          isAuthenticated();
          setEditInfo(res.data.data);
          Swal.fire({
            icon: "success",
            title: "변경되었습니다",
            text: "",
            footer: "",
          });

          setEdit(true);
        });
    } else if (
      userinfo.nickname !== nickname &&
      checkNickname.duplicate !== true
    ) {
      Swal.fire({
        icon: "error",
        title: "닉네임 중복검사를 해주세요",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "변경된 사항이 없습니다",
      });
    }
  };

  const onCompletePost = (data) => {
    let fullAddr = data.address;
    let extraAddr = "";
    const { kakao } = window;
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(fullAddr, (results, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const lat = results[0].y;
        const log = results[0].x;
        // console.log("나의주소", lat, " ", log);
        // console.log(
        //   "받은 위치정보",
        //   googleCoordinate.lat + " " + googleCoordinate.log
        // );
        // console.log(
        //   "거리",
        //   getDistance(googleCoordinate.lat, googleCoordinate.log, lat, log)
        // );

        if (
          getDistance(googleCoordinate.lat, googleCoordinate.log, lat, log) <=
          3000
        ) {
          setKakaoCoordinate({ ...kakaoCoordinate, lat: lat, log: log });
          if (data.addressType === "R") {
            if (data.buildingName !== "") {
              extraAddr += data.buildingName;
            }
            fullAddr += extraAddr;
          }
          setCheckEditAddress(true);
          setEditInfo({ ...editInfo, town: data.bname, address: fullAddr });
          setCheckEdit(true);
          isOpenPost(false);
        } else {
          setEditInfo({ ...editInfo, town: "", address: "" });
          setCheckEdit(false);
          isOpenPost(false);
          Swal.fire({
            icon: "error",
            title: "입력하신 위치와 현재 위치가 일치하지 않습니다.",
          });
        }
      }
    });
  };

  const postCodeStyle = {
    display: "block",
    position: "fixed",
    top: "50%",
    left: "50%",
    width: "400px",
    height: "400px",
    transform: "translate(-50%, -50%)",
    padding: "7px",
  };

  const handleAddressFocus = () => {
    if (!openPost) {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          setGoogleCoordinate({
            ...googleCoordinate,
            lat: position.coords.latitude,
            log: position.coords.longitude,
          });
          isOpenPost(true);
        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "서비스를 이용하기 위해서 위치정보가 필요합니다.",
            text: "브라우저 설정에서 위치권한을 허용하세요.",
          });
          setEdit(true);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    }
  };

  const postThemeStyle = {
    bgColor: "#D6FFEA",
    outlineColor: "#222222",
  };

  // 카테고리 변경하는 함수
  const changeCategory = (e) => {
    if (Number(e.target.value) === category.number) {
      setCategory({ ...category, number: null });
    } else {
      setCategory({ ...category, number: Number(e.target.value) });
    }
  };

  //내 동네소식 불러오기
  const requestMyNews = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/mypage/newslist`)
      .then((res) => {
        SetMyNews(res.data.data);
      })
      .catch();
  };
  //관심소식 가져오기
  const requestMyComment = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/mypage/comment`)
      .then((res) => {
        setMyComment(res.data.data);
      })
      .catch();
  };
  //내 거래글 가져오기
  const requestMyTrade = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/mypage/tradeList`).then((res) => {
      setMyTrade(res.data.data);
    });
  };

  //찜한 판매글 가져오기
  const requestMyLikeTrade = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/mypage/myLike`).then((res) => {
      setMyLikeTrade(res.data.data);
    });
  };

  //내 판매내역 가져오기

  //내 구매내역 가져오기

  // 닉네임 유효성 검사 함수
  const isNickname = (value) => {
    let regExp = /^[가-힣]{3,8}$/;
    return regExp.test(value);
  };

  useEffect(() => {
    if (userinfo.address === null) {
      Swal.fire({
        icon: "warning",
        title: "주소 등록을 해주세요.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [userinfo]);

  return (
    <Body>
      <StMypageHead>
        <div className={"mypage-master"}>
          <div className={"mypage-box"}>
            {edit ? (
              //기존 상태
              <div className={"mypage-wrap"}>
                <div className={"mypage-profile-box"}>
                  {/* {checkEdit ? (
                    <img
                      src={`${editInfo.img}`}
                      alt=""
                      className={"profile-img"}
                    ></img>
                  ) : (
                    <img
                      src={`${userinfo.img}`}
                      alt=""
                      className={"profile-img"}
                    ></img>
                  )} */}
                  <img
                    src={userinfo.img}
                    alt=""
                    className={"profile-img"}
                  ></img>
                </div>
                <div className={"mypage-userinfo-box"}>
                  <div className={"edit-wrap"}>
                    <div className={"edit-box"}>
                      <img
                        src={editImg}
                        alt=""
                        className={"edit-img"}
                        onClick={() => {
                          editHandler();
                        }}
                      ></img>
                    </div>
                  </div>
                  <div className={"mypage-userinfo-wrap"}>
                    <div className={"mypage-input-box"}>
                      <div className={"input-title"}>닉네임</div>
                      <div className={"input-tick"}>
                        {/* <input
                    type="text"
                    className={"input-area"}
                      defaultValue={userinfo.email}
                  ></input> */}
                        <div className={"input-area"}>
                          <div className={"userinfo-contents"}>
                            {userinfo.nickname}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={"mypage-input-box"}>
                      <div className={"input-title"}>이메일</div>
                      <div className={"input-tick"}>
                        {/* <input
                    type="text"
                    className={"input-area"}
                    defaultValue={userinfo.email}
                  ></input> */}
                        <div className={"input-area"}>
                          <div className={"userinfo-contents"}>
                            {userinfo.email}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={"mypage-input-box"}>
                      <div className={"input-title"}>동네</div>
                      <div className={"input-tick"}>
                        {/* <input
                    type="text"
                    className={"input-area"}
                    defaultValue={userinfo.address}
                  ></input> */}
                        <div className={"input-area"}>
                          <div className={"userinfo-contents"}>
                            {userinfo.address}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              //편집 상태
              <div className={"mypage-wrap"}>
                <div className={"mypage-profile-box"}>
                  {imgFile ? (
                    <img src={imgFile} alt="" className={"profile-img"}></img>
                  ) : (
                    <img
                      src={userinfo.img}
                      alt=""
                      className={"profile-img"}
                    ></img>
                  )}

                  <label for="input-file">
                    <FontAwesomeIcon className={"imgButton"} icon={faImage} />
                  </label>
                  <input
                    type="file"
                    name="file"
                    id="input-file"
                    accept="image/*"
                    onChange={photoChange}
                    style={{ display: "none" }}
                  />
                </div>
                <div className={"mypage-userinfo-box"}>
                  <div className={"edit-wrap"}>
                    <div className={"edit-box"}>
                      <FontAwesomeIcon
                        className={"edit-back-img"}
                        icon={faWindowClose}
                        onClick={() => {
                          cancelEdit();
                        }}
                      />
                      <FontAwesomeIcon
                        className={"edit-img"}
                        icon={faCheckSquare}
                        onClick={() => {
                          submitEditInfo();
                        }}
                      />
                    </div>
                  </div>
                  <div className={"mypage-userinfo-wrap"}>
                    <div className={"mypage-input-box"}>
                      <div className={"input-title"}>닉네임</div>
                      <div className={"input-tick"}>
                        <input
                          maxLength={"8"}
                          type="text"
                          className={"input-area edit"}
                          defaultValue={userinfo.nickname}
                          onChange={(e) => handleInputValue("nickname", e)}
                        ></input>

                        <div className={"dupicate-wrap"}>
                          <div className={"dupicate-button"}>
                            <div
                              className={"dupicate-check"}
                              onClick={() => checkDuplicate()}
                            >
                              중복 확인
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {nicknameChange ? null : checkNickname.nickname === true ? (
                      <div className={"nicknameNotice"}>
                        닉네임 중복 확인을 해주세요
                      </div>
                    ) : (
                      <div className={"nicknameNotice"}>
                        닉네임은 3~8자만 사용가능합니다
                      </div>
                    )}
                    <div className={"mypage-input-box"}>
                      <div className={"input-title"}>이메일</div>
                      <div className={"input-tick"}>
                        <div className={"input-area"}>
                          <div className={"userinfo-contents"}>
                            {userinfo.email}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={"mypage-input-box"}>
                      <div className={"input-title"}>동네</div>
                      <div className={"input-tick"}>
                        <input
                          className={"input-area"}
                          value={editInfo.address}
                          onFocus={handleAddressFocus}
                        ></input>
                        {openPost && (
                          <ModalBackground onClick={() => modalClose3()}>
                            <DaumPostcode
                              style={postCodeStyle}
                              theme={postThemeStyle}
                              autoClose
                              onComplete={onCompletePost}
                            />
                          </ModalBackground>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className={"button-wrap"}>
              <div className={"button-box-empty"}></div>
              <div className={"button-box"}>
                <div className={"button-area"}>
                  <img src={lock} alt="" className={"button-icon"}></img>
                  <div onClick={modalClose} className={"request-button"}>
                    비밀번호 변경
                  </div>
                  {modalOpen && (
                    <PasswordModal modalClose={modalClose}></PasswordModal>
                  )}
                </div>
                <div className={"button-area"}>
                  <img src={cancel} alt="" className={"button-icon"}></img>
                  <div onClick={modalClose2} className={"request-button"}>
                    회원탈퇴
                  </div>
                  {modalOpen2 && (
                    <WithdrawalModal
                      modalClose2={modalClose2}
                      handleWithdrawl={handleWithdrawl}
                    ></WithdrawalModal>
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
                      <StCategoryButton
                        value={1}
                        onClick={(e) => {
                          changeCategory(e);
                          requestMyTrade();
                        }}
                        select={category.number === 1 ? true : false}
                      >
                        내 거래글
                      </StCategoryButton>
                    </div>
                    <div className={"category-tick"}>
                      <StCategoryButton
                        value={2}
                        onClick={(e) => {
                          changeCategory(e);
                          requestMyNews();
                        }}
                        select={category.number === 2 ? true : false}
                      >
                        내 동네소식
                      </StCategoryButton>
                    </div>
                    <div className={"category-tick"}>
                      <StCategoryButton
                        value={3}
                        onClick={(e) => {
                          changeCategory(e);
                        }}
                        select={category.number === 3 ? true : false}
                      >
                        판매내역
                      </StCategoryButton>
                    </div>
                  </div>
                  <div className={"category-half"}>
                    <div className={"category-tick"}>
                      <StCategoryButton
                        value={4}
                        onClick={(e) => changeCategory(e)}
                        select={category.number === 4 ? true : false}
                      >
                        구매내역
                      </StCategoryButton>
                    </div>
                    <div className={"category-tick"}>
                      <StCategoryButton
                        value={5}
                        onClick={(e) => {
                          changeCategory(e);
                          requestMyLikeTrade();
                        }}
                        select={category.number === 5 ? true : false}
                      >
                        찜한 판매글
                      </StCategoryButton>
                    </div>
                    <div className={"category-tick"}>
                      <StCategoryButton
                        value={6}
                        onClick={(e) => {
                          changeCategory(e);
                          requestMyComment();
                        }}
                        select={category.number === 6 ? true : false}
                      >
                        관심 소식
                      </StCategoryButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={"content-head"}>
          <div className={"content-wrap"}>
            {category.number === 1
              ? myTrade.map((trade, index) => (
                <Trade
                  mypage={true}
                  trade={trade}
                  key={index}
                  num={index}
                  login={login}
                  userinfo={userinfo}
                />
              ))
              : null}

            {category.number === 2
              ? myNews.map((news, index) => (
                <News mypage={true} news={news} key={index} />
                // <MypageNews key={index} news={news} />
              ))
              : null}

            {category.number === 6
              ? myComment.map((news, index) => (
                <News mypage={true} news={news} key={index} />
              ))
              : null}

            {category.number === 5
              ? myLikeTrade.map((trade, index) => (
                <Trade
                  mypage={true}
                  trade={trade}
                  key={index}
                  num={index}
                  login={login}
                  userinfo={userinfo}
                />
              ))
              : null}
          </div>
        </div>
      </StMypageHead>
    </Body>
  );
}
