import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Header from  '../components/Header';
import Trending from "../components/Trending";
import Publish from "../components/Publish";
import Loading from '../components/Loading';
import {Main, Title, Error, ContainerTrending, ContainerLinkdr, ContainerLoading} from '../components-style/cmpnt-styles';
import LoginContext from "../context/LoginContext";
import Posts from "../components/Posts";
import InfiniteScroll from 'react-infinite-scroller';
import styled from "styled-components";


const Timeline = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const [booleanError, setBooleanError] = useState(false);
    const {userForm, controlForm} = useContext(LoginContext);
    const {config} = userForm;
    const {loading, setLoading} = controlForm;
    const [page, setPage] = useState(0);

    useEffect(() => {
        getPosts();
        // getLikedPosts();        
    },[page]);

    const getPosts = () => {
        requestGetPost();
    }

    // const getLikedPosts = () => {
    //     const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/${postId}/dislike`, objeto, config);
    
    //     request.then(({data}) => {
    //         setLikes(data.post.likes);
    //     });

    //     request.catch(({response}) => {
    //         console.log(response.data, 'RESPOSTA ERROR DA API POST LIKE');
    //         //VER SE DA PARA MANDAR UMA MENSAGEM DE VERIFIQUE SUA INTERNET!.
    //     });

    // }
    
    const requestGetPost = () => {
        setLoading(true);
        const request = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts?offset=10&limit=10', config);

        request.then(({data}) => {
            console.log(data, 'RESPOSTA SUCESSO DA API GET POSTS');
            setLoading(false);
            if(data.posts.length === 0) {
                setError('Nenhum post encontrado!');
                setBooleanError(true);
            }
            setPosts(data.posts);
            
        });

        request.catch(({response}) => {
            setLoading(false);
            setError('Houve uma falha ao obter os posts, por favor atualize a página!');
            setBooleanError(true);
            console.log(response, 'RESPOSTA ERROR DA API');
        }); 
    }

    /*const handleScroll = event => {
        const {scrollTop, clientHeight, scrollHeight} = event.currentTarget;
        console.log('SCROLLTOP', scrollTop)
        if(scrollHeight - scrollTop === clientHeight) {
            console.log('EOQCARAI');
            setPage(page + 1);
        }
    };*/
 
    
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
                            {posts.map((post) => <Posts post= {post} key= {post.id}/>)}
                        </>

                }
            </ContainerLinkdr>
            <ContainerTrending>
                <Trending />
            </ContainerTrending>
           
       </Main>
    );
}

/*const Section = styled.section`
    overflow: auto;
    width: 100%;
    height: 50rem;
`;*/



export default Timeline;

/*                        <div ref={(ref) => this.scrollParentRef = ref}>
                            <InfiniteScroll 
                                pageStart = {0}
                                loadMore= {requestGetPost}
                                hasMore= {!booleanError}
                                loader= {
                                    <ContainerLoading key= {0}>
                                        <Loading />
                                    </ContainerLoading>
                                }
                                useWindow= {false}
                                getScrollParent= {() => this.scrollParentRef}

                            >
                                {posts.map((post) => <Posts post= {post} key= {post.id}/>)}
                            </InfiniteScroll>
                        </div>*/