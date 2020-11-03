import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import Header from  '../components/Header';
import Trending from "../components/Trending";
import Publish from "../components/Publish";
import Loading from '../components/Loading';
import {Main, Title, ContainerTrending, ContainerLinkdr, ContainerLoading} from '../components-style/cmpnt-styles';
import LoginContext from "../context/LoginContext";
import Posts from "../components/Posts";


const Timeline = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const [booleanError, setBooleanError] = useState(false);
    const {userForm, controlForm} = useContext(LoginContext);
    const {config} = userForm;
    const {loading, setLoading} = controlForm;
<<<<<<< HEAD
    const [hasMore, setHasMore] = useState(true);
    const [offset, setOffset] = useState(0);
=======
>>>>>>> 07a0c69ceff3e8389242bdc52e81b1ec5d102d6c

    useEffect(() => {
        requestGetPost();
    },[]);

    const getPosts = () => {
        requestGetPost();
    }
    
    const requestGetPost = () => {
        setLoading(true);
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts?offset=0&limit=10`, config);
        request.then(({data}) => {
            setLoading(false);
            if(data.posts.length === 0) {
                setError('Nenhum post encontrado!');
                setHasMore(false);
            }
            setPosts(data.posts);
        });
        request.catch(({response}) => {
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
<<<<<<< HEAD
                {booleanError ?
                        <Error fontSize= {'1.25rem'}> {(error) ? error : ''} </Error>
                        :
                        <InfiniteScroll
                            dataLength={posts.length}
                            next={requestGetPost}
                            hasMore={hasMore}
                            loader={
                                <ContainerLoading>
                                    <Loading />
                                </ContainerLoading>
                            }

                            endMessage= {
                                <Error fontSize= {'1.25rem'}> {(error) ? error : ''} </Error>
                            }
                        >
                                {posts.map(post => (<Posts post= {post} key= {post.id}/>))}
                        </InfiniteScroll>
                }
=======
                {loading ? 
                        <ContainerLoading>
                            <Loading />
                        </ContainerLoading>
                    :
                    booleanError ?
                        <Error fontSize= {'1.25rem'}> {(error) ? error : ''} </Error>
                        :
                        <>
                            {posts.map((post) => <Posts post= {post} key= {post.id}/>)}
                        </>
                } 
>>>>>>> 07a0c69ceff3e8389242bdc52e81b1ec5d102d6c
            </ContainerLinkdr>
            <ContainerTrending>
                <Trending />
            </ContainerTrending>
       </Main>
    );
}

export default Timeline;
