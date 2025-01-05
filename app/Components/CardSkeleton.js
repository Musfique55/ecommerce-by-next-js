import React from 'react';

const CardSkeleton = () => {
    return (
        <div className="flex w-44 flex-col gap-4">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="flex gap-2">
                <div className='skeleton h-4 w-full'></div>
                <div className='skeleton h-4 w-full'></div>
            </div>
        </div>
    );
};

export default CardSkeleton;