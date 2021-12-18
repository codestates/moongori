import React from "react";
import Mypage from "../pages/Mypage";
import NotFound from "../pages/NotFound";

export default function PrivateRoute({ userinfo, login, isAuthenticated, handleWithdrawl }) {
  if (login) {
    return (
      <Mypage
        userinfo={userinfo}
        isAuthenticated={isAuthenticated}
        login={login}
        handleWithdrawl={handleWithdrawl}
      />
    );
  } else {
    return <NotFound />;
  }
}
