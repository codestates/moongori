import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import lock from "../images/locked.png";
import axios from "axios";
const StChatBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 200px;
`;

const StChatBox = styled.div`
  border-radius: 15px;
  border: 1px solid #b7b7b7;
  max-width: 800px;
  height: 120px;
  width: 60%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  :hover {
    box-shadow: #b7b7b7 5px 5px 5px;
    border: 1px solid #aae8c5;
  }
  :active {
    box-shadow: none;
  }
  @media all and (max-width: 768px) {
    width: 85%;
  }
`;
const StChatInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  width: 90%;
  height: 100%;
`;
const StChatUser = styled.div`
  width: 100%;
  heigth: 100%;
  display: flex;
  align-items: center;
  .userImg {
    width: 10%;
    .profile {
      width: 30px;
      height: 30px;
    }
  }
  .usernickname {
    margin-left: 10px;
    width: 90%;
    font-size: 13px;
  }
`;

export default function ChatList({ userinfo }) {
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/room`).then((res) => {
      console.log(res.data);
    });
  }, []);

  return (
    <StChatBody>
      <StChatBox>
        <StChatInfo>
          <StChatUser>
            <div className={"userImg"}>
              <img src={lock} className={"profile"} />
            </div>
            <div className={"usernickname"}>김코딩</div>
          </StChatUser>
        </StChatInfo>
      </StChatBox>
    </StChatBody>
  );
}
