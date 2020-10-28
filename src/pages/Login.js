import React, { useContext } from 'react';
import styled from 'styled-components';
import Loading from '../components/Loading';
import LoginContext from '../context/LoginContext';
import Colors from '../utils/Colors';
import {Error} from '../components-style/cmpnt-styles';

const Login = () => {
    const {controlForm, form, setForm} = useContext(LoginContext);
    const {email, password, userName, pictureUrl} = form;
    const {setEmail, setPassWord, setUserName, setPictureUrl} = setForm;
    const {alert, verifyInputs, toggleInputs, firstTime, loading} = controlForm;

    return (
        <MainContainer>
            <StyledTitle>
                <h1> Linkdr </h1>
                <h2> save, share and discover<br/>the best links on the web </h2>
            </StyledTitle>

            <StyledLogin >
                {(alert) ? <Error> {alert} </Error>: ''}

                {loading ? 
                    <ContainerLoading>
                        <Loading /> 
                    </ContainerLoading>
                :
                <> 
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
                            <button onClick= {(e) => verifyInputs(e, 'sign_up')}  type= 'submit'> Sing Up </button>
                            :
                            <button onClick= {(e) => verifyInputs(e, 'sign_in')} type= 'submit'> Log In </button>
                        }
                    </form>
                    <p onClick={() => toggleInputs()}> {firstTime ? 'Switch back to log in' : 'Firts time? Creat an account!'} </p>
                </>}

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
    padding: 0 0 2.5rem 3rem;
    background-color: ${Colors.black};
    font-weight: 700;
    height: 100vh;
    color: ${Colors.white};

    h1 {
        font-family: 'Passion One', cursive;
        font-size: 7rem;
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
        margin: 0.5rem 0;
        border-radius: 10px;
    }

    input {
        padding: 0.8rem;
        background-color: ${Colors.white};
        font-size: 1.6875rem;
        color: ${Colors.lightGrey};
    }

    button {
        font-size: 1.6875rem;
        color: ${Colors.white};
        background-color: ${Colors.midBlue};
        margin-bottom: 0.5rem;
        padding: 1.2rem;
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
const ContainerLoading = styled.div`
    width: 40%;
`;

