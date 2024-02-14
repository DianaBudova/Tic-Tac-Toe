import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./styles/Game.css";
import Button from "../elements/Button";

const Game = () => {
    const [login, setLogin] = useState(Cookies.get("login"));
    const [userPoints, setUserPoints] = useState(0);
    const [opponentPoints, setOpponentPoints] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (login === undefined) {
            navigate("/auth/sign-in");
        }
    });

    const handleOnClickCell = (e) => {
        e.preventDefault();
    };

    const handleOnClickRestart = (e) => {
        e.preventDefault();
        setUserPoints(0);
        setOpponentPoints(0);
    };

    const handleOnClickLogOut = (e) => {
        e.preventDefault();
        Cookies.remove("login");
        navigate("/auth/sign-in");
    };

    return (
        <div className="game-container">
            <div className="game-container-form">
                <div className="game-container-item">
                    <p className="game-container-item-title">Tic-Tac-Toe</p>
                </div>
            </div>
            <div className="game-container-form">
                <div className="game-container-item">
                    <span className="game-container-item-text-points">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Your
                        points: {userPoints}
                    </span>
                </div>
                <div className="game-container-item">
                    <div className="game-container-item-row">
                        <div
                            className="game-container-item-cell"
                            onClick={(e) => handleOnClickCell(e)}
                        ></div>
                        <div
                            className="game-container-item-cell"
                            onClick={(e) => handleOnClickCell(e)}
                        ></div>
                        <div
                            className="game-container-item-cell"
                            onClick={(e) => handleOnClickCell(e)}
                        ></div>
                    </div>
                    <div className="game-container-item-row">
                        <div
                            className="game-container-item-cell"
                            onClick={(e) => handleOnClickCell(e)}
                        ></div>
                        <div
                            className="game-container-item-cell"
                            onClick={(e) => handleOnClickCell(e)}
                        ></div>
                        <div
                            className="game-container-item-cell"
                            onClick={(e) => handleOnClickCell(e)}
                        ></div>
                    </div>
                    <div className="game-container-item-row">
                        <div
                            className="game-container-item-cell"
                            onClick={(e) => handleOnClickCell(e)}
                        ></div>
                        <div
                            className="game-container-item-cell"
                            onClick={(e) => handleOnClickCell(e)}
                        ></div>
                        <div
                            className="game-container-item-cell"
                            onClick={(e) => handleOnClickCell(e)}
                        ></div>
                    </div>
                </div>
                <div className="game-container-item">
                    <span className="game-container-item-text-points">
                        Opponent points: {opponentPoints}
                    </span>
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
            <div className="game-container-form">
                <div className="game-container-item">
                    <Button>
                        <p
                            className="game-container-item-text-button"
                            onClick={(e) => handleOnClickRestart(e)}
                        >
                            Restart
                        </p>
                    </Button>
                    <Button>
                        <p
                            className="game-container-item-text-button"
                            onClick={(e) => handleOnClickLogOut(e)}
                        >
                            Log Out
                        </p>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Game;
