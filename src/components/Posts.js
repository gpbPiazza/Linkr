import React, { useContext, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import ReactHashtag from "react-hashtag";
import axios from 'axios';
import Tooltip from "react-simple-tooltip";
import { IoIosHeartEmpty, IoIosHeart, IoIosTrash, IoMdCreate } from "react-icons/io";

import LoginContext from '../context/LoginContext';
import Colors from '../utils/Colors';
import DeletePost from "./DeletePost";
import { 
    ContainerIcon, ContainerLike, Description, EditBox, 
    ImageLink, PostLink, PostSection, ProfileImage, StyledPost, Text, 
    TitleLink, URL, Username, ImageContainer, TextContainer,
} from '../styles/Posts.styles';
import EditPost from './EditPost';

const Posts = ({post, refreshPage}) => {
    const {userForm} = useContext(LoginContext);
    const {id: postId, link, linkDescription, linkImage, linkTitle, text, user, likes: likesArray} = post;
    const {id: userId, username, avatar} = user;
    const {id: myID} = userForm.userRegister.user;
    const {config} = userForm;
    const objeto = {};
    const [toggleLike, setToggleLike]= useState(false);
    const [likes, setLikes] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    //const [edit, setEdit] = useState(false);
    //const [textAreaDisable, setTextAreaDisable] = useState(false);
    //const textInput = useRef();
    //const [textEdited, setTextEdited] = useState(text);
    //const [textApi, setTextApi] = useState('');
    
    useEffect(() => {
        setLikes(likesArray);
        isLiked();
        /*if(edit){
            textInput.current.focus();
        }*/
    },[/*edit*/]);

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

    /*const editPost = () => {
        setTextAreaDisable(true);
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
            setTextAreaDisable(false);
            setEdit(!edit);
            setTextEdited(text);
            console.log(response.data);
        });
    }*/

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

    /*const refactorText = () => {
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
    }*/

    return (
        <StyledPost>
            <ImageContainer>
                <Link to={`/user/${userId}`}>
                    <ProfileImage src={avatar} />
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
            </ImageContainer>
            <PostSection>
                <Username> 
                    <Link to={`/user/${userId}`}> {username} </Link> 
                </Username>
                {(userId === myID) ?
                    <ContainerIcon>
                        <IoMdCreate onClick={() => setIsEditing(!isEditing)}  cursor = 'pointer' fontSize = '1.5rem'/>
                        <IoIosTrash onClick= {() => setIsOpen(true)} cursor = 'pointer' fontSize = '1.5rem'/>
                    </ContainerIcon>
                    :
                    null
                }

                <DeletePost
                    refreshPage = {refreshPage} 
                    setIsOpen = {setIsOpen} 
                    modalIsOpen = {modalIsOpen}
                    postId = {postId}
                />
                
                <EditPost text={text} isEditing={isEditing} postId={postId}/>
                {/*edit ?
                    <EditBox  value={textEdited} 
                              disabled={textAreaDisable} 
                              onKeyDown={(event) => handleTextArea(event)} 
                              type='text' onChange={e => setTextEdited(e.target.value)}  
                              ref={textInput}/>
                    :
                    <Text>
                        <ReactHashtag renderHashtag= {value => <span key= {value}><Link to={`/hashtag/${value.slice(1)}`}>{value}</Link></span>}>
                            {textEdited}
                        </ReactHashtag>
                </Text>*/}
                    {/*textAreaDisable ? <p> Loading ... </p>: null*/}
                <PostLink className= "link" href={link} target="_blank"> 
                    <TextContainer>
                        <TitleLink> {linkTitle} </TitleLink>                         
                        <Description> {linkDescription} </Description>
                        <URL> {link} </URL>
                    </TextContainer>
                    <ImageLink src={linkImage} />
                </PostLink>
            </PostSection>
        </StyledPost>
    );
}


export default Posts;
