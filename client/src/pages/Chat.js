import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import styled from "styled-components";

const domain = process.env.REACT_APP_API_URL;
const socket = io.connect(domain);
export default function Chat({ userinfo }) {
  const { id } = useParams();

  const [chat, setChat] = useState([]);
  const [chatInfo, setChatInfo] = useState({
    message: "",
    nickname: "",
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
    let text = { message: `${user}님이 입장했습니다.` };
    setChat([...chat, text]);
  });

  useEffect(() => {
    if (userinfo.id) {
      setChatInfo({
        ...chatInfo,
        nickname: userinfo.nickname,
        userId: userinfo.id,
      });
      socket.emit("get_room", Number(id), userinfo.nickname, userinfo.id);
      // 저장된 대화들을 불러오는 곳
      socket.on("messagesAll", (data) => {
        // console.log("messagesAll;;", data);
        setChat(data);
      });
    }
  }, [userinfo]);

  useEffect(() => {
    socket.on("message", ({ nickname, message }) => {
      setChat([...chat, { name: nickname, message }]);
    });
  });

  console.log("chatInfo;;;", chatInfo);
  console.log("chat;;;", chat);
  return (
    <div>
      채팅페이지
      <div>
        <input
          name="message"
          onChange={textChange}
          // value={state.message}
          variant="outlined"
          label="Message"
        />
        <button
          onClick={() => {
            handleMessage();
          }}
        >
          전송
        </button>
      </div>
    </div>
  );
}
