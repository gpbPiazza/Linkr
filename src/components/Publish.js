import React, { useContext, useState } from  'react';
import styled from 'styled-components';
import Colors from '../utils/Colors';

const Publish = () => {
    return (
        <StyledPublish>

        </StyledPublish>
    );
}

export default Publish;


export const StyledPublish = styled.div`
    width: 65%;
    border-radius: 10px;
    background: ${Colors.white};
    padding: 1rem;
    height: 200px;
`;