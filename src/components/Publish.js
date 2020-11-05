import React, { useContext, useState } from  'react';
import axios from 'axios';

import LoginContext from '../context/LoginContext';
import { Error } from '../styles/Error.styles';
import { 
    Button, ButtonContainer, ImageContainer, 
    Form, Input, ProfileImage, 
    PublishSection, Subtitle, Textarea
} from "../styles/Publish.styles";

const Publish = ({getPosts}) => {
    const { userForm } = useContext(LoginContext);
    const [ link, setLink ] = useState('');
    const [ text, setText ] = useState('');
    const [ error, setError ] = useState('');
    const [ sended, setSended ] = useState(false);
    const { avatar } = userForm.userRegister.user;
    const { config } = userForm;

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
            const apiLink = 'https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts';
            const request = axios.post(apiLink, toServer, config);
            request.then(() => {
               getPosts();
               setSended(false);
               clearInputs();
            });

            request.catch(() => {
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
        <PublishSection>
            <ImageContainer>
                <ProfileImage src= {avatar} alt= "foto de perfil" />
            </ImageContainer>

            <Form>
                <Subtitle> O que você tem para favoritar hoje? </Subtitle>
                <Input 
                    onChange = {(e => attLink(e.target.value))} 
                    type= "text" 
                    placeholder= "http://"
                    value = {link}
                />

                <Textarea
                    type= "text"
                    placeholder= "Muito irado esse link falando de javascript"
                    onChange = {(e => attText(e.target.value))}
                    value = {text}
                />

                <ButtonContainer>
                    <Error fontSize= {'1rem'}> {(error) ? error : null} </Error>
                    <Button 
                        onClick= {e => validationPublish(e)} 
                        type= "submit"> 
                        {(sended) ? 'Publishing...': 'Publish'} 
                    </Button>
                </ButtonContainer>
            </Form>
        </PublishSection>
    );
}

export default Publish;