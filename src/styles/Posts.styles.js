import styled from 'styled-components';

import Colors from '../utils/Colors';
import media from '../utils/media';

export const LikeContainer = styled.div`
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

export const IconContainer = styled.div`
    position: absolute;
    top: 0.25rem;
    right: 0rem;
    color: ${Colors.white};
    display: flex;
    justify-content: space-between;
    width: 4rem;
`;

export const ImageContainer = styled.div`
    width: 10%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

export const ProfileImage = styled.img`
    width: 3.125rem;
    height: 3.125rem;
    margin: 0 auto;
    border-radius: 100%;
`;

export const PostLink = styled.a`
    width: 100%;
    height: auto;
    display: flex;
    border-radius: 10px;
    border: 1px solid ${Colors.lightGrey};
    margin-top: 0.5rem;
    cursor: pointer;
`;
export const TitleLink = styled.h3`
    font-size: 1rem;
    line-height: 1.17rem;
    margin-bottom: 0.5rem;
    color: ${Colors.white};
`;
export const TextContainer = styled.div`
    width: 70%;
    padding: 1.5rem 1rem;
`;

export const ImageLink = styled.img`
    width: 30%;
    border-radius: 0;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
`;

export const Description = styled.p`
    color: ${Colors.lightGrey};
    font-size: 0.8rem;
    line-height: 1rem;
    margin-bottom: 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
        -webkit-line-clamp: 3; 
        -webkit-box-orient: vertical;
`;

export const URL = styled.h4`
    font-size: 0.8rem;
    color: ${Colors.white};
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
        -webkit-line-clamp: 1; 
        -webkit-box-orient: vertical;
`;

export const PostSection = styled.section`
    width: 89%;
    padding-top: 0.25rem;
    padding-left: 0.5rem;
    position: relative;

    ${media} {
        width: 85%;
    }
`;
export const Username = styled.h2`
    font-size: 1.25rem;
    margin-bottom: 0.6rem;
    color: ${Colors.white};
`

export const Text = styled.p`
    color: ${Colors.lightGrey};
    font-size: 1rem;
    line-height: 1.25rem;
    margin-bottom: 0.5rem;
`;

export const EditBox = styled.textarea`
    background-color: ${Colors.white};
    width: 100%;
    padding: 0.2rem;
    border-radius: 0.2rem;
    margin: 0.5rem 0rem;
    word-wrap: break-word;
    resize: none;
    overflow: scroll;
    &::-webkit-scrollbar {
        width: 0px;
        background: transparent; 
    }
`;

export const StyledPost = styled.article`
    background: ${Colors.black};
    padding: 1rem 1.5rem;
    display: flex;
    justify-content: space-between;
    border-radius: 20px;
    margin-bottom: 2rem;
    width: 100%;

    ${media} {
      width: 100%;
      border-radius: 0; 
    }
`;