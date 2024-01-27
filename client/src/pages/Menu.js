import "./styles/Menu.css";
import Button from "../elements/Button";

const Menu = () => {
    const handleOnClickStart = () => {};

    const handleOnClickShowStatistic = () => {};

    const handleOnClickLogOut = () => {};

    return (
        <div className="menu-container">
            <div className="menu-container-form">
                <div className="menu-container-item">
                    <p className="menu-container-item-title">Welcome to Tic-Tac-Toe!</p>
                </div>
                <div className="menu-container-item">
                    <Button onClick={handleOnClickStart}>
                        <p className="menu-container-item-text">Start Game</p>
                    </Button>
                </div>
                <div className="menu-container-item">
                    <Button onClick={handleOnClickShowStatistic}>
                        <p className="menu-container-item-text">Show Statistic</p>
                    </Button>
                </div>
                <div className="menu-container-item">
                    <Button onClick={handleOnClickLogOut}>
                        <p className="menu-container-item-text">Log Out</p>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Menu;
