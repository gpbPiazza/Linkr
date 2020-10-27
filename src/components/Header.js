import React, { useContext, useState } from  'react';
import styled from 'styled-components';
import Colors from '../utils/Colors';
import {Link} from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import UserContext from '../context/LoginContext';




const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    // const {headerForm} = useContext(UserContext);
    // const {serverResponse} = headerForm
    // const {user} = serverResponse;
    // const {id, email, username, avatar} = user;
    // console.log(headerForm);

  
    return (
            <Container>
                <h1>Linkr</h1>   
                <div>
                    { showMenu ?
                        <IoIosArrowUp  onClick={() => setShowMenu(!showMenu)} color={Colors.white} />
                        :
                        <IoIosArrowDown onClick={() => setShowMenu(!showMenu)} color={Colors.white} />
                    }
                    <div>
                        <p>My posts</p>
                        <p>My likes</p>
                        <p>Logout</p>
                    </div>

                   
                    <img src='https://img.ibxk.com.br/2020/08/31/31145643361236.jpg?w=1120&h=420&mode=crop&scale=both'/> 
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
    font-size: 2rem;

`;


export default Header;