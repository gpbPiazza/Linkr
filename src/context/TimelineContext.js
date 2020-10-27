import React, { createContext, useState, useContext, useEffect } from 'react';
import LoginContext from "./LoginContext";
import axios from 'axios';

const TimelineContext = createContext();

export default TimelineContext;

export function TimelineProvider(props) {
    const {userRegister, config} = useContext(LoginContext);
    
    // console.log(userRegister, config, 'console.log do time line context');

    const headerforms = {userRegister, config};

    return (
        <TimelineContext.Provider value = {userRegister, config}>
            {props.children}
        </TimelineContext.Provider>
    );
}