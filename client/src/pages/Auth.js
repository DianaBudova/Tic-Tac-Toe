import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Auth.css";

const Auth = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
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
        }).catch((error) => console.log(error));
        setLogin("");
        setPassword("");
        setIsValidating(false);
    };

    const handleSubmitCreateAccount = (e) => {
        e.preventDefault();
        navigate("/creating-account");
    };

    return (
        <div className="auth-container">
            {isValidating ? (
                <div className="auth-container-item">
                    <p>Validating data...</p>
                </div>
            ) : (
                <>
                    <form onSubmit={(e) => handleSubmitSignIn(e)}>
                        <div className="auth-container-item">
                            <p>Authentication</p>
                        </div>
                        <div className="auth-container-item">
                            <p>Login:</p>
                            <input
                                type="text"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                            />
                        </div>
                        <div className="auth-container-item">
                            <p>Password:</p>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="auth-container-item">
                            <input type="submit" value="Sign In" />
                        </div>
                    </form>
                    <form onSubmit={(e) => handleSubmitCreateAccount(e)}>
                        <input type="submit" value="Create a new account" />
                    </form>
                </>
            )}
        </div>
    );
};

export default Auth;
