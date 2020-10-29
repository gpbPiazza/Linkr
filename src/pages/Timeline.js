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
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        getPosts();       
    },[]);

    const getPosts = () => {
        requestGetPost();
    }

    console.log(posts, 'LISTA DE POSTS');
    
    
    const requestGetPost = () => {
        setLoading(true);
        console.log(offset, 'OFFSET');
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts?offset=${offset}&limit=10`, config);

        request.then(({data}) => {
            setLoading(false);
            if(data.posts.length === 0) {
                setError('Nenhum post encontrado!');
                setBooleanError(true);
            }

            setOffset(offset + 10);
            setPosts(posts => [...posts, ...data.posts]);
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
                    <InfiniteScroll
                        loadMore= {requestGetPost}
                        hasMore= {!booleanError}
                        loader= {
                            <ContainerLoading>
                                <Loading />
                            </ContainerLoading>
                        }

                    >
                        {booleanError ?
                            <Error fontSize= {'1.25rem'}> {(error) ? error : ''} </Error>
                            :
                            posts.map((post) => <Posts post={post} key={post.id}/>)
                        }
                    </InfiniteScroll>

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