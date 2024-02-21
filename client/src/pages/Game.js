import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config from "./../config/config.json";
import Cookies from "js-cookie";
import "./styles/Game.css";
import Button from "../elements/Button";
import PopUp from "../elements/PopUp";

const Game = () => {
    const [login, setLogin] = useState(Cookies.get("login"));
    const [loginId, setLoginId] = useState();
    const [userSign, setUserSign] = useState(Cookies.get("sign"));
    const [opponentSign, setOpponentSign] = useState(
        userSign === "cross" ? "circle" : "cross"
    );
    const [userPoints, setUserPoints] = useState(0);
    const [userFailures, setUserFailures] = useState(0);
    const [userGames, setUserGames] = useState(0);
    const [opponentPoints, setOpponentPoints] = useState(0);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (login === undefined) {
            navigate(config.browserRoutes.auth.second);
        }
        if (login === "guest") {
            return;
        }
        fetch(config.fetchRoutes.user.getIdByLogin, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                login: login,
            }),
        }).then((response) => {
            response.json().then((data) => {
                setLoginId(data.id);
            });
        });
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
        if (availableCells < 5) {
            if (userWins()) {
                setMessage("User win 😸");
                whenUserWins();
                return;
            } else if (opponentWins()) {
                setMessage("Opponent win 😿");
                whenOpponentWins();
                return;
            } else if (availableCells == 0) {
                setMessage("No one win 🐱");
                return;
            }
        }
        if (availableCells > 1) {
            let elements = [
                ...document.getElementsByClassName("game-container-item-cell"),
                ...document.getElementsByTagName("Button"),
            ];
            elements.forEach((element) => element.classList.add("unclickable"));
            setTimeout(function () {
                setRandomOpponentSign();
                elements.forEach((element) =>
                    element.classList.remove("unclickable")
                );
                if (opponentWins()) {
                    setTimeout(function () {
                        setMessage("Opponent win 😿");
                    }, 70);
                    whenOpponentWins();
                }
            }, Math.floor(Math.random() * (3000 - 500) + 1));
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
        navigate(config.browserRoutes.menu);
    };

    const handleOnClickLogOut = (e) => {
        e.preventDefault();
        Cookies.remove("login");
        Cookies.remove("sign");
        navigate(config.browserRoutes.auth.second);
    };

    const updateUserWinsInDatabase = () => {
        let oldWins;
        fetch(config.fetchRoutes.statistic.getStatisticById, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                login_id: loginId,
            }),
        }).then((response) => {
            if (response.status !== 200) {
                setMessage("Error when updating statistic 😿");
                return;
            }
            response.json().then((data) => {
                oldWins = data.data.wins;
                fetch(config.fetchRoutes.statistic.updateWins, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        login_id: loginId,
                        wins: oldWins + 1,
                    }),
                });
            });
        });
    };

    const updateUserFailuresInDatabase = () => {
        let oldFailures;
        fetch(config.fetchRoutes.statistic.getStatisticById, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                login_id: loginId,
            }),
        }).then((response) => {
            if (response.status !== 200) {
                setMessage("Error when updating statistic 😿");
                return;
            }
            response.json().then((data) => {
                oldFailures = data.data.failures;
                fetch(config.fetchRoutes.statistic.updateFailures, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        login_id: loginId,
                        failures: oldFailures + 1,
                    }),
                });
            });
        });
    };

    const updateUserGamesInDatabase = () => {
        let oldGames;
        fetch(config.fetchRoutes.statistic.getStatisticById, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                login_id: loginId,
            }),
        }).then((response) => {
            if (response.status !== 200) {
                setMessage("Error when updating statistic 😿");
                return;
            }
            response.json().then((data) => {
                oldGames = data.data.games;
                fetch(config.fetchRoutes.statistic.updateGames, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        login_id: loginId,
                        games: oldGames + 1,
                    }),
                });
            });
        });
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
            let randomNumber = Math.floor(Math.random() * (10 - 1) + 1);
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
            element.classList.remove("unclickable");
        }
    };

    const userWins = () => {
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

    const opponentWins = () => {
        if (
            document
                .getElementById("cell-1")
                .classList.contains(opponentSign) &&
            document
                .getElementById("cell-5")
                .classList.contains(opponentSign) &&
            document.getElementById("cell-9").classList.contains(opponentSign)
        ) {
            return true;
        } else if (
            document
                .getElementById("cell-3")
                .classList.contains(opponentSign) &&
            document
                .getElementById("cell-5")
                .classList.contains(opponentSign) &&
            document.getElementById("cell-7").classList.contains(opponentSign)
        ) {
            return true;
        } else if (
            document
                .getElementById("cell-1")
                .classList.contains(opponentSign) &&
            document
                .getElementById("cell-4")
                .classList.contains(opponentSign) &&
            document.getElementById("cell-7").classList.contains(opponentSign)
        ) {
            return true;
        } else if (
            document
                .getElementById("cell-2")
                .classList.contains(opponentSign) &&
            document
                .getElementById("cell-5")
                .classList.contains(opponentSign) &&
            document.getElementById("cell-8").classList.contains(opponentSign)
        ) {
            return true;
        } else if (
            document
                .getElementById("cell-3")
                .classList.contains(opponentSign) &&
            document
                .getElementById("cell-6")
                .classList.contains(opponentSign) &&
            document.getElementById("cell-9").classList.contains(opponentSign)
        ) {
            return true;
        } else if (
            document
                .getElementById("cell-1")
                .classList.contains(opponentSign) &&
            document
                .getElementById("cell-2")
                .classList.contains(opponentSign) &&
            document.getElementById("cell-3").classList.contains(opponentSign)
        ) {
            return true;
        } else if (
            document
                .getElementById("cell-4")
                .classList.contains(opponentSign) &&
            document
                .getElementById("cell-5")
                .classList.contains(opponentSign) &&
            document.getElementById("cell-6").classList.contains(opponentSign)
        ) {
            return true;
        } else if (
            document
                .getElementById("cell-7")
                .classList.contains(opponentSign) &&
            document
                .getElementById("cell-8")
                .classList.contains(opponentSign) &&
            document.getElementById("cell-9").classList.contains(opponentSign)
        ) {
            return true;
        } else {
            return false;
        }
    };

    const whenUserWins = () => {
        setUserPoints(userPoints + 1);
        setUserGames(userGames + 1);
        updateUserWinsInDatabase();
        updateUserGamesInDatabase();
        clearField();
    };

    const whenOpponentWins = () => {
        setOpponentPoints(opponentPoints + 1);
        setUserFailures(userFailures + 1);
        setUserGames(userGames + 1);
        updateUserFailuresInDatabase();
        updateUserGamesInDatabase();
        clearField();
    };

    return (
        <div className="game-container">
            {message ? (
                <>
                    <PopUp text={message} setText={setMessage} />{" "}
                    <>{clearField()}</>
                </>
            ) : (
                <></>
            )}
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
