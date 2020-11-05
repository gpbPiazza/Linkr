import Colors from '../utils/Colors';
import styled from 'styled-components';

export const Error = styled.span`
    color: ${Colors.lightRed};
    font-size: ${props => props.fontSize};
`;

