import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Auth.css";
import Input from "../elements/Input";
import Submit from "../elements/Submit";
import PopUp from "../elements/PopUp";
import Loading from "../elements/Loading";

const Auth = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isValidating, setIsValidating] = useState(false);
    const navigate = useNavigate();

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
                    ? setMessage("You have signed successfully 😺")
                    : setMessage("Invalid login or password 🐱")
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
        navigate("/creating-account");
    };

    return (
        <div className="auth-container">
            {error ? <PopUp text={error} setText={setError} /> : <></>}
            {message ? <PopUp text={message} setText={setMessage} /> : <></>}
            {isValidating ? (
                <Loading
                    text="Validating data..."
                    isLoading={isValidating}
                    setIsLoading={setIsValidating}
                />
            ) : (
                <></>
            )}
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
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
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
                    <p>Don't have account? Sign Up</p>
                    <Submit value="Create a new account" />
                </div>
            </form>
            <form className="auth-container-form">
                <div className="auth-container-item">
                    <p>or continue as a Guest</p>
                    <Submit value="Play as a Guest" />
                </div>
            </form>
        </div>
    );
};

export default Auth;
