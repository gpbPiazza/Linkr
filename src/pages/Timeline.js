import React, { useContext } from "react";
import LoginContext from "../context/LoginContext";

const Timeline = () => {
    const {serverResponse} = useContext(LoginContext);

    return (
        <h1> Teste </h1>
    );
}

export default Timeline;