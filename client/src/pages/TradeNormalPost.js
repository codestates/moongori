import React from "react";
import styled from "styled-components";
import TradeRead from "../components/TradeRead";

export default function TradeNoramlPost({ login, userinfo }) {
  return (
    <>
      <TradeRead userinfo={userinfo} login={login} />
    </>
  );
}
