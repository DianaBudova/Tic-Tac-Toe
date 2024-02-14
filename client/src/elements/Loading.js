import "./styles/Loading.css";

const Loading = ({ text }) => {
    return (
        <div className="loading-wrapper">
            <div className="loading-container">
                <p>{text}</p>
            </div>
        </div>
    );
};

export default Loading;
