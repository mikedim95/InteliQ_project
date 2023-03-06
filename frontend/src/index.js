import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import FillingPage from "./components/questionairFill/Father";
import AdminPage from "./components/adminPages/AdminPage";
import ToBeImplemented from "./components/general/ToBeImplemented";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Test from "./components/questionairFill/Test";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* <Route index element={<App />} /> */}
        <Route path="/intelliq_api" element={<App />} />
        <Route path="/intelliq_api/FillingPage" element={<FillingPage />} />
        <Route path="/intelliq_api/AdminPage" element={<AdminPage />} />
        <Route path="/intelliq_api/Test" element={<Test />} />
        <Route
          path="/intelliq_api/to_be_implemented"
          element={<ToBeImplemented />}
        />
        <Route path="*" element={<Navigate to="/intelliq_api" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
