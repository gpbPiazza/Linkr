import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';

import Colors from '../utils/Colors';

export const HeaderContainer = styled.header`
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
`;

export const MenuContainer = styled.div`
    display: flex;
    align-items: center;
`;

export const ProfilePhoto = styled.img`
    width: 3.3125rem;
    height: 3.3125rem;
    border-radius: 100%;
    margin-left: 0.5rem;
    cursor: pointer;
`;

export const Logo = styled.h1`
    font-family: 'Passion One', cursive;
    line-height: 54px;
    color: ${Colors.white};
    font-size: 3.2rem;
    margin-left: 1rem;
`;

export const NavContainer = styled.nav`
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
`;

export const NavLink = styled(Link)`
    font-family: 'Lato', sans-serif;
    padding: 0.5rem;
    font-weight: bold;
    font-size: 1.1rem;
    line-height: 1.2rem;
    letter-spacing: 0.05rem;
    color: ${Colors.white};
`;

export const SearchContainer = styled.div`
    width: 30%;
    height: 2.3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 1rem;
    background-color: ${Colors.white};
    padding: 0.5rem;
    margin: 0.5rem 0;
    position: relative;
`;

export const SearchBar = styled(DebounceInput)`
    width: 100%;
    height: 100%;
    padding-left: 0.5rem;
    ::placeholder {
        color: ${Colors.lighterGrey};
    }
`;

export const PeopleSearched = styled.ul`
    height:auto;
    width: 100%;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    position: absolute;
    top: 0rem;
    left: 0rem;
    z-index: -1;
    margin-top: 1rem;
    padding-top: 2rem;
    background: ${Colors.darkIce};
`;

export const SomeOne = styled.li`
    width: 100%;
    display: flex;
    align-items: center;
    justify-items: flex-start;
    padding-left: 0.5rem;
    margin: 0.5rem 0;
`;

export const Text = styled(NavLink)`
    color: ${Colors.mediumGrey};
`;

export const Following = styled(Text).attrs({as: "p"})`
    font-size: 0.8rem;
    opacity: 0.5;
`;