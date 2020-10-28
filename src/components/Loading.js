import React from  'react';
import styled from 'styled-components';

const Loading = () => {

    return (
        <Spinner>
            <img src='/img/loadin3.gif'/>      
        </Spinner>
    );
}

const Spinner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
       width: 100%;
    }
`;

export default Loading;