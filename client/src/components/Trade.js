import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { StNewsDiv, timeForToday } from "./../components/News";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStart } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStart } from "@fortawesome/free-regular-svg-icons";

const StTradeDiv = styled(StNewsDiv)`
  height: 100%;
  .wrap {
    margin: 20px;
    .category {
      text-align: center;
      width: 35px;
      padding: 5px;
      border-radius: 10px;
      background: #92e3a9;
      left: 0;
    }
    .like {
      height: 20px;
      display: flex;
      justify-content: flex-end;
      div {
        margin-left: 5px;
      }
    }
  }
  @media all and (min-width: 769px) {
    display: inline-block;
    width: ${(props) => (props.mypage ? "50%" : "45%")};
  }
  @media all and (max-width: 769px) {
    width: ${(props) => (props.mypage ? "90%" : "100%")};
  }
`;

const StContentsDiv = styled.div`
  margin-top: 20px;
  @media all and (min-width: 1700px) {
    margin-left: 50px;
  }
  @media all and (min-width: 2000px) {
    margin-left: 70px;
  }
  .trade-img {
    text-align: center;
    img {
      width: 200px;
      height: 130px;
    }
  }
  @media all and (min-width: 1200px) {
    display: flex;
    .trade-img {
      margin-right: 40px;
      img {
        width: 150px;
        height: 150px;
      }
    }
  }
`;

const StContentsInfoDiv = styled.div`
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  margin: 20px 0 20px 0;
  font-weight: bold;
  .trade-title {
    font-size: 18px;
  }
  .town-day {
    margin-bottom: 10;
    color: #9c9c9c;
    span {
      margin-right: 5px;
      color: #9c9c9c;
      font-size: 12px;
    }
  }
  .cost {
    font-weight: bold;
    font-size: 21px;
  }
`;

const StTradeStateDiv = styled.div`
  text-align: center;
  font-size: 11px;
  width: 60px;
  padding: 5px;
  background: ${(props) => props.background};
  border-radius: 10px;
`;

export const tradeState = {
  1: "판매중",
  2: "예약중",
  3: "거래완료",
  4: "제시",
  5: "마감",
};

export const tradeCategory = {
  0: "일반",
  1: "제시",
};

export function endForToday(value) {
  const today = new Date();
  const timeValue = new Date(value);
  const betweenTime = Math.floor(
    (timeValue.getTime() - today.getTime()) / 1000 / 60
  );
  if (betweenTime < 60) {
    return `곧 마감`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `H - ${betweenTimeHour}시간`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `D - ${betweenTimeDay}일`;
  }
}

export default function Trade({ trade, login, userinfo, mypage }) {
  return (
    <>
      {
        //trade로 들어올때가 있고 trade.tradePost로 들어오는 경우
        trade.tradePost === undefined ? (
          <StTradeDiv mypage={mypage}>
            <Link
              to={
                trade.normalOrNot === 0
                  ? `/trade-normal/read=${trade.id}`
                  : `/trade-suggestion/read=${trade.id}`
              }
            >
              <div className={"wrap"}>
                <div className={"category"}>
                  {tradeCategory[trade.normalOrNot]}
                </div>
                <StContentsDiv>
                  <div className={"trade-img"}>
                    <img
                      src={trade.img.split(",")[0]}
                      alt={"거래 이미지"}
                    ></img>
                  </div>
                  <StContentsInfoDiv>
                    <div className={"trade-title"}>{trade.title}</div>
                    <div className={"town-day"}>
                      <span>{trade.user.town}</span>
                      <span>{timeForToday(trade.createdAt)}</span>
                    </div>
                    {trade.normalOrNot ? (
                      <div>
                        <div className={"cost"}>
                          제시금액 : {trade.sCost.toLocaleString()} 원
                        </div>
                        {trade.cCost ? (
                          <div className={"cost"}>
                            현재금액 : {trade.cCost.toLocaleString()} 원
                          </div>
                        ) : null}
                      </div>
                    ) : (
                      <div className={"cost"}>
                        {trade.sCost.toLocaleString()} 원
                      </div>
                    )}
                    {trade.normalOrNot ? (
                      trade.state === 4 ? (
                        <StTradeStateDiv background={"#AAE8E1"}>
                          {endForToday(trade.endDate)}
                        </StTradeStateDiv>
                      ) : (
                        <StTradeStateDiv background={"#C4C4C4"}>
                          {tradeState[trade.state]}
                        </StTradeStateDiv>
                      )
                    ) : trade.state !== 1 ? (
                      <StTradeStateDiv
                        background={trade.state === 2 ? "#92E3A9" : "#C4C4C4"}
                      >
                        {tradeState[trade.state]}
                      </StTradeStateDiv>
                    ) : null}
                  </StContentsInfoDiv>
                </StContentsDiv>
                <div className={"like"}>
                  {login &&
                  trade.likes.filter((like) => userinfo.id === like.user_Id)
                    .length ? (
                    <FontAwesomeIcon icon={solidStart} />
                  ) : (
                    <FontAwesomeIcon icon={regularStart} />
                  )}
                  <div>{trade.likes_cnt}</div>
                </div>
              </div>
            </Link>
          </StTradeDiv>
        ) : (
          <StTradeDiv>
            <Link
              to={
                trade.tradePost.normalOrNot === 0
                  ? `/trade-normal/read=${trade.tradePost.id}`
                  : `/trade-suggestion/read=${trade.tradePost.id}`
              }
            >
              <div className={"wrap"}>
                <div className={"category"}>
                  {tradeCategory[trade.tradePost.normalOrNot]}
                </div>
                <StContentsDiv>
                  <div className={"trade-img"}>
                    <img
                      src={trade.tradePost.img.split(",")[0]}
                      alt={"거래 이미지"}
                    ></img>
                  </div>
                  <StContentsInfoDiv>
                    <div className={"trade-title"}>{trade.tradePost.title}</div>
                    <div className={"town-day"}>
                      <span>{trade.user.town}</span>
                      <span>{timeForToday(trade.tradePost.createdAt)}</span>
                    </div>
                    {trade.normalOrNot ? (
                      <div>
                        <div className={"cost"}>
                          제시금액 : {trade.tradePost.sCost.toLocaleString()} 원
                        </div>
                        {trade.cCost ? (
                          <div className={"cost"}>
                            현재금액 : {trade.tradePost.cCost.toLocaleString()}{" "}
                            원
                          </div>
                        ) : null}
                      </div>
                    ) : (
                      <div className={"cost"}>
                        {trade.tradePost.sCost.toLocaleString()} 원
                      </div>
                    )}
                    {trade.tradePost.normalOrNot ? (
                      trade.tradePost.state === 4 ? (
                        <StTradeStateDiv background={"#AAE8E1"}>
                          {endForToday(trade.tradePost.endDate)}
                        </StTradeStateDiv>
                      ) : (
                        <StTradeStateDiv background={"#C4C4C4"}>
                          {tradeState[trade.tradePost.state]}
                        </StTradeStateDiv>
                      )
                    ) : trade.tradePost.state !== 1 ? (
                      <StTradeStateDiv
                        background={
                          trade.tradePost.state === 2 ? "#92E3A9" : "#C4C4C4"
                        }
                      >
                        {tradeState[trade.tradePost.state]}
                      </StTradeStateDiv>
                    ) : null}
                  </StContentsInfoDiv>
                </StContentsDiv>
                <div className={"like"}>
                  {login &&
                  trade.tradePost.likes.filter(
                    (like) => userinfo.id === like.user_Id
                  ).length ? (
                    <FontAwesomeIcon icon={solidStart} />
                  ) : (
                    <FontAwesomeIcon icon={regularStart} />
                  )}
                  <div>{trade.tradePost.likes_cnt}</div>
                </div>
              </div>
            </Link>
          </StTradeDiv>
        )
      }
    </>
  );
}
