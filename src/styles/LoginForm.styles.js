import styled from 'styled-components';

import Colors from '../utils/Colors';

export const Form = styled.form` 
    margin-top: 0.5rem;
`;
   
export const Input = styled.input`
    width: 100%;
    margin: 0.5rem 0;
    border-radius: 10px;
    padding: 0.8rem;
    background-color: ${Colors.white};
    font-size: 1.6875rem;
    color: ${Colors.lightGrey};
`;

export const Button = styled.button`
    width: 100%;
    margin: 0.5rem 0;
    border-radius: 10px;
    font-size: 1.6875rem;
    color: ${Colors.white};
    background-color: ${Colors.midBlue};
    margin-bottom: 0.5rem;
    padding: 1.2rem;
    cursor: pointer;
`;


export const Text = styled.p`
    margin-top: 1rem;
    text-decoration: underline;
    font-size: 1rem;
    color: ${Colors.white};
    cursor: pointer;
`; 