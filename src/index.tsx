import ReactDOM from "react-dom";
import React from "react";
// BrowserRouter HashRouter
import { HashRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.scss";
import "./public.scss";

ReactDOM.render(
  <Router>
    <div style={{ maxWidth: "750px", margin: "0 auto" }}>
      <App />
    </div>
  </Router>,
  document.getElementById("root")
);
