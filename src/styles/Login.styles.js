import styled from 'styled-components';

import Colors from '../utils/Colors';
import media from '../utils/media';

export const MainContainer = styled.main`
    display: flex;

    ${media} {
        flex-direction: column;
    }
`;

export const FormsContainer = styled.section`
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
	
    width: 37%;
    height: 100vh;
    
    display: flex;
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


export const LogoContainer = styled.section`
	width: 63%;
    height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    
    background-color: ${Colors.black};
   
    font-weight: 700;
    color: ${Colors.white};

    padding: 0 0 2.5rem 3rem;

    ${media} {
        width: 100%;
        height: auto;
        
        text-align: center;
        align-items: center;

        padding: 0;
    }
`;

export const Logo = styled.h1`
    font-family: 'Passion One', cursive;
    font-size: 7rem;
    line-height: 7.312rem;   

    ${media} {
        font-size: 4.5rem;
        letter-spacing: 0.05em;
    }
`;

export const Subtitle = styled.h2`
    font-family: 'Oswald', sans-serif;
    font-size: 2.6875rem;
    line-height: 4rem; 

    ${media} {
        font-size: 1.4rem;
        line-height: 2rem;
        margin-bottom: 1rem;
    }
`;