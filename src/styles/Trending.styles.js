import styled from 'styled-components';

import Colors from '../utils/Colors';
import media from "./media";

export const TrendingContainer = styled.div`
    width: 35%;
     
    ${media} {
        display: none;
    }
`;

export const TrendingSection = styled.section`
    padding: 1rem;
    background: ${Colors.black};
    color: ${Colors.white};
    border-radius: 20px;
    height: auto;
`;

export const HashtagList = styled.ul`
    border-top: 2px solid ${Colors.darkGrey};
`;

export const Hashtag = styled.li`
    font-size: 1.5rem;
    margin-bottom: 0.7rem;
`;

export const Subtitle = styled.h2`
    font-weight: bold;
    margin-bottom: 0.5rem;
    font-size: 2rem;
    line-height: 2.5rem;
    font-family: 'Oswald', sans-serif;
`;

export const HashtagSearch = styled.form`
    border-bottom: 2px solid ${Colors.darkGrey};
    padding: 1rem 0;
    margin-bottom: 0.5rem;
    display: flex;
`;

export const Input = styled.input`
    font-size: 1.2rem;
    width: 85%;
    color: ${Colors.darkGrey};
    background: ${Colors.white};
    padding-left: 0.5rem;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
`;

export const Button = styled.button`
    padding: 0.2rem;
    width: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: ${Colors.midBlue};
    color: ${Colors.white}; 
    font-size: 2rem;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
`;