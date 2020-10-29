import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Colors from '../utils/Colors';
import { Link } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import LoginContext from '../context/LoginContext';

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const {userForm} = useContext(LoginContext);
    const {userRegister, cleanUser} = userForm;
    const {avatar, id} = userRegister.user;
  

    return (
        <StyledHeader>
            <h1> Linkr </h1>

            <div>
                { showMenu ?
                    <>  
                        <button onClick={() => setShowMenu(!showMenu)}>
                            <IoIosArrowUp color= {Colors.white} fontSize= '2.5rem' />
                        </button>

                        <StyledNav>
                            <Link to= {`/user/${id}`}> My posts </Link>
                            {/*<Link to= '/my-likes'> My likes </Link>*/}
                            <Link to= '/' onClick= {cleanUser}> Logout </Link>
                        </StyledNav>
                    </>    
                    :
                    <button onClick={() => setShowMenu(!showMenu)}>
                        <IoIosArrowDown color={ Colors.white} fontSize= '2.5rem'/>
                    </button>
                }

                <img src={avatar} alt= "foto de perfil" onClick={() => setShowMenu(!showMenu)}/>
            </div>    
        </StyledHeader>
    );
}

const StyledHeader = styled.header`
    z-index: 1;
	width: 100%;
    background: ${Colors.black};
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
    padding: 1rem;
    
    h1 {
        font-family: 'Passion One', cursive;
        line-height: 54px;
        color:${Colors.white};
        font-size: 3.2rem;
        margin-left: 1rem;
    }

    img {
        width: 3.3125rem;
        height: 3.3125rem;
        border-radius: 100%;
        margin-left: 0.5rem;
        cursor: pointer;
    }
    
    div {
        display: flex;
        align-items: center;
    }

    button {
        cursor: pointer;
    }

`;

const StyledNav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: ${Colors.black};
    width: 9.375rem;
    padding: 0.5rem;
    border-bottom-left-radius: 1rem;
    position: fixed;
    top: 5rem;
    right: 0;

    a {
        font-family: 'Lato', sans-serif;
        padding: 0.5rem;
        font-weight: bold;
        font-size: 1.1rem;
        line-height: 1.2rem;
        letter-spacing: 0.05rem;
        color: ${Colors.white};
    }
`;

export default Header;