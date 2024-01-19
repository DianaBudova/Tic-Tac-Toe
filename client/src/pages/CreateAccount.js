import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/CreateAccount.css";
import Input from "../elements/Input";

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
                            <p className="create-account-container-item-text">Your new login</p>
                            <Input
                                type="text"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                            />
                        </div>
                        <div className="create-account-container-item">
                            <p className="create-account-container-item-text">Your new password</p>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="create-account-container-item">
                            <Input type="submit" value="Create" />
                        </div>
                    </form>
                    <form
                        className="create-account-container-form"
                        onSubmit={(e) => handleSubmitBackToSignIn(e)}
                    >
                        <div className="auth-container-item">
                            <p>Other features</p>
                            <Input type="submit" value="Back to Sign In" />
                        </div>
                    </form>
                </>
            )}
        </div>
    );
};

export default CreateAccount;
