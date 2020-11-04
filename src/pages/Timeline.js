import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import Header from  '../components/Header';
import Trending from "../components/Trending";
import Publish from "../components/Publish";
import Loading from '../components/Loading';
import {Main, Title, ContainerLinkdr, ContainerLoading} from '../components-style/cmpnt-styles';
import LoginContext from "../context/LoginContext";
import Posts from "../components/Posts";

const Timeline = () => {
    const { userForm, controlForm } = useContext(LoginContext);
    const [ posts, setPosts ] = useState([]);
    const [ error, setError ] = useState('');
    const [ booleanError, setBooleanError ] = useState(false);
    const { config } = userForm;
    const { loading, setLoading } = controlForm;

    useEffect(() => {
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
                setHasMore(false);
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
       <Main>
            <Header />
            <Title> timeline </Title>
            <ContainerLinkdr >
                <Publish getPosts= {getPosts}/>
                {loading ? 
                        <ContainerLoading>
                            <Loading />
                        </ContainerLoading>
                    :
                    booleanError ?
                        <Error fontSize= {'1.25rem'}> {(error) ? error : ''} </Error>
                        :
                        <>
                            {posts.map((post) => <Posts getPosts= {getPosts} post= {post} key= {post.id}/>)}
                        </>
                } 
            </ContainerLinkdr>

            <Trending />
       </Main>
    );
}

export default Timeline;