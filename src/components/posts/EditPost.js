import React, { useContext, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import ReactHashtag from 'react-hashtag';
import axios from 'axios';

import { EditBox, Text } from '../../styles/Posts.styles';
import LoginContext from '../../context/LoginContext';
import Loading from '../common/Loading';

const EditPost = ({text, isEditing, postId, setIsEditing}) => {
    const { userForm } = useContext(LoginContext);
    const { config } = userForm;
    
    const [ textAreaDisable, setTextAreaDisable ] = useState(false);
    const [ textEdited, setTextEdited ] = useState(text);
    const [ textApi, setTextApi ] = useState(text);
    const textInput = useRef();
    
    useEffect(() => {
        if (isEditing) {
            textInput.current.focus();
        }
    },[isEditing]);

    const editPost = () => {
        setTextAreaDisable(true);
        const objectRequest = {'text': textEdited};
        const apiLink = `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/${postId}`;
        const request = axios.put(apiLink, objectRequest, config);
        request.then(({data}) => {
            setTextEdited(data.post.text);
            setTextApi(data.post.text);
            console.log(data, 'SUCESSO DO SERVER!');
            setIsEditing(false);
            setTextAreaDisable(false);
        });
        request.catch(({response}) => {
            alert('Não foi possível fazer as alterações no texto');
            setTextAreaDisable(false);
            setIsEditing(false);
            setTextEdited(textApi);
            console.log(response.data);
        });
    }

    const handleTextArea = (event) => {
        if (event.key === 'Escape'){
            setIsEditing(false);
            setTextEdited(textApi);
        }
        if (event.key === 'Enter') {
            setTextEdited(event.target.value);
            textEdited === textApi ? 
                alert('Por favor altere o texto') : editPost();   
        }
    }

    return (
        <>
            {isEditing ?
                <EditBox 
                    value={textEdited} 
                    disabled={textAreaDisable} 
                    onKeyDown={event => handleTextArea(event)} 
                    type='text' 
                    onChange={e => setTextEdited(e.target.value)}  
                    ref={textInput}
                />
                :
                <Text>
                    <ReactHashtag renderHashtag={value => 
                        <span key={value}>
                            <Link to={`/hashtag/${value.slice(1)}`}>
                                {value}
                            </Link>
                        </span>
                    }>
                        {textEdited}
                    </ReactHashtag>
                </Text>
            }
            {textAreaDisable ? <Loading large={40} tall={40}/>: null}
        </>
    );
};

export default EditPost;