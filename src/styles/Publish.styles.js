import styled from 'styled-components';

import Colors from '../utils/Colors';

export const media = '@media (max-width: 600px)';

export const PublishSection = styled.section`
    border-radius: 1.25rem;
    background: ${Colors.white};
    padding: 1rem;
    height: auto;
    width: auto;
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;

    ${media} {
      width: 100%;
      border-radius: 0; 
    }
`;

export const ImageContainer = styled.div`
    width: 10%;
`;

export const ProfileImage = styled.img`
    width: 3.125rem;
    height: 3.125rem;
    border-radius: 100%;
`;

export const Form = styled.form`
    width: 89%;
    padding: 0 1rem;
    margin: 0 1rem;
    padding-top: 0.25rem;
`;

export const Input = styled.input`
    width: 100%;
    padding: 0.5rem;
    background: ${Colors.ice};
    color: ${Colors.lightGrey};
    resize: none;
    border-radius: 10px;
    font-size: 1rem;
    margin: 0.25rem 0;
`;

export const Textarea = styled(Input).attrs({as: "textarea"})`
    height: 4.125rem;
`;

export const Subtitle = styled.h2`
    font-weight: 300;
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: ${Colors.lightGrey};
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Button = styled.button`
    font-size: 1rem;
    color: ${Colors.white};
    background-color: ${Colors.midBlue};
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 5px;
`;