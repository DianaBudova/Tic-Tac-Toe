import "./styles/Button.css";

export default function Button({ onClick, children }) {
    return (
        <button className="button" onClick={onClick} src>
            {children}
        </button>
    );
}
