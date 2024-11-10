import React from 'react';

const SubHeading = ({subheading}) => {
    return (
        <div className='my-3'>
            <h3 className="text-base text-black font-medium text-center">{subheading}</h3>
        </div>
    );
};

export default SubHeading;