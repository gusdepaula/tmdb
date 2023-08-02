import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App";
import NewMovie from "./pages/NewMovie";
import SpinnerFullPage from "./components/Spinner/SpinnerFullPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<SpinnerFullPage />}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="movie/:id" element={<NewMovie />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
