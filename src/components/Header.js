import React, { useContext, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link } from 'react-router-dom';

import LoginContext from '../context/LoginContext';
import {
    HeaderContainer, NavContainer, ProfilePhoto,
    MenuContainer, Logo, NavLink
} from '../styles/Header.styles';
import Colors from '../utils/Colors';

const Header = () => {
    const { userForm } = useContext(LoginContext);
    const [ showMenu, setShowMenu ] = useState(false);
    const { userRegister, cleanUser } = userForm;
    const { avatar, id } = userRegister.user;
    
    return (
        <HeaderContainer>
            <Link to='/timeline'>
                <Logo> Linkdr </Logo>
            </Link>
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