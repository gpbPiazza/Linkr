import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import Header from  '../components/Header';
import Trending from "../components/Trending";
import {Main, Title, Error, ContainerTrending, ContainerLinkdr, ContainerLoading} from '../components-style/cmpnt-styles';;
import LoginContext from "../context/LoginContext";
import Loading from "../components/Loading";
import Posts from "../components/Posts";

const TimelineMyLikes = () => {
    const [posts, setPosts] = useState([]);
    const {userForm, controlForm} = useContext(LoginContext);
    const {config} = userForm;
    const {loading, setLoading} = controlForm;
    const [error, setError] = useState('');
    const [booleanError, setBooleanError] = useState(false);

    useEffect(() => {
        requestApi();        
    }, []);

    const requestApi = () => {
        setLoading(true);
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/liked`, config);

        request.then(({data}) => {
            setLoading(false);
            console.log(data, 'RESPOSTA SUCESSO DA API GET POSTS BY my likes');
            if(data.posts.length === 0) {
                setError('Você não curtiu nenhum post ainda!');
                setBooleanError(true);
            }
            setPosts(data.posts);
        });

        request.catch(({response}) => {
            console.log(response, 'RESPOSTA ERROR DA API GET POSTS BY my likes');
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
                            {posts.map(post => (<Posts post= {post} key= {post.id}/>))}
                        </>
                }
            </ContainerLinkdr>

            <ContainerTrending>
                <Trending />
            </ContainerTrending>
        </Main>
    );
}

export default TimelineMyLikes;