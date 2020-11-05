import styled from 'styled-components';
import Colors from '../utils/Colors';
export const media = '@media (max-width: 600px)';

export const FollowContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 2rem 0rem;

    ${media} {
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
        width: 2.5rem;
        height: 2.5rem;
        margin-right: 0.5rem;
    }
`;

export const FollowButton = styled.button`
    background-color: ${Colors.midBlue};
    color: ${Colors.white};
    padding: 0.8rem 1.75rem;
    cursor: pointer;
    border-radius: 5px;
    line-height: 1.06rem;
    font-size: 1.16rem;
    font-family: 'Lato', sans-serif;
    font-weight: bold;

    ${media} {
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