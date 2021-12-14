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

  useEffect(() => {
    if (userinfo.id) {
      setChatInfo({
        ...chatInfo,
        nickname: userinfo.nickname,
        userId: userinfo.id,
      });
      socket.emit("get_room", id, userinfo.nickname, userinfo.id);
      // 현재 게시물에 저장된 대화들을 불러오는 곳
      socket.on("load all messages", (data) => {
        let loadData = [];
        data.forEach((message) => {
          loadData.push(message);
        });
        setChat(loadData);
      });
    }
  }, [userinfo]);
  console.log("chatInfo;;;", chatInfo);
  // console.log("chat;;;", chat);
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
