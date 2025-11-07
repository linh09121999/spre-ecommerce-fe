import React from 'react';
import Nav from './Nav';

const HeaderWeb: React.FC = () => {
    return (
        <>
            <header className='top-0 sticky z-100 px-5 py-4 bg-white backdrop-blur-[10px] border-b-[1px] border-b-gray-700'>
                <div className='max-w-[1535px] mx-auto flex justify-between items-center'>
                    <img className="w-30 custom-desktop-height "
                        alt="Spree Commerce DEMO logo"
                        src="../../LogoFullBlack.webp" />
                    <Nav
                        classNameUl='flex list-none gap-7 uppercase'
                        classNameA='size-[24px] relative cursor-pointer transiton-all duration-300 mo-underline after:absolute after:bottom-[-5px] after:left-0 after:h-[2px] after:bg-green-400 after:transistion-all after:duration-300 after:w-full after:visible after:scale-x-0 hover:after:w-full hover:after:scale-x-100 hover:text-green-400'
                        classNameAActive='text-green-400 after:scale-x-100'
                    />
                    <div className='flex justify-between gap-3'>

                    </div>
                </div>

            </header>
        </>
    )
}

export default HeaderWeb;