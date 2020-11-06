import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Header from  '../components/Header';
import Trending from '../components/Trending';
import { Error } from '../styles/Error.styles';
import LoginContext from '../context/LoginContext';
import Loading from '../components/Loading';
import Posts from '../components/Posts';
import Follow from '../components/Follow';
import { MainPage, ScrollContainer, LoadingContainer, Title } from '../styles/Pages.styles';

const TimelineId = () => {
    const { id } = useParams();
    const { userForm } = useContext(LoginContext);
    const { config } = userForm;
    const { id: myID } = userForm.userRegister.user;

    const [ posts, setPosts ] = useState([]);
    const [ booleanError, setBooleanError ] = useState(false);
    const [ error, setError ] = useState('');
    const [ loading, setLoading ] = useState(true);
    const [ userData, setUserData ] = useState(null);

    useEffect(() => {
        setBooleanError(false);
        requestApi();
        requestUserData();       
    }, [id]);

    const requestApi = () => {
        const apiLink = `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/${id}/posts?offset=0&limit=10`;
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

    const requestUserData = () => {
        const apiLink = `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/${id}`;
        const request = axios.get(apiLink, config);
        request.then(({data}) => {
            setUserData(data);
        });
    }

    return (
        <MainPage>
            <Header />
            {parseInt(id) === myID ?
                <Title> My posts </Title>
                :
                <Follow userData={userData} />
            }
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

export default TimelineId;