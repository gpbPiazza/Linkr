import Modal from 'react-modal';
import React, {useContext, useState} from 'react';
import axios from 'axios';

import LoginContext from '../context/LoginContext';
import {
    StyledModal, Paragraph, ButtonsContainer,
    DeleteButton, BackButton, Title
} from '../styles/Modal.styles';
import Loading from "./Loading";

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

export default function DeletePost(props) {
    const {refreshPage, modalIsOpen, setIsOpen, postId} = props;
    const {userForm} = useContext(LoginContext);
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
                <Title> Tem certeza que deseja<br /> excluir essa publição </Title>

                <ButtonsContainer>
                    <BackButton className= 'backButton' onClick = {closeModal}> Não, voltar </BackButton>
                    <DeleteButton onClick = {deletePost}> Sim, excluir </DeleteButton>
                </ButtonsContainer>
                {disabled ? <Loading tall={30} large={30}/> : null}
                
            </StyledModal>
        </Modal>
    );
}