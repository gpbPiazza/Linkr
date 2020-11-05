import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import Header from  '../components/Header';
import Trending from "../components/Trending";
import Publish from "../components/Publish";
import Loading from '../components/Loading';
import { Error } from '../components-style/cmpnt-styles';
import LoginContext from "../context/LoginContext";
import Posts from "../components/Posts";
import { MainPage, ScrollContainer, LoadingContainer, Title } from '../styles/Pages.styles';

const Timeline = () => {
    const { userForm, controlForm } = useContext(LoginContext);
    const [ posts, setPosts ] = useState([]);
    const [ error, setError ] = useState('');
    const [ booleanError, setBooleanError ] = useState(false);
    const { config } = userForm;
    const { loading, setLoading } = controlForm;

    useEffect(() => {
        setBooleanError(false);
        getPosts();
    },[]);

    const getPosts = () => {
        requestGetPost();
    }
    
    const requestGetPost = () => {
        setLoading(true);
        const apiLink = `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts?offset=0&limit=10`;
        const request = axios.get(apiLink, config);
        request.then(({data}) => {
            setLoading(false);
            if(data.posts.length === 0) {
                setError('Nenhum post encontrado!');
                setBooleanError(true);
            }
            setPosts(data.posts);
        });
        request.catch(() => {
            setLoading(false);
            setError('Houve uma falha ao obter os posts, por favor atualize a página!');
            setBooleanError(true);
        }); 
    }
 
    return (
       <MainPage>
            <Header />
            <Title> Timeline </Title>
            <ScrollContainer>
                <Publish getPosts= {getPosts}/>
                {loading ? 
                    <LoadingContainer>
                        <Loading />
                    </LoadingContainer>
                    :
                    booleanError ?
                        <Error fontSize= {'1.25rem'}> {(error) ? error : ''} </Error>
                        :
                        <>
                            {posts.map((post) => <Posts getPosts= {getPosts} post= {post} key= {post.id}/>)}
                        </>
                } 
            </ScrollContainer>

            <Trending />
       </MainPage>
    );
}

export default Timeline;