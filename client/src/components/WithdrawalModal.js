import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import logoImg from "./../images/Logo.png";
import axios from "axios";
import Swal from "sweetalert2";

axios.defaults.withCredentials = true;
const WithdrawalModalContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  .Withdrawal-modal {
    width: 420px;
    height: 400px;
    border-radius: 15px;
    background-color: #fff;
    // Modal 창 브라우저 가운데로 조정
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
  }
  .Withdrawal-modal-wrap {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .Withdrawal-modal-logo {
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      height: 40px;
      width: 40px;
    }
    .Withdrawal-logoname {
      margin-left: 10px;
      font-size: 25px;
      font-family: Fredoka One;
    }
  }
  .Withdrawal-modal-input-wrap {
    width: 100%;
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .Withdrawal-modal-input {
      width: 80%;
      height: 40%;
      display: flex;
      justify-content: center;
      align-items: center;

      .Withdrawal-input-title {
        width: 50%;
        text-align: start;
        font-size: 16px;
      }
      .Withdrawal-input-tick {
        text-align: start;
        width: 50%;
        .Withdrawal-text-input {
          width: 100%;
          height: 35px;
          border: 1px solid gray;
          border-radius: 5px;
        }
      }
    }
  }
  .Withdrawal-Withdrawal-check {
    width: 80%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    .Withdrawal-Withdrawal-button {
      height: 45px;
      width: 100%;
      border-radius: 5px;
      border: 1px gray;
      background-color: #aae8c5;
      cursor: pointer;
    }
  }
`;

export default function WithdrawalModal({ modalClose2 }) {
  const navigate = useNavigate();
  const onCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      modalClose2();
    }
  };
  const [checkWithdrawal, setcheckWithdrawal] = useState({
    password: "",
    checkPassword: "",
  });
  const handleInputValue = (key) => (e) => {
    setcheckWithdrawal({ ...checkWithdrawal, [key]: e.target.value });
  };
  const withdrawalHandler = () => {
    if (checkWithdrawal.password !== checkWithdrawal.checkPassword) {
      Swal.fire({
        icon: "error",
        title: "비밀번호를 확인해주세요",
        text: "",
        footer: "",
      });
    } else {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/user`)
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "회원탈퇴 완료",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
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
    <WithdrawalModalContainer onClick={onCloseModal}>
      <div className={"Withdrawal-modal"}>
        <div className={"Withdrawal-modal-wrap"}>
          <div className={"Withdrawal-modal-logo"}>
            <img src={logoImg} alt={"로고"}></img>
            <div className={"Withdrawal-logoname"}>moongori</div>
          </div>
          <div className={"Withdrawal-modal-input-wrap"}>
            <div className={"Withdrawal-modal-input"}>
              <div className={"Withdrawal-input-title"}>
                <div>현재 비밀번호</div>
              </div>
              <div className={"Withdrawal-input-tick"}>
                <input
                  type="password"
                  className={"Withdrawal-text-input"}
                  onChange={handleInputValue("password")}
                ></input>
              </div>
            </div>
            <div className={"Withdrawal-modal-input"}>
              <div className={"Withdrawal-input-title"}>비밀번호 확인</div>
              <div className={"Withdrawal-input-tick"}>
                <input
                  type="password"
                  className={"Withdrawal-text-input"}
                  onChange={handleInputValue("checkPassword")}
                ></input>
              </div>
            </div>
          </div>
          <div className={"Withdrawal-Withdrawal-check"}>
            <button
              className={"Withdrawal-Withdrawal-button"}
              onClick={() => {
                withdrawalHandler();
              }}
            >
              회원 탈퇴
            </button>
          </div>
        </div>
      </div>
    </WithdrawalModalContainer>
  );
}
