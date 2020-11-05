import React, { useContext, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import ReactHashtag from "react-hashtag";
import axios from 'axios';
import { EditBox, Text } from '../styles/Posts.styles';
import LoginContext from '../context/LoginContext';
import Loading from "./Loading";

export default function EditPost({text, isEditing, postId}) {
    const {userForm} = useContext(LoginContext);
    
    const [textAreaDisable, setTextAreaDisable] = useState(false);
    const [textEdited, setTextEdited] = useState(text);
    const [edit, setEdit] = useState(false)
    const [textApi, setTextApi] = useState('');
    const textInput = useRef();
    const {config} = userForm;

    useEffect(() => {
        refactorText();
        if(isEditing) {
            setEdit(true);
        } else {
            setEdit(false);
        }
        
        if(edit) {
            textInput.current.focus();
        }
    },[isEditing]);

    const editPost = () => {
        setTextAreaDisable(true);
        const objectRequest = {"text": textEdited};
        const apiLink = `https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/${postId}`;
        const request = axios.put(apiLink, objectRequest, config);
        request.then(({data}) => {
            setTextEdited(data.post.text);
            setTextApi(data.post.text);
            console.log(data, 'SUCESSO DO SERVER!');
            setEdit(!edit);
            setTextAreaDisable(false);
            
        });
        request.catch(({response}) => {
            alert('Não foi possível fazer as alterações no texto');
            setTextAreaDisable(false);
            setEdit(!edit);
            setTextEdited(text);
            console.log(response.data);
        });
    }
    
    const refactorText = () => {
        if (textEdited === textApi){
            setTextEdited(textApi);
        }else {
            setTextEdited(text);
        }
    }

    const handleTextArea = (event) => {
        if(event.key === "Escape"){
            setEdit(!edit);
            setTextEdited(text);
        }if (event.key === "Enter") {
            setTextEdited(event.target.value);
            textEdited === text ? alert('Por favor altere o texto') : editPost();   
        }
    }

    return (
        <>
            {edit ?
                <EditBox 
                    value={textEdited} 
                    disabled={textAreaDisable} 
                    onKeyDown={(event) => handleTextArea(event)} 
                    type='text' onChange={e => setTextEdited(e.target.value)}  
                    ref={textInput}
                />
                :
                <Text>
                    <ReactHashtag renderHashtag= {value => <span key= {value}><Link to={`/hashtag/${value.slice(1)}`}>{value}</Link></span>}>
                        {textEdited}
                    </ReactHashtag>
                </Text>
            }

            {textAreaDisable ? <Loading large={30} tall={30}/>: null}
        </>
    );
};