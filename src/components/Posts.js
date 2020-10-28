import React from 'react';
import styled from 'styled-components';
import Colors from '../utils/Colors';

const Posts = ({post}) => {
    const {postId, link, linkDescription, linkImage, linkTitle, text, user } = post;
    const {userId, username, avatar} = user;
    console.log(post, 'component recebendo os posts que vai ter que renderizar');
    return (
        <StyledPost>
            <figure>
                <img src={avatar} />
            </figure>

            <section>
                <h2> {username} </h2>
                <p> {text} </p>
                <div className= "link"> 
                    <div>
                        <h3> {linkTitle} </h3>
                        <p> {linkDescription} </p>
                        <a target="_blank">{link}</a>
                    </div>
                    <img src={linkImage} />
                </div>
            </section>

        </StyledPost>
    );
}




export default Posts;

const StyledPost = styled.article`
    background: ${Colors.black};
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    border-radius: 20px;
    margin: 2rem 0;
    
    img {
        width: 3.125rem;
        height: 3.125rem;
        border-radius: 100%;
    }

    figure {
        width: 10%;
    }

    .link {
        width: 100%;
        height: auto;
        display: flex;
        border-radius: 10px;
        border: 1px solid ${Colors.lightGrey};

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
            }
            
            a {
                font-size: 0.8rem;
                color: ${Colors.white};
            }

            
        }

        img {
            width: 30%;
            height: 100%;
        }
    }
    

    section {
        width: 89%;
        padding-top: 0.25rem;

        h2  {
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
    }
`;