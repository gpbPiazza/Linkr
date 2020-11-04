import styled from 'styled-components';

import Colors from '../utils/Colors';

export const media = '@media (max-width: 600px)';

export const MainContainer = styled.main`
    display: flex;

    ${media} {
        flex-direction: column;
    }
`;

export const ContainerForms = styled.section`
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
	width: 37%;
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0 2rem;
    background-color: ${Colors.darkGrey};

    ${media} {
        width: 100%;
        height: auto;
        margin: 2rem 0;
    }
`;


export const ContainerTitle = styled.section`
	width: 63%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0 0 2.5rem 3rem;
    background-color: ${Colors.black};
    font-weight: 700;
    height: 100vh;
    color: ${Colors.white};

    ${media} {
        width: 100%;
        height: auto;
        text-align: center;
        padding: 0;
        align-items: center;
    }
`;

export const Title = styled.h1`
    font-family: 'Passion One', cursive;
    font-size: 7rem;
    line-height: 7.312rem;   

    ${media} {
        font-size: 4.5rem;
        letter-spacing: 0.05em;
    }
`;

export const SubTitle = styled.h2`
    font-family: 'Oswald', sans-serif;
    font-size: 2.6875rem;
    line-height: 4rem; 

    ${media} {
        font-size: 1.4rem;
        line-height: 2rem;
        margin-bottom: 1rem;
    }
`;
