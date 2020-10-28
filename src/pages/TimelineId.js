
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

import Header from  '../components/Header';
import Trending from "../components/Trending";
import {Main, Title, Error, ContainerTrending, ContainerLinkdr, ContainerLoading} from '../components-style/cmpnt-styles';;
import LoginContext from "../context/LoginContext";


const TimelineId = () => {
    const [posts, setPosts] = useState([]);
    const {userForm, controlForm} = useContext(LoginContext);
    const {config} = userForm;
    const {loading, setLoading} = controlForm;
    const { id } = useParams();
    const [error, setError] = useState('');
    const [booleanError, setBooleanError] = useState(false);
    
    console.log('id', id);

    useEffect(() => {
        console.log(id)
        getPosts();        
    },[id]);

    const getPosts = (id) => {
        requestApi(id);
    }

    const requestApi = (id) => {
        setLoading(true);
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/${id}/posts?offset=0&limit=2`, config);

        request.then(({data}) => {
            console.log(data, 'RESPOSTA SUCESSO DA API GET POSTS BY ID');
            if(data.posts.length === 0) {
                setError('Nenhum post encontrado!');
                setBooleanError(true);
            }
            setPosts(data);
        });

        request.catch(({response}) => {
            console.log(response, 'RESPOSTA ERROR DA API GET POSTS BY ID');
            setError('Houve uma falha ao obter os posts, por favor atualize a página!');
            setBooleanError(true);
            setLoading(false);
        }); 
    } 


    return (
        
        <Main>
            <Header />
            <Title> {} </Title>
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

export default TimelineId;

