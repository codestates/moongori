import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Loading from "./../components/Loading";
import { Link } from "react-router-dom";
import noData from "./../images/noData.png";

const StChatBody = styled.div`
  min-height: 700px;
  margin-bottom: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  a {
    width: 100%;
    height: 100%;
    color: black;
    text-decoration: none;
  }
`;

const StChatBox = styled.div`
  border-radius: 15px;
  border: 1px solid #aae8c5;
  max-width: 800px;
  height: 120px;
  width: 60%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  cursor: pointer;
  :hover {
    box-shadow: #b7b7b7 5px 5px 5px;
  }
  :active {
    box-shadow: none;
  }
`;
const StChatInfo = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StChatUser = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  padding-left: 10px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    object-fit: cover;
    margin-right: 15px;
  }
  div {
    font-weight: bold;
  }
  @media all and (max-width: 500px) {
    width: 100%;
  }
`;

const StChatPost = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  img {
    height: 50px;
    width: 50px;
    margin-right: 10px;
  }
  @media all and (max-width: 500px) {
    display: none;
  }
`;

export default function ChatList({ userinfo }) {
  const [chatListInfo, setChatListInfo] = useState(null);
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/room`).then((res) => {
      const info = [];
      for (let i = 0; i < res.data.chatList.length; i++) {
        const obj = {
          roomId: res.data.chatList[i].room_Id,
          tradePost: res.data.chatList[i].room.tradePost,
          user: res.data.opponentInfo[i].user,
        };
        info.push(obj);
      }
      setChatListInfo(info);
      isLoading(false);
    });
  }, []);

  return (
    <StChatBody>
      {chatListInfo ? (
        chatListInfo.map((chat, index) => (
          <StChatBox key={index}>
            <Link to={`/chat/=${chat.roomId}`}>
              <StChatInfo>
                <StChatUser>
                  <img
                    src={chat.user.img}
                    className={"profile"}
                    alt={"유저 프로필"}
                  />
                  <div className={"usernickname"}>{chat.user.nickname}</div>
                </StChatUser>
                <StChatPost>
                  <img
                    src={chat.tradePost.img.split(",")[0]}
                    alt={"포스트 이미지"}
                  />
                  <div>{chat.tradePost.title}</div>
                </StChatPost>
              </StChatInfo>
            </Link>
          </StChatBox>
        ))
      ) : (
        <Loading />
      )}
      {!loading && chatListInfo.length === 0 ? (
        <img
          style={{ height: "500px", width: "500px" }}
          src={noData}
          alt="데이터없음"
        ></img>
      ) : null}
    </StChatBody>
  );
}
