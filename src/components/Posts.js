import React, { useContext, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ReactHashtag from "react-hashtag";
import axios from 'axios';
import Tooltip from "react-simple-tooltip";
import { IoIosHeartEmpty, IoIosHeart, IoIosTrash, IoMdCreate } from "react-icons/io";

import { ContainerLike, media } from '../components-style/cmpnt-styles';
import LoginContext from '../context/LoginContext';
import Colors from '../utils/Colors';

const Posts = ({post}) => {
    const {id: postId, link, linkDescription, linkImage, linkTitle, text, user, likes: likesArray} = post;
    const {id: userId, username, avatar} = user;
    const {userForm} = useContext(LoginContext);
    const {config} = userForm;
    const {id: myID} = userForm.userRegister.user;
    const objeto = {};
    const [toggleLike, setToggleLike]= useState(false);
    const [likes, setLikes] = useState([]);
    const [edit, setEdit] = useState(false);
    const [textEdited, setTextEdited] = useState(`${text}`);
    const [textAreaDisable, setTextAreaDisable] = useState(false);
    const textInput = useRef();
    
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
            setTextAreaDisable(!textAreaDisable);
            setEdit(!edit);
            console.log(data, 'SUCESSO DO SERVER!')
        });
        request.catch(({response}) => {
            setTextAreaDisable(!textAreaDisable);
            alert('Não foi possível fazer as alterações no texto')
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

    const refactorText = () => {
        setEdit(!edit);
        setTextEdited(text);

    }

    const handleTextArea = (event) => {
        if(event.key === "Escape"){
            setEdit(!edit);
            setTextEdited(text);
        }if (event.key === "Enter") {
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
                        <IoMdCreate cursor= 'pointer' onClick={() => refactorText()} fontSize= '1.5rem'/>
                        <IoIosTrash cursor= 'pointer' fontSize= '1.5rem'/>
                    </ContainerIcon>
                    :
                    null
                }
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

        h2  {
            font-size: 1.25rem;
            margin-bottom: 0.5rem;
            color: ${Colors.white};
        }
         p{   
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

const ContainerIcon = styled.div`
    position: absolute;
    top: 0.25rem;
    right: 0rem;
    color: ${Colors.white};
    display: flex;
    justify-content: space-between;
    width: 5rem;
`;
