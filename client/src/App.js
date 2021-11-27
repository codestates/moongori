import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./pages/Main";
import TradeList from "./pages/TradeList";
import NewsList from "./pages/NewsList";
import Mypage from "./pages/Mypage";

const Wrap = styled.div`
  width: 100%;
  height: 100%;
`;

function App() {
  return (
    <BrowserRouter>
      <Wrap>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />

          <Route path="/trade=:category" element={<TradeList />} />

          <Route path="/news=:category" element={<NewsList />} />

          <Route path="/mypage" element={<Mypage />} />

          {/* <Route path="/trade-normal/read=:id" element={<TradeNormalPost />} />

          <Route
            path="/trade-suggestion/read=:id"
            element={<TradeSuggestionPost />}
          />

          <Route path="/trade/write" element={<TradePostWrite />} />

          <Route path="/news/read=:id" element={<NewsPost />} />

          <Route path="/news/write" element={<NewsPostWrite />} />

          <Route path="/chat" element={<Chat />} /> */}
        </Routes>
        <Footer />
      </Wrap>
    </BrowserRouter>
  );
}

export default App;
