import styled from 'styled-components';

import Colors from '../utils/Colors';
import media from '../utils/media';

export const MainPage = styled.main`
    width: 70%;
    margin: 0 auto;
    padding-top: 5rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    font-family: 'Lato', sans-serif;

    ${media} {
      margin: 0;
      width: 100%;
      align-items: center;
      justify-content: center;
    }
`;

export const Title = styled.h1`
    color: ${Colors.white};
    font-weight: 700;
    font-family: 'Oswald', sans-serif;
    font-size: 3rem;
    width: 100%;
    margin: 2rem 0; 

    ${media} {
      margin-left: 1rem;
      margin-top: 3rem;
    }
`;

export const ScrollContainer = styled.section`
    width: 62%;
   
    ${media} {
      width: 100%;
    }
`;

export const LoadingContainer = styled.div`
    width: 20%;
    margin: 0 auto;
    margin-top: 5rem;
`;