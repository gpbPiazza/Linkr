import axios from 'axios';
import React, { useContext, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp, IoIosSearch } from "react-icons/io";
import { Link } from 'react-router-dom';

import LoginContext from '../context/LoginContext';
import {
    HeaderContainer, NavContainer, ProfilePhoto,
    MenuContainer, Logo, NavLink, SearchContainer,
    PeopleSearched, SomeOne, SearchBar, Text, Following
} from '../styles/Header.styles';
import Colors from '../utils/Colors';

const Header = () => {
    const { userForm } = useContext(LoginContext);
    const [ showMenu, setShowMenu ] = useState(false);
    const [ startSearch, setStartSearch ] = useState(false);
    const [ nameSearched, setNameSearched ] = useState('');
    const [ peopleSearched , setPeopleSearched ] = useState([]);
    const { userRegister, cleanUser, config } = userForm;
    const { avatar, id } = userRegister.user;
    const placeholderText = 'Search for people and friends';
  
    const peopleFiltredByFollow = (peopleFound) => {
        const peopleFollow =  peopleFound.filter(e => e.isFollowingLoggedUser)
        const peopleUnfollow = peopleFound.filter(e => !(e.isFollowingLoggedUser))
        setPeopleSearched(peopleFollow.concat(peopleUnfollow));
    }

    const searching = (text) => {
        const nameToFind = text;
        setNameSearched(text);
        requestSearch(nameToFind);
    }
  
    const requestSearch = (nameToFind) => {
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/search?username=${nameToFind}`, config);
        request.then(({data}) => {
            setStartSearch(true);
            peopleFiltredByFollow(data.users);            
        });
    }

    const showSearch = (e) => {
        e.target.placeholder = ""; 
        setStartSearch(true);
    }

    const closeSearch = (e) => {
        if(e.relatedTarget?.localName === 'a'){
            return;
        }
        e.target.placeholder = placeholderText;
        setStartSearch(false);
        setPeopleSearched([]);
        setNameSearched('');
    }

    return (
        <HeaderContainer>
            <Link to='/timeline'>
                <Logo> Linkdr </Logo>
            </Link>
            <SearchContainer>
                <SearchBar
                    minLength={3}
                    type='text'
                    debounceTimeout={300}
                    onChange={e => searching(e.target.value)}
                    value={nameSearched}
                    placeholder= {placeholderText}
                    onFocus={(e) => showSearch(e)}
                    onBlur={(e) => closeSearch(e)}
                />
                {startSearch ?
                        <PeopleSearched>
                            {peopleSearched.map(({avatar, username, isFollowingLoggedUser, id}, i) => 
                                <SomeOne key={i}>
                                    <Link to={`/user/${id}`}>
                                        <ProfilePhoto  src={avatar} />
                                    </Link>
                                    <Text to={`/user/${id}`} >{username}</Text>
                                    <Following>{isFollowingLoggedUser ? `• following` : null}</Following>
                                </SomeOne>)}
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
            <MenuContainer>
                { showMenu ?
                    <>
                        <IoIosArrowUp 
                            color= {Colors.white} 
                            fontSize='2.5rem'
                            cursor='pointer' 
                            onClick={() => setShowMenu(!showMenu)}
                        />
                        <NavContainer>
                            <NavLink to={`/user/${id}`}> My posts </NavLink>
                            <NavLink to='/my-likes'> My likes </NavLink>
                            <NavLink to='/'onClick= {cleanUser}> Logout </NavLink>
                        </NavContainer>
                    </>
                    :
                        <IoIosArrowDown 
                            color={Colors.white} 
                            fontSize='2.5rem'
                            cursor='pointer'
                            onClick={() => setShowMenu(!showMenu)}
                        />
                }
                <ProfilePhoto 
                    src={avatar} 
                    alt= "foto de perfil" 
                    onClick={() => setShowMenu(!showMenu)}
                />
            </MenuContainer>    
        </HeaderContainer>
    );
}

export default Header;