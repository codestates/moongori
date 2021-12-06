import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { category, timeForToday } from "./../components/News";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import Loading from "./../components/Loading";
import { StContentInfoDiv } from "./../components/News";
axios.defaults.withCredentials = true;

const StBodyDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 200px;
`;

const StContentsDiv = styled(StBodyDiv)`
  width: 70%;
  margin-top: 100px;
  margin-bottom: 40px;
  .category {
    font-size: 2em;
    font-weight: bold;
  }
`;

const StPostHeaderDiv = styled.div`
  border-bottom: 1px solid;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding: 20px;
  .icon {
    padding: 10px 10px 0 0;
    font-size: 20px;
    svg {
      cursor: pointer;
      margin-right: 10px;
    }
  }
`;

const StPostUserDiv = styled.div`
  flex: 0.9 0 0;
  width: 200px;
  display: flex;
  img {
    height: 35px;
    width: 35px;
  }
  .info {
    margin-left: 10px;
    text-align: left;
    span {
      margin-right: 20px;
    }
  }
`;

const StPostBodyDiv = styled.div`
  min-height: 250px;
  padding: 50px 0 50px 0;
  width: 100%;
  text-align: left;
  border-bottom: 1px solid;
`;

const StContentInfoReUse = styled(StContentInfoDiv)``;

const StCommentInputDiv = styled.div`
  width: 100%;
  text-align: left;
  margin-top: 40px;
  .comment-cnt {
    font-size: 1.5em;
    margin-bottom: 10px;
  }
  .input-button {
    border: 1px solid;
    height: 100px;
    input {
      border: none;
      height: 60%;
      width: 99%;
      font-size: 1em;
    }
    div {
      border-top: 1px solid #c4c4c4;
      text-align: right;
      button {
        border-radius: 30px;
        background: #92e3a9;
        height: 30px;
        margin: 3px 10px 0 0;
        width: 70px;
      }
    }
  }
`;

const StCommentListDiv = styled.div`
  margin-top: 40px;
  width: 100%;
`;

const StPostHeaderReUse = styled(StPostHeaderDiv)`
  border-bottom: 1px solid #c4c4c4;
  width: 95%;
  img {
    padding-top: 10px;
  }
`;

export default function NewsPost({ login, userinfo }) {
  const { id } = useParams();
  const [contents, setContents] = useState({});
  const [commentList, setCommentList] = useState([]);
  const [postUser, setPostUser] = useState(null);
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    isLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/news/post/${id}`)
      .then((res) => {
        console.log(userinfo);
        console.log(res.data.data);
        setContents(res.data.data);
        setCommentList(res.data.data.comments);
        setPostUser(res.data.data.user);
        isLoading(false);
      });
  }, [id]);

  return (
    <StBodyDiv>
      {loading ? (
        <Loading />
      ) : (
        <StContentsDiv>
          <div className={"category"}>{category[`${contents.category}`]}</div>
          <StPostHeaderDiv>
            <StPostUserDiv>
              <img src={postUser.img} alt="프로필사진"></img>
              <div className={"info"}>
                <StContentInfoReUse>
                  <span>{postUser.nickname}</span>
                  <span>{postUser.town}</span>
                </StContentInfoReUse>
                <StContentInfoReUse color={"#c4c4c4"}>
                  <span>조회수 {contents.view}</span>
                  <span>{timeForToday(contents.createdAt)}</span>
                </StContentInfoReUse>
              </div>
            </StPostUserDiv>
            {login && userinfo.id === contents.user_Id ? (
              <div className={"icon"}>
                <FontAwesomeIcon icon={faPencilAlt} />
                <FontAwesomeIcon icon={faTrashAlt} />
              </div>
            ) : null}
          </StPostHeaderDiv>
          <StPostBodyDiv>
            <p>{contents.content}</p>
          </StPostBodyDiv>
          <StCommentInputDiv>
            <div className="comment-cnt">댓글 {contents.comment_cnt}</div>
            <div className="input-button">
              <input type={"text"} placeholder={"댓글 입력"}></input>
              <div>
                <button type={"button"}>등 록</button>
              </div>
            </div>
          </StCommentInputDiv>
          <StCommentListDiv>
            {commentList.map((comment, index) => (
              <StPostHeaderReUse key={index}>
                <StPostUserDiv>
                  <img src={comment.user.img} alt="프로필사진"></img>
                  <div className={"info"}>
                    <StContentInfoReUse>
                      <span>{comment.user.nickname}</span>
                      <span>{comment.user.town}</span>
                    </StContentInfoReUse>
                    <div>{comment.comment}</div>
                    <StContentInfoReUse color={"#c4c4c4"}>
                      <span>{timeForToday(contents.createdAt)}</span>
                    </StContentInfoReUse>
                  </div>
                </StPostUserDiv>
                {login && userinfo.id === comment.user.id ? (
                  <div className={"icon"}>
                    <FontAwesomeIcon icon={faPencilAlt} />
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </div>
                ) : null}
              </StPostHeaderReUse>
            ))}
          </StCommentListDiv>
        </StContentsDiv>
      )}
    </StBodyDiv>
  );
}
