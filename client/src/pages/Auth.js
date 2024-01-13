import { useState } from "react";
import "./styles/Auth.css";

const Auth = () => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [isValidating, setIsValidating] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsValidating(true);
    fetch("http://localhost:4000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nickname: nickname,
        password: password,
      }),
    })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    setNickname("");
    setPassword("");
    setIsValidating(false);
  };

  return (
    <div className="Auth">
      {isValidating ? (
        <p>Validating data...</p>
      ) : (
        <form onSubmit={(e) => handleSubmit(e)}>
          <p>Authentication</p>
          <p>
            Nickname:
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </p>
          <p>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </p>
          <input type="submit" value="Submit" />
        </form>
      )}
    </div>
  );
};

export default Auth;
