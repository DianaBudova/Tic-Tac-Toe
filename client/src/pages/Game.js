import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./styles/Game.css";
import Button from "../elements/Button";
import PopUp from "../elements/PopUp";

const Game = () => {
    const [login, setLogin] = useState(Cookies.get("login"));
    const [userSign, setUserSign] = useState(Cookies.get("sign"));
    const [opponentSign, setOpponentSign] = useState(
        userSign === "cross" ? "circle" : "cross"
    );
    const [userPoints, setUserPoints] = useState(0);
    const [opponentPoints, setOpponentPoints] = useState(0);
    const [message, setMessage] = useState("");
    const [isOpponentFirst, setIsOpponentFirst] = useState((Math.floor(Math.random() * (9 - 1) + 1)) == 1 ? true : false);
    const navigate = useNavigate();

    useEffect(() => {
        if (login === undefined) {
            navigate("/auth/sign-in");
        }
    });

    const handleOnClickCell = (e, id) => {
        e.preventDefault();
        var element = document.getElementById(id);
        if (
            element.classList.contains("cross") ||
            element.classList.contains("circle")
        ) {
            return;
        }
        element.classList.add(userSign);
        let availableCells = getAvailableCells();
        if (availableCells > 1) {
            setRandomOpponentSign();
        }
        if (availableCells < 5) {
            if (isUserWin()) {
                setMessage("You win 😸");
                setUserPoints(userPoints + 1);
                setIsOpponentFirst(false);
            } else if (isOpponentWin()) {
                setMessage("Opponent win 😿");
                setOpponentPoints(opponentPoints + 1);
                setIsOpponentFirst(true);
            }
        }
        if (availableCells == 0) {
            if (isUserWin()) {
                setMessage("You win 😸");
                setUserPoints(userPoints + 1);
                setIsOpponentFirst(false);
            } else if (isOpponentWin()) {
                setMessage("Opponent win 😿");
                setOpponentPoints(opponentPoints + 1);
                setIsOpponentFirst(true);
            } else {
                setMessage("No one win 🐱");
                setIsOpponentFirst((Math.floor(Math.random() * (9 - 1) + 1)) == 1 ? true : false);
            }
        }
    };

    const handleOnClickRestart = (e) => {
        e.preventDefault();
        setUserPoints(0);
        setOpponentPoints(0);
        clearField();
    };

    const handleOnClickBackToMenu = (e) => {
        e.preventDefault();
        navigate("/menu");
    };

    const handleOnClickLogOut = (e) => {
        e.preventDefault();
        Cookies.remove("login");
        Cookies.remove("sign");
        navigate("/auth/sign-in");
    };

    const getAvailableCells = () => {
        let availableCells = 0;
        for (let i = 1; i <= 9; i++) {
            let element = document.getElementById(`cell-${i}`);
            if (
                element.classList.contains("cross") ||
                element.classList.contains("circle")
            ) {
                continue;
            } else {
                availableCells++;
            }
        }
        return availableCells;
    };

    const setRandomOpponentSign = () => {
        while (true) {
            let randomNumber = Math.floor(Math.random() * (9 - 1) + 1);
            let element = document.getElementById(`cell-${randomNumber}`);
            if (
                element.classList.contains("cross") ||
                element.classList.contains("circle")
            ) {
                continue;
            }
            element.classList.add(opponentSign);
            break;
        }
    };

    const clearField = () => {
        for (let i = 1; i <= 9; i++) {
            let element = document.getElementById(`cell-${i}`);
            element.classList.remove("cross");
            element.classList.remove("circle");
        }
    }

    const isUserWin = () => {
        if (
            document.getElementById("cell-1").classList.contains(userSign) &&
            document.getElementById("cell-5").classList.contains(userSign) &&
            document.getElementById("cell-9").classList.contains(userSign)
        ) {
            return true;
        } else if (
            document.getElementById("cell-3").classList.contains(userSign) &&
            document.getElementById("cell-5").classList.contains(userSign) &&
            document.getElementById("cell-7").classList.contains(userSign)
        ) {
            return true;
        } else if (
            document.getElementById("cell-1").classList.contains(userSign) &&
            document.getElementById("cell-4").classList.contains(userSign) &&
            document.getElementById("cell-7").classList.contains(userSign)
        ) {
            return true;
        } else if (
            document.getElementById("cell-2").classList.contains(userSign) &&
            document.getElementById("cell-5").classList.contains(userSign) &&
            document.getElementById("cell-8").classList.contains(userSign)
        ) {
            return true;
        } else if (
            document.getElementById("cell-3").classList.contains(userSign) &&
            document.getElementById("cell-6").classList.contains(userSign) &&
            document.getElementById("cell-9").classList.contains(userSign)
        ) {
            return true;
        } else if (
            document.getElementById("cell-1").classList.contains(userSign) &&
            document.getElementById("cell-2").classList.contains(userSign) &&
            document.getElementById("cell-3").classList.contains(userSign)
        ) {
            return true;
        } else if (
            document.getElementById("cell-4").classList.contains(userSign) &&
            document.getElementById("cell-5").classList.contains(userSign) &&
            document.getElementById("cell-6").classList.contains(userSign)
        ) {
            return true;
        } else if (
            document.getElementById("cell-7").classList.contains(userSign) &&
            document.getElementById("cell-8").classList.contains(userSign) &&
            document.getElementById("cell-9").classList.contains(userSign)
        ) {
            return true;
        } else {
            return false;
        }
    };

    const isOpponentWin = () => {
        if (
            document.getElementById("cell-1").classList.contains(opponentSign) &&
            document.getElementById("cell-5").classList.contains(opponentSign) &&
            document.getElementById("cell-9").classList.contains(opponentSign)
        ) {
            return true;
        } else if (
            document.getElementById("cell-3").classList.contains(opponentSign) &&
            document.getElementById("cell-5").classList.contains(opponentSign) &&
            document.getElementById("cell-7").classList.contains(opponentSign)
        ) {
            return true;
        } else if (
            document.getElementById("cell-1").classList.contains(opponentSign) &&
            document.getElementById("cell-4").classList.contains(opponentSign) &&
            document.getElementById("cell-7").classList.contains(opponentSign)
        ) {
            return true;
        } else if (
            document.getElementById("cell-2").classList.contains(opponentSign) &&
            document.getElementById("cell-5").classList.contains(opponentSign) &&
            document.getElementById("cell-8").classList.contains(opponentSign)
        ) {
            return true;
        } else if (
            document.getElementById("cell-3").classList.contains(opponentSign) &&
            document.getElementById("cell-6").classList.contains(opponentSign) &&
            document.getElementById("cell-9").classList.contains(opponentSign)
        ) {
            return true;
        } else if (
            document.getElementById("cell-1").classList.contains(opponentSign) &&
            document.getElementById("cell-2").classList.contains(opponentSign) &&
            document.getElementById("cell-3").classList.contains(opponentSign)
        ) {
            return true;
        } else if (
            document.getElementById("cell-4").classList.contains(opponentSign) &&
            document.getElementById("cell-5").classList.contains(opponentSign) &&
            document.getElementById("cell-6").classList.contains(opponentSign)
        ) {
            return true;
        } else if (
            document.getElementById("cell-7").classList.contains(opponentSign) &&
            document.getElementById("cell-8").classList.contains(opponentSign) &&
            document.getElementById("cell-9").classList.contains(opponentSign)
        ) {
            return true;
        } else {
            return false;
        }
    };

    return (
        <div className="game-container">
            {message ? <><PopUp text={message} setText={setMessage}/> <>{clearField()}</></> : <></>}
            <div className="game-container-form">
                <div className="game-container-item">
                    <p className="game-container-item-title">Tic-Tac-Toe</p>
                </div>
            </div>
            <div className="game-container-form">
                <div className="game-container-item">
                    <div className="game-container-item-column">
                        <div
                            id="cell-1"
                            className="game-container-item-cell"
                            onClick={(e) => handleOnClickCell(e, "cell-1")}
                        ></div>
                        <div
                            id="cell-2"
                            className="game-container-item-cell"
                            onClick={(e) => handleOnClickCell(e, "cell-2")}
                        ></div>
                        <div
                            id="cell-3"
                            className="game-container-item-cell"
                            onClick={(e) => handleOnClickCell(e, "cell-3")}
                        ></div>
                    </div>
                    <div className="game-container-item-column">
                        <div
                            id="cell-4"
                            className="game-container-item-cell"
                            onClick={(e) => handleOnClickCell(e, "cell-4")}
                        ></div>
                        <div
                            id="cell-5"
                            className="game-container-item-cell"
                            onClick={(e) => handleOnClickCell(e, "cell-5")}
                        ></div>
                        <div
                            id="cell-6"
                            className="game-container-item-cell"
                            onClick={(e) => handleOnClickCell(e, "cell-6")}
                        ></div>
                    </div>
                    <div className="game-container-item-column">
                        <div
                            id="cell-7"
                            className="game-container-item-cell"
                            onClick={(e) => handleOnClickCell(e, "cell-7")}
                        ></div>
                        <div
                            id="cell-8"
                            className="game-container-item-cell"
                            onClick={(e) => handleOnClickCell(e, "cell-8")}
                        ></div>
                        <div
                            id="cell-9"
                            className="game-container-item-cell"
                            onClick={(e) => handleOnClickCell(e, "cell-9")}
                        ></div>
                    </div>
                </div>
            </div>
            <div className="game-container-form">
                <div className="game-container-item">
                    <span className="game-container-item-text">
                        {login.charAt(0).toUpperCase() + login.slice(1)} (
                        {userPoints})
                    </span>
                    <span className="game-container-item-text">VS</span>
                    <span className="game-container-item-text">
                        ({opponentPoints}) Opponent
                    </span>
                </div>
            </div>
            <div className="game-container-form">
                <div className="game-container-item">
                    <Button onClick={(e) => handleOnClickRestart(e)}>
                        <p className="game-container-item-text-button">
                            Restart
                        </p>
                    </Button>
                    <Button onClick={(e) => handleOnClickBackToMenu(e)}>
                        <p className="game-container-item-text-button">
                            Back to Menu
                        </p>
                    </Button>
                    <Button onClick={(e) => handleOnClickLogOut(e)}>
                        <p className="game-container-item-text-button">
                            Log Out
                        </p>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Game;
