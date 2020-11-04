import React from  'react';
import styled from 'styled-components';

const Loading = ({width}) => {

    return (
        <ContainerLoading width= {width}>
            <Spinner src='/img/loadin3.gif'/>      
        </ContainerLoading>
    );
}

const Spinner = styled.img`
    width: 100%;
`;

const ContainerLoading = styled.div`
    width: ${(props) => props.width || '40%'};
    margin: 0 auto;
`;

export default Loading;