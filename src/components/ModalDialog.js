import Modal from 'react-modal';
import React, {useContext, useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import LoginContext from '../context/LoginContext';
import Colors from '../utils/Colors';
import media from "../styles/media";

Modal.setAppElement("#root");

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      borderRadius: '20px',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: '#333333',
    },
    overlay: {
        zIndex: '2',
    }
}

export default function ModalDialog({refreshPage}) {
    const {userForm} = useContext(LoginContext);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const {config} = userForm;

    const deletePost = () => {
        if(disabled) return;
        const link = `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/${postId}`;
        const request = axios.delete(link, config);
        setDisabled(true);
    
        request.then(() => {
            refreshPage();
            setIsOpen(false);
            setDisabled(false);
    
        });
        request.catch(({response}) => {
            console.log('erro', response);
            setIsOpen(false);
            setDisabled(false);
            alert("Não foi possível excluir o post");
        });
    }
    
    const closeModal = () => {
        if(disabled) return;
        setIsOpen(false);
    }

    return(
        <Modal
            isOpen= {modalIsOpen}
            style= {customStyles}
        >   
            <StyledModal>
                <h1> Tem certeza que deseja<br /> excluir essa publição </h1>

                <ModalButtons>
                    <button className= 'backButton' onClick = {closeModal}> Não, voltar </button>
                    <button onClick = {deletePost}> Sim, excluir </button>
                </ModalButtons>
                {disabled ? <p> Loading ... </p>: null}
                
            </StyledModal>
        </Modal>
    );
}

const StyledModal = styled.section`
    text-align: center;
    font-family: 'Lato', sans-serif;
    padding: 1rem 4.5rem 1.5rem;

    h1 {
        font-weight: bold;
        font-size: 2.125rem;
        line-height: 2.56rem;
        color: #FFFFFF;
        margin-bottom: 1.5rem;
    }

    p {
        text-align: center;
        color: ${Colors.lightRed};
        font-size: 1.5rem;
        margin-top: 1rem;
    }

    ${media} {
        h1 {
            font-size: 1.5rem;
            line-height: 1.5rem;
        }
        
        padding: 0.5rem;
    }
`;

const ModalButtons = styled.div`
    display: flex;
    justify-content: center;

    button {
        font-size: 1.125rem;
        font-weight: bold;
        color: ${Colors.white};
        background-color: ${Colors.midBlue};
        padding: 0.5rem 1rem;
        cursor: pointer;
        border-radius: 5px;
        line-height: 1.375rem;

        ${media} {
            font-size: 1rem;
        }
    }

    .backButton {
        background-color: ${Colors.white};
        color: ${Colors.midBlue};
        margin-right: 1.5rem;
    }
`;