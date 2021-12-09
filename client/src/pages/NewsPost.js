import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { category, timeForToday, StContentInfoDiv } from "./../components/News";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import Loading from "./../components/Loading";
import MapContainer from "../components/MapContainer";
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
  width: 55%;
  margin-top: 100px;ory
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
    @media all and (max-width: 540px) {
      font-size: 15px;
    }
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
    margin: 10px 10px 0 0;
    @media all and (max-width: 540px) {
      height: 30px;
      width: 30px;
    }
  }
  .info {
    margin: 10px 10px 0 0;
    text-align: left;
    font-size: 0.8em;
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
  .contents {
    width: 100%;
    display: flex;
    margin-bottom: 40px;
    @media all and (max-width: 768px) {
      flex-direction: column-reverse;
    }
    p {
      flex: 0.8 0 0;
    }
    img {
      flex: 0.2 0 0;
      width: 200px;
      height: 200px;
      margin-right: 10px;
    }
  }
`;

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
      width: 98%;
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
  input {
    width: 300px;
    height: 20px;
    font-size: 1em;
    outline-color: #aae8c5;
  }
`;

const StCommentButtonDiv = styled.div`
  padding: 30px 0 0 30px;
  text-align: right;
  button {
    border-radius: 30px;
    background: #92e3a9;
    height: 30px;
    margin-right: 10px;
    width: 70px;
    cursor: pointer;
  }
`;

export default function NewsPost({ login, userinfo }) {
  const { id } = useParams();
  const [contents, setContents] = useState({});
  const [commentList, setCommentList] = useState([]);
  const [postUser, setPostUser] = useState(null);
  const [loading, isLoading] = useState(true);
  const [commentId, setCommentId] = useState(null);
  const inputCommentRef = useRef(null);
  const inputRevisedCommentRef = useRef(null);
  const navigate = useNavigate();
  // 게시글을 수정하는 함수
  const revisePost = () => {
    navigate(`/news/edit=${id}`);
  };

  // 게시글을 삭제하는 함수
  const deletePost = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/news/post/${id}`)
      .then((res) => navigate("/news=0"))
      .catch();
  };

  // 서버에 댓글 등록을 요청하는 함수
  const registerComment = () => {
    if (inputCommentRef.current.value !== "") {
      axios
        .post(`${process.env.REACT_APP_API_URL}/news/comment`, {
          newsPost_Id: id,
          comment: inputCommentRef.current.value,
        })
        .then((res) => {
          console.log(commentList);
          console.log(res.data);
          setCommentList([...res.data.data].reverse());
        })
        .catch();
      inputCommentRef.current.focus();
      inputCommentRef.current.value = "";
    }
  };

  // 댓글 수정 아이콘을 눌렀을 때 실행하는 함수
  const handleRevise = (comment_id) => {
    setCommentId(comment_id);
  };

  // 댓글 수정하는 함수
  const reviseComment = (comment_id) => {
    axios
      .patch(`${process.env.REACT_APP_API_URL}/news/comment/${comment_id}`, {
        newsPost_Id: id,
        comment: inputRevisedCommentRef.current.value,
      })
      .then((res) => {
        console.log(commentList);
        console.log(res.data);
        setCommentList([...res.data.data].reverse());
        setCommentId(null);
      });
  };

  // 댓글을 삭제하는 함수
  const deleteComment = (comment_id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/news/comment/${comment_id}`, {
        data: { newsPost_Id: id },
      })
      .then((res) => {
        setCommentList([...res.data.data].reverse());
      });
  };

  useEffect(() => {
    isLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/news/post/${id}`)
      .then((res) => {
        setContents(res.data.data);
        setCommentList(res.data.data.comments.reverse());
        setPostUser(res.data.data.user);
        isLoading(false);
      });
  }, [id]);
  console.log(commentList);
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
                <StContentInfoDiv>
                  <span>{postUser.nickname}</span>
                  <span>{postUser.town}</span>
                </StContentInfoDiv>
                <StContentInfoDiv color={"#c4c4c4"}>
                  <span>조회수 {contents.view}</span>
                  <span>{timeForToday(contents.createdAt)}</span>
                </StContentInfoDiv>
              </div>
            </StPostUserDiv>
            {login && userinfo.id === contents.user_Id ? (
              <div className={"icon"}>
                <FontAwesomeIcon icon={faPencilAlt} onClick={revisePost} />
                <FontAwesomeIcon icon={faTrashAlt} onClick={deletePost} />
              </div>
            ) : null}
          </StPostHeaderDiv>
          <StPostBodyDiv>
            <div className={"contents"}>
              {contents.img !== null ? (
                <img src={contents.img} alt={"게시글 이미지"} />
              ) : null}
              <p>{contents.content}</p>
            </div>
            {contents.location !== null ? (
              <MapContainer locationInfo={contents.location} />
            ) : null}
          </StPostBodyDiv>
          <StCommentInputDiv>
            <div className="comment-cnt">댓글 {commentList.length}</div>
            <div className="input-button">
              <input
                type={"text"}
                placeholder={"댓글 입력"}
                ref={inputCommentRef}
              ></input>
              <div>
                <button type={"button"} onClick={registerComment}>
                  등 록
                </button>
              </div>
            </div>
          </StCommentInputDiv>
          <StCommentListDiv>
            {commentList.map((comment, index) => (
              <StPostHeaderReUse key={index}>
                <StPostUserDiv>
                  <img src={comment.user.img} alt="프로필사진"></img>
                  <div className={"info"}>
                    <StContentInfoDiv>
                      <span>{comment.user.nickname}</span>
                      <span>{comment.user.town}</span>
                    </StContentInfoDiv>
                    {comment.id === commentId ? (
                      <input
                        type={"text "}
                        defaultValue={comment.comment}
                        ref={inputRevisedCommentRef}
                      />
                    ) : (
                      <div>{comment.comment}</div>
                    )}
                    <StContentInfoDiv color={"#c4c4c4"}>
                      <span>{timeForToday(contents.createdAt)}</span>
                    </StContentInfoDiv>
                  </div>
                </StPostUserDiv>
                {login && userinfo.id === comment.user_Id ? (
                  comment.id === commentId ? (
                    <StCommentButtonDiv>
                      <button
                        type={"button"}
                        onClick={() => setCommentId(null)}
                      >
                        취소
                      </button>
                      <button onClick={() => reviseComment(comment.id)}>
                        확인
                      </button>
                    </StCommentButtonDiv>
                  ) : (
                    <div className={"icon"}>
                      <FontAwesomeIcon
                        icon={faPencilAlt}
                        onClick={() => handleRevise(comment.id)}
                      />
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        onClick={() => deleteComment(comment.id)}
                      />
                    </div>
                  )
                ) : null}
              </StPostHeaderReUse>
            ))}
          </StCommentListDiv>
        </StContentsDiv>
      )}
    </StBodyDiv>
  );
}
