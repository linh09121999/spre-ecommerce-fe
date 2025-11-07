import React from 'react';
import Nav from './Nav';

const HeaderWeb: React.FC = () => {
    return (
        <>
            <Nav
                classNameUl='flex list-none'
                classNameA='size-[24px] relative cursor-pointer transiton-all duration-300 mo-underline after:absolute after:bottom-[-5px] after:left-0 after:h-[2px] after:bg-green-400 after:transistion-all after:duration-300 after:w-full after:visible after:scale-x-0 hover:after:w-full hover:after:scale-x-100 hover:text-green-400'
                classNameAActive='text-green-400 after:scale-x-100'
            />
        </>
    )
}

export default HeaderWeb;