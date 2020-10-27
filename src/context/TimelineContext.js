import React, { createContext, useState, useContext, useEffect } from 'react';
import LoginContext from "./LoginContext";
import axios from 'axios';

const TimelineContext = createContext();

export default TimelineContext;

export function TimelineProvider(props) {
    const {userRegister, config} = useContext(LoginContext);

    return (
        <TimelineContext.Provider value = {null}>
            {props.children}
        </TimelineContext.Provider>
    );
}