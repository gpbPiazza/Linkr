import React, { useContext, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ReactHashtag from "react-hashtag";
import axios from 'axios';
import Tooltip from "react-simple-tooltip";
import { IoIosHeartEmpty, IoIosHeart, IoIosTrash, IoMdCreate } from "react-icons/io";
import Modal from 'react-modal';

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

const Posts = ({post, getPosts}) => {
    const {userForm} = useContext(LoginContext);
    const {id: postId, link, linkDescription, linkImage, linkTitle, text, user, likes: likesArray} = post;
    const {id: userId, username, avatar} = user;
    const {id: myID} = userForm.userRegister.user;
    const {config} = userForm;
    const objeto = {};
    const [toggleLike, setToggleLike]= useState(false);
    const [likes, setLikes] = useState([]);
    const [edit, setEdit] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [textAreaDisable, setTextAreaDisable] = useState(false);
    const textInput = useRef();
    const [textEdited, setTextEdited] = useState(text);
    const [textApi, setTextApi] = useState('');
    
    useEffect(() => {
        setLikes(likesArray);
        isLiked();
        if(edit){
            textInput.current.focus();
        }
    },[edit]);

    const postLike = () => {
        const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/${postId}/like`, objeto, config);
        request.then(({data}) => {
            setLikes(data.post.likes);
        });
    } 

    const postDisLike = () => {
        const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/${postId}/dislike`, objeto, config);
        request.then(({data}) => {
            setLikes(data.post.likes);
        });
    }

    const editPost = () => {
        setTextAreaDisable(!textAreaDisable);
        const request = axios.put(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/${postId}`, {"text": textEdited}, config);
        request.then(({data}) => {
            setTextEdited(data.post.text);
            setTextApi(data.post.text);
            console.log(data, 'SUCESSO DO SERVER!');
            setEdit(!edit);
            setTextAreaDisable(false);
            
        });
        request.catch(({response}) => {
            alert('Não foi possível fazer as alterações no texto');
            setTextAreaDisable(!textAreaDisable);
            console.log(response.data);
        });
    } 

    const isLiked = () => {
        likesArray.forEach(l => {
            if(l.userId === myID || l.id === myID) {
                setToggleLike(!toggleLike);
            }
        });
        return;
    }

    const like = () => {
        setToggleLike(!toggleLike);
        postLike();
    }

    const disLike = () => {
        setToggleLike(!toggleLike);
        postDisLike();
    }

    const deletePost = () => {
        if(disabled) return;
        const link = `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/${postId}`;
        const request = axios.delete(link, config);
        setDisabled(true);

        request.then(() => {
            getPosts();
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
    const refactorText = () => {
        setEdit(!edit);
        if (textEdited === textApi){
            setTextEdited(textApi);
        }else {
            setTextEdited(text);
        }
    }

    const handleTextArea = (event) => {
        if(event.key === "Escape"){
            setEdit(!edit);
            setTextEdited(text);
        }if (event.key === "Enter") {
            setTextEdited(event.target.value);
            textEdited === text ? alert('Por favor altere o texto') : editPost();   
        }
    }

    return (
        <StyledPost>
            <figure>
                <Link to={`/user/${userId}`}>
                    <img src={avatar} />
                </Link>

                <ContainerLike>
                    { toggleLike ? 
                         <IoIosHeart  onClick={() => disLike()} color={Colors.darkRed} fontSize= '2rem' />
                        :
                         <IoIosHeartEmpty  onClick={() => like()}  fontSize= '2rem' />}
                    <Tooltip content={toggleLike ? 
                        (likes.length === 1 ? 'Você curtiu' : `Você e ${likes.length-1} curtiram`) 
                            : 
                            ((likes.length === 0) ? 
                            '' 
                            : 
                            (likes.length === 1) ? 
                                `${likes[0]["user.username"]}` 
                                : 
                                `${likes[1]["user.username"]} e  ${likes.length-1} curtiram`)}  placement={"bottom"}>
                        <p>{likes.length === 0 ? '' : `${likes.length} likes`}</p>
                    </Tooltip>
                </ContainerLike>
            </figure>
            <section>
                <Link to={`/user/${userId}`}>
                    <h2> {username} </h2>
                </Link>
                {(userId === myID) ?
                    <ContainerIcon>
                        <IoMdCreate  onClick={() => refactorText()}  cursor= 'pointer' fontSize= '1.5rem'/>
                        <IoIosTrash onClick= {() => setIsOpen(true)} cursor= 'pointer' fontSize= '1.5rem'/>
                    </ContainerIcon>
                    :
                    null
                }
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
                {edit ?
                    <textarea value={textEdited} 
                              disabled={textAreaDisable} 
                              onKeyDown={(event) => handleTextArea(event)} 
                              type='text' onChange={e => setTextEdited(e.target.value)}  
                              ref={textInput}/>
                    :
                    <p>
                        <ReactHashtag renderHashtag= {value => <span key= {value}><Link to={`/hashtag/${value.slice(1)}`}>{value}</Link></span>}>
                            {textEdited}
                        </ReactHashtag>
                    </p>}
                    {textAreaDisable ? <p> Loading ... </p>: null}
                <a className= "link" href={link} target="_blank"> 
                    <div>
                        <h3> {linkTitle} </h3>                         
                        <p> {linkDescription} </p>
                        <h4>{link}</h4>
                    </div>
                    <img src={linkImage} />
                </a>
            </section>
        </StyledPost>
    );
}


export default Posts;

const StyledPost = styled.article`
    background: ${Colors.black};
    padding: 1rem 1.5rem;
    display: flex;
    justify-content: space-between;
    border-radius: 20px;
    margin-bottom: 2rem;
    width: 100%;

    ${media} {
      width: 100%;
      border-radius: 0; 
    }
    
    figure {
        width: 10%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        img {
            width: 3.125rem;
            height: 3.125rem;
            margin: 0 auto;
            border-radius: 100%;
        }
    }
    
    .link {
        width: 100%;
        height: auto;
        display: flex;
        border-radius: 10px;
        border: 1px solid ${Colors.lightGrey};
        cursor: pointer;

        div {
            width: 70%;
            padding: 1.5rem 1rem;
           
            h3 {
                font-size: 1rem;
                line-height: 1.17rem;
                margin-bottom: 0.5rem;
                color: ${Colors.white};
            }

            p {
                font-size: 0.8rem;
                line-height: 1rem;
                margin-bottom: 0.5rem;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                    -webkit-line-clamp: 3; 
                    -webkit-box-orient: vertical;

            }
            
            h4 {
                font-size: 0.8rem;
                color: ${Colors.white};
                word-wrap: break-word;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                    -webkit-line-clamp: 1; 
                    -webkit-box-orient: vertical;
            }

            
        }

        img {
            width: 30%;
            border-radius: 0;
            border-top-right-radius: 8px;
            border-bottom-right-radius: 8px;
        }
    }
    

    section {
        width: 89%;
        padding-top: 0.25rem;
        padding-left: 0.5rem;
        position: relative;

        h2 {
            font-size: 1.25rem;
            margin-bottom: 0.5rem;
            color: ${Colors.white};
        }

        p {   
            color: ${Colors.lightGrey};
            font-size: 1rem;
            line-height: 1.25rem;
            margin-bottom: 0.5rem; 
        }

        textarea {
            background-color: ${Colors.white};
            width: 100%;
            padding: 0.2rem;
            border-radius: 0.2rem;
            margin: 0.5rem 0rem;
            word-wrap: break-word;
            resize: none;
            overflow: scroll;
            ::-webkit-scrollbar {
                width: 0px;
                background: transparent; 
            }
        }

        ${media} {
            width: 85%;
        }
    }
`;

const ContainerLike = styled.div`
    display: flex;
    width: 3rem;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
    color: ${Colors.white};
    font-size: 0.7rem;

    p {
      margin-top: 0.3rem;
    }
`;

const ContainerIcon = styled.div`
    position: absolute;
    top: 0.25rem;
    right: 0rem;
    color: ${Colors.white};
    display: flex;
    justify-content: space-between;
    width: 4rem;
`;

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
