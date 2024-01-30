import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./styles/Menu.css";
import Button from "../elements/Button";

const Menu = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (Cookies.get("login") === undefined) {
            navigate("/auth/sign-in");
        }
    });

    const handleOnClickStart = (e) => {
        e.preventDefault();
    };

    const handleOnClickShowStatistic = (e) => {
        e.preventDefault();
    };

    const handleOnClickLogOut = (e) => {
        e.preventDefault();
        Cookies.remove("login");
        navigate("/auth/sign-in");
    };

    return (
        <div className="menu-container">
            <div className="menu-container-form">
                <div className="menu-container-item">
                    <p className="menu-container-item-title">
                        Welcome, {Cookies.get("login").charAt(0).toUpperCase() + Cookies.get("login").slice(1)}!
                    </p>
                </div>
                <div className="menu-container-item">
                    <Button onClick={(e) => handleOnClickStart(e)}>
                        <p className="menu-container-item-text">Start Game</p>
                    </Button>
                </div>
                <div className="menu-container-item">
                    <Button onClick={(e) => handleOnClickShowStatistic(e)}>
                        <p className="menu-container-item-text">
                            Show Statistic
                        </p>
                    </Button>
                </div>
                <div className="menu-container-item">
                    <Button onClick={(e) => handleOnClickLogOut(e)}>
                        <p className="menu-container-item-text">Log Out</p>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Menu;
