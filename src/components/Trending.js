import React, { useContext, useState } from  'react';
import styled from 'styled-components';
import Colors from '../utils/Colors';

const Trending = () => {
    return (
        <StyledTrending>
            <h2> trending </h2> 

            <ul>
                <li> node </li>
                <li> react </li>
                <li> aaa </li>
                <li> bbb </li>
                <li> bbb </li>
                <li> bbb </li>
            </ul>

        </StyledTrending>
    );
}

export default Trending;


export const StyledTrending = styled.div`
    width: 35%;
    padding: 1rem;
    background: ${Colors.black};
    color: ${Colors.white};
    border-radius: 20px;
    
    h2 {
        font-weight: bold;
        margin-bottom: 0.5rem;
        font-size: 2rem;
        line-height: 2.5rem;
        font-family: 'Oswald', sans-serif;
    }

    ul {
        border-top: 1px solid ${Colors.darkGrey};
        padding-top: 0.5rem;
        overflow: hidden;
    }

    li {
        font-size: 1.5rem;
        margin-bottom: 0.7rem;
    }
`;