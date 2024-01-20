import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/CreateAccount.css";
import Input from "../elements/Input";
import Submit from "../elements/Submit";
import PopUp from "../elements/PopUp";
import Loading from "../elements/Loading";

const CreateAccount = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const navigate = useNavigate();

    const handleSubmitCreateAccount = (e) => {
        e.preventDefault();
        setIsCreating(true);
        fetch("http://localhost:4000/create-user", {
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
                    ? setMessage(
                          "Congratulations! You have created an account 😺"
                      )
                    : setMessage("Sorry! Such the login is already taken 🐱")
            )
            .catch(() => setError("Error when creating an account 😿"))
            .finally(() => {
                setLogin("");
                setPassword("");
                setIsCreating(false);
            });
    };

    const handleSubmitBackToSignIn = (e) => {
        e.preventDefault();
        navigate("/");
    };

    return (
        <div className="create-account-container">
            {error ? <PopUp text={error} setText={setError} /> : <></>}
            {message ? <PopUp text={message} setText={setMessage} /> : <></>}
            {isCreating ? (
                <Loading
                    text="Creating the account..."
                    isLoading={isCreating}
                    setIsLoading={setIsCreating}
                />
            ) : (
                <></>
            )}
            <form
                className="create-account-container-form"
                onSubmit={(e) => handleSubmitCreateAccount(e)}
            >
                <div className="create-account-container-item">
                    <p className="create-account-container-item-title">
                        Create Account
                    </p>
                </div>
                <div className="create-account-container-item">
                    <p className="create-account-container-item-text">
                        Your new login
                    </p>
                    <Input
                        type="text"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                </div>
                <div className="create-account-container-item">
                    <p className="create-account-container-item-text">
                        Your new password
                    </p>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="create-account-container-item">
                    <Submit value="Create" />
                </div>
            </form>
            <form
                className="create-account-container-form"
                onSubmit={(e) => handleSubmitBackToSignIn(e)}
            >
                <div className="auth-container-item">
                    <p>Other features</p>
                    <Submit value="Back to Sign In" />
                </div>
            </form>
        </div>
    );
};

export default CreateAccount;
