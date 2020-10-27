import React, {useEffect,createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


const UserContext = createContext();
export default UserContext;


export function UserProvider(props) {
    let history = useHistory();
    const [firstTime, setFirstTime] = useState(false);
    const [serverResponse, setServerResponse] = useState(null);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassWord]= useState('');
    const [userName, setUserName]= useState('');
    const [pictureUrl, setPictureUrl]= useState('');

    const singUpRequest = (newUser) => {
        console.log(newUser)
        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/sign_up", newUser);
        setButtonDisabled(true);
        request.then(anwser => {
            console.log(anwser)
            setServerResponse(anwser.data);
            history.push('/timeline');

        }).catch(error => {
            if(error.response.status === 401) {
                alert('Email inserido já cadastrado');
            }

            if(error.response.status === 400) {
                alert('Formato de email ou link invalido');
            }

            console.log(error.response);
            setButtonDisabled(false);
        });
    } 

    const logInRequest = (loginUser) => {
        console.log(loginUser);
        setButtonDisabled(true);
        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/sign_in", loginUser);

        request.then(anwser => {
            console.log(anwser)
            setServerResponse(anwser.data);
            history.push('/timeline');
            
        }).catch(error => {
            if(error.response.status === 401) {
                alert('Email ou senha incorretos');
            }

            if(error.response.status === 400) {
                alert('Formato de email invalido');
            }
            
            console.log(error.response)
            setButtonDisabled(false);
        });
    }

    const verifyInputLogIn= (event) => {
        event.preventDefault();
        if(buttonDisabled) return ;
        if (email && password ) {
            const loginUser = {"email": email, "password": password};
            logInRequest(loginUser);
        } else {
            alert('Por favor preencha tods os dados!')
        }
    }

    const verifyInputSingUp = (event) => {
        event.preventDefault();
        if(buttonDisabled) return ;
        if (email && password && userName && pictureUrl ) {
            const newUser = {"email": email , "password": password, "username": userName, "pictureUrl": pictureUrl};
            singUpRequest(newUser);
        } else {
            alert('Por favor preencha tods os dados!')
        }
    }

    const toggleInputs  = () => {
        setFirstTime(!firstTime);
        setUserName('');
        setPictureUrl('');
    }


 

  return (
    <UserContext.Provider value={{verifyInputSingUp, verifyInputLogIn, toggleInputs, serverResponse, firstTime, email, password, userName, pictureUrl, setEmail, setPassWord, setUserName, setPictureUrl }}>
      {props.children}
    </UserContext.Provider>
  );
}
