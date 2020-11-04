import React from  'react';
import Loader from 'react-loader-spinner';

const Loading = () => {
    return (
        <Loader 
            type="Oval" 
            color="#00BFFF" 
            height={80} 
            width={80} 
        />
    );
}

export default Loading;