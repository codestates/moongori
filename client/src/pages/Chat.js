import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import styled from "styled-components";
import lock from "../images/locked.png";

const domain = process.env.REACT_APP_API_URL;
const socket = io.connect(domain);

const StChatRoomBody = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 200px;
`;
const StChatBox = styled.div`
  border-radius: 10px;
  border: 1px solid #b7b7b7;
  max-width: 800px;
  width: 60%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  @media all and (max-width: 768px) {
    width: 85%;
  }
`;
const StChatArea = styled.div`
  width: 100%;
  height: 95%;
  display: flex;
  justify-content: space-between;
`;
const StInputArea = styled.div`
  margin-bottom: 10px;
  width: 100%;
  height: 5%;
  .input-area {
    width: 100%;
    height: 100%;
    .input-style {
      margin-left: 10px;
      margin-right: 5px;
      border-radius: 15px;
      border: 1px solid #b7b7b7;
      width: 85%;
      height: 87%;
    }
    .button-style {
      margin-right: 5px;
      border-radius: 5px;
      border: none;
      width: 10%;
      height: 90%;
      background: #aae8c5;
      cursor: pointer;
    }
  }
`;
const StChatYou = styled.div`
  margin-top: 10px;
  margin-left: 15px;
  display: flex;
`;
const StImg = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const StChatDiv = styled.div`
  margin-top: 20px;
  margin-left: 15px;
`;
const StChatMe = styled.div`
  margin-right: 15px;
`;
export default function Chat({ userinfo }) {
  const { id } = useParams();

  const [chat, setChat] = useState([]);
  const [chatInfo, setChatInfo] = useState({
    message: "",
    nickname: "",
    img: "",
    roomNum: Number(id),
    userId: 0,
  });

  const textChange = (e) => {
    setChatInfo({ ...chatInfo, message: e.target.value });
  };

  const handleMessage = () => {
    const { message, nickname, roomNum, userId } = chatInfo;
    socket.emit("message", {
      nickname,
      userId,
      message,
      roomNum,
    });
  };

  socket.on("welcome", (user) => {
    // console.log("welcome!!!", user);
    let text = { text: `${user}님이 입장했습니다.` };
    setChat([...chat, text]);
  });

  useEffect(() => {
    if (userinfo.id) {
      setChatInfo({
        ...chatInfo,
        nickname: userinfo.nickname,
        img: userinfo.img,
        userId: userinfo.id,
      });
      socket.emit("get_room", Number(id), userinfo.nickname, userinfo.id);
      // 처음에 대화들을 불러오는 곳
      socket.on("messagesAll", (data) => {
        console.log("messagesAll;;", data);
        let allData = [];
        data.map((el) =>
          allData.push({
            nickname: el.user.nickname,
            message: el.content,
            img: el.user.img,
          })
        );
        setChat(allData);
      });
    }
  }, [userinfo]);

  useEffect(() => {
    socket.on("message", ({ nickname, message, img }) => {
      setChat([...chat, { nickname, message, ...img }]);
    });
  });

  const renderChat = () => {
    return chat.map((el, idx) =>
      el.text ? (
        <div key={idx}>
          <h3>
            <span>{el.text}</span>
          </h3>
        </div>
      ) : (
        <div key={idx}>
          <img
            src={el.img}
            style={{ width: "20px", height: "20px", objectFit: "cover" }}
          />
          {el.nickname}: <span>{el.message}</span>
        </div>
      )
    );
  };

  console.log("chatInfo;;;", chatInfo);
  console.log("chat;;;", chat);
  return (
    <StChatRoomBody>
      <StChatBox>
        <StChatArea>
          <StChatYou>
            <StImg>
              <img src={lock} />
            </StImg>
            <StChatDiv>안녕하신가</StChatDiv>
          </StChatYou>
          <StChatMe>어 그래</StChatMe>
          {chat.length === 0 ? null : (
            <div>
              <div>{renderChat()}</div>
            </div>
          )}
        </StChatArea>
        <StInputArea>
          <div className={"input-area"}>
            <input
              autoFocus
              className={"input-style"}
              name="message"
              onChange={textChange}
              value={chatInfo.message}
              variant="outlined"
              label="Message"
            />
            <button
              className={"button-style"}
              onClick={() => {
                handleMessage();
              }}
            >
              전송
            </button>
          </div>
        </StInputArea>
      </StChatBox>
    </StChatRoomBody>
  );
}
