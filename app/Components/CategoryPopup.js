import React from 'react';
import colletion from '/collection.json';
import Link from 'next/link';

const CategoryPopup = ({setIsHovered}) => {
    return (
        <>
             <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => {setIsHovered(false)}} className={`bg-white text-black absolute h-screen z-[9999] px-5 space-y-4 text-center w-[14.5rem] shadow-lg top-[3.5rem] left-0`}>
                { 
                    colletion.map((item,idx) => {
                       return <Link href={`/category/${item.category}`} key={idx} onClick={() => setIsHovered(false)} className=' block'>{item.category}</Link>
                    })
                }
            </div>
        </>
    );
};

export default CategoryPopup;