import React, { createContext, useState, useContext, useEffect } from 'react';
import LoginContext from "./LoginContext";
import axios from 'axios';

const TimelineContext = createContext();

export default TimelineContext;

export function TimelineProvider(props) {
    const {userRegister, config} = useContext(LoginContext);

    const headerforms = {userRegister, config};

    return (
        <TimelineContext.Provider value = {headerforms}>
            {props.children}
        </TimelineContext.Provider>
    );
}