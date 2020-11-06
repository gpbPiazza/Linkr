import styled from 'styled-components';
import { DebounceInput } from 'react-debounce-input';

import Colors from '../utils/Colors';
import media from  './media';
import { NavLink } from './Header.styles';

export const SearchContainer = styled.div`
    width: 30rem;
    height: 2.3rem;

    display: flex;
    align-items: center;
    justify-content: space-between;

    border-radius: 1rem;
    background-color: ${Colors.white};

    padding: 0.5rem;
    margin: 0.5rem 0;
    position: relative;

    ${media} {
        position: fixed;
        top: 4.9rem;
        border-radius: 0px;
        width: 100%;
        left: 0;
        padding: 0 0.3rem;
        margin: 0;
    }
`;

export const Input = styled(DebounceInput)`
    width: 100%;
    height: 100%;

    padding-left: 0.5rem;

    ::placeholder {
        color: ${Colors.lighterGrey};
}
`;

export const PeopleSearched = styled.ul`
    height: auto;
    width: 100%;

    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    background: ${Colors.darkIce};

    position: absolute;
    top: 0rem;
    left: 0rem;
    z-index: -1;

    margin-top: 1rem;
    padding-top: 2rem;

    ${media} {
        top: 2.2rem;
        left: 0;
        z-index: -1;

        border-radius: 0px;
    
        padding: 0 0.3rem;
        margin: 0;
    }
    
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

export const Following = styled(Text).attrs({as: 'p'})`
    font-size: 0.8rem;
    opacity: 0.5;
`;