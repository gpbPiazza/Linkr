import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import Header from  '../components/Header';
import Trending from "../components/Trending";
import {Main, Title, Error, ContainerLinkdr, ContainerLoading} from '../components-style/cmpnt-styles';;
import LoginContext from "../context/LoginContext";
import Loading from "../components/Loading";
import Posts from "../components/Posts";

const TimelineMyLikes = () => {
    const {userForm, controlForm} = useContext(LoginContext);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const [booleanError, setBooleanError] = useState(false);
    const {config} = userForm;
    const {loading, setLoading} = controlForm;

    useEffect(() => {
        requestApi();        
    }, []);

    const requestApi = () => {
        setLoading(true);
        const apiLink = `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/liked`;
        const request = axios.get(apiLink, config);
        request.then(({data}) => {
            setLoading(false);
            if(data.posts.length === 0) {
                setError('Você não curtiu nenhum post ainda!');
                setBooleanError(true);
            }
            setPosts(data.posts);
        });
        request.catch(() => {
            setError('Houve uma falha ao obter os posts, por favor atualize a página!');
            setBooleanError(true);
            setLoading(false);
        }); 
    } 

    return (
        <Main>
            <Header />
            <Title> {posts.length ? `My like's posts`: ''} </Title>
            <ContainerLinkdr>            
                {loading ? 
                    <ContainerLoading>
                        <Loading />
                    </ContainerLoading>
                    :
                    booleanError ?
                        <Error fontSize= {'1.25rem'}> {(error) ? error : ''} </Error>
                        :
                        <>
                            {posts.map(post => (<Posts post= {post} key={post.id} userkey= {post.id}/>))}
                        </>
                }
            </ContainerLinkdr>
            <Trending />
        </Main>
    );
}

export default TimelineMyLikes;