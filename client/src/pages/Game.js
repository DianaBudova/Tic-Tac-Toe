import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./styles/Game.css";

const Game = () => {
    const [login, setLogin] = useState(Cookies.get("login"));
    const navigate = useNavigate();

    useEffect(() => {
        if (login === undefined) {
            navigate("/auth/sign-in");
        }
    });

    return (
        <div className="game-container">
            <div className="game-container-form">
                <div className="game-container-item">
                    <p className="game-container-item-title">Tic-Tac-Toe</p>
                </div>
            </div>
            <div className="game-container-form">
                <div className="game-container-item">
                    <div className="game-container-item-row">
                        <div className="game-container-item-cell"></div>
                        <div className="game-container-item-cell"></div>
                        <div className="game-container-item-cell"></div>
                    </div>
                    <div className="game-container-item-row">
                        <div className="game-container-item-cell"></div>
                        <div className="game-container-item-cell"></div>
                        <div className="game-container-item-cell"></div>
                    </div>
                    <div className="game-container-item-row">
                        <div className="game-container-item-cell"></div>
                        <div className="game-container-item-cell"></div>
                        <div className="game-container-item-cell"></div>
                    </div>
                </div>
            </div>
            <div className="game-container-form">
                <div className="game-container-item">
                    <span className="game-container-item-text">
                        {login.charAt(0).toUpperCase() + login.slice(1)}
                    </span>
                    <span className="game-container-item-text">VS</span>
                    <span className="game-container-item-text">BOT</span>
                </div>
            </div>
        </div>
    );
};

export default Game;
