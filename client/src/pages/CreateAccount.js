import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/CreateAccount.css";

const CreateAccount = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
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
        }).catch((error) => console.log(error));
        setLogin("");
        setPassword("");
        setIsCreating(false);
    };

    const handleSubmitBackToSignIn = (e) => {
        e.preventDefault();
        navigate("/");
    };

    return (
        <div className="create-account-container">
            {isCreating ? (
                <div className="create-account-container-item">
                    <p>Creating a new account...</p>
                </div>
            ) : (
                <>
                    <form onSubmit={(e) => handleSubmitCreateAccount(e)}>
                        <div className="create-account-container-item">
                            <p>Create Account</p>
                        </div>
                        <div className="create-account-container-item">
                            <p>Your new login:</p>
                            <input
                                type="text"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                            />
                        </div>
                        <div className="create-account-container-item">
                            <p>Your new password:</p>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="create-account-container-item">
                            <input type="submit" value="Create" />
                        </div>
                    </form>
                    <form onSubmit={(e) => handleSubmitBackToSignIn(e)}>
                        <input type="submit" value="Back to Sign In" />
                    </form>
                </>
            )}
        </div>
    );
};

export default CreateAccount;
