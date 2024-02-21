import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config from "./../config/config.json";
import Cookies from "js-cookie";
import "./styles/Settings.css";
import Button from "../elements/Button";

const Settings = () => {
    const [login, setLogin] = useState(Cookies.get("login"));
    const navigate = useNavigate();

    useEffect(() => {
        if (login === undefined) {
            navigate(config.browserRoutes.auth.second);
        }
    });

    const handleOnClickCell = (e, id) => {
        e.preventDefault();
        let element = document.getElementById(id);
        if (element.classList.contains("cross") || element.classList.contains("circle")) {
            return;
        }
        if (id === "cell-1") {
            document.getElementById("cell-2").classList.remove("cross");
            element.classList.add("circle");
            Cookies.set("sign", "circle");
        } else {
            document.getElementById("cell-1").classList.remove("circle");
            element.classList.add("cross");
            Cookies.set("sign", "cross");
        }
    };

    const handleOnClickBackToMenu = (e) => {
        e.preventDefault();
        if (login === undefined) {
            navigate(config.browserRoutes.auth.second);
        } else {
            navigate(config.browserRoutes.menu);
        }
    };

    return (
        <div className="settings-container">
            <div className="settings-container-form">
                <p className="settings-container-title">Settings</p>
            </div>
            <div className="settings-container-form">
                <div className="settings-container-item">
                    <p className="settings-container-text">Play?</p>
                    <div
                        id="cell-1"
                        className="settings-container-item-cell"
                        onClick={(e) => handleOnClickCell(e, "cell-1")}
                    ></div>
                    <div
                        id="cell-2"
                        className="settings-container-item-cell cross"
                        onClick={(e) => handleOnClickCell(e, "cell-2")}
                    ></div>
                </div>
            </div>
            <div className="settings-container-form">
                <Button onClick={(e) => handleOnClickBackToMenu(e)}>
                    <p className="settings-container-text">Back to Menu</p>
                </Button>
            </div>
        </div>
    );
};

export default Settings;
