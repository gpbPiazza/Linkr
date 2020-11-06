import React from  'react';
import Loader from 'react-loader-spinner';

const Loading = ({large, tall}) => {
    return (
        <Loader 
            type='Oval' 
            color='#00BFFF' 
            height={tall || 120}
            width={large || 120}
        />
    );
}

export default Loading;