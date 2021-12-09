import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StContent = styled.div`
  background: white;
  width: 60%;
  height: 100px;
  border-radius: 15px;
  border: 1px solid #aae8c5;
  margin-bottom: 20px;
  @media all and (max-width: 768px) {
    width: 90%;
  }
  &:hover {
    cursor: pointer;
    box-shadow: gray 3px 3px 3px;
  }
  &:active {
    box-shadow: none;
  }
  .title-tick {
    width: 100%;
    height: 25%;
    margin-top: 2px;
    margin-left: 5px;
    .title {
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      font-weight: bold;
      border-radius: 15px;
      background: #aae8c5;
      width: 50px;
      height: 100%;
    }
  }
  .content-tick {
    height: 35%;
    width: 100%;
    margin-left: 10px;
    .content {
      font-size: 11px;
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
  .address-tick {
    height: 20%;
    width: 100%;
    display: flex;
    margin-left: 10px;
    .address-area {
      font-size: 9px;
      color: gray;
      display: flex;
      width: 50%;
      .nickname {
        margin-right: 5px;
      }
    }
    .data-area {
      font-size: 9px;
      color: gray;
      width: 50%;
      display: flex;
      justify-content: end;
      margin-right: 20px;
    }
  }
  .comment-tick {
    height: 20%;
    width: 100%;
    display: flex;
    margin-left: 10px;
    .comment-area {
      display: flex;
      font-size: 9px;
      color: gray;
      .views {
        margin-right: 5px;
      }
    }
  }
`;
export function timeForToday(value) {
  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  );
  if (betweenTime < 1) return "방금전";
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}일전`;
  }

  return `${Math.floor(betweenTimeDay / 365)}년전`;
}
export default function MypageNews({ news, data }) {
  console.log("!!", news);
  return (
    <>
      {news ? (
        <StContent>
          <div className={"title-tick"}>
            <div className={"title"}>
              <div>{news.category}</div>
            </div>
          </div>
          <div className={"content-tick"}>
            <div className={"content"}>
              <div>{news.content}</div>
            </div>
          </div>
          <div className={"address-tick"}>
            <div className={"address-area"}>
              <div className={"nickname"}>{news.nickname}</div>
              <div className={"town"}>{news.town}</div>
            </div>
            <div className={"data-area"}>{timeForToday(news.createdAt)}</div>
          </div>
          <div className={"comment-tick"}>
            <div className={"comment-area"}>
              {" "}
              <div className={"views"}>조회수 {news.view}</div>
              <div className={"comment"}>댓글 {news.comment_cnt}</div>
            </div>
          </div>
        </StContent>
      ) : (
        <div>카테고리를 선태하세요</div>
      )}
    </>
  );
}
