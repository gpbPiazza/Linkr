import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Header from  '../components/Header';
import Trending from "../components/Trending";
import Publish from "../components/Publish";
import Loading from '../components/Loading';
import {Main, Title, Error, ContainerTrending, ContainerLinkdr, ContainerLoading} from '../components-style/cmpnt-styles';
import LoginContext from "../context/LoginContext";
import Posts from "../components/Posts";

const Timeline = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const [booleanError, setBooleanError] = useState(false);
    const {userForm, controlForm} = useContext(LoginContext);
    const {config} = userForm;
    const {loading, setLoading} = controlForm;

    useEffect(() => {
        getPosts();
        // getLikedPosts();        
    },[]);

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
        const request = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts?offset=0&limit=2', config);

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
 
    
    return (
        
       <Main>
            <Header />
            <Title> timeline </Title>
            <ContainerLinkdr>
                
                <Publish getPosts={getPosts}/>            
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



export default Timeline;

