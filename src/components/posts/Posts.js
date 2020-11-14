import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosTrash, IoMdCreate } from 'react-icons/io';

import EditPost from './EditPost';
import LoginContext from '../../context/LoginContext';
import DeletePost from './DeletePost';
import LikePost from "./LikePost";
import { 
    IconContainer, Description, 
    ImageLink, PostLink, PostSection, ProfileImage, StyledPost, 
    TitleLink, URL, Username, ImageContainer, TextContainer,
} from '../../styles/Posts.styles';

const Posts = ({post, refreshPage}) => {
    const { userForm } = useContext(LoginContext);
    const { id: postId, link, linkDescription, linkImage, linkTitle, text, user, likes: likesArray } = post;
    const { id: userId, username, avatar } = user;
    const { id: myID } = userForm.userRegister.user;

    const [ modalIsOpen, setIsOpen ] = useState(false);
    const [ isEditing, setIsEditing ] = useState(false);

    return (
        <StyledPost>
            <ImageContainer>
                <Link to={`/user/${userId}`}>
                    <ProfileImage src={avatar} />
                </Link>

                <LikePost 
                    likesArray={likesArray}
                    postId={postId}
                />
            </ImageContainer>
            <PostSection>
                <Username> 
                    <Link to={`/user/${userId}`}> {username} </Link> 
                </Username>
                {(userId === myID) &&
                    <IconContainer>
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
                    </IconContainer>
                }
                <DeletePost
                    refreshPage={refreshPage} 
                    setIsOpen={setIsOpen} 
                    modalIsOpen={modalIsOpen}
                    postId={postId}
                />
                <EditPost 
                    text={text} 
                    isEditing={isEditing} 
                    postId={postId}
                    setIsEditing={setIsEditing}
                />
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