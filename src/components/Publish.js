import React, { useContext, useState } from  'react';
import styled from 'styled-components';
import Colors from '../utils/Colors';

const Publish = () => {
    return (
        <StyledPublish>
            <figure>
                <img src= "./img/logo.jpg" />
            </figure>

            <section>
                <h2> O que você tem para favoritar hoje? </h2>
            </section>
            
        </StyledPublish>
    );
}

export default Publish;


export const StyledPublish = styled.div`
    width: 62%;
    border-radius: 20px;
    background: ${Colors.white};
    padding: 1rem;
    height: 12.5rem;
    display: flex;
    justify-content: space-between;

    figure {
        width: 10%;
    }

    section {
        width: 87%;
        padding-top: 0.25rem;

        h2 {
            font-weight: 300;
            font-size: 1.5rem;
            line-height: 1.75rem;
            color: ${Colors.lightGrey};
        }
    }

    img {
        width: 3.125rem;
        height: 3.125rem;
        border-radius: 100%;
    }
`;