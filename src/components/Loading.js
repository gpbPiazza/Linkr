import React from  'react';
import styled from 'styled-components';
import Colors from '../utils/Colors';

const Loading = () => {

    return (
        <Container>
            <img src='/img/loadin3.gif'/>      
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;

    img {
       width: 70%
    }
`;

export default Loading;