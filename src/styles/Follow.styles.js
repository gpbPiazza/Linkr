import styled from 'styled-components';
import Colors from '../utils/Colors';
import media from '../utils/media';

export const FollowContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;

    margin: 2rem 0rem;
    ${media} { 
        margin-top: 3.33rem;
        padding: 0 1rem;
    }
`;

export const InfoContainer = styled.div`
    display: flex;
    align-items: center;
`;

export const ProfileImage = styled.img`
    width: 3.5rem;
    height: 3.5rem;

    border-radius: 100%;

    margin-right: 1rem;
    ${media} {
        width: 3.125rem;
        height: 3.125rem;

        margin-right: 0.5rem;
    }
`;

export const FollowButton = styled.button`
    width: 8.125rem;

    border-radius: 5px;
    background-color: ${(props) => props.isFollowing ? Colors.black : Colors.midBlue};
   
    color: ${Colors.white};
    line-height: 1.06rem;
    font-size: 1.16rem;
    font-family: 'Lato', sans-serif;
    font-weight: bold;

    cursor: pointer;
    padding: 0.8rem 1.75rem;
    

    ${media} {
        width: 30%;
        
        padding: 0.5rem;
        margin-left: 0.25rem;
    }
`;

export const Title = styled.h1`
    color: ${Colors.white};
    font-weight: 700;
    font-family: 'Oswald', sans-serif;
    font-size: 3rem;

    ${media} {
        font-size: 1.5rem;
    }
`;