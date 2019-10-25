import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./routes/MainRouter";
import "antd/dist/antd.css";

const App = () => {
  return (
    <BrowserRouter>
      <MainRouter />
    </BrowserRouter>
  );
}

export default App;
