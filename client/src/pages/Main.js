import React from "react";
import styled from "styled-components";
import axios from "axios";
axios.defaults.withCredentials = true;

export default function Main() {
  const testCookies = () => {
    axios.post(`ec2-13-125-247-13.ap-northeast-2.compute.amazonaws.com/user/test`, {
      email: "test@test.com",
      password: "1234"
    })
  }
  return (<>메인페이지
    <button onClick={() => { testCookies() }}>로그인</button>
  </>
  )
}
