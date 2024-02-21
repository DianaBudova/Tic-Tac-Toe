import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config from "./../config/config.json";
import Cookies from "js-cookie";
import "./styles/Statistic.css";
import Button from "../elements/Button";
import PopUp from "../elements/PopUp";

const Statistic = () => {
    const [login, setLogin] = useState(Cookies.get("login"));
    const [wins, setWins] = useState();
    const [failures, setFailures] = useState();
    const [games, setGames] = useState();
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (login === undefined) {
            navigate(config.browserRoutes.auth.second);
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
                fetch(config.fetchRoutes.statistic.getStatisticById, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        login_id: data.id,
                    }),
                }).then((response) => {
                    if (response.status !== 200) {
                        setMessage("Error when getting statistic 😿");
                        return;
                    }
                    response.json().then((data) => {
                        setWins(data.data.wins);
                        setFailures(data.data.failures);
                        setGames(data.data.games);
                    });
                });
            });
        });
    });

    const handleOnClickBackToMenu = (e) => {
        e.preventDefault();
        if (login === undefined) {
            navigate(config.browserRoutes.auth.second);
        } else {
            navigate(config.browserRoutes.menu);
        }
    };

    return (
        <div className="statistic-container">
            {message ? <PopUp text={message} setText={setMessage} /> : <></>}
            <div className="statistic-container-form">
                <p className="statistic-container-title">Statistic</p>
            </div>
            <div className="statistic-container-form">
                <div className="statistic-container-item">
                    <p className="statistic-container-text">Wins</p>
                    <p className="statistic-container-text">{wins}</p>
                </div>
                <div className="statistic-container-item">
                    <p className="statistic-container-text">Failures</p>
                    <p className="statistic-container-text">{failures}</p>
                </div>
                <div className="statistic-container-item">
                    <p className="statistic-container-text">Games</p>
                    <p className="statistic-container-text">{games}</p>
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
