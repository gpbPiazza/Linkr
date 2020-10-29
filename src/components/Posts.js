import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Colors from '../utils/Colors';
import ReactHashtag from "react-hashtag";
import { ContainerLike } from '../components-style/cmpnt-styles'
import { IoIosHeartEmpty, IoIosHeart} from "react-icons/io";

const Posts = ({post}) => {
    const { link, linkDescription, linkImage, linkTitle, text, user } = post;
    const { id, username, avatar} = user;

    return (
        <StyledPost>
            <figure>
                <Link to={`/user/${id}`}>
                    <img src={avatar} />
                </Link>

                <ContainerLike>
                    <IoIosHeartEmpty  fontSize= '1.5rem' />
                    <p>15 likes</p>
                </ContainerLike>
            </figure>
          
            <section>
                <Link to={`/user/${id}`}>
                    <h2> {username} </h2>
                </Link>
                <p>
                    <ReactHashtag renderHashtag= {value => <span key= {value}><Link to={`/hashtag/${value.slice(1)}`}>{value}</Link></span>}>
                        {text}
                    </ReactHashtag>
                </p>
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

    @media (max-width: 450px) {
      width: 100%;
      border-radius: 0; 
    }
    
   
    figure {
        width: 10%;
        display:flex;
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
        margin: 0 1rem;

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
        @media (max-width: 450px) {
            width: 85%;
        }
    }
`;



