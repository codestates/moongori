/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";
import Swal from "sweetalert2";
import styled from "styled-components";

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
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
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
  margin: 10px 10px 0 10px;
  width: 100%;
  height: 95%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  .in-out {
    text-align: center;
    font-size: 1em;
    font-weight: bold;
  }
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
      @media all and (max-width: 870px) {
        width: 82%;
        margin-left: 5px;
        margin-right: 0px;
      }
      @media all and (max-width: 500px) {
        width: 80%;
      }
    }
    .button-style {
      margin-right: 5px;
      border-radius: 5px;
      border: none;
      width: 10%;
      height: 90%;
      background: #aae8c5;
      cursor: pointer;
      @media all and (max-width: 870px) {
        width: 13%;
        margin-left: 5px;
      }
    }
  }
`;

const StChat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.mine ? "flex-start" : "flex-end")};
  margin: 0 10px 20px 10px;
  .userInfo {
    display: flex;
    margin-bottom: 5px;
    img {
      width: 20px;
      height: 20px;
      object-fit: cover;
      border-radius: 10px;
    }
  }
  .msg {
    padding: 5px;
    background: ${(props) => (props.mine ? "#aae8c5" : "#E0ECE3")};
    border-radius: 10px;
  }
`;

const StChatHeader = styled.div`
  border: 1px solid;
  width: 60%;
  max-width: 800px;
  .post {
    background: #aae8c5;
    display: flex;
    justify-content: space-between;
    .postInfo {
      width: 100%;
      display: flex;
      img {
        margin-right: 10px;
        height: 50px;
        width: 50px;
      }
      .title-cost {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
    button {
      width: 20%;
      border: 1px solid gray;
      background: #92e3a9;
    }
  }
  @media all and (max-width: 768px) {
    width: 85%;
  }
`;

export default function Chat({ userinfo }) {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState([]);
  const [chat, setChat] = useState([]);
  const [chatInfo, setChatInfo] = useState({
    message: "",
    nickname: "",
    img: "",
    roomNum: Number(id),
    userId: 0,
  });

  const messagesEndRef = useRef(null);
  const msgInputRef = useRef(null);

  const textChange = (e) => {
    if (e.key === "Enter") {
      handleMessage();
      e.target.value = "";
    } else {
      setChatInfo({ ...chatInfo, message: e.target.value });
    }
  };

  const handleMessage = () => {
    const { message, nickname, roomNum, userId } = chatInfo;
    if (message !== "") {
      socket.emit("message", {
        nickname,
        userId,
        message,
        roomNum,
      });
      msgInputRef.current.value = "";
      setChatInfo({ ...chatInfo, message: "" });
    }
  };

  const changeState = async () => {
    if (
      postInfo.user_Id === userinfo.id &&
      (postInfo.state === 1 || postInfo.state === 2)
    ) {
      Swal.fire({
        title: "거래를 완료하셨나요?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "취소",
        confirmButtonText: "확인",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .patch(
              `${process.env.REACT_APP_API_URL}/trade/state/${postInfo.id}`,
              {
                state: 3,
              }
            )
            .then((res) => {
              Swal.fire({
                icon: "info",
                title: "준비중인 서비스입니다.",
              });
            });
        }
      });
    } else {
      Swal.fire({
        icon: "info",
        title: "준비중인 서비스입니다.",
      });
    }
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/room/${id}`).then((res) => {
      setPostInfo(res.data.data.tradePost);
    });

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
        let allData = [];
        data.map((el) =>
          allData.push({
            userId: el.user_Id,
            nickname: el.user.nickname,
            message: el.message,
            img: el.user.img,
          })
        );
        setChat(allData);
      });

      socket.on("welcome", (user) => {
        let text = { text: `${user[1]}님이 입장했습니다.` };
        let allData = [];
        user[0].map((el) =>
          allData.push({
            userId: el.user_Id,
            nickname: el.user.nickname,
            message: el.message,
            img: el.user.img,
          })
        );
        setChat([...allData, text]);
      });
    }
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    if (messagesEndRef) {
      messagesEndRef.current.scrollTo(0, Number.MAX_SAFE_INTEGER);
    }
  };

  useEffect(() => {
    socket.on("message", ({ userId, nickname, message, img }) => {
      setChat([...chat, { userId, nickname, message, ...img }]);
    });
    socket.on("bye", (user) => {
      let text = { text: `${user}님이 나갔습니다.` };
      setChat([...chat, text]);
    });
    scrollToBottom();
  });

  const renderChat = () => {
    return chat.map((el, idx) =>
      el.text ? (
        <div className={"in-out"} key={idx}>
          {el.text}
        </div>
      ) : (
        <StChat mine={el.userId === userinfo.id} key={idx}>
          <div className={"userInfo"}>
            <img src={el.img} alt={"유저 프로필"} />
            <div>{el.nickname}</div>
          </div>
          <div className={"msg"}>{el.message}</div>
        </StChat>
      )
    );
  };

  return (
    <StChatRoomBody>
      <StChatHeader>
        <div className={"post"}>
          <div className={"postInfo"}>
            <img src={postInfo.img} alt={"포스트 이미지"} />
            <div className={"title-cost"}>
              <div>{postInfo.title}</div>
              <div>판매가격 :{postInfo.sCost} 원</div>
            </div>
          </div>
          <button onClick={changeState} type={"button"}>
            후기남기기
          </button>
        </div>
      </StChatHeader>
      <StChatBox>
        <StChatArea ref={messagesEndRef}>
          {chat.length === 0 ? null : renderChat()}
        </StChatArea>
        <StInputArea>
          <div className={"input-area"}>
            <input
              placeholder={"대화를 입력해주세요"}
              type={"text"}
              className={"input-style"}
              onKeyUp={(e) => textChange(e)}
              ref={msgInputRef}
            />
            <button className={"button-style"} onClick={handleMessage}>
              전송
            </button>
          </div>
        </StInputArea>
      </StChatBox>
    </StChatRoomBody>
  );
}
