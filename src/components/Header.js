import React, { useContext, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link } from 'react-router-dom';

import LoginContext from '../context/LoginContext';
import {
    ContainerHeader,
    ContainerNav,
    ContainerMenu,
    Logo,
    NavLink,
    PhotoProfile,
} from '../styles/Header.styles';
import Colors from '../utils/Colors';

const Header = () => {
    const [ showMenu, setShowMenu ] = useState(false);
    const { userForm } = useContext(LoginContext);
    const { userRegister, cleanUser } = userForm;
    const { avatar, id } = userRegister.user;
    
    return (
        <ContainerHeader>
            <Link to='/timeline'>
                <Logo> Linkr </Logo>
            </Link>
            <ContainerMenu>
                { showMenu ?
                    <>
                        <IoIosArrowUp 
                            color= {Colors.white} 
                            fontSize='2.5rem'
                            cursor='pointer' 
                            onClick={() => setShowMenu(!showMenu)}
                        />
                        <ContainerNav>
                            <NavLink to={`/user/${id}`}> My posts </NavLink>
                            <NavLink to='/my-likes'> My likes </NavLink>
                            <NavLink to='/'onClick= {cleanUser}> Logout </NavLink>
                        </ContainerNav>
                    </>
                    :
                        <IoIosArrowDown 
                            color={Colors.white} 
                            fontSize='2.5rem'
                            cursor='pointer'
                            onClick={() => setShowMenu(!showMenu)}
                        />
                }
                <PhotoProfile 
                    src={avatar} 
                    alt= "foto de perfil" 
                    onClick={() => setShowMenu(!showMenu)}
                />
            </ContainerMenu>    
        </ContainerHeader>
    );
}

export default Header;