import Colors from '../utils/Colors';
import styled from 'styled-components';


export const media = '@media (max-width: 600px)';

export const Main = styled.main`
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
      margin-left: 3rem;
      
    }
`;

export const Error = styled.span`
    color: ${Colors.lightRed};
    font-size: ${props => props.fontSize};
`;

export const ContainerTrending = styled.div`
    width: 35%;
     
    ${media} {
      display: none;
    }
`;

export const ContainerLinkdr = styled.div`
    width: 62%;

    ${media} {
      width: 100%;
    }
`;

export const ContainerLoading = styled.div`
    width: 20%;
    margin:0  auto;
    margin-top: 5rem;
`;

export const ContainerLike = styled.div`
    display: flex;
    width: 3rem;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
    color: ${Colors.white};
    font-size: 0.7rem;

    p {
      margin-top: 0.3rem;
    }
  
`;
