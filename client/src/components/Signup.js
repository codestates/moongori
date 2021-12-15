/* eslint-disable no-useless-escape */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Swal from "sweetalert2";
import DaumPostcode from "react-daum-postcode";
import logoImg from "./../images/Logo.png";
import { StModalDiv, StWriteDiv, StRequestButton } from "./Login";
axios.defaults.withCredentials = true;

const StPostModalDiv = styled.div`
  z-index: 11;
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
`;

const StModalReUse = styled(StModalDiv)`
  .wrap {
    min-height: 700px;
  }
`;

const StWriteReUse = styled(StWriteDiv)`
  .check {
    display: flex;
    input {
      width: 70%;
      border-right: 1px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      font-size: ${(props) => props.fontSize || "1em"};
    }
    button {
      width: 30%;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      background: #aae8c5;
      :hover {
        box-shadow: gray 3px 3px 3px;
      }
      :active {
        box-shadow: none;
      }
      @media all and (max-width: 514px) {
        font-size: 0.5em;
      }
    }
  }
`;

const StAddressModalDiv = styled.div`
  margin-top: 5px;
  color: ${(props) => props.color || "red"};
  font-size: 0.9em;
`;

export function getDistance(lat1, lon1, lat2, lon2) {
  if (lat1 == lat2 && lon1 == lon2) return 0;

  var radLat1 = (Math.PI * lat1) / 180;
  var radLat2 = (Math.PI * lat2) / 180;
  var theta = lon1 - lon2;
  var radTheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radLat1) * Math.sin(radLat2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
  if (dist > 1) dist = 1;

  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515 * 1.609344 * 1000;
  if (dist < 100) dist = Math.round(dist / 10) * 10;
  else dist = Math.round(dist / 100) * 100;

  return dist;
}

export default function Signup({ isSingUpModal, showLoginModal }) {
  const [signUpInfo, setSignUpInfo] = useState({
    email: "",
    nickname: "",
    address: "",
    town: "",
    password: "",
    passwordCheck: "",
  });
  const [checkInfo, setCheckInfo] = useState({
    email: false, // 이메일 유효성
    duplicatedEmail: false, // 이메일 중복
    nickname: false, // 닉네임 유효성
    duplicatedNickname: false, // 닉네임 중복
    address: false,
    password: false, // 패스워드 유효성
    passwordCheck: false, // 패스워드 일치
  });
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
  const navigate = useNavigate();

  const handleInputValue = (key, e) => {
    setSignUpInfo({ ...signUpInfo, [key]: e.target.value });
    // 이메일 검사
    if (key === "email") {
      // 유효성 검사 통과하면 서버에 중복확인 하기
      if (isEmail(e.target.value)) {
        setCheckInfo({ ...checkInfo, email: true, duplicatedEmail: false });
      } else {
        // 유효성 검사 실패
        setCheckInfo({ ...checkInfo, email: false, duplicatedEmail: false });
      }
    }
    // 닉네임 검사
    if (key === "nickname") {
      // 닉네임 유효성 검사
      if (isNickname(e.target.value)) {
        setCheckInfo({
          ...checkInfo,
          nickname: true,
          duplicatedNickname: false,
        });
      } else {
        // 유효성 검사 실패
        setCheckInfo({
          ...checkInfo,
          nickname: false,
          duplicatedNickname: false,
        });
      }
    }
    // 비밀번호 검사
    if (key === "password") {
      // 비밀번호 유효성 검사
      if (isPassword(e.target.value)) {
        if (e.target.value === signUpInfo.passwordCheck) {
          // 비밀번호 사용
          setCheckInfo({ ...checkInfo, password: true, passwordCheck: true });
        } else {
          setCheckInfo({ ...checkInfo, password: true, passwordCheck: false });
        }
      } else {
        // 유효성 검사 실패
        setCheckInfo({ ...checkInfo, password: false, passwordCheck: false });
      }
    }
    // 비밀번호 확인 검사
    if (key === "passwordCheck") {
      if (checkInfo.password) {
        if (e.target.value === signUpInfo.password) {
          setCheckInfo({ ...checkInfo, passwordCheck: true });
        } else {
          setCheckInfo({ ...checkInfo, passwordCheck: false });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "비밀번호 먼저 입력하세요.",
        });
        e.target.value = "";
      }
    }
  };

  // 이메일 중복검사 함수
  const checkEmail = () => {
    // 유효성 검사를 통과한 이메일인지 확인
    if (checkInfo.email) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/user/email`, {
          email: signUpInfo.email,
        })
        .then(() => {
          // 이메일 사용 가능
          setCheckInfo({
            ...checkInfo,
            duplicatedEmail: true,
          });
          Swal.fire({
            icon: "success",
            title: "사용 가능한 이메일입니다.",
          });
        })
        .catch(() => {
          // 중복된 이메일
          Swal.fire({
            icon: "error",
            title: "중복된 이메일입니다.",
          });
        });
    } else {
      // 유효성검사를 통과 못한 이메일
      Swal.fire({
        icon: "error",
        title: "사용할 수 없는 이메일입니다.",
      });
    }
  };

  // 닉네임 중복검사 함수
  const checkNickname = () => {
    // 유효성 검사를 통과한 닉네임인지 확인
    if (checkInfo.nickname) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/user/nickname`, {
          nickname: signUpInfo.nickname,
        })
        .then(() => {
          // 닉네임 사용 가능
          setCheckInfo({
            ...checkInfo,
            duplicatedNickname: true,
          });
          Swal.fire({
            icon: "success",
            title: "사용 가능한 닉네임입니다.",
          });
        })
        .catch(() => {
          // 중복된 닉네임
          Swal.fire({
            icon: "error",
            title: "중복된 닉네임입니다.",
          });
        });
    } else {
      // 유효성검사를 통과 못한 닉네임
      Swal.fire({
        icon: "error",
        title: "사용할 수 없는 닉네임입니다.",
      });
    }
  };

  // 이메일 유효성 검사 함수
  const isEmail = (value) => {
    let regExp =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{3,})$/i;
    return regExp.test(value);
  };

  // 닉네임 유효성 검사 함수
  const isNickname = (value) => {
    let regExp = /^[가-힣]{3,8}$/;
    return regExp.test(value);
  };

  // 비밀번호 유효성 검사 함수
  const isPassword = (value) => {
    let regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;
    return regExp.test(value);
  };

  // 서버에 회원가입 요청하는 함수
  const signUp = () => {
    if (
      checkInfo.email &&
      checkInfo.duplicatedEmail &&
      checkInfo.nickname &&
      checkInfo.duplicatedNickname &&
      checkInfo.address &&
      checkInfo.password &&
      checkInfo.passwordCheck
    ) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/user/signup`, {
          email: signUpInfo.email,
          nickname: signUpInfo.nickname,
          address: signUpInfo.address,
          town: signUpInfo.town,
          password: signUpInfo.password,
          latitude: kakaoCoordinate.lat,
          longitude: kakaoCoordinate.log,
        })
        .then((res) => {
          isSingUpModal(false);
          navigate("/");
          Swal.fire({
            icon: "success",
            title: "이메일 인증을 완료해주세요.",
            // title: "회원가입이 완료되었습니다.",
            // text: "이메일 인증을 완료해주세요.",
          });
        });
    } else if (!checkInfo.email || signUpInfo.email === "") {
      Swal.fire({
        icon: "error",
        title: "이메일을 형식에 맞게 입력해주세요.",
      });
    } else if (!checkInfo.nickname || signUpInfo.nickname === "") {
      Swal.fire({
        icon: "error",
        title: "닉네임을 형식에 맞게 임력해주세요.",
      });
    } else if (!checkInfo.address || signUpInfo.address === "") {
      Swal.fire({
        icon: "error",
        title: "주소를 입력해주세요.",
      });
    } else if (!checkInfo.password || signUpInfo.password === "") {
      Swal.fire({
        icon: "error",
        title: "비밀번호를 형식에 맞게 입력해주세요.",
      });
    } else if (!checkInfo.passwordCheck || signUpInfo.passwordCheck === "") {
      Swal.fire({
        icon: "error",
        title: "비밀번호 확인을 해주세요.",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "입력한 회원가입 정보를 확인해주세요.",
      });
    }
  };

  // 주소 넣는 함수 (위도, 경도로 위치 인증 포함)
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

          setSignUpInfo({ ...signUpInfo, town: data.bname, address: fullAddr });
          setCheckInfo({ ...checkInfo, address: true });
          isOpenPost(false);
        } else {
          setSignUpInfo({ ...signUpInfo, address: "", town: "" });
          setCheckInfo({ ...checkInfo, address: false });
          isOpenPost(false);
          Swal.fire({
            icon: "error",
            title: "입력하신 위치와 현재 위치가 일치하지 않습니다.",
          });
        }
      }
    });
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
          isSingUpModal(false);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    }
  };

  const postCodeStyle = {
    display: "block",
    position: "fixed",
    top: "50%",
    left: "50%",
    width: "400px",
    height: "500px",
    transform: "translate(-50%, -50%)",
    padding: "7px",
  };

  const postThemeStyle = {
    bgColor: "#D6FFEA",
    outlineColor: "#222222",
  };

  return (
    <>
      {openPost ? (
        <StPostModalDiv onClick={() => isOpenPost(false)}>
          <DaumPostcode
            style={postCodeStyle}
            theme={postThemeStyle}
            autoClose
            onComplete={onCompletePost}
          />
        </StPostModalDiv>
      ) : null}
      <StModalReUse onClick={() => isSingUpModal()}>
        <div className={"wrap"} onClick={(e) => e.stopPropagation()}>
          <div className={"logo"}>
            <Link to={"/"} onClick={() => isSingUpModal(false)}>
              <img src={logoImg} alt={"로고"} />
            </Link>
            <Link
              to={"/"}
              onClick={() => isSingUpModal(false)}
              className={"logoName"}
            >
              <div>moongori</div>
            </Link>
          </div>
          <span>
            이미 회원이신가요?
            <span className={"change-modal"} onClick={showLoginModal}>
              로그인 하러가기
            </span>
          </span>
          <div className={"inputs"}>
            <StWriteReUse>
              <div>이메일</div>
              <div className={"check"}>
                <input
                  type={"email"}
                  onChange={(e) => handleInputValue("email", e)}
                ></input>
                <button onClick={checkEmail}>중복 확인</button>
              </div>
            </StWriteReUse>
            {checkInfo.duplicatedEmail ? (
              <StAddressModalDiv color={"blue"}>
                사용 가능한 이메일입니다.
              </StAddressModalDiv>
            ) : signUpInfo.email !== "" ? (
              checkInfo.email ? (
                <StAddressModalDiv>중복확인을 해주세요.</StAddressModalDiv>
              ) : (
                <StAddressModalDiv>
                  사용할 수 없는 이메일입니다.
                </StAddressModalDiv>
              )
            ) : null}
            <StWriteReUse>
              <div>닉네임</div>
              <div className={"check"}>
                <input
                  type={"text"}
                  onChange={(e) => handleInputValue("nickname", e)}
                ></input>
                <button onClick={checkNickname}>중복 확인</button>
              </div>
            </StWriteReUse>
            {checkInfo.duplicatedNickname ? (
              <StAddressModalDiv color={"blue"}>
                사용 가능한 닉네임입니다.
              </StAddressModalDiv>
            ) : signUpInfo.nickname !== "" ? (
              checkInfo.nickname ? (
                <StAddressModalDiv>중복확인을 해주세요.</StAddressModalDiv>
              ) : (
                <StAddressModalDiv>
                  한글 3~8자리만 사용 가능합니다.
                </StAddressModalDiv>
              )
            ) : null}
            <StWriteReUse fontSize={"0.5em"}>
              <div>주소</div>
              <input
                type={"text"}
                value={signUpInfo.address}
                onFocus={handleAddressFocus}
              ></input>
            </StWriteReUse>
            <StWriteReUse>
              <div>비밀번호</div>
              <input
                type={"password"}
                onChange={(e) => handleInputValue("password", e)}
              ></input>
            </StWriteReUse>
            {signUpInfo.password !== "" ? (
              checkInfo.password ? null : (
                <StAddressModalDiv>
                  8 ~ 16자 영문, 숫자 조합 입니다.
                </StAddressModalDiv>
              )
            ) : null}
            <StWriteReUse>
              <div>비밀번호확인</div>
              <input
                type={"password"}
                onChange={(e) => handleInputValue("passwordCheck", e)}
              ></input>
            </StWriteReUse>
            {signUpInfo.passwordCheck !== "" ? (
              checkInfo.passwordCheck ? null : (
                <StAddressModalDiv>
                  비밀번호가 일치하지 않습니다.
                </StAddressModalDiv>
              )
            ) : null}
          </div>
          <div className={"buttons"}>
            <StRequestButton background={"#AAE8C5"} onClick={signUp}>
              회원가입
            </StRequestButton>
          </div>
        </div>
      </StModalReUse>
    </>
  );
}
