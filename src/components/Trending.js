import React, { useContext, useState } from  'react';
import styled from 'styled-components';
import Colors from '../utils/Colors';

const Trending = () => {

    useEffect(() => {
        getTreadingHashTags();        
    },[]);

    const getTreadingHashTags = () => {
        requestApi();
    }

    const requestApi = () => {
        setLoading(true);
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/hashtags/trending`,{headers : config.headers});
        
        request.then(({data}) => {
            console.log(data, 'RESPOSTA SUCESSO DA API GET POSTS BY HASH TAG');
            setTreadingHashtags(data);
        });

        request.catch(({response}) => {
            console.log(response, 'RESPOSTA ERROR DA API GET POSTS BY HASH TAG');
            setLoading(false);
        }); 
    } 
 






    return (
        <StyledTrending>
            <h2> trending </h2> 

            <ul>
                <li> node </li>
                <li> react </li>
                <li> aaa </li>
                <li> bbb </li>
                <li> bbb </li>
                <li> bbb </li>
            </ul>

        </StyledTrending>
    );
}

export default Trending;


export const StyledTrending = styled.div`
    width: 35%;
    padding: 1rem;
    background: ${Colors.black};
    color: ${Colors.white};
    border-radius: 20px;
    
    h2 {
        font-weight: bold;
        margin-bottom: 0.5rem;
        font-size: 2rem;
        line-height: 2.5rem;
        font-family: 'Oswald', sans-serif;
    }

    ul {
        border-top: 1px solid ${Colors.darkGrey};
        padding-top: 0.5rem;
        overflow: hidden;
    }

    li {
        font-size: 1.5rem;
        margin-bottom: 0.7rem;
    }
`;