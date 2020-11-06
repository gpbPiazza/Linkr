import styled from 'styled-components';

import Colors from '../utils/Colors';

export const Error = styled.span`
    color: ${Colors.lightRed};
    font-size: ${props => props.fontSize};
`;