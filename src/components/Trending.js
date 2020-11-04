import axios from 'axios';
import React, { useContext, useState, useEffect } from  'react';
import { IoIosSearch } from "react-icons/io";

import LoginContext from '../context/LoginContext';
import { Link, useHistory } from "react-router-dom";
import Loading from './Loading';
import { 
    Button, Hashtag, Input, Subtitle,
    TrendingContainer, HashtagSearch,
    HashtagList, TrendingSection
} from "../styles/Trending.styles"

const Trending = () => {
    
    let history = useHistory();
    const { userForm } = useContext(LoginContext);
    const [ treadingHashTags, setTreadingHashtags ] = useState([]);
    const [ hashtagSearch, setHashtagSearch ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const { config } = userForm;

    useEffect(() => {
        requestApi();        
    },[]);

    const requestApi = () => {
        setLoading(true);
        const linkApi = `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/hashtags/trending`;
        const request = axios.get(linkApi, config);
        request.then(({data}) => {
            setLoading(false);
            setTreadingHashtags(data.hashtags);
        });
        request.catch(() => {
            setLoading(false);
        }); 
    }

    const searchTrending = (event) => {
        event.preventDefault();
        if (hashtagSearch === ''){
            return;
        } else {
            if(hashtagSearch.charAt(0) === '#') {
                history.push(`/hashtag/${hashtagSearch.slice(1).trim()}`);
                setHashtagSearch('');
                return;
            }
            history.push(`/hashtag/${hashtagSearch.trim().toLowerCase()}`);
            setHashtagSearch('');
        }
    }

    return (
        <TrendingContainer>
            <TrendingSection>
                <Subtitle> trending </Subtitle> 
                {loading ?
                    <Loading />
                    :
                    <HashtagList>
                        <HashtagSearch>
                            <Input 
                                type= 'text'
                                onChange= {e => setHashtagSearch(e.target.value)}
                                value= {hashtagSearch}
                                placeholder= 'Pesquise hashtags'
                            />
                            <Button onClick= {e => searchTrending(e)} type= 'submit'>
                                <IoIosSearch />
                            </Button>
                        </HashtagSearch>

                        {treadingHashTags.map(({id, name}) => (
                            <Hashtag key= {id}>
                                <Link to= {`/hashtag/${name}`}># {name} </Link>
                            </Hashtag>
                        ))} 
                    </HashtagList>
                }
            </TrendingSection>
        </TrendingContainer>
    );
}

export default Trending;