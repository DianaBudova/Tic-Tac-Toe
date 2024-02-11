import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Statistic = () => {
    const [login, setLogin] = useState(Cookies.get("login"));
    const navigate = useNavigate();

    useEffect(() => {
        if (login === undefined) {
            navigate("/auth/sign-in");
        }
    });

    return <div>Statistic</div>;
};

export default Statistic;
