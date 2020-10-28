import React, { useContext, useState } from  'react';
import styled from 'styled-components';

import Colors from '../utils/Colors';
import LoginContext from '../context/LoginContext';

const Publish = () => {
    const {userForm} = useContext(LoginContext);
    const {userRegister, config, clearUser} = userForm;
    const {user} = userRegister;
    const {avatar, email, id, username} = user;


    return (
        <StyledPublish>
            <figure>
                <img src={avatar} />
            </figure>

            <form>
                <h2> O que você tem para favoritar hoje? </h2>
                <input type= "text" placeholder= "http://" />
                <textarea type= "text" placeholder= "Muito irado esse link falando de javascript"></textarea>
                <div className= "containerButton">
                    <button type= "submit"> Publicar </button>
                </div>
            </form>
        </StyledPublish>
    );
}

export default Publish;


export const StyledPublish = styled.div`
    border-radius: 1.25rem;
    background: ${Colors.white};
    padding: 1rem;
    height: auto;
    width: auto;
    display: flex;
    justify-content: space-between;

    figure {
        width: 10%;
    }

    form {
        width: 89%;
        padding: 0 1rem;
        padding-top: 0.25rem;

        h2 {
            font-weight: 300;
            font-size: 1.25rem;
            margin-bottom: 0.5rem;
            color: ${Colors.lightGrey};
        }

        input, textarea {
            width: 100%;
            padding: 0.5rem;
            background: ${Colors.ice};
            color: ${Colors.lightGrey};
            resize: none;
            border-radius: 10px;
            font-size: 1rem;
            margin: 0.25rem 0;
        }

        textarea {
            height: 4.125rem;
        }

        .containerButton {
            display: flex;
            justify-content: flex-end;

            button {
                font-size: 1rem;
                color: ${Colors.white};
                background-color: ${Colors.midBlue};
                padding: 0.5rem 1rem;
                cursor: pointer;
                border-radius: 5px;
            }
        }

    }

    img {
        width: 3.125rem;
        height: 3.125rem;
        border-radius: 100%;
    }
`;