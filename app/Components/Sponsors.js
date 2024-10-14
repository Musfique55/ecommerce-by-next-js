import Image from 'next/image';
import React from 'react';

const Sponsors = () => {
    return (
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 place-items-center bg-white '>
            <Image
            alt='renesas'
            src={'https://www.icdrex.com/wp-content/uploads/2023/04/Renesas.png'}
            height={150}
            width={150}
            />
            <Image
            alt='samsung'
            src={'https://bsmedia.business-standard.com/_media/bs/img/about-page/1562575696.png?im=FeatureCrop,size=(382,233)'}
            height={150}
            width={150}
            />
            <Image
            alt='huawei'
            src={'https://upload.wikimedia.org/wikipedia/commons/f/fa/Huawei_logo_icon_170010.png'}
            height={150}
            width={150}
            />
            <Image
            alt='nokia'
            src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMXP6Yq-KaR8wTfr8fPYuaOLPxazR9jT0qJA&s'}
            height={150}
            width={150}
            />
            <Image
            alt='canon'
            src={'https://global.canon/en/corporate/logo/img/logo_01.png'}
            height={150}
            width={150}
            />
            <Image
            alt='sharp'
            src={'https://upload.wikimedia.org/wikipedia/commons/c/c8/Logo_of_the_Sharp_Corporation.svg'}
            height={150}
            width={150}
            />
        </div>
    );
};

export default Sponsors;