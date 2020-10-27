import React, { useContext } from "react";
import LoginContext from "../context/LoginContext";

const Timeline = () => {
    const {serverResponse} = useContext(UserContext);

    console.log(serverResponse);
    return (
        <h1> Teste </h1>
    );
}

export default Timeline;