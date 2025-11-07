import React, { useState, useRef, useEffect } from 'react';
import Nav from './Nav';
import {
    TextField,
    InputAdornment, MenuItem, Menu,
    IconButton, Avatar, Stack, Badge, styled, Backdrop
} from '@mui/material'
import type { SxProps, Theme } from "@mui/material/styles";
import { keyframes } from "@mui/system";

import { useStateGeneral } from '@/useState/useStateGeneral';
import { useState_ResStores } from '@/useState/useStatestorefront';
import { FaRegHeart, FaRegUser } from 'react-icons/fa';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { IoMdSearch } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { PiCurrencyDollar, PiCurrencyEur } from 'react-icons/pi';

const StyledBadge = styled(Badge)(({ theme }) => ({
    width: '35px',
    height: '35px',
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '2px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

const fly1 = keyframes`
  from { transform: translateY(0.1em); }
  to   { transform: translateY(-0.1em); }
`;

const HeaderWeb: React.FC = () => {
    const sxAvata: SxProps<Theme> = {
        width: "100%",
        height: "100%",
        boxShadow: 'var(--shadow-xl)',

    }

    const PaperProps: SxProps<Theme> = {
        sx: {
            borderRadius: '10px',
            boxShadow: '0px 4px 12px rgba(0,0,0,0.15)',
            maxWidth: 'calc(100%)',
            background: 'white',
            zIndex: 100,
        },
    }

    const MenuListProps: SxProps<Theme> = {
        sx: {
            paddingY: 0.5,
        },
    }

    const sxMenuItem: SxProps<Theme> = {
        justifyContent: 'start',
        paddingY: '10px',
        paddingLeft: '20px',
        color: 'black',
        zIndex: 100,
        '&:hover': {
            backgroundColor: 'var(--color-orange-700) !important',
            color: 'white !important',
            fontWeight: 600
        },
    }

    const sxTextField: SxProps<Theme> = {
        width: '100%',
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

    const sxBadge: SxProps<Theme> = {
        "& .MuiBadge-badge": {
            background: 'back',
            color: "var(--color-orange-700)",
            fontWeight: 'bold',
            fontSize: 'var(--text-sm)'
        }
    }

    const sxButton: SxProps<Theme> = {
        color: 'var(--color-green-500)',
        borderRadius: '100%',
        fontWeight: '600',
        fontSize: 'var(--text-xl)',
        position: "relative",
        overflow: "hidden",
        textTransform: "none",
        "&:active": { transform: "scale(0.95)" },
        // "&::before": {
        //     content: '""',
        //     position: "absolute",
        //     top: 0,
        //     left: "50%",
        //     height: "100%",
        //     width: 0,
        //     background: "var(--color-green-400)",
        //     opacity: 0,
        //     transition: "all 0.5s ease",
        //     zIndex: -1,
        // },
        // "&:hover::before": {
        //     border: 'none',
        //     left: 0,
        //     width: "100%",
        //     opacity: 1,
        // },
        "& span": {
            display: 'block',
            transition: 'all 0.3s ease-in-out'
        },
        "& svg": {
            display: 'block',
            transformOrigin: 'center center',
            transition: 'transform 0.3s ease-in-out',
        },
        "&:hover .svgWrapper": {
            animation: `${fly1} 0.6s ease-in-out infinite alternate`,
            color: 'black'
        },
    }

    const { resStores } = useState_ResStores()

    const {
        ordersNumber, heartNumber,
        setIsSearch, isSearch, isCurrency,
        setIsCurrency, hoveredNav, setHoveredNav } = useStateGeneral()

    const [anchorElCurrency, setAnchorElCurrency] = useState<null | HTMLElement>(null);
    const openCurrency = Boolean(anchorElCurrency);
    const handleClickCurrency = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElCurrency(event.currentTarget);
    };
    const handleCloseCurrency = () => {
        setAnchorElCurrency(null);
    };

    const handleClickUSD = () => {
        setIsCurrency('USD')
    }

    const handleClickEUR = () => {
        setIsCurrency('EUR')
    }

    const headerRef = useRef<HTMLDivElement>(null)

    const [headerBottom, setHeaderBottom] = useState<number>(0)
    // 🔹 Cập nhật vị trí header mỗi khi scroll hoặc resize
    useEffect(() => {
        const updateHeaderPos = () => {
            if (headerRef.current) {
                const rect = headerRef.current.getBoundingClientRect()
                setHeaderBottom(rect.bottom)
            }
        }
        updateHeaderPos()
        window.addEventListener("scroll", updateHeaderPos)
        window.addEventListener("resize", updateHeaderPos)
        return () => {
            window.removeEventListener("scroll", updateHeaderPos)
            window.removeEventListener("resize", updateHeaderPos)
        }
    }, [])

    return (
        <>
            <header ref={headerRef} className='top-0 sticky z-100 px-5 py-4 bg-white backdrop-blur-[10px] border-b-[1px] border-b-gray-700'

            >
                <div className='max-w-[1535px] mx-auto flex justify-between items-center'>
                    <img className="w-30 custom-desktop-height "
                        alt="Spree Commerce DEMO logo"
                        src="../../LogoFullBlack.webp" />
                    <Nav
                        classNameUl='flex list-none gap-7 uppercase text-lg'
                        classNameA='size-[24px] relative cursor-pointer transiton-all duration-300 mo-underline after:absolute after:bottom-[-5px] after:left-0 after:h-[2px] after:bg-green-400 after:transistion-all after:duration-300 after:w-full after:visible after:scale-x-0 hover:after:w-full hover:after:scale-x-100 hover:text-green-400 menu-item header--nav-link'
                        classNameAActive='text-green-400 after:scale-x-100'
                    />
                    <div className='flex justify-between gap-4 items-center'>
                        {/* search */}
                        < IconButton
                            sx={sxButton}
                            onClick={() => setIsSearch(true)}
                        >
                            <span className='text-black text-2xl max-md:text-xl svgWrapper'>
                                <IoMdSearch className="mx-auto" />
                            </span>
                        </IconButton>
                        {/* user */}
                        < IconButton
                            sx={sxButton} >
                            <span className='text-black text-2xl max-md:text-xl svgWrapper'>
                                <FaRegUser className="mx-auto" />
                            </span>
                        </IconButton>
                        {/* cart */}
                        < IconButton
                            sx={sxButton} >
                            <Badge badgeContent={ordersNumber} sx={sxBadge}>
                                <span className='text-black text-2xl max-md:text-xl svgWrapper'>
                                    <MdOutlineShoppingCart className="mx-auto" />
                                </span>
                            </Badge >
                        </IconButton>
                        < IconButton
                            sx={sxButton} >
                            <Badge badgeContent={heartNumber} sx={sxBadge}>
                                <span className='text-black text-2xl max-md:text-xl svgWrapper'>
                                    <FaRegHeart className="mx-auto" />
                                </span>
                            </Badge >
                        </IconButton>
                        {/*  */}
                        <button className='px-2 border-l-[2px] border-l-gray-200 items-center text-lg flex gap-1'
                            onClick={handleClickCurrency}
                        >
                            {resStores?.data.attributes.default_currency} ({isCurrency === 'USD' ? <PiCurrencyDollar /> : <PiCurrencyEur />})
                        </button>
                        <Menu
                            anchorEl={anchorElCurrency}
                            open={openCurrency}
                            onClose={handleCloseCurrency}
                            PaperProps={PaperProps}
                            MenuListProps={MenuListProps}
                        >
                            <MenuItem sx={sxMenuItem}
                                onClick={handleClickUSD}
                            >
                                United States Dollar (USD)
                            </MenuItem>
                            <MenuItem sx={sxMenuItem}
                                onClick={handleClickEUR}
                            >
                                Euro (EUR)
                            </MenuItem>
                        </Menu>
                    </div>
                    {isSearch &&
                        <Backdrop
                            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                            open={isSearch}
                        >
                            <>
                                <div className="w-full md:w-[600px] sm:w-auto ">
                                    <TextField
                                        type="search"
                                        placeholder="Search..."
                                        sx={sxTextField}
                                        // onChange={(e) => setInputValueSources(e.target.value)}
                                        // value={inputValueSources}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        sx={{
                                                            ...sxButton,
                                                            background: "rgba(74, 222, 128, 0.1)",
                                                            border: '1px solid rgba(74, 222, 128, 0.2)',
                                                            color: 'var(--color-green-500)',
                                                            borderRadius: '25px',
                                                            fontWeight: '600',
                                                            fontSize: 'var(--text-xl)',
                                                            position: "relative",
                                                            overflow: "hidden",
                                                            textTransform: "none",
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
                                                        }}
                                                    >
                                                        <div className="relative flex items-center gap-2 svgWrapper">
                                                            <IoMdSearch className="mx-auto" />
                                                        </div>
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                                < IconButton
                                    sx={sxButton}
                                    onClick={() => setIsSearch(false)}>
                                    <IoClose className=" mx-auto" />
                                </IconButton>
                            </>
                        </Backdrop>
                    }
                </div>
            </header>
            {(hoveredNav === 1 || hoveredNav === 2) &&
                <div
                    style={{
                        top: `${headerBottom}px`, // luôn nằm ngay dưới header
                    }}
                    onMouseEnter={() => setHoveredNav(hoveredNav)} // Giữ hiển thị khi rê qua div này
                    onMouseLeave={() => setHoveredNav(null)} // Ẩn khi rời ra ngoài
                    className="absolute left-0 top-full w-full bg-white shadow-lg p-6 z-40 transition-all duration-300"
                >
                    {hoveredNav === 1 && <p>👗 Bộ sưu tập thời trang mới nhất</p>}
                    {hoveredNav === 2 && <p>🌿 Chăm sóc sức khỏe & tinh thần</p>}
                </div>
            }
        </>
    )
}

export default HeaderWeb;