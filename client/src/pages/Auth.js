import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Auth.css";
import Input from "../elements/Input";
import Submit from "../elements/Submit";
import PopUp from "../elements/PopUp";
import Loading from "../elements/Loading";
import Button from "../elements/Button";

const Auth = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [passwordType, setPasswordType] = useState("password");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isValidating, setIsValidating] = useState(false);
    const navigate = useNavigate();
    const imgRef = useRef();

    const handleSubmitSignIn = (e) => {
        e.preventDefault();
        setIsValidating(true);
        fetch("http://localhost:4000/validate-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                login: login,
                password: password,
            }),
        })
            .then((response) =>
                response.ok
                    ? setMessage("You have signed successfully 😺") &&
                      sessionStorage.setItem("isAuth", "true")
                    : setMessage("Invalid login or password 🐱") &&
                      sessionStorage.setItem("isAuth", "false")
            )
            .catch(() => setError("Error when validating user 😿"))
            .finally(() => {
                setLogin("");
                setPassword("");
                setIsValidating(false);
            });
    };

    const handleSubmitCreateAccount = (e) => {
        e.preventDefault();
        navigate("/auth/creating-account");
    };

    const handleOnClickSwitchPassword = (e) => {
        e.preventDefault();
        if (passwordType === "password") {
            setPasswordType("text");
            imgRef.current.src = "/images/icons/closed-eye.png";
        } else {
            setPasswordType("password");
            imgRef.current.src = "/images/icons/opened-eye.png";
        }
    };

    return (
        <div className="auth-container">
            {error ? <PopUp text={error} setText={setError} /> : <></>}
            {message ? <PopUp text={message} setText={setMessage} /> : <></>}
            {isValidating ? <Loading text="Validating data..." /> : <></>}
            <form
                className="auth-container-form"
                onSubmit={(e) => handleSubmitSignIn(e)}
            >
                <div className="auth-container-item">
                    <p className="auth-container-item-title">Authentication</p>
                </div>
                <div className="auth-container-item">
                    <p className="auth-container-item-text">Login</p>
                    <Input
                        type="text"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                </div>
                <div className="auth-container-item">
                    <p className="auth-container-item-text">Password</p>
                    <Input
                        type={passwordType}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button onClick={(e) => handleOnClickSwitchPassword(e)}>
                        <img
                            ref={imgRef}
                            src="/images/icons/opened-eye.png"
                            width={22}
                        ></img>
                    </Button>
                </div>
                <div className="auth-container-item">
                    <Submit value="Sign In" />
                </div>
            </form>
            <form
                className="auth-container-form"
                onSubmit={(e) => handleSubmitCreateAccount(e)}
            >
                <div className="auth-container-item">
                    <p>
                        Don't have account? <b>Sign Up</b>
                    </p>
                    <Submit value="Create a new account" />
                </div>
            </form>
            <form className="auth-container-form">
                <div className="auth-container-item">
                    <p>
                        or continue as a <b>Guest</b>
                    </p>
                    <Submit value="Play as a Guest" />
                </div>
            </form>
        </div>
    );
};

export default Auth;
