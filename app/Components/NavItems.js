import Link from 'next/link';
import React from 'react';
const navItems = async () => {
   const res = await fetch('https://www.outletexpense.xyz/api/public/categories/38');
   const data = await res.json();
   return data.data;
}
const NavItems = async() => {
    const items = navItems();
    console.log(items);
    return (
        <div>
            {/* {
                        data?.data.slice(0,6).map((item,idx) => {
                            return <Link key={idx} href={`/category/${item.category_id}?category=${item.name}`}  className={`text-white `}>{item.name}</Link>
                        })
            } */}
            ssserverside
        </div>
    );
};

export default NavItems;