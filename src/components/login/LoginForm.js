import React, { useContext } from 'react';

import LoginContext from '../../context/LoginContext';
import { Form, Input, Button, Text } from '../../styles/LoginForm.styles';

const LoginForm = ({firstTime, setFirstTime}) => {
    const { controlForm, requestApi, form, setForm } = useContext(LoginContext);
    const { email, password, userName, pictureUrl } = form;
    const { setEmail, setPassWord, setUserName, setPictureUrl } = setForm;
    const { setAlert } = controlForm;
   
    const verifyInputs = (event, type) => {
        event.preventDefault();
        if (type === 'sign_in') {
            if (email && password ) {
                const loginUser = {"email": email, "password": password};
                requestApi(loginUser, type);
            } else {
                setAlert('Por favor, preencha todos os campos!');
            }
        }
        else {
            if (email && password && userName && pictureUrl ) {
                const newUser = {"email": email , "password": password, "username": userName, "pictureUrl": pictureUrl};
                requestApi(newUser, type);
            } else {
                setAlert('Por favor, preencha todos os campos!');
            }
        }
    }

    const toggleInputs = () => {
        setFirstTime(!firstTime);
        setUserName('');
        setPictureUrl('');
        setAlert('');
    }

    return (
        <>
            <Form>
                <Input 
                    type= 'email' 
                    placeholder= 'e-mail'  
                    onChange= {e => setEmail(e.target.value)} 
                    value= {email}
                />
                <Input 
                    type= 'password' 
                    placeholder= 'password' 
                    onChange= {e => setPassWord(e.target.value)} 
                    value= {password} 
                />
                {firstTime && (
                    <>        
                        <Input 
                            type= 'text' 
                            placeholder= 'username' 
                            onChange= {e => setUserName(e.target.value)} 
                            value= {userName} 
                        />
                        <Input 
                            type= 'text' 
                            placeholder= 'picture url' 
                            onChange= {e => setPictureUrl(e.target.value)} 
                            value= {pictureUrl} 
                        />
                    </>
                )}
                {firstTime ?
                    <Button onClick= {(e) => verifyInputs(e, 'sign_up')} type='submit'> Sing Up </Button>
                    :
                    <Button onClick= {(e) => verifyInputs(e, 'sign_in')} type='submit'> Log In </Button>
                }
            </Form>
            <Text onClick={() => toggleInputs()}> 
                {firstTime ? 'Switch back to log in' : 'Firts time? Creat an account!'} 
            </Text>
        </>
    );
}

export default LoginForm;