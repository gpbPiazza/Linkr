import React, { useContext, useState } from  'react';
import styled from 'styled-components';
import Colors from '../utils/Colors';

const Trending = () => {
    return (
        <StyledTrending>
            <li> #node </li>
            <li> #react </li>
            <li> #aaa </li>
            <li> #bbb </li>
        </StyledTrending>
    );
}

export default Trending;


export const StyledTrending = styled.div`
    width: 30%;
    padding: 2rem 1rem;
    
    h2 {
        font-weight: bold;
        line-height: 2.5rem;
        font-size: 1.7rem;
        font-family: 'Oswald', sans-serif;
    }

    ul {
        border-top: 1px solid ${Colors.darkGrey};
        overflow-y: scroll;
    }

    li {
        font-size: 1rem;
        line-height: 1.5rem;
    }
`;