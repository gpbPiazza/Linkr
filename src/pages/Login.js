import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Colors from '../utils/Colors';

/* Fiz o botão desabilitar (preventDefault nao funciona aparentemente),
o useHistory ta funcionando para a rota timeline, comunicação com o servidor ta funcionando, e os alertas. */

/* O link da imagem tenta pegar o da api da certo para logar */

/* To Do: Refatorar essas 4 funções para duas, colocar os alertas em html (Eu amanha)
 criar o context-api para salvar a resposta do servidor (se quiser fazer)*/

const Login = () => {
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
        <MainContainer>
            <StyledTitle>
                <h1> Linkdr </h1>
                <h2> save, share and discover<br/>the best links on the web </h2>
            </StyledTitle>

            <StyledLogin >
                <form>
                    <input type= 'email' placeholder= 'e-mail'  onChange= {e => setEmail(e.target.value)} value= {email} />
                    <input type= 'password' placeholder= 'password' onChange= {e => setPassWord(e.target.value)} value= {password} />

                    {firstTime && (
                        <>        
                            <input type= 'text' placeholder= 'username' onChange= {e => setUserName(e.target.value)} value= {userName} />
                            <input type= 'text' placeholder= 'picture url' onChange= {e => setPictureUrl(e.target.value)} value= {pictureUrl} />
                        </>
                    )}

                    {firstTime ?
                        <button onClick= {(e) => verifyInputSingUp(e)}  type= 'submit'> Sing Up </button>
                        :
                        <button onClick= {(e) => verifyInputLogIn(e)} type= 'submit'> Log In </button>
                    }
                </form>

                <p onClick={() => toggleInputs()}> {firstTime ? 'Switch back to log in' : 'Firts time? Creat an account!'} </p>

            </StyledLogin>
        </MainContainer>
    );
}

export default Login;

const MainContainer = styled.main`
    display: flex;
`;

const StyledTitle = styled.div`
	width: 63%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding-left: 2.5rem;
    background-color: ${Colors.black};
    font-weight: 700;
    height: 100vh;
    color: ${Colors.white};

    h1 {
        font-family: 'Passion One', cursive;
        font-size: 6.625rem;
        line-height: 7.312rem;        
    }

    h2 {
        font-family: 'Oswald', sans-serif;
        font-size: 2.6875rem;
        line-height: 4rem; 
    }
 
`;

const StyledLogin = styled.div`
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
	width: 37%;
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0 2rem;
    background-color: ${Colors.darkGrey};

    input, button {
        width: 100%;
        padding: 2rem;
        margin: 0.5rem 0;
        border-radius: 10px;
    }

    input {
        background-color: ${Colors.white};
        font-size: 1.6875rem;
        color: ${Colors.lightGrey};
    }

    button {
        font-size: 1.6875rem;
        color: ${Colors.white};
        background-color: ${Colors.midBlue};
        margin-bottom: 0.5rem;
        cursor: pointer;
    }

    p { 
        margin-top: 1rem;
        text-decoration: underline;
        font-size: 1rem;
        color: ${Colors.white};
        cursor: pointer;
    }
`;
