import React, { useContext, useState } from 'react';

import Loading from '../components/common/Loading';
import LoginContext from '../context/LoginContext';
import LoginForm from '../components/login/LoginForm';
import { Error } from '../utils/Error';
import {
    MainContainer, LogoContainer,
    Logo, Subtitle, FormsContainer
} from  '../styles/Login.styles';

const Login = () => {
    const { controlForm } = useContext(LoginContext);
    const { loading, alert } = controlForm;

    const [ firstTime, setFirstTime ] = useState(false);

    return (
        <MainContainer>
            <LogoContainer>
                <Logo> Linkr </Logo>
                <Subtitle> save, share and discover <br/> the best links on the web </Subtitle>
            </LogoContainer>
            <FormsContainer>
                <Error fontSize={'2rem'}> {(alert) && alert} </Error>
                {loading ? 
                    <Loading /> 
                :
                    <LoginForm firstTime={firstTime} setFirstTime={setFirstTime} />
                }
            </FormsContainer>
        </MainContainer>
    );
}

export default Login;