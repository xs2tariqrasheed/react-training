import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001/api";
const router = createBrowserRouter([
  {
    path: "/sample-grid",
    element: <App />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

// TODO: StrictMode causes double render use it in production only
root.render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
