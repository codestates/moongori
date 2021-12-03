import React from "react";
import { Route, useNavigate, Redirect } from "react-router-dom";
import Mypage from "../pages/Mypage";
import NotFound from "../pages/NotFound";

export default function PrivateRoute({ userinfo, login }) {
  if (login) {
    return <Mypage userinfo={userinfo} />;
  } else {
    return <NotFound />;
  }
}
