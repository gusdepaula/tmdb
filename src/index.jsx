import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import NewMovie from "./pages/NewMovie";
import "./index.css";

const root = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="movie/:id" element={<NewMovie />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  root
);
