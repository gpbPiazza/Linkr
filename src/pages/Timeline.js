import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import Header from  '../components/Header';
import Trending from "../components/Trending";
import Publish from "../components/Publish";
import Loading from '../components/Loading';
import { Error } from '../styles/Error.styles';
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
        requestGetPost();
<<<<<<< HEAD
    }

    const requestFollowing = () => {
        const apiLink = `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/follows`;
        const request = axios.get(apiLink, config);
        request.then(({data}) => {
            const listFollow = data.users;
            setIsFollowing(listFollow.some(user => user.id === followID));
        });
    }

=======
    },[]);
    
>>>>>>> 55666cb3e4cb784f41422f50e35a44245a499d54
    const requestGetPost = () => {
        setLoading(true);
        const apiLink = `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/following/posts?offset=0&limit=10`;
        const request = axios.get(apiLink, config);
        request.then(({data}) => {
            console.log(data);
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
                <Publish getPosts= {requestGetPost}/>
                {loading ? 
                    <LoadingContainer>
                        <Loading />
                    </LoadingContainer>
                    :
                    booleanError ?
                        <Error fontSize= {'1.25rem'}> {(error) ? error : ''} </Error>
                        :
                        <>
                            {posts.map((post) => <Posts refreshPage={requestGetPost} post={post} key= {post.id}/>)}
                        </>
                } 
            </ScrollContainer>

            <Trending />
       </MainPage>
    );
}

export default Timeline;