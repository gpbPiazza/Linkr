import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

import Header from  '../components/Header';
import Trending from "../components/Trending";
import {Main, Title, Error, ContainerLinkdr, ContainerLoading} from '../components-style/cmpnt-styles';;
import LoginContext from "../context/LoginContext";
import Loading from "../components/Loading";
import Posts from "../components/Posts";

const TimelineId = () => {
    const {userForm, controlForm} = useContext(LoginContext);
    const [posts, setPosts] = useState([]);
    const [booleanError, setBooleanError] = useState(false);
    const [error, setError] = useState('');
    const { id } = useParams();
    const {config} = userForm;
    const {loading, setLoading} = controlForm;

    useEffect(() => {
        requestApi(id);        
    }, [id]);

    const requestApi = (id) => {
        setLoading(true);
        const apiLink = `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/${id}/posts?offset=0&limit=10`;
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
            setError('Houve uma falha ao obter os posts, por favor atualize a página!');
            setBooleanError(true);
            setLoading(false);
        }); 
    } 


    return (
        
        <Main>
            <Header />
            <Title> {posts.length ? `${posts[0].user.username}'s posts`: ''} </Title>
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
                            {posts.map(post => (<Posts post= {post} key= {post.id}/>))}
                        </>
                }
            </ContainerLinkdr>
            <Trending />
        </Main>
    );
}

export default TimelineId;
