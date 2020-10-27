import React, { useContext, useState } from  'react';
import styled from 'styled-components';
import Colors from '../utils/Colors';
import {Link} from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import LoginContext from '../context/LoginContext';




const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const {headerForm} = useContext(LoginContext);
    const {userRegister, config, clearUser} = headerForm;
    const {user} = userRegister;
    const {avatar, email, id, username} = user;

    
  
    return (
            <Container>
                <h1>Linkr</h1>   
                <div>
                    { showMenu ?
                        <>
                            <IoIosArrowUp  onClick={() => setShowMenu(!showMenu)} color={Colors.white} fontSize='2.5rem' />
                            <ContainerMenu>
                                <p>My posts</p>
                                <p>My likes</p>
                                <p onClick={clearUser}><Link to='/'>Logout</Link></p>
                            </ContainerMenu>
                        </>    
                        :
                        <IoIosArrowDown onClick={() => setShowMenu(!showMenu)} color={Colors.white} fontSize='2.5rem'/>
                    }
                   

                   
                    <img src={avatar}/> 
                </div>    
            </Container>
    );
}

const Container = styled.header`
    z-index: 1;
	width: 100%;
    background: ${Colors.black};
    display:flex;
    justify-content:space-between;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
    padding:1rem;
    
    h1 {
        font-family: 'Passion One', cursive;
        line-height: 54px;
        color:${Colors.white};
        font-size: 3.2rem;
        margin-left: 1rem
    }
    img {
        width: 3.3125rem;
        height: 3.3125rem;
        border-radius: 100%;
        margin-left: 0.5rem
    }
    
    div {
        display: flex;
        align-items: center;
    }
`;

const Button = styled.button`
    font-size: 10rem;

`;

const ContainerMenu = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: ${Colors.black};
    width: 9.375rem;
    padding: 1rem;
    border-bottom-left-radius: 1rem;
    position: fixed;
    top: 5rem;
    right: 0;

    p {
        font-family: 'Lato', sans-serif;
        font-style: normal;
        padding: 0.5rem;
        font-weight: bold;
        font-size: 1.1rem;
        line-height: 1.2rem;
        letter-spacing: 0.05rem;
        color: ${Colors.white};
    }


`;


export default Header;


