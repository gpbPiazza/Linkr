import React, { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const LoginContext = createContext();

export default LoginContext;

export function LoginProvider(props) {
    let history = useHistory();
    const [userRegister, setUserRegister] = useState({});
    const [config, setConfig] = useState({});
    const [ email, setEmail ] = useState('');
    const [ password, setPassWord ]= useState('');
    const [ userName, setUserName ]= useState('');
    const [ pictureUrl, setPictureUrl ]= useState('');
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState('');
   
    const requestApi = (infoUser, typeRequest) => {
        setLoading(true);
        setAlert('');
        const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/${typeRequest}`, infoUser);
        request.then(({data}) => {
            setUserRegister(data);
            setConfig({ headers: {"User-Token": data.token} });
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

    const cleanUser = () => {
        setLoading(false);
        setConfig({});
        setUserRegister({});
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
        <LoginContext.Provider value= {{controlForm, userForm, form, setForm , requestApi}}>
            {props.children}
        </LoginContext.Provider>
    );
}