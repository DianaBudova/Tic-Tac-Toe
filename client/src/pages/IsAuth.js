import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const IsAuth = ({ Component }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem("isAuth") === "true") {
            setIsAuthenticated(true);
        }
    })

    return isAuthenticated ? <Component /> : navigate("/auth/sign-in");
};

export default IsAuth;
