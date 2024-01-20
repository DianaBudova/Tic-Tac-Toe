import { useEffect } from "react";
import "./styles/Loading.css";

const Loading = ({ text, isLoading, setIsLoading }) => {
    useEffect(() => {
        if (isLoading) {
            const element = document.getElementsByClassName("loading-wrapper")[0];
            element.classList.add("hidden");
            element.addEventListener("animationend", () => {
                element.classList.remove("hidden");
                setIsLoading(false);
            });
        }
    }, isLoading);

    return (
        <div className="loading-wrapper">
            <div className="loading-container">
                <p>{text}</p>
            </div>
        </div>
    );
};

export default Loading;
