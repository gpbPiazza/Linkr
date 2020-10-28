import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

import Header from  '../components/Header';
import Trending from "../components/Trending";
import Publish from "../components/Publish";

import {Main, Title} from '../components-style/cmpnt-styles';
import LoginContext from "../context/LoginContext";


const Timeline = () => {
    const [posts, setPosts] = useState([]);
    const {userForm, controlForm} = useContext(LoginContext);
    const {userRegister, config, clearUser} = userForm;
    const {loading, setLoading} = controlForm;
    const { hashtag } = useParams();

    useEffect(() => {
        getPosts();        
    },[]);

    const getPosts = () => {
        requestApi();
    }
    
    const requestApi = () => {
        setLoading(true);
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/hashtags/${hashtag}/posts?offset=0&limit=2`,{headers : config.headers});
        
        request.then(({data}) => {
            console.log(data, 'RESPOSTA SUCESSO DA API GET POSTS BY HASH TAG');
            setPosts(data);
        });

        request.catch(({response}) => {
            console.log(response, 'RESPOSTA ERROR DA API GET POSTS BY HASH TAG');
            setLoading(false);
        }); 
    } 


    
    return (
        
       <Main>
            {/*<Header />*/ }
            <Title> timeline </Title>
            
            <Publish />
            {/* {loading ? 

                <Loading />
                :
                <>


                </>
            
        
            } */}

            <Trending />
       </Main>
    );
}

export default Timeline;
