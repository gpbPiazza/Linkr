import styled from 'styled-components';

import Colors from '../utils/Colors';
import media from "./media";

export const StyledModal = styled.section`
    text-align: center;
    font-family: 'Lato', sans-serif;
    padding: 1rem 4.5rem 1.5rem;

    ${media} {
        padding: 0.5rem;
    }
`;

export const Title = styled.h1`
    font-weight: bold;
    font-size: 2.125rem;
    line-height: 2.56rem;
    color: #FFFFFF;
    margin-bottom: 1.5rem;

    ${media} {
        font-size: 1.5rem;
        line-height: 1.5rem;
    }
`;

export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
`;

export const DeleteButton = styled.button`
    font-size: 1.125rem;
    font-weight: bold;
    color: ${Colors.white};
    background-color: ${Colors.midBlue};
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 5px;
    line-height: 1.375rem;

    ${media} {
        background-color: ${Colors.white};
        color: ${Colors.midBlue};
        margin-right: 1.5rem;
    }
`;

export const BackButton = styled(DeleteButton)`
    background-color: ${Colors.white};	
    color: ${Colors.midBlue};	
    margin-right: 1.5rem;
`;