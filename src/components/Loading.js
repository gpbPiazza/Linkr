import React from  'react';
import styled from 'styled-components';

const Loading = ({width}) => {

    return (
        <ContainerLoading width={width}>
            <Spinner>
                <img src='/img/loadin3.gif'/>      
            </Spinner>
        </ContainerLoading>
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

const ContainerLoading = styled.div`
    width: ${(props) => props.width || '40%'};
`;

export default Loading;