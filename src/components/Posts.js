import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Tooltip from 'react-simple-tooltip';
import { IoIosHeartEmpty, IoIosHeart, IoIosTrash, IoMdCreate } from 'react-icons/io';

import EditPost from './EditPost';
import LoginContext from '../context/LoginContext';
import Colors from '../utils/Colors';
import DeletePost from './DeletePost';
import { 
    ContainerIcon, ContainerLike, Description, 
    ImageLink, PostLink, PostSection, ProfileImage, StyledPost, 
    TitleLink, URL, Username, ImageContainer, TextContainer,
} from '../styles/Posts.styles';

const Posts = ({post, refreshPage}) => {
    const { userForm } = useContext(LoginContext);
    const { id: postId, link, linkDescription, linkImage, linkTitle, text, user, likes: likesArray } = post;
    const { id: userId, username, avatar } = user;
    const { id: myID } = userForm.userRegister.user;
    const { config } = userForm;
    const objeto = {};

    const [ toggleLike, setToggleLike ]= useState(false);
    const [ likes, setLikes ] = useState([]);
    const [ modalIsOpen, setIsOpen ] = useState(false);
    const [ isEditing, setIsEditing ] = useState(false);
    
    useEffect(() => {
        setLikes(likesArray);
        isLiked();
    },[]);

    const postLike = () => {
        const apiLink = `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/${postId}/like`;
        const request = axios.post(apiLink, objeto, config);
        request.then(({data}) => {
            setLikes(data.post.likes);
        });
    } 

    const postDisLike = () => {
        const apiLink = `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/${postId}/dislike`;
        const request = axios.post(apiLink, objeto, config);
        request.then(({data}) => {
            setLikes(data.post.likes);
        });
    }

    const isLiked = () => {
        likesArray.forEach(l => {
            if (l.userId === myID || l.id === myID) {
                setToggleLike(!toggleLike);
            }
        });
    }

    const like = () => {
        setToggleLike(!toggleLike);
        postLike();
    }

    const disLike = () => {
        setToggleLike(!toggleLike);
        postDisLike();
    }

    return (
        <StyledPost>
            <ImageContainer>
                <Link to={`/user/${userId}`}>
                    <ProfileImage src={avatar} />
                </Link>
                <ContainerLike>
                    {toggleLike ? 
                         <IoIosHeart onClick={() => disLike()} color={Colors.darkRed} fontSize='2rem' />
                        :
                         <IoIosHeartEmpty onClick={() => like()} fontSize='2rem' />}
                    <Tooltip content={toggleLike ? 
                        (likes.length === 1 ? 'Você curtiu' : `Você e ${likes.length-1} curtiram`) 
                            : 
                            ((likes.length === 0) ? 
                            '' 
                            : 
                            (likes.length === 1) ? 
                                `${likes[0]['user.username']}` 
                                : 
                                `${likes[1]['user.username']} e  ${likes.length-1} curtiram`)} placement={'bottom'}>
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
                        <IoMdCreate 
                            onClick={() => setIsEditing(!isEditing)} 
                            cursor='pointer' 
                            fontSize='1.5rem'
                        />
                        <IoIosTrash 
                            onClick={() => setIsOpen(true)} 
                            cursor='pointer' 
                            fontSize='1.5rem'
                        />
                    </ContainerIcon>
                    :
                    null
                }
                <DeletePost
                    refreshPage={refreshPage} 
                    setIsOpen={setIsOpen} 
                    modalIsOpen={modalIsOpen}
                    postId={postId}
                />
                <EditPost text={text} isEditing={isEditing} postId={postId}/>
                <PostLink className='link' href={link} target='_blank'> 
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