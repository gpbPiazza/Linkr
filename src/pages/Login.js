import React, { useContext, useState } from 'react';

import Loading from '../components/Loading';
import LoginContext from '../context/LoginContext';
import LoginForm from '../components/login/LoginForm';
import { Error } from '../components-style/cmpnt-styles';
import {
    MainContainer,
    LogoContainer,
    Logo,
    Subtitle,
    FormsContainer
} from  '../styles/Login.styles';

const Login = () => {
    const { controlForm } = useContext(LoginContext);
    const [ firstTime, setFirstTime ] = useState(false);
    const { loading, alert } = controlForm;

    return (
        <MainContainer>
            <LogoContainer>
                <Logo> Linkdr </Logo>
                <Subtitle> save, share and discover<br/>the best links on the web </Subtitle>
            </LogoContainer>
            <FormsContainer>
                <Error fontSize= {'2rem'}> {(alert) ? alert : null} </Error>
                {loading ? 
                    <Loading /> 
                :
                    <LoginForm firstTime={firstTime} setFirstTime={setFirstTime}/>
                }
            </FormsContainer>
        </MainContainer>
    );
}

export default Login;


