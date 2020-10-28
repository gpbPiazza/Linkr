import React from  'react';
import styled from 'styled-components';
import Colors from '../utils/Colors';

const Loading = () => {

    return (
        <Container >
            <img src='/img/loadin3.gif'/>      
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;

    img {
       width: 100%;
    }
`;

export default Loading;