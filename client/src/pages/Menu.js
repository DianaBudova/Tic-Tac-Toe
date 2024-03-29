import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config from "./../config/config.json";
import Cookies from "js-cookie";
import "./styles/Menu.css";
import Button from "../elements/Button";
import PopUp from "../elements/PopUp";

const Menu = () => {
    const [login, setLogin] = useState(Cookies.get("login"));
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (login === undefined) {
            navigate(config.browserRoutes.auth.second);
        }
    });

    const handleOnClickStart = (e) => {
        e.preventDefault();
        if (login === undefined) {
            navigate(config.browserRoutes.auth.second);   
        }
        else {
            navigate(config.browserRoutes.game);
        }
    };

    const handleOnClickShowStatistic = (e) => {
        e.preventDefault();
        if (login === "guest") {
            setMessage("Guests can't see statistic 🐱");
        } else {
            navigate(config.browserRoutes.statistic);
        }
    };

    const handleOnClickSettings = (e) => {
        e.preventDefault();
        navigate(config.browserRoutes.settings);
    };

    const handleOnClickLogOut = (e) => {
        e.preventDefault();
        Cookies.remove("login");
        Cookies.remove("sign");
        navigate(config.browserRoutes.auth.second);
    };

    return (
        <div className="menu-container">
            {message ? <PopUp text={message} setText={setMessage} /> : <></>}
            <div className="menu-container-form">
                <p className="menu-container-item-title">
                    Welcome, {login ? login.charAt(0).toUpperCase() + login.slice(1) : ''}!
                </p>
            </div>
            <div className="menu-container-form">
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
                    <Button onClick={(e) => handleOnClickSettings(e)}>
                        <p className="menu-container-item-text">
                            Settings
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
