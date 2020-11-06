import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoIosSearch } from 'react-icons/io';

import LoginContext from '../../context/LoginContext';
import { ProfilePhoto } from '../../styles/Header.styles';
import Colors from '../../utils/Colors';
import {
    SearchContainer,
    PeopleSearched, SomeOne, 
    Input,Text, Following
} from '../../styles/SearchBar.styles';

const SearchBar = () => {
    const { userForm } = useContext(LoginContext);
    const { config } = userForm;
    const placeholderText = 'Search for people and friends';

    const [ startSearch, setStartSearch ] = useState(false);
    const [ nameSearched, setNameSearched ] = useState('');
    const [ peopleSearched , setPeopleSearched ] = useState([]);
    
    const requestSearch = (nameToFind) => {
        const apiLink = `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/search?username=${nameToFind}`;
        const request = axios.get(apiLink, config);
        request.then(({data}) => {
            setStartSearch(true);
            peopleFiltredByFollow(data.users);            
        });
        request.catch(({response}) => {
            console.log(response.data);
        })
    }

    const peopleFiltredByFollow = (peopleFound) => {
        const peopleFollow = peopleFound.filter(e => e.isFollowingLoggedUser)
        const peopleUnfollow = peopleFound.filter(e => !(e.isFollowingLoggedUser))
        setPeopleSearched(peopleFollow.concat(peopleUnfollow));
    }

    const searching = (text) => {
        const nameToFind = text;
        setNameSearched(text);
        requestSearch(nameToFind);
    }
  
    const showSearch = (e) => {
        e.target.placeholder = ''; 
        setStartSearch(true);
    }

    const closeSearch = (e) => {
        if (e.relatedTarget?.localName === 'a'){
            return;
        }
        e.target.placeholder = placeholderText;
        setStartSearch(false);
        setPeopleSearched([]);
        setNameSearched('');
    }

    return (
        <SearchContainer>
            <Input
                minLength={3}
                type='text'
                debounceTimeout={300}
                onChange={e => searching(e.target.value)}
                value={nameSearched}
                placeholder={placeholderText}
                onFocus={(e) => showSearch(e)}
                onBlur={(e) => closeSearch(e)}
            />
            {startSearch ?
                <PeopleSearched>
                    {peopleSearched.map(({avatar, username, isFollowingLoggedUser, id}) => 
                        <SomeOne key={id}>
                            <Link to={`/user/${id}`}>
                                <ProfilePhoto src={avatar} />
                            </Link>
                            <Text to={`/user/${id}`}> {username} </Text>
                            <Following> 
                                {isFollowingLoggedUser ? `• following` : null} 
                            </Following>
                        </SomeOne>
                    )}
                </PeopleSearched>
                : 
                null
            }
            <IoIosSearch 
                color= {Colors.lighterGrey} 
                fontSize='1.5rem'
                cursor='pointer' 
                onClick={() => setStartSearch(!startSearch)}
            />
        </SearchContainer>
    );
}

export default SearchBar;