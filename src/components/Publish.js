import React, { useContext, useState } from  'react';
import styled from 'styled-components';
import Colors from '../utils/Colors';

const Publish = () => {
    return (
        <StyledPublish>
            <figure>
                <img src= "./img/loadin3.gif" />
            </figure>

            <section>
                <h2> O que você tem para favoritar hoje? </h2>
                <input type= "text" placeholder= "http://" />
                <textarea placeholder= "Muito irado esse link falando de javascript"></textarea>
                <div className= "containerButton">
                    <button> Publicar </button>
                </div>
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
    height: 13rem;
    display: flex;
    justify-content: space-between;

    figure {
        width: 10%;
    }

    section {
        width: 89%;
        padding-top: 0.25rem;

        h2 {
            font-weight: 300;
            font-size: 1.25rem;
            margin-bottom: 0.5rem;
            color: ${Colors.lightGrey};
        }

        input, textarea {
            width: 100%;
            padding: 0.5rem;
            background: ${Colors.ice};
            border-radius: 10px;
            font-size: 1rem;
            margin: 0.25rem 0;
        }

        textarea {
            height: 4.125rem;
        }

        .containerButton {
            display: flex;
            justify-content: flex-end;

            button {
                font-size: 1rem;
                color: ${Colors.white};
                background-color: ${Colors.midBlue};
                padding: 0.5rem 1rem;
                cursor: pointer;
                border-radius: 5px;
            }
        }

    }

    img {
        width: 3.125rem;
        height: 3.125rem;
        border-radius: 100%;
    }
`;