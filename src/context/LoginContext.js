import React, { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const LoginContext = createContext();

export default LoginContext;

export const LoginProvider = (props) => {
    const userStorage = JSON.parse(localStorage.getItem('userRegister'));
    const configStorage = {headers: {'User-Token': userStorage?.token}};

    let history = useHistory();

    const [ userRegister, setUserRegister ] = useState(userStorage || {});
    const [ config, setConfig ] = useState(configStorage || {});
    const [ email, setEmail ] = useState('');
    const [ password, setPassWord ] = useState('');
    const [ userName, setUserName ] = useState('');
    const [ pictureUrl, setPictureUrl ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [ alert, setAlert ] = useState('');

    const requestApi = (infoUser, typeRequest) => {
        setLoading(true);
        setAlert('');
        const apiLink = `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/${typeRequest}`;
        const request = axios.post(apiLink, infoUser);
        request.then(({data}) => {
            localStorage.setItem('userRegister', JSON.stringify(data));
            setUserRegister(data);
            const headers = {headers: {'User-Token': data.token}};
            setConfig(headers);
            history.push('/timeline');
            cleanInputs();
        });
        request.catch(({response}) => {
            if (typeRequest === 'sign_up') {
                (response.status === 401) ?
                    setAlert('Email inserido já esta cadastrado')
                    :
                    setAlert('URL inválida');
            } else {
                setAlert('Email e senha incorretos');
            }
            setLoading(false);
        }); 
    } 

    const cleanUser = () => {
        setLoading(false);
        setConfig({});
        setUserRegister({});
        localStorage.clear();
    }

    const cleanInputs = () => {
        setEmail('');
        setPassWord('');
        setUserName('');
        setAlert('');
        setPictureUrl('');
    }

    const form = {email, password, userName, pictureUrl};
    const setForm = {setEmail, setPassWord, setUserName, setPictureUrl};
    const controlForm = {alert, setAlert, setLoading, loading};
    const userForm = {userRegister, config, cleanUser};

    return (
        <LoginContext.Provider value= {{controlForm, userForm, form, setForm, requestApi}}>
            {props.children}
        </LoginContext.Provider>
    );
}