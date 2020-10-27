import Colors from '../utils/Colors';
import styled from 'styled-components';

export const Main = styled.main`
    width: 70%;
    margin: 0 auto;
    padding-top: 5rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    font-family: 'Lato', sans-serif;
`;

export const Title = styled.h1`
    color: ${Colors.white};
    font-weight: 700;
    font-family: 'Oswald', sans-serif;
    font-size: 3rem;
    width: 100%;
    margin: 2rem 0; 
`;