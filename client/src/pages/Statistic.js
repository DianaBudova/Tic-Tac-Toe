import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./styles/Statistic.css";
import Button from "../elements/Button";

const Statistic = () => {
    const [login, setLogin] = useState(Cookies.get("login"));
    const navigate = useNavigate();

    useEffect(() => {
        if (login === undefined) {
            navigate("/auth/sign-in");
        }
    });

    const handleOnClickBackToMenu = (e) => {
        e.preventDefault();
        if (login === undefined) {
            navigate("/auth/sign-in");
        } else {
            navigate("/menu");
        }
    }

    return (
        <div className="statistic-container">
            <div className="statistic-container-form">
                <p className="statistic-container-title">Statistic</p>
            </div>
            <div className="statistic-container-form">
                <div className="statistic-container-item">
                    <p className="statistic-container-text">Wins</p>
                    <p className="statistic-container-text">2</p>
                </div>
                <div className="statistic-container-item">
                    <p className="statistic-container-text">Failures</p>
                    <p className="statistic-container-text">1</p>
                </div>
                <div className="statistic-container-item">
                    <p className="statistic-container-text">Games</p>
                    <p className="statistic-container-text">1423</p>
                </div>
            </div>
            <div className="statistic-container-form">
                <Button onClick={(e) => handleOnClickBackToMenu(e)}>
                    <p className="statistic-container-text">Back to Menu</p>
                </Button>
            </div>
        </div>
    );
};

export default Statistic;
