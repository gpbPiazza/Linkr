
import axios from 'axios';
import React, { useContext, useState, useEffect } from  'react';
import styled from 'styled-components';
import LoginContext from '../context/LoginContext';
import Colors from '../utils/Colors';
import { Link, useHistory } from "react-router-dom";
import Loading from './Loading';
import { IoIosSearch } from "react-icons/io";

const Trending = () => {
    const [treadingHashTags, setTreadingHashtags] = useState([]);
    const {userForm, controlForm} = useContext(LoginContext);
    const {loading, setLoading} = controlForm;
    const [hashtagSearch, setHashtagSearch] = useState('');
    const {config} = userForm;
    let history = useHistory();

    useEffect(() => {
        requestApi();        
    },[]);

    const requestApi = () => {
        setLoading(true);
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/hashtags/trending`, config);
        
        request.then(({data}) => {
            setLoading(false);
            console.log(data.hashtags, 'hashtags');
            setTreadingHashtags(data.hashtags);
        });

        request.catch(({response}) => {
            setLoading(false);
            console.log(response, 'ERROR TO GET TRADING HASH TAGS');
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
        <StyledTrending>
            <h2> trending </h2> 
            {loading ?
                <ContainerLoading>
                    <Loading />
                </ContainerLoading>
                :
                <ul>
                    <Search>
                        <input 
                            type= 'text'
                            onChange= {e => setHashtagSearch(e.target.value)}
                            value= {hashtagSearch}
                            placeholder= 'Pesquise hashtags'
                        />
                        <button onClick= {e => searchTrending(e)} type= 'submit'>
                            <IoIosSearch />
                        </button>
                    </Search>

                    {treadingHashTags.map(({id, name}) => (
                        <li key= {id}>
                            <Link to= {`/hashtag/${name}`}># {name} </Link>
                        </li>
                    ))} 
                </ul>
            }
        </StyledTrending>
    );
}

export default Trending;


export const StyledTrending = styled.div`
    padding: 1rem;
    background: ${Colors.black};
    color: ${Colors.white};
    border-radius: 20px;
    height: auto;
    
    h2 {
        font-weight: bold;
        margin-bottom: 0.5rem;
        font-size: 2rem;
        line-height: 2.5rem;
        font-family: 'Oswald', sans-serif;
    }

    ul {
        border-top: 2px solid ${Colors.darkGrey};
    }

    li {
        font-size: 1.5rem;
        margin-bottom: 0.7rem;
    }
   
`;

const Search = styled.form`
    border-bottom: 2px solid ${Colors.darkGrey};
    padding: 1rem 0;
    margin-bottom: 0.5rem;
    display: flex;

    input {
        font-size: 1.2rem;
        width: 85%;
        color: ${Colors.darkGrey};
        background: ${Colors.white};
        padding-left: 0.5rem;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
    }

    button {
        padding: 0.2rem;
        width: 15%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background: ${Colors.midBlue};
        color: ${Colors.white}; 
        font-size: 2rem;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }
`;

const ContainerLoading = styled.div`
    width: 20%;
    margin:0  auto;
    margin-top: 5rem;
`;
