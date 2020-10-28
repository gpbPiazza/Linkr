import React, { useContext, useEffect, useState } from "react";

import Header from  '../components/Header';
import Trending from "../components/Trending";
import Publish from "../components/Publish";
import styled from "styled-components";

import {Main, Title} from '../components-style/cmpnt-styles';
import LoginContext from "../context/LoginContext";
import Posts from "../components/Posts";
import axios from "axios";

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
            setPosts(data);
        });

        request.catch(({response}) => {
            console.log(response, 'RESPOSTA ERROR DA API');
            setLoading(false);
        }); 
    } 
 

    
    console.log(posts, 'IMPRIMINDO POSTS NO TIME LINE')





    
    return (
        
       <Main>
            <Header />
            <Title> timeline </Title>
            
            <ContainerLinkdr>
                <Publish />
                <Posts />
            </ContainerLinkdr>
            
            {/* {loading ? 

                <Loading />
                :
                <>


                </>
            
        
            } */}
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
    height: auto;
`;
