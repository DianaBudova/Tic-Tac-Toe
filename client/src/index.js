import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Auth from "./pages/Auth.js";
import CreateAccount from "./pages/CreateAccount.js";
import Menu from "./pages/Menu.js";
import Game from "./pages/Game.js";
import Statistic from "./pages/Statistic.js";
import Settings from "./pages/Settings.js";

const router = createBrowserRouter([
    {
        path: "*",
        element: <Auth />,
    },
    {
        path: "/auth/sign-in",
        element: <Auth />,
    },
    {
        path: "/auth/creating-account",
        element: <CreateAccount />,
    },
    {
        path: "/menu",
        element: <Menu />,
    },
    {
        path: "/game",
        element: <Game />,
    },
    {
        path: "/statistic",
        element: <Statistic />,
    },
    {
        path: "/settings",
        element: <Settings />,
    },
]);

const root = createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
