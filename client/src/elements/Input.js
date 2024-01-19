import "./styles/Input.css";

export default function Input({
    type,
    value,
    placeholder = "",
    onChange,
    spellCheck = false,
    children
}) {
    return (
        <input
            className="input"
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            spellCheck={spellCheck}
        >
            {children}
        </input>
    );
}
