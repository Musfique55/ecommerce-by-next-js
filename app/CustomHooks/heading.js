import React from 'react';

const Heading = ({title}) => {
    return (
        <div className='mt-12 mb-8 text-black'>
            <h2 className="text-3xl font-semibold">{title}</h2>
        </div>
    );
};

export default Heading;