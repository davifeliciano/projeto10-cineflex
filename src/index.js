import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import HomePage, { loader as homePageLoader } from "./pages/HomePage/HomePage";
import SeatsPage, {
  loader as seatsPageLoader,
} from "./pages/SeatsPage/SeatsPage";
import SessionsPage, {
  loader as sessionsPageLoader,
} from "./pages/SessionsPage/SessionsPage";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import GlobalStyle from "./style/GlobalStyle";
import ResetStyle from "./style/ResetStyle";

axios.defaults.baseURL = "https://mock-api.driven.com.br/api/v8/cineflex";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
    loader: homePageLoader,
  },
  {
    path: "/sessoes/:idFilme",
    element: <SessionsPage />,
    errorElement: <ErrorPage />,
    loader: sessionsPageLoader,
  },
  {
    path: "/assentos/:idSessao",
    element: <SeatsPage />,
    errorElement: <ErrorPage />,
    loader: seatsPageLoader,
  },
  {
    path: "/sucesso",
    element: <SuccessPage />,
    errorElement: <ErrorPage />,
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
