import React, { useEffect } from 'react';
import Nav from './Nav';

import { ToastContainer, toast } from 'react-toastify';
import { ReturnTheCurrentStore } from '@/service/storefront/stores';

const FooterWeb: React.FC = () => {
    const year = new Date().getFullYear()

    const getApiStores = async () =>{
        try{
            const res = await ReturnTheCurrentStore()
            console.log(res)

        }catch{

        }
    }

    useEffect(()=>{
        getApiStores()
    },[])

    return (
        <footer className='p-5 flex flex-col gap-5 bg-blue-50 text-black'>
            <div className='max-w-[1500px] mx-auto flex gap-0 md:gap-6 md:flex-row flex-col py-5 border-b border-b-gray-300'>
                <div className='flex justify-center flex-grow border-b md:border-none w-80'>
                    <img className="w-auto h-[60px] custom-desktop-height "
                        alt="Spree Commerce DEMO logo"
                        src="../../LogoFullBlack.webp" />
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-3 grow w-full'>
                    <div className='flex-grow gap-4 flex flex-col '>
                        <h3 className='text-xl font-bold'>Shop</h3>
                        <Nav
                            classNameUl='grid gap-4 grid-col-1 max-md:grid-cols-2'
                            classNameTitle='flex gap-3 items-center transiton-all duration-300 transform hover:translate-x-2'
                            classNameA='cursor-pointer transiton-all duration-300 hover:text-green-400 '
                            classNameAActive="text-green-400"
                        />
                    </div>
                    <div className='flex-grow gap-4 flex flex-col '>
                        <h3 className='text-xl font-bold'>Account</h3>
                        <ul className='grid gap-4 uppercase'>
                            {/* account */}
                            <li>
                                <a
                                    // onClick={}
                                    className='cursor-pointer transiton-all duration-300 hover:text-green-400'
                                >
                                    <div className='flex gap-3 items-center transiton-all duration-300 transform hover:translate-x-2'> My Account</div>
                                </a>
                            </li>
                            {/* account/wishlist */}
                            <li>
                                <a
                                    // onClick={}
                                    className='cursor-pointer transiton-all duration-300 hover:text-green-400'
                                >
                                    <div className='flex gap-3 items-center transiton-all duration-300 transform hover:translate-x-2'> Favorites</div>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className='flex-grow gap-4 flex flex-col '>
                        <h3 className='text-xl font-bold'>Pay</h3>

                    </div>
                </div>
                <div className='flex-grow gap-4 flex flex-col justify-between lg:w-60'>
                    <h3 className='text-xl font-bold'>Follow Us</h3>

                </div>
            </div>
            <div className="mx-auto flex flex-col gap-4">
                <p className='text-center'>&copy; {year} Spree Commerce DEMO. All Rights Reserved. Provided by <a className='' href="https://spreecommerce.org/docs/api-reference"><strong className='font-'>Spre Ecommerce</strong></a></p>
            </div>
        </footer>
    )
}

export default FooterWeb;