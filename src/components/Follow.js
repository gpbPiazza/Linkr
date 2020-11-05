import React, {useState, useContext, useEffect} from "react";
import axios from "axios";

import LoginContext from "../context/LoginContext";
import {
    FollowContainer, InfoContainer, 
    FollowButton, ProfileImage, Title
} from "../styles/Follow.styles";

export default function Follow({posts}) {
    if(posts === undefined) {
        return null;
    }

    const object = {};
    const {userForm} = useContext(LoginContext);
    const [disabled, setDisabled] = useState(false);
    const [isFollowing, setIsFollowing] = useState(null);
    const {avatar, username, id: followID} = posts.user;
    const {config} = userForm;

    useEffect(() => {
        isFollowingRequest();
    }, []);

    const isFollowingRequest = () => {
        const apiLink = `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/follows`;
        const request = axios.get(apiLink, config);
        request.then(({data}) => {
            const listFollow = data.users;
            setIsFollowing(listFollow.some(user => user.id === followID));
        });
    }

    const bothFollowRequest = (type) => {
        setDisabled(true);
        const apiLink = `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/${followID}/${type}`;
        const request = axios.post(apiLink, object, config);
        request.then(({data}) => {
            setIsFollowing(!isFollowing);
            setDisabled(false);
        });
        request.catch(() => {
            alert("não foi possível executar a operação");
            setDisabled(false);
        });
    }

    const isFollowingButton = () => {
        if(disabled) return;

        if(isFollowing) {
            bothFollowRequest('unfollow')
        } else {
            bothFollowRequest('follow');
        }
    }

    return (
        <FollowContainer>
            <InfoContainer>
                <ProfileImage src= {avatar} />
                <Title> {`${username}'s posts`} </Title>
            </InfoContainer>
            {isFollowing === null ? null:
                <FollowButton onClick={isFollowingButton}>
                    {isFollowing ? 'Unfollow': 'Follow'}
                </FollowButton>
            }
        </FollowContainer>
    );
}