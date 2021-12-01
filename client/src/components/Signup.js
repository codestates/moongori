import React from "react";
import { Link } from "react-router-dom";
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
  background: rgba(224, 224, 224, 0.7);
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

//! 해야할 부분
// 이메일 인증하기
// 주소API로 입력

export default function Signup({ isSingUpModal, showLoginModal }) {
  const [signUpInfo, setSignUpInfo] = useState({
    email: "",
    nickname: "",
    address: "",
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

  const handleInputValue = (key, e) => {
    setSignUpInfo({ ...signUpInfo, [key]: e.target.value });
    // 이메일 검사
    if (key === "email") {
      // 유효성 검사 통과하면 서버에 중복확인 하기
      if (isEmail(e.target.value)) {
        axios
          .post(`${process.env.SERVER}/user/email`, { email: e.target.value })
          .then(() => {
            // 이메일 사용가능
            setCheckInfo({ ...checkInfo, email: true, duplicatedEmail: true });
          })
          .catch(() => {
            // 중복된 이메일
            setCheckInfo({ ...checkInfo, email: true, duplicatedEmail: false });
          });
      } else {
        // 유효성 검사 실패
        setCheckInfo({ ...checkInfo, email: false });
      }
    }
    // 닉네임 검사
    if (key === "nickname") {
      // 닉네임 유효성 검사
      if (isNickname(e.target.value)) {
        setCheckInfo({ ...checkInfo, nickname: true });
      } else {
        // 유효성 검사 실패
        setCheckInfo({ ...checkInfo, nickname: false });
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

  // 닉네임 중복검사 함수
  const checkNickname = () => {
    // 유효성 검사를 통과한 닉네임인지 확인
    if (checkInfo.nickname) {
      axios
        .post(`${process.env.SERVER}/user/nickname`, {
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
    let regExp = /^[가-힣]{2,8}|[a-zA-Z]{2,8}\s[a-zA-Z]{2,8}$/;
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
        .post(`${process.env.SERVER}/user/signup`, {
          email: signUpInfo.email,
          nickname: signUpInfo.nickname,
          address: signUpInfo.address,
          password: signUpInfo.password,
        })
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "회원가입이 완료되었습니다.",
            timer: 1500,
          });
          showLoginModal();
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "회원정보를 모두 입력해주세요.",
      });
    }
  };

  const onCompletePost = (data) => {
    let fullAddr = data.address;
    let extraAddr = "";

    if (data.addressType === "R") {
      if (data.buildingName !== "") {
        extraAddr +=
          extraAddr !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      if (data.sigungu !== "") {
        extraAddr += `, ${data.sigungu}`;
      }
      if (data.bname !== "") {
        extraAddr += `, ${data.bname}`;
      }
      fullAddr += extraAddr !== "" ? ` ${extraAddr}` : "";
    }
    setSignUpInfo({ ...signUpInfo, ["address"]: fullAddr });
    setCheckInfo({ ...checkInfo, address: true });
    isOpenPost(false);
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
                <button>이메일인증</button>
              </div>
            </StWriteReUse>
            {signUpInfo.email !== "" ? (
              checkInfo.email ? null : (
                <StAddressModalDiv>
                  사용할 수 없는 이메일입니다.
                </StAddressModalDiv>
              )
            ) : null}
            {signUpInfo.email !== "" ? (
              checkInfo.email && !checkInfo.duplicatedEmail ? (
                <StAddressModalDiv>중복된 이메일입니다.</StAddressModalDiv>
              ) : null
            ) : null}
            {signUpInfo.email !== "" ? (
              checkInfo.duplicatedEmail ? (
                <StAddressModalDiv color={"blue"}>
                  사용 가능한 이메일입니다.
                </StAddressModalDiv>
              ) : null
            ) : null}
            <StWriteReUse>
              <div>닉네임</div>
              <div className={"check"}>
                <input
                  type={"text"}
                  onChange={(e) => handleInputValue("nickname", e)}
                ></input>
                <button onClick={checkNickname}>중복확인</button>
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
                  한글,영문 대소문자 2~8자리만 사용 가능합니다.
                </StAddressModalDiv>
              )
            ) : null}
            <StWriteReUse fontSize={"0.5em"}>
              <div>주소</div>
              <input
                type={"text"}
                value={signUpInfo.address}
                onFocus={() => isOpenPost(true)}
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
