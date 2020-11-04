import React, { useContext, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp, IoIosSearch } from "react-icons/io";
import { Link } from 'react-router-dom';

import LoginContext from '../context/LoginContext';
import {
    HeaderContainer, 
    NavContainer, 
    ProfilePhoto,
    MenuContainer, 
    Logo, 
    NavLink,
    SearchContainer,
    PeopleSearched,
    SomeOne,
    SearchBar,
    Text
} from '../styles/Header.styles';
import Colors from '../utils/Colors';

const Header = () => {
    const { userForm } = useContext(LoginContext);
    const [ showMenu, setShowMenu ] = useState(false);
    const [startSearch, setStartSearch] = useState(false);
    const { userRegister, cleanUser } = userForm;
    const { avatar, id } = userRegister.user;
    const placeholderText = 'Searc for people and friends';

    const searching = (e) => {
        setStartSearch(!startSearch);
    }
    
    return (
        <HeaderContainer>
            <Link to='/timeline'>
                <Logo> Linkdr </Logo>
            </Link>
            <SearchContainer>
                <SearchBar 
                    placeholder= {placeholderText}
                    onFocus={(e) => e.target.placeholder = ""}
                    onBlur={(e) => e.target.placeholder = placeholderText} 
                />
                {startSearch ?
                        <PeopleSearched>
                            <SomeOne>
                                <ProfilePhoto  src={avatar} />
                                <Text>João frango</Text>
                                <Text>bolinha following</Text>
                            </SomeOne>
                            <SomeOne>
                                <ProfilePhoto  src={avatar} />
                                <Text>João frango</Text>
                                <Text>bolinha following</Text>
                            </SomeOne>
                            <SomeOne>
                                <ProfilePhoto  src={avatar} />
                                <Text>João frango</Text>
                                <Text>bolinha following</Text>
                            </SomeOne>
                            <SomeOne>
                                <ProfilePhoto  src={avatar} />
                                <Text>João frango</Text>
                                <Text>bolinha following</Text>
                            </SomeOne>
                        </PeopleSearched>
                    : 
                        null
                }
                <IoIosSearch 
                            color= {Colors.lighterGrey} 
                            fontSize='1.5rem'
                            cursor='pointer' 
                            onClick={(e) => searching(e)}
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