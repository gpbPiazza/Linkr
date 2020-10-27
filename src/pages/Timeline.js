import React, { useContext } from "react";
import UserContext from "../context/UserContext";

const Timeline = () => {
    const {serverResponse} = useContext(UserContext);

    console.log(serverResponse);
    return (
        <h1> Teste </h1>
    );
}

export default Timeline;