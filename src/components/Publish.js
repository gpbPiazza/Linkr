import React, { useContext, useState } from  'react';
import styled from 'styled-components';
import axios from 'axios';
import Colors from '../utils/Colors';
import LoginContext from '../context/LoginContext';
import { Error } from '../components-style/cmpnt-styles';

const Publish = ({getPosts}) => {
    const {userForm} = useContext(LoginContext);
    const [link, setLink] = useState('');
    const [text, setText] = useState('');
    const [error, setError] = useState('');
    const [sended, setSended] = useState(false);
    const [myPost, setMyPost] = useState([]);
    const {avatar} = userForm.userRegister.user;
    const {config} = userForm;

    const validationPublish = (event) => {
        event.preventDefault();
        if (sended) return;
        setSended(true);

        if (link === '') {
            setError("Por favor, preencha o campo de link");
            setSended(false);
        } 
        
        else {
            setError('');
            const toServer = {link, text};
            console.log(toServer, "objeto");
            console.log(config, "header");
            const apiLink = 'https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts';
            const request = axios.post(apiLink, toServer, config);
            request.then(({data}) => {
               getPosts();
               console.log(data);
               setMyPost(data.posts);
               setSended(false);
               clearInputs();
            });

            request.catch(({response}) => {
                console.log(response);
                setError('Houve um erro ao publicar seu link');
                setSended(false);
            });
        }
    }

    const clearInputs = () => {
        setLink('');
        setText('');
    }
    
    const attLink = (value) => {
        if(sended) return;
        
        setLink(value);
    }

    const attText = (value) => {
        if(sended) return;

        setText(value);
    }

    return (
        <StyledPublish>
            <Figure>
                <img src= {avatar} alt= "foto de perfil" />
            </Figure>

            <Form>
                <h2> O que você tem para favoritar hoje? </h2>
                <input 
                    onChange = {(e => attLink(e.target.value))} 
                    type= "text" 
                    placeholder= "http://"
                    value = {link}
                />

                <textarea
                    type= "text"
                    placeholder= "Muito irado esse link falando de javascript"
                    onChange = {(e => attText(e.target.value))}
                    value = {text}
                ></textarea>

                <ContainerButton>
                    <Error fontSize= {'1rem'}> {(error) ? error : ''} </Error>
                    <button 
                        onClick= {e => validationPublish(e)} 
                        type= "submit"> 
                        {(sended) ? 'Publishing...': 'Publish'} 
                    </button>
                </ContainerButton>
            </Form>
        </StyledPublish>
    );
}

export default Publish;


const StyledPublish = styled.div`
    border-radius: 1.25rem;
    background: ${Colors.white};
    padding: 1rem;
    height: auto;
    width: auto;
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
`;

const Figure = styled.figure`
    width: 10%;

    img {
        width: 3.125rem;
        height: 3.125rem;
        border-radius: 100%;
    }
`;

const Form = styled.form`
    width: 89%;
    padding: 0 1rem;
    padding-top: 0.25rem;

    h2 {
        font-weight: 300;
        font-size: 1.25rem;
        margin-bottom: 0.5rem;
        color: ${Colors.lightGrey};
    }

    input, textarea {
        width: 100%;
        padding: 0.5rem;
        background: ${Colors.ice};
        color: ${Colors.lightGrey};
        resize: none;
        border-radius: 10px;
        font-size: 1rem;
        margin: 0.25rem 0;
    }

    textarea {
        height: 4.125rem;
    }
`;

const ContainerButton = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
        font-size: 1rem;
        color: ${Colors.white};
        background-color: ${Colors.midBlue};
        padding: 0.5rem 1rem;
        cursor: pointer;
        border-radius: 5px;
    }
`;