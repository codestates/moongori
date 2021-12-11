import React from "react";
import Mypage from "../pages/Mypage";
import NotFound from "../pages/NotFound";

export default function PrivateRoute({ userinfo, login, isAuthenticated }) {
  if (login) {
    return <Mypage userinfo={userinfo} isAuthenticated={isAuthenticated} />;
  } else {
    return <NotFound />;
  }
}
