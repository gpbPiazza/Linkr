import axios from 'axios';
import React, { useState, useHistory } from 'react';
import styled from 'styled-components';
import Colors from '../utils/Colors';

const Login = () => {

    const [firstTime, setFirstTime] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassWord]= useState('');
    const [userName, setUserName]= useState('');
    const [pictureUrl, setPictureUrl]= useState('');

    const singUpRequest = (newUser) => {
        console.log(newUser)
        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/sign_up", newUser);
        request.then(anwser => {
            console.log(anwser);
            const history = useHistory();
            history.push('/timeline')
        }).catch(error => {
            console.log(error.response.data)

        });
    } 

    const logInRequest = (loginUser) => {
        console.log(loginUser);
        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/sign_in", loginUser);
        request.then(anwser => {
            console.log(anwser);
            const history = useHistory();
            history.push('/timeline')
            

        }).catch(error => {
            console.log(error)

        });
    }

    //ENQUANTO A API TA PENSANDO TEM QUE DESATIVAR O BOTÃO
    //QUANDO RESPONDER COM SUCESSO TEM QUE GUARDAR O USUARIO TOKEN NO CONTEXT (ROVAVELMENTE NOIS VAMOS COLOCAR OS REQUEST DE LOGIN NO CONTEXT)
    //MASS É PARA DEPOIS.



    const verifyInputLogIn= (event) => {
        event.preventDefault();
        if (email && password ) {
            const loginUser = {"email": email, "password": password};
            logInRequest(loginUser);
        } else {
            alert('Por favor preencha tods os dados!')
        }
    }

    const verifyInputSingUp = (event) => {
        event.preventDefault();
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
