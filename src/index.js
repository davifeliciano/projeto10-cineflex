import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import HomePage, { loader as homePageLoader } from "./pages/HomePage/HomePage";
import SessionsPage, {
  loader as sessionsPageLoader,
} from "./pages/SessionsPage/SessionsPage";
import GlobalStyle from "./style/GlobalStyle";
import ResetStyle from "./style/ResetStyle";

axios.defaults.baseURL = "https://mock-api.driven.com.br/api/v8/cineflex";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    loader: homePageLoader,
  },
  {
    path: "/sessoes/:idFilme",
    element: <SessionsPage />,
    loader: sessionsPageLoader,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ResetStyle />
    <GlobalStyle />
    <RouterProvider router={router} />
    <App />
  </React.StrictMode>
);
