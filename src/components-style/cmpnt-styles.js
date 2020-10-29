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

    @media (max-width: 450px) {
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

    @media (max-width: 450px) {
      margin-left: 3rem;
      
    }
`;

export const Error = styled.span`
    color: ${Colors.lightRed};
    font-size: ${props => props.fontSize};
`;

export const ContainerTrending = styled.div`
    width: 35%;
     
    @media (max-width: 450px) {
      display: none;
    }
`;

export const ContainerLinkdr = styled.div`
    width: 62%;

    @media (max-width: 450px) {
      width: 100%;
    }
`;

export const ContainerLoading = styled.div`
    width: 20%;
    margin:0  auto;
    margin-top: 5rem;
`;
