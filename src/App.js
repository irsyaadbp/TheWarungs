import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./routes/MainRouter";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
