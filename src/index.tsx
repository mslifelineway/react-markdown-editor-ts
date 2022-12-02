import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { toastProps } from "./utils/constants";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ToastContainer {...toastProps} />
    <App />
  </React.StrictMode>
);

reportWebVitals();
