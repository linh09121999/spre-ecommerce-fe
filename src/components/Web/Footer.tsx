import React, { useEffect } from 'react';
import Nav from './Nav';
import { useStateGeneral } from "@/useState/useStateGeneral";
import { ToastContainer, toast } from 'react-toastify';
import { ReturnTheCurrentStore } from '@/service/storefront/stores';
import { useState_ResStores } from '@/useState/useStatestorefront';

const FooterWeb: React.FC = () => {
    const year = new Date().getFullYear()

    const { setLoading } = useStateGeneral()

    const { setResStores, resStores } = useState_ResStores()

    const getApiStores = async () => {
        try {
            setLoading(true);
            const res = await ReturnTheCurrentStore()
            setResStores(res.data)
        } catch (error: any) {
            toast.error(`Stores: ` + error.response.error)
        }
        finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }
    }

    useEffect(() => {
        getApiStores()
    }, [])

    return (
        <>
            <footer className='p-5 flex flex-col gap-5 bg-blue-50 text-black'>
                <div className='max-w-[1500px] mx-auto flex gap-0 md:gap-6 md:flex-row md:justify-between flex-col py-5 border-b border-b-gray-300'>
                    <div className='flex justify-center gap-4 flex-col border-b md:border-none'>
                        <img className="w-40 custom-desktop-height "
                            alt="Spree Commerce DEMO logo"
                            src="../../LogoFullBlack.webp" />

                        <div>{resStores?.data.attributes.meta_description}</div>

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
                </div>
                <div className="mx-auto flex flex-col gap-4">
                    <p className='text-center'>&copy; {year} Spree Commerce DEMO. All Rights Reserved. Provided by <a className='' href="https://spreecommerce.org/docs/api-reference"><strong className='font-'>Spre Ecommerce</strong></a></p>
                </div>
            </footer>
            <ToastContainer position="top-right" autoClose={3000} />
        </>

    )
}

export default FooterWeb;