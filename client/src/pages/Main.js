import React, { useEffect } from "react";
import styled from "styled-components";
import queryString from "query-string";
import kakaoImg from "../images/kakao_login_medium_narrow.png";
import googleImg from "../images/btn_google_signin_light_normal_web.png";
import axios from "axios";
axios.defaults.withCredentials = true;

export default function Main() {
  // const handlekakaoLoginBtn = async () => {
  //   await window.location.assign("http://localhost:80/user/kakao");
  // };
  // const handlegoogleLoginBtn = async () => {
  //   await window.location.assign("http://localhost:80/user/google");
  // };

  // useEffect(() => {
  //   const query = queryString.parse(window.location.search);
  //   if (query.access_token) {
  //     axios.get("http://localhost:80/user/info").then((res) => {
  //       console.log(res.data.data);
  //     });
  //   }
  // }, [window.location]);

  return (
    <>
      {/* <div
        onClick={() => {
          handlekakaoLoginBtn();
        }}
      >
        <img src={kakaoImg} />
      </div> */}

      {/* <div
        onClick={() => {
          handlegoogleLoginBtn();
        }}
      >
        <img src={googleImg} />
      </div> */}

      {/* <img
        src={`http://`}
      /> */}

      {/* <img
        src={`http://k.kakaocdn.net/dn/ec5JId/btqBDYf4uEv/4n4rER4879ROYlsfVit82K/img_640x640.jpg`}
      /> */}
    </>
  );
}
