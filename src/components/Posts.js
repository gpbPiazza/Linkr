import React from 'react';
import styled from 'styled-components';
import Colors from '../utils/Colors';

const Posts = () => {
    return (
        <StyledPost>
            <figure>
                <img src= "./img/loadin3.gif" />
            </figure>

            <section>
                <h2> Juvenal Juvêncio </h2>
                <p> Muito maneiro esse tutorial de Material UI com React, deem uma olhada. </p>
                <div className= "link"> 
                    <div>
                        <h3> Como aplicar o material ui em um projeto react </h3>
                        <p> orecitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                        <a> testsetestestestsets </a>
                    </div>

                    <img src="./img/loadin3.gif" />
                </div>
            </section>

        </StyledPost>
    );
}

export default Posts;

const StyledPost = styled.article`
    background: ${Colors.black};
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    border-radius: 20px;
    margin: 2rem 0;
    
    img {
        width: 3.125rem;
        height: 3.125rem;
        border-radius: 100%;
    }

    figure {
        width: 10%;
    }

    .link {
        width: 100%;
        height: auto;
        display: flex;
        border-radius: 10px;
        border: 1px solid ${Colors.lightGrey};

        div {
            width: 70%;
            padding: 1.5rem 1rem;

            h3 {
                font-size: 1rem;
                line-height: 1.17rem;
                margin-bottom: 0.5rem;
                color: ${Colors.white};
            }

            p {
                font-size: 0.8rem;
                line-height: 1rem;
                margin-bottom: 0.5rem;
            }
            
            a {
                font-size: 0.8rem;
                color: ${Colors.white};
            }

            
        }

        img {
            width: 30%;
            height: 100%;
        }
    }
    

    section {
        width: 89%;
        padding-top: 0.25rem;

        h2  {
            font-size: 1.25rem;
            margin-bottom: 0.5rem;
            color: ${Colors.white};
        }

        p {
            color: ${Colors.lightGrey};
            font-size: 1rem;
            line-height: 1.25rem;
            margin-bottom: 0.5rem; 
        }
    }


`;