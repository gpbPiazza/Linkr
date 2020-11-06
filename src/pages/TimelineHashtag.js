import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Header from  '../components/Header';
import Trending from '../components/Trending';
import { Error } from '../styles/Error.styles';
import LoginContext from '../context/LoginContext';
import Loading from '../components/Loading';
import Posts from '../components/Posts';
import { MainPage, ScrollContainer, LoadingContainer, Title } from '../styles/Pages.styles';

const TimelineHashtag = () => {
    const { hashtag } = useParams();
    const { userForm, controlForm } = useContext(LoginContext);
    const { config } = userForm;
    const { loading, setLoading } = controlForm;

    const [ posts, setPosts ] = useState([]);
    const [ error, setError ] = useState('');
    const [ booleanError, setBooleanError ] = useState(false);
    
    useEffect(() => {
        setBooleanError(false);
        requestApi();        
    }, [hashtag]);
    
    const requestApi = () => {
        setLoading(true);
        const apiLink = `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/hashtags/${hashtag}/posts?offset=0&limit=10`;
        const request = axios.get(apiLink, config); 
        request.then(({data}) => {
            setLoading(false);
            if (data.posts.length === 0) {
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
        <MainPage>
            <Header />
            <Title> {`# ${hashtag}`} </Title>
            <ScrollContainer>            
                {loading ? 
                    <LoadingContainer>
                        <Loading />
                    </LoadingContainer>
                    :
                    booleanError ?
                        <Error fontSize={'1.25rem'}> {(error) ? error : ''} </Error>
                        :
                        <>
                            {posts.map(post => (
                                <Posts refreshPage={requestApi} post={post} key={post.id}/>
                            ))}
                        </>
                }
            </ScrollContainer>
            <Trending />
        </MainPage>
    );
}

export default TimelineHashtag;