/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import axios from "axios";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { StCategoryButton } from "./NewsList";
import Trade from "./../components/Trade";
import Loading from "./../components/Loading";
import NoData from "./../components/NoData";

const StBodyDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StContentsHeadDiv = styled.div`
  width: 65%;
  margin: 30px 0 10px 0;
  .category-search {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media all and (max-width: 540px) {
      flex-direction: column;
      .category {
        width: 100%;
      }
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

const StCategoryButtonReUse = styled(StCategoryButton)`
  margin: 20px 10px 20px 0;
  @media all and (max-width: 540px) {
    width: 60px;
  }
`;

const StContentsBodyDiv = styled.div`
  width: 65%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export default function TradeList({ login, userinfo }) {
  const [tradeList, setTradeList] = useState([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("all");
  const [loading, isLoading] = useState(true);
  const [fetch, isFetch] = useState(false);
  const inputSearchRef = useRef(null);
  const navigate = useNavigate();

  // 카테고리 변경하는 함수
  const changeCategory = (e) => {
    if (e.target.value === category) {
      setCategory("all");
      navigate("/trade=all");
    } else {
      setCategory(e.target.value);
      navigate(`/trade=${e.target.value}`);
    }
    setTradeList([]);
    setPage(1);
  };

  // 검색어에 따른 데이터 요청하는 함수
  const handleSearch = (e) => {
    if (
      inputSearchRef.current.value !== "" &&
      (e.key === "Enter" || e.type === "click")
    ) {
      if (category.number) {
        axios
          .get(
            `${process.env.REACT_APP_API_URL}/trade/${category.number}?search=${inputSearchRef.current.value}&page=1`
          )
          .then((res) => {
            if (res.status === 204) {
              isLoading(false);
              setTradeList([]);
            } else {
              console.log(res.data);
              const mergeData = [].concat(...res.data.data);
              setTradeList(mergeData);
              setPage(2);
              isLoading(false);
              isFetch(false);
            }
          })
          .catch();
      } else {
        axios
          .get(
            `${process.env.REACT_APP_API_URL}/trade?search=${inputSearchRef.current.value}&page=1`
          )
          .then((res) => {
            console.log("실행");
            if (res.status === 204) {
              isLoading(false);
              setTradeList([]);
            } else {
              console.log(res.data);
              const mergeData = [].concat(...res.data.data);
              setTradeList(mergeData);
              setPage(2);
              isLoading(false);
              isFetch(false);
            }
          })
          .catch();
      }
    }
  };

  // 서버로 데이터를 요청하는 함수
  const requestTrade = async () => {
    isLoading(true);
    isFetch(true);
    if (category.number) {
      if (inputSearchRef.current.value !== "") {
        axios
          .get(
            `${process.env.REACT_APP_API_URL}/trade/${category.number}?search=${inputSearchRef.current.value}&page=${page}`
          )
          .then((res) => {
            if (res.status === 204) {
              isLoading(false);
            } else {
              console.log(res.data);
              const mergeData = tradeList.concat(...res.data.data);
              setTradeList(mergeData);
              setPage((preState) => preState + 1);
              isLoading(false);
              isFetch(false);
            }
          })
          .catch();
      } else {
        await axios
          .get(
            `${process.env.REACT_APP_API_URL}/trade/list/${category.number}?page=${page}`
          )
          .then((res) => {
            if (res.status === 204) {
              isLoading(false);
            } else {
              console.log(res.data);
              const mergeData = tradeList.concat(...res.data.data);
              setTradeList(mergeData);
              setPage((preState) => preState + 1);
              isLoading(false);
              isFetch(false);
              // setTimeout(() => {}, 1000);
            }
          })
          .catch();
      }
    } else {
      if (inputSearchRef.current.value !== "") {
        axios
          .get(
            `${process.env.REACT_APP_API_URL}/trade?search=${inputSearchRef.current.value}&page=${page}`
          )
          .then((res) => {
            if (res.status === 204) {
              isLoading(false);
            } else {
              console.log(res.data);
              const mergeData = tradeList.concat(...res.data.data);
              setTradeList(mergeData);
              setPage((preState) => preState + 1);
              isLoading(false);
              isFetch(false);
            }
          })
          .catch();
      } else {
        await axios
          .get(`${process.env.REACT_APP_API_URL}/trade/list?page=${page}`)
          .then((res) => {
            if (res.status === 204) {
              isLoading(false);
            } else {
              console.log(res.data);
              const mergeData = tradeList.concat(...res.data.data);
              setTradeList(mergeData);
              setPage((preState) => preState + 1);
              isLoading(false);
              isFetch(false);
              // setTimeout(() => {}, 1000);
            }
          })
          .catch();
      }
    }
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
    if (userinfo.address === null) {
      navigate('/mypage')
    }
    navigate(`/trade=${category}`);
    requestTrade();
  }, [category]);

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
          <div className={"category"}>
            <StCategoryButtonReUse
              value={0}
              onClick={(e) => changeCategory(e)}
              select={category === "0" ? true : false}
            >
              일반
            </StCategoryButtonReUse>
            <StCategoryButtonReUse
              value={1}
              onClick={(e) => changeCategory(e)}
              select={category === "1" ? true : false}
            >
              제시
            </StCategoryButtonReUse>
          </div>
          <div>
            <input
              type={"text"}
              placeholder={"검색"}
              ref={inputSearchRef}
              onKeyPress={(e) => handleSearch(e)}
            ></input>
            <FontAwesomeIcon
              icon={faSearch}
              onClick={(e) => handleSearch(e)}
            ></FontAwesomeIcon>
          </div>
        </div>
        {login ? (
          <div>
            <Link to="/trade/write">
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
      {loading ? <Loading /> : null}
      {!loading && tradeList.length === 0 ? <NoData /> : null}
    </StBodyDiv>
  );
}
