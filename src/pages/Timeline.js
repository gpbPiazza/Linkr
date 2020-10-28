import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import Header from  '../components/Header';
import Trending from "../components/Trending";
import Publish from "../components/Publish";
import Loading from '../components/Loading';
import {Main, Title} from '../components-style/cmpnt-styles';
import LoginContext from "../context/LoginContext";
import Posts from "../components/Posts";


const Timeline = () => {
    const [posts, setPosts] = useState([]);
    const {userForm, controlForm} = useContext(LoginContext);
    const {userRegister, config, clearUser} = userForm;
    const {loading, setLoading} = controlForm;

    useEffect(() => {
        getPosts();        
    },[]);

    const getPosts = () => {
        requestGetPost();
    }
    

    //REQUEST GET NA TIME LINE PADRÃO
    const requestGetPost = () => {
        setLoading(true);
        const request = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts?offset=0&limit=2',{headers : config.headers});

        request.then(({data}) => {
            console.log(data, 'RESPOSTA SUCESSO DA API GET POSTS');
            setPosts(data.posts);
        });

        request.catch(({response}) => {
            setLoading(false);
            console.log(response, 'RESPOSTA ERROR DA API');
        }); 
    } 
 
    
    return (
        
       <Main>
            <Header />
            <Title> timeline </Title>
            <ContainerLinkdr>
                <Publish />            
                {loading ? 
                        <ContainerLoading>
                            <Loading />
                        </ContainerLoading>
                    :
                    <>
                        <ContainerPosts>
                            {posts.map((post) => <Posts post={post} key={post.id}/>)}
                        </ContainerPosts>
                    </>}
            </ContainerLinkdr>
            <ContainerTrending>
                <Trending />
            </ContainerTrending>
           
       </Main>
    );
}

export default Timeline;

const ContainerTrending = styled.div`
    width: 35%;
`;

const ContainerLinkdr = styled.div`
    width: 62%;
`;
const ContainerPosts = styled.div`
    width: 100%;
`;

const ContainerLoading = styled.div`
    width: 20%;
    margin:0  auto;
    margin-top: 5rem;
`;
