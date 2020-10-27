import React, { useContext } from "react";
import TimelineContext from "../context/TimelineContext";
import Header from  '../components/Header';
import Trending from "../components/Trending";
import Publish from "../components/Publish";

import {Main, Title} from '../components-style/cmpnt-styles';

const Timeline = () => {

    
    return (
        
       <Main>

            <Title> timeline </Title>
            
            <Publish />

            <Trending />
       </Main>
    );
}

export default Timeline;