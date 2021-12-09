import React from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import Trade from "./../components/Trade";

const StBodyDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StContentsHeadDiv = styled.div`
  width: 60%;
  margin: 30px 0 10px 0;
  .category-search {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    span {
      margin-right: 10px;
      font-weight: bold;
      font-size: 1.5em;
    }
    input {
      border-radius: 10px;
      height: 20px;
    }
  }
  .write-button {
    font-size: 1.5em;
  }
`;

const StContentsBodyDiv = styled.div`
  width: 65%;
  text-align: center;
`;

export default function TradeList({ login, userinfo }) {
  const [tradeList, setTradeList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, isLoading] = useState(true);
  const [fetch, isFetch] = useState(false);

  const requestTrade = () => {
    isLoading(true);
    isFetch(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/trade/list?page=${page}`)
      .then((res) => {
        console.log(res.data.data);
        const mergeData = tradeList.concat(...res.data.data);
        setTradeList(mergeData);
        setPage((preState) => preState + 1);
        isLoading(false);
        isFetch(false);
      });
  };

  // 스크롤 이벤트 함수
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && !fetch) {
      requestTrade();
    }
  };

  useEffect(() => {
    requestTrade();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  return (
    <StBodyDiv>
      <StContentsHeadDiv>
        <div className={"category-search"}>
          <div>
            <span>일반</span>
            <span>제시</span>
          </div>
          <div>
            <input type={"text"} placeholder={"검색"}></input>
            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
          </div>
        </div>
        {login ? (
          <div>
            <Link to="">
              <FontAwesomeIcon
                className={"write-button"}
                icon={faPlusSquare}
                pull={"right"}
                color={"#92e3a9"}
              ></FontAwesomeIcon>
            </Link>
          </div>
        ) : null}
      </StContentsHeadDiv>
      <StContentsBodyDiv>
        {tradeList.map((trade, index) => (
          <Trade
            trade={trade}
            key={index}
            num={index}
            login={login}
            userinfo={userinfo}
          />
        ))}
      </StContentsBodyDiv>
    </StBodyDiv>
  );
}
