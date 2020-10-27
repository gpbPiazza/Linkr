import React, { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const LoginContext = createContext();

export default LoginContext;

export function LoginProvider(props) {
    let history = useHistory();
    const [firstTime, setFirstTime] = useState(false);
    const [serverResponse, setServerResponse] = useState(null);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [alert, setAlert] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassWord]= useState('');
    const [userName, setUserName]= useState('');
    const [pictureUrl, setPictureUrl]= useState('');

    const requestApi = (infoUser, typeRequest) => {
        const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/${typeRequest}`, infoUser);
        setButtonDisabled(true);

        request.then(anwser => {
            setServerResponse(anwser.data);
            history.push('/timeline');
            cleanInputs();
        });

        request.catch(({response}) => {
            if(typeRequest === 'sign_up') {
                (response.status === 401) ?
                    setAlert('Email inserido já esta cadastrado') 
                    :
                    setAlert('URL inválida');
            } else {
                setAlert('Email e senha incorretos');
            }

            setButtonDisabled(false);
        });
    } 

    const verifyInputs = (event, type) => {
        event.preventDefault();
        if (buttonDisabled) return ;
    
        if (type === 'sign_in') {
            if (email && password ) {
                const loginUser = {"email": email, "password": password};
                requestApi(loginUser, type);
            } else {
                setAlert('Por favor, preencha todos os campos!')
            }
        }

        else {
            if (email && password && userName && pictureUrl ) {
                const newUser = {"email": email , "password": password, "username": userName, "pictureUrl": pictureUrl};
                requestApi(newUser, type);
            } else {
                setAlert('Por favor, preencha todos os campos!')
            }
        }
    }

    const toggleInputs  = () => {
        setFirstTime(!firstTime);
        setUserName('');
        setPictureUrl('');
    }

    const cleanInputs = () => {
        setEmail('');
        setPassWord('');
        setUserName('');
        setAlert('');
        setsetPictureUrl('');
    }
    
    const form = {email, password, userName, pictureUrl};
    const setForm = {setEmail, setPassWord, setUserName, setPictureUrl};
    const controlForm = {alert, verifyInputs, toggleInputs, firstTime};

    return (
        <LoginContext.Provider value= {{ controlForm, form, setForm }}>
            {props.children}
        </LoginContext.Provider>
    );
}