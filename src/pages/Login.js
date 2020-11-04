import React, { useContext, useState } from 'react';

import Loading from '../components/Loading';
import LoginContext from '../context/LoginContext';
import LoginForm from '../components/login/LoginForm';
import { Error } from '../components-style/cmpnt-styles';
import {
    MainContainer,
    ContainerTitle,
    Title,
    SubTitle,
    ContainerForms
} from  '../styles/Login.styles';

const Login = () => {
    const [ firstTime, setFirstTime ] = useState(false);
    const { controlForm } = useContext(LoginContext);
    const { loading, alert } = controlForm;

    return (
        <MainContainer>
            <ContainerTitle>
                <Title> Linkdr </Title>
                <SubTitle> save, share and discover<br/>the best links on the web </SubTitle>
            </ContainerTitle>
            <ContainerForms >
                <Error fontSize= {'2rem'}> {(alert) ? alert : null} </Error>
                {loading ? 
                    <Loading /> 
                :
                    <LoginForm firstTime={firstTime} setFirstTime={setFirstTime}/>
                }
            </ContainerForms>
        </MainContainer>
    );
}

export default Login;


