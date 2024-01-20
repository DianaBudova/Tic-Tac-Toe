import "./styles/PopUp.css";
import Button from "./Button";

const PopUp = ({ text, setText }) => {
    const onClickHandler = (e) => {
        e.preventDefault();
        const element = document.getElementsByClassName("popup-wrapper")[0];
        element.classList.add("hidden");
        element.addEventListener('animationend', () => {
            element.classList.remove("hidden");
            setText("");
        });
    };

    return (
        <div className="popup-wrapper">
            <div className="popup-container">
                <p>{text}</p>
                <Button onClick={(e) => onClickHandler(e)}>Got it!</Button>
            </div>
        </div>
    );
};

export default PopUp;
