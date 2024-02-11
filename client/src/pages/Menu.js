import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
            navigate("/auth/sign-in");
        }
    });

    const handleOnClickStart = (e) => {
        e.preventDefault();
        if (login === undefined) {
            navigate("/auth/sign-in");   
        }
        else {
            navigate("/game");
        }
    };

    const handleOnClickShowStatistic = (e) => {
        e.preventDefault();
        if (login === "guest") {
            setMessage("Guests can't see statistic 🐱");
        } else {
            navigate("/statistic");
        }
    };

    const handleOnClickLogOut = (e) => {
        e.preventDefault();
        Cookies.remove("login");
        navigate("/auth/sign-in");
    };

    return (
        <div className="menu-container">
            {message ? <PopUp text={message} setText={setMessage} /> : <></>}
            <div className="menu-container-form">
                <div className="menu-container-item">
                    <p className="menu-container-item-title">
                        Welcome, {login ? login.charAt(0).toUpperCase() + login.slice(1) : ''}!
                    </p>
                </div>
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
                    <Button onClick={(e) => handleOnClickLogOut(e)}>
                        <p className="menu-container-item-text">Log Out</p>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Menu;
