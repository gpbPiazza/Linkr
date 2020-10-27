import React, { useContext } from "react";
import LoginContext from "../context/LoginContext";
import Header from  '../components/Header';
import Trending from "../components/Trending";
import Publish from "../components/Publish";

import {Main, Title} from '../components-style/cmpnt-styles';

const Timeline = () => {
    
    return (
        

       <Main>
            <Header />

            <Title> timeline </Title>

            <Trending />

            <Publish /> 

       </Main>
    );
}

export default Timeline;