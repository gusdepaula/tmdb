import React, { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SpinnerFullPage from "./components/SpinnerFullPage";
import "./index.css";

const App = lazy(() => import("./App"));
const NewMovie = lazy(() => import("././pages/NewMovie"));

const root = document.getElementById("root");
const appElement = (
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

// Use createRoot to render the app instead of ReactDOM.render
if (root?.hasChildNodes()) {
  // Hydrate the app if server-rendered content is present
  createRoot(root, { hydrate: true }).render(appElement);
} else {
  createRoot(root).render(appElement);
}
