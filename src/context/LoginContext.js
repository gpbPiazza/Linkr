import React, { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const LoginContext = createContext();

export default LoginContext;

export function LoginProvider(props) {
    let history = useHistory();
    const [firstTime, setFirstTime] = useState(false);
    const [userRegister, setUserRegister] = useState({});
    const [config, setConfig] = useState({});
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassWord]= useState('');
    const [userName, setUserName]= useState('');
    const [pictureUrl, setPictureUrl]= useState('');

    const requestApi = (infoUser, typeRequest) => {
        setLoading(true);
        const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/${typeRequest}`, infoUser);
       
        request.then(({data}) => {
            setUserRegister(data);
            setConfig({ headers: {"User-Token": data.token} });
            console.log(data, 'verificando a resposta da API');
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
            setLoading(false);
        }); 
    } 

    const verifyInputs = (event, type) => {
        
        event.preventDefault();
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

    const clearUser = () => {
        const resetUser = {};

        setConfig(resetUser);
        setUserRegister(resetUser);
        //NÃO ESTÁ FUNCIONANDO TEMOS QUE OLHAR ISSO DEPOIS
        console.log('RESETANDO O USUARIO', config, userRegister);
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
        setPictureUrl('');
    }
    
    const form = {email, password, userName, pictureUrl};
    const setForm = {setEmail, setPassWord, setUserName, setPictureUrl};
    const controlForm = {alert, verifyInputs, toggleInputs, firstTime, loading};
    const headerForm = {userRegister, config, clearUser}

    return (
        <LoginContext.Provider value= {{controlForm, form, setForm, headerForm }}>
            {props.children}
        </LoginContext.Provider>
    );
}