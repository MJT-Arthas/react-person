import React from "react";
import { useRoutes } from "react-router-dom";
import "./App.scss";
import { routers } from "./routers/";

function App() {
  // return <div>111</div>;

  return useRoutes(routers);
}
export default App;
