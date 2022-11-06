import ReactDOM from "react-dom"
import React from "react"
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import { history } from "./History";
import ThreeRouter from "./ThreeRouter";
import "./styles.scss"
import App from "./App"

const rootElement = document.getElementById("root");
const customHistory = createBrowserHistory({
  // basename: config.urlBasename || ""
});

ReactDOM.render(
  <App />,
  rootElement
);
