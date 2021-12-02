import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logoImg from "./../images/Logo.png";
import axios from "axios";
import Swal from "sweetalert2";

axios.defaults.withCredentials = true;
const ModalContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  .password-modal {
    width: 420px;
    height: 480px;
    border-radius: 15px;
    background-color: #fff;
    // Modal 창 브라우저 가운데로 조정
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
  }
  .password-modal-wrap {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .password-modal-logo {
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      height: 40px;
      width: 40px;
    }
    .password-logoname {
      margin-left: 10px;
      font-size: 25px;
      font-family: Fredoka One;
    }
  }
  .password-modal-input-wrap {
    width: 100%;
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .password-modal-input {
      width: 80%;
      height: 33.3%;
      display: flex;
      justify-content: center;
      align-items: center;

      .password-input-title {
        width: 50%;
        text-align: start;
        font-size: 16px;
      }
      .password-input-tick {
        text-align: start;
        width: 50%;
        .password-text-input {
          width: 100%;
          height: 35px;
          border: 1px solid gray;
          border-radius: 5px;
        }
      }
    }
  }
  .password-password-check {
    width: 80%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    .password-password-button {
      height: 45px;
      width: 100%;
      border-radius: 5px;
      border: 1px gray;
      background-color: #aae8c5;
      cursor: pointer;
    }
  }
`;

export default function PasswordModal({ modalClose }) {
  const navigate = useNavigate();
  const onCloseModal = (e) => {
    console.log("e.target: ", e.target);
    console.log("e.tarcurrentTargetget: ", e.currentTarget);
    if (e.target === e.currentTarget) {
      modalClose();
    }
  };
  const [password, setPassword] = useState({
    currentPassword: "",
    modifyPassword: "",
    checkPassword: "",
  });
  const handleInputValue = (key) => (e) => {
    setPassword({ ...password, [key]: e.target.value });
  };
  console.log(password);
  const passwordHandler = () => {
    if (password.modifyPassword !== password.checkPassword) {
      Swal.fire({
        icon: "error",
        title: "비밀번호를 확인해주세요",
        text: "",
        footer: "",
      });
    } else {
      axios
        .patch("http://localhost:80/user/password", {
          currentPassword: password.currentPassword,
          modifyPassword: password.modifyPassword,
        })
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "비밀번호 변경 완료",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/mypage");
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "잘못된정보입니다",
            text: "",
            footer: "",
          });
        });
    }
  };

  return (
    <ModalContainer onClick={onCloseModal}>
      <div className={"password-modal"}>
        <div className={"password-modal-wrap"}>
          <div className={"password-modal-logo"}>
            <img src={logoImg}></img>
            <div className={"password-logoname"}>moongori</div>
          </div>
          <div className={"password-modal-input-wrap"}>
            <div className={"password-modal-input"}>
              <div className={"password-input-title"}>
                <div>현재 비밀번호</div>
              </div>
              <div className={"password-input-tick"}>
                <input
                  type="password"
                  className={"password-text-input"}
                  onChange={handleInputValue("currentPassword")}
                ></input>
              </div>
            </div>
            <div className={"password-modal-input"}>
              <div className={"password-input-title"}>변경할 비밀번호</div>
              <div className={"password-input-tick"}>
                <input
                  type="password"
                  className={"password-text-input"}
                  onChange={handleInputValue("modifyPassword")}
                ></input>
              </div>
            </div>
            <div className={"password-modal-input"}>
              <div className={"password-input-title"}>비밀번호 확인</div>
              <div className={"password-input-tick"}>
                <input
                  type="password"
                  className={"password-text-input"}
                  onChange={handleInputValue("checkPassword")}
                ></input>
              </div>
            </div>
          </div>
          <div className={"password-password-check"}>
            <button
              className={"password-password-button"}
              onClick={passwordHandler}
            >
              비밀번호 변경
            </button>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
}
