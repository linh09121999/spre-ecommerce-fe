import React from 'react';
import { useStateGeneral } from "@/useState/useStateGeneral";;
import { useState_ResStores } from '@/useState/useStatestorefront';
import { useRouter } from "next/navigation";

import { FaFacebookF } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";

import { IconButton, InputAdornment, TextField } from '@mui/material';
import type { SxProps, Theme } from "@mui/material/styles";
import { keyframes } from "@mui/system";

const fly1 = keyframes`
  from { transform: translateY(0.1em); }
  to   { transform: translateY(-0.1em); }
`;

const FooterWeb: React.FC = () => {
    const router = useRouter();

    const sxButton: SxProps<Theme> = {
        background: "rgba(74, 222, 128, 0.1)",
        border: '1px solid rgba(74, 222, 128, 0.2)',
        color: 'var(--color-green-500)',
        borderRadius: '25px',
        width: '100px',
        fontWeight: '600',
        fontSize: 'var(--text-xl)',
        position: "relative",
        overflow: "hidden",
        textTransform: "none",
        "&:active": { transform: "scale(0.95)" },
        "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: "50%",
            height: "100%",
            width: 0,
            background: "var(--color-green-400)",
            opacity: 0,
            transition: "all 0.5s ease",
            zIndex: -1,
        },
        "&:hover::before": {
            border: 'none',
            left: 0,
            width: "100%",
            opacity: 1,
        },
        "& span": {
            display: 'block',
            transition: 'all 0.3s ease-in-out'
        },
        "& svg": {
            display: 'block',
            transformOrigin: 'center center',
            transition: 'transform 0.3s ease-in-out',
        },
        ":hover svg": {
            transform: ' rotate(45deg) scale(1.1)',
            transition: 'translateX(5rem) transform 0.3s ease-in-out',

        },
        "&:hover .svgWrapper": {
            animation: `${fly1} 0.6s ease-in-out infinite alternate`,
            color: 'black'
        },
    }

    const sxText: SxProps<Theme> = {
        width: {
            md: '100%',
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: "30px",
            background: 'white',
            backdropFilter: 'blur(10px)',
            padding: '3px 8px !important',
            transition: 'all 0.3s',
            fontSize: 'var(--text-xl)',
            border: '1px solid var(--color-gray-800)',
            height: '60px',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
        },

        '&:hover .MuiOutlinedInput-notchedOutline': {
            outline: 'none',
            border: 'none'
        },

        '& .MuiOutlinedInput-input': {
            padding: 0
        },

        '& .MuiInputBase-input': {
            color: 'var(--color-green-300)',
            paddingLeft: '14px',
            fontSize: 'var(--text-lg)',
            border: 'none',
        },
    }


    const year = new Date().getFullYear()

    const { setYourMail, yourMail, pages, setSelectNav } = useStateGeneral()

    const { resStores } = useState_ResStores()

    const textSubject = "Hello, I'm "
    const body = encodeURIComponent('I am interested in this website');

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value;
        setYourMail(value)
    }

    return (
        <>
            <footer className='p-5 flex flex-col gap-5 bg-white text-black'>
                <div className='max-w-[1500px] mx-auto flex gap-0 md:gap-10 md:flex-row  flex-col py-5 border-b border-b-gray-300'>
                    <div className='flex justify-center gap-4 flex-col border-b md:border-none'>
                        <img className="w-40 custom-desktop-height "
                            alt="Spree Commerce DEMO logo"
                            src="../../LogoFullBlack.webp" />

                        <div className='text-black/70'>{resStores?.data.attributes.meta_description}</div>
                        <div className='flex gap-2'>
                            <TextField
                                aria-label="input email"
                                placeholder="Enter your email.."
                                name="email"
                                sx={sxText}
                                value={yourMail}
                                onChange={handleChangeEmail}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton className=" w-full group backdrop-blur-[4px] place-self-end flex z-10  inline-flex shadow-md transition-transform duration-300 ease-in-out"
                                                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${resStores?.data.attributes.customer_support_email}&su=${encodeURIComponent(textSubject + yourMail)}&body=${body}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                sx={sxButton}
                                            >
                                                <div className="relative flex items-center gap-2 svgWrapper">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        width="24"
                                                        height="24"
                                                    >
                                                        <path fill="none" d="M0 0h24v24H0z"></path>
                                                        <path
                                                            fill="currentColor"
                                                            d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                                                        ></path>
                                                    </svg>
                                                </div>
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-3 grow w-full'>
                        <div className='flex-grow gap-4 flex flex-col '>
                            <h3 className='text-xl font-semibold'>Shop</h3>
                            <ul className='grid gap-4'>
                                {pages?.map((page, index) => (
                                    <a key={index}
                                        onClick={() => {
                                            setSelectNav(index)
                                            router.push(page.path)
                                        }}
                                        className='cursor-pointer transiton-all duration-300 hover:text-green-400'
                                    >
                                        <div className='flex gap-3 items-center transiton-all duration-300 transform hover:translate-x-2'>
                                            {page.title}
                                        </div>
                                    </a>
                                ))}
                            </ul>
                        </div>
                        <div className='flex-grow gap-4 flex flex-col '>
                            <h3 className='text-xl font-semibold'>Account</h3>
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
                            <h3 className='text-xl font-semibold'>Contact</h3>
                            {resStores?.data.attributes.facebook &&
                                <div className='flex gap-3 items-center'>
                                    <a
                                        className='css-icon backdrop-blur-[4px] text-green-500 bg-green-400/15 min-h-[55px] min-w-[55px] rounded-full justify-items-center content-center transition-all duration-500 ease hover:bg-green-400 hover:text-black'
                                        href={resStores?.data.attributes.facebook}>
                                        <FaFacebookF className='mx-auto' />
                                    </a>
                                    <p>Facebook</p>
                                </div>
                            }
                            {resStores?.data.attributes.twitter &&
                                <div className='flex gap-3 items-center'>
                                    <a
                                        className='css-icon backdrop-blur-[4px] text-green-500 bg-green-400/15 min-h-[55px] min-w-[55px] rounded-full justify-items-center content-center transition-all duration-500 ease hover:bg-green-400 hover:text-black'
                                        href={resStores?.data.attributes.twitter}>
                                        <BsTwitterX className='mx-auto' />
                                    </a>
                                    <p>Twitter</p>
                                </div>
                            }
                            {resStores?.data.attributes.instagram &&
                                <div className='flex gap-3 items-center'>
                                    <a
                                        className='css-icon backdrop-blur-[4px] text-green-500 bg-green-400/15 min-h-[55px] min-w-[55px] rounded-full justify-items-center content-center transition-all duration-500 ease hover:bg-green-400 hover:text-black'
                                        href={resStores?.data.attributes.instagram}>
                                        <FaInstagram className='mx-auto' />
                                    </a>
                                    <p>Instagram</p>
                                </div>

                            }
                        </div>
                    </div>
                </div>
                <div className="mx-auto flex flex-col gap-4">
                    <p className='text-center'>&copy; {year} Spree Commerce DEMO. All Rights Reserved. Provided by <a className='' href="https://spreecommerce.org/docs/api-reference"><strong className='font-'>Spre Ecommerce</strong></a></p>
                </div>
            </footer >
        </>

    )
}

export default FooterWeb;