import React from 'react';

const Heading = ({title}) => {
    return (
        <div className=' my-3 text-black'>
            <h2 className="text-2xl font-semibold text-center">{title}</h2>
        </div>
    );
};

export default Heading;