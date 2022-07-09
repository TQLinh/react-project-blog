import React from "react";
import ReactDOM from "react-dom/client";
import "./Styles/index.scss";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./Contexts/auth-context";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
    <ToastContainer />
  </BrowserRouter>
);

reportWebVitals();
