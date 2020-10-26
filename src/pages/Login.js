import React, { useContext, useState } from 'react';
import { Switch } from 'react-router';
import styled from 'styled-components';
import Colors from '../utils/Colors';



const Login = () => {
    const [firstTime, setFirstTime] = useState(false)
  
  

    return (
        <MainContainer>
            <StyledTitle>
                <h1>Linkdr</h1>
                <h2>save, share and discover<br/>the best links on the web</h2>
            </StyledTitle>
            <StyledLogin>
                <form>
                    <input type='email' placeholder='e-mail'/>
                    <input type='password' placeholder='password'/>
                        {firstTime && (
                        <>        
                            <input type='text' placeholder='username'/>
                            <input type='text' placeholder='picture url'/> 
                        </>)}
                    <button type='submit'>Sing Up</button>
                </form>
                        <p onClick={() => setFirstTime(!firstTime)}>{firstTime ? 'Switch back to log in' : 'Firts time? Creat an account!'}</p>
            </StyledLogin>
        </MainContainer>
    );
}
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


export default Login;