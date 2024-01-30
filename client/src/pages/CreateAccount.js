import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./styles/CreateAccount.css";
import Input from "../elements/Input";
import Submit from "../elements/Submit";
import PopUp from "../elements/PopUp";
import Loading from "../elements/Loading";
import Button from "../elements/Button";

const CreateAccount = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [passwordType, setPasswordType] = useState("password");
    const [message, setMessage] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const navigate = useNavigate();
    const imgRef = useRef();

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
            .catch(() => setMessage("Error when creating an account 😿"))
            .finally(() => {
                setLogin("");
                setPassword("");
                setIsCreating(false);
            });
    };

    const handleOnClickBackToSignIn = (e) => {
        e.preventDefault();
        navigate("/auth/sign-in");
    };

    const handleOnClickPlayAsGuest = (e) => {
        e.preventDefault();
        Cookies.set("login", "guest");
        navigate("/menu");
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
        <div className="create-account-container">
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
                        type={passwordType}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button onClick={(e) => handleOnClickSwitchPassword(e)}>
                        <img
                            ref={imgRef}
                            src="/images/icons/opened-eye.png"
                            width={20}
                        ></img>
                    </Button>
                </div>
                <div className="create-account-container-item">
                    <Submit value="Create" />
                </div>
            </form>
            <form className="create-account-container-form">
                <div className="create-account-container-item">
                    <p>
                        <b>Other options</b>
                    </p>
                    <Button onClick={(e) => handleOnClickBackToSignIn(e)}>
                        <p className="create-account-container-item-text-button">
                            Back to Sign In
                        </p>
                    </Button>
                    <Button onClick={(e) => handleOnClickPlayAsGuest(e)}>
                        <p className="create-account-container-item-text-button">
                            Play as a Guest
                        </p>
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CreateAccount;
