import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import CurvedLine from "./CurvedLine";

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <CurvedLine />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
