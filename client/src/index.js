import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Auth from "./pages/Auth.js";
import CreateAccount from "./pages/CreateAccount.js";
import Menu from "./pages/Menu.js";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Auth />,
    },
    {
        path: "/creating-account",
        element: <CreateAccount />,
    },
    {
        path: "/menu",
        element: <Menu />,
    },
]);

const root = createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
