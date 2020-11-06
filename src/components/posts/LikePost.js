import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Tooltip from 'react-simple-tooltip';
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io';

import LoginContext from '../../context/LoginContext';
import Colors from '../../utils/Colors';
import { LikeContainer } from "../../styles/Posts.styles";

const LikePost = (props) => {
    const { likesArray, postId } = props;
    const { userForm } = useContext(LoginContext);
    const { config } = userForm;
    const { id: myID } = userForm.userRegister.user;
    const objeto = {};

    const [ toggleLike, setToggleLike ] = useState(false);
    const [ likes, setLikes ] = useState([]);

    useEffect(() => {
        setLikes(likesArray);
        isLiked();
    },[]);

    const bothLikeRequest = (type) => {
        const apiLink = `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/${postId}/${type}`;
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
        bothLikeRequest('like');
    }

    const disLike = () => {
        setToggleLike(!toggleLike);
        bothLikeRequest('dislike');
    }

    return (
        <LikeContainer>
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
        </LikeContainer>
    );
}

export default LikePost;