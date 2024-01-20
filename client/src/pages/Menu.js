import Button from "../elements/Button";

const Menu = () => {
    const handleOnClickStart = () => {};

    const handleOnClickShowStatistic = () => {};

    const handleOnClickQuit = () => {};

    return (
        <div className="menu-container">
            <Button onClick={handleOnClickStart}>Start Game</Button>
            <Button onClick={handleOnClickShowStatistic}>Show Statistic</Button>
            <Button onClick={handleOnClickQuit}>Quit the Game</Button>
        </div>
    );
};

export default Menu;
