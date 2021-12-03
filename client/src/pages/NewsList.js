import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faSearch,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import styled from "styled-components";
axios.defaults.withCredentials = true;

const StBodyDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px; // 푸터 내리기
  overflow-y: auto;
  .category {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const StCategoryButton = styled.button.attrs((props) => ({
  type: "button",
}))`
  background: ${(props) => (props.select ? "#92E3A9" : "#EFEFEF")};
  cursor: pointer;
  border-radius: 10px;
  width: 100px;
  height: 30px;
  margin: 20px;
  @media all and (max-width: 425px) {
    width: 80px;
    margin: 15px;
  }
`;

const StContentsHeadDiv = styled.div`
  margin: 10px 0 10px 0;
  width: 70%;
  .head-oneLine {
    display: flex;
    justify-content: space-between;
    .myAddress {
      display: flex;
    }
    input {
      border-radius: 10px;
    }
  }
  .head-twoLine {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    .write-post {
      margin-top: 10px;
      color: #92e3a9;
    }
  }
`;

const StContentsBodyDiv = styled.div``;

export default function NewsList({ userinfo, login }) {
  //! 해야하는 부분
  // 카테고리 선택하면 배경색 다르게 지정
  //? 서버에서 리스트에 대한 정보 받아오기 (조금씩 불러오기)
  //? map으로 뿌려주기
  //? 카테고리별로 게시글 받아와 뿌려주기
  //? 검색한 내용으로 게시글 받아와 뿌려주기
  //? 글쓰는 버튼 누르면 글쓰는 페이지로 이동하기 (로그인한 유저만)
  //? 게시글 하나 누르면 상세게시글페이지로 이동하기
  const [newsList, setNewsList] = useState([]);
  const [category, setCategory] = useState({ number: null });
  const [page, setPage] = useState(1);
  const [loading, isLoading] = useState(true);
  const [fetch, isFetch] = useState(false);

  // 카테고리 변경하는 함수
  const changeCategory = (e) => {
    setCategory({ ...category, number: Number(e.target.value) });
    setPage(1);
  };

  // 서버로 데이터를 요청하는 함수
  const requestNews = () => {
    isLoading(true);
    isFetch(true);
    if (category.number) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/news/list/${category}/${page}`)
        .then((res) => {
          isLoading(false);
          isFetch(false);
        }) // newsList 업데이트하기
        .catch(); // 에러 핸들링
    } else {
      axios
        .get(`${process.env.REACT_APP_API_URL}/news/list/${page}`)
        .then((res) => {
          isLoading(false);
          isFetch(false);
        })
        .catch();
    }
    isLoading(false);
    setPage(page + 1);
  };

  // 스크롤 이벤트 함수
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    console.log("!!!", scrollTop + clientHeight);
    console.log("???", scrollHeight);
    if (scrollTop + clientHeight >= scrollHeight && !fetch) {
      requestNews();
    }
  };

  useEffect(() => {
    requestNews();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <StBodyDiv>
      <div className="category">
        <StCategoryButton
          value={1}
          onClick={(e) => changeCategory(e)}
          select={category.number === 1 ? true : false}
        >
          취미
        </StCategoryButton>
        <StCategoryButton
          value={2}
          onClick={(e) => changeCategory(e)}
          select={category.number === 2 ? true : false}
        >
          일상
        </StCategoryButton>
        <StCategoryButton
          value={3}
          onClick={(e) => changeCategory(e)}
          select={category.number === 3 ? true : false}
        >
          맛집
        </StCategoryButton>
        <StCategoryButton
          value={4}
          onClick={(e) => changeCategory(e)}
          select={category.number === 4 ? true : false}
        >
          동네소식
        </StCategoryButton>
        <StCategoryButton
          value={5}
          onClick={(e) => changeCategory(e)}
          select={category.number === 5 ? true : false}
        >
          사건,사고
        </StCategoryButton>
        <StCategoryButton
          value={6}
          onClick={(e) => changeCategory(e)}
          select={category.number === 6 ? true : false}
        >
          분실,실종
        </StCategoryButton>
        <StCategoryButton
          value={7}
          onClick={(e) => changeCategory(e)}
          select={category.number === 7 ? true : false}
        >
          질문
        </StCategoryButton>
        <StCategoryButton
          value={8}
          onClick={(e) => changeCategory(e)}
          select={category.number === 8 ? true : false}
        >
          일상
        </StCategoryButton>
        <StCategoryButton
          value={9}
          onClick={(e) => changeCategory(e)}
          select={category.number === 9 ? true : false}
        >
          육아
        </StCategoryButton>
        <StCategoryButton
          value={10}
          onClick={(e) => changeCategory(e)}
          select={category.number === 10 ? true : false}
        >
          기타
        </StCategoryButton>
      </div>
      <StContentsHeadDiv>
        <div class="head-oneLine">
          {login ? (
            <div class="myAddress">
              <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
              <div>{userinfo.address.split(",")[2]}</div>
            </div>
          ) : null}
          <div>
            <input type={"text"} placeholder={"검색"}></input>
            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
          </div>
        </div>
        {login ? (
          <Link to="/" class="head-twoLine">
            <FontAwesomeIcon
              className={"write-post"}
              icon={faPlusSquare}
            ></FontAwesomeIcon>
          </Link>
        ) : null}
      </StContentsHeadDiv>
      <button onClick={requestNews}>123</button>
      <StContentsBodyDiv>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
      </StContentsBodyDiv>
    </StBodyDiv>
  );
}
