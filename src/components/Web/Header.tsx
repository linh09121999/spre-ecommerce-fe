"use client"
import React, { useState, useRef, useEffect, useMemo } from 'react';
import Nav from './Nav';
import {
    TextField,
    InputAdornment, MenuItem, Menu,
    IconButton, Avatar, Stack, Badge, styled, Backdrop
} from '@mui/material'
import type { SxProps, Theme } from "@mui/material/styles";
import { keyframes } from "@mui/system";

import { useStateGeneral } from '@/useState/useStateGeneral';
import { useState_ResAccount, useState_ResStores, useState_ResTaxons } from '@/useState/useStatestorefront';
import { FaRegHeart, FaRegUser } from 'react-icons/fa';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { IoMdSearch } from 'react-icons/io';
import { IoClose, IoLogOut } from 'react-icons/io5';
import { PiCurrencyDollar, PiCurrencyEur } from 'react-icons/pi';
import { ReturnTheCurrentStore } from '@/service/storefront/stores';
import { ToastContainer, toast } from 'react-toastify';
import { ListAllTaxons } from '@/service/storefront/taxons';
import { GrFormNextLink } from 'react-icons/gr';
import { useRouter } from "next/navigation";
import { Cart } from '@/interface/sendData/interfaceStorefront';
import { CreateACart } from '@/service/storefront/cart';

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

    const router = useRouter();

    const { setResStores, resStores } = useState_ResStores()
    const { resTaxons_List, setResTaxons_List } = useState_ResTaxons()
    const { resAccount } = useState_ResAccount()

    const {
        setLoading, ordersNumber, heartNumber,
        setIsSearch, isSearch, isCurrency,
        setIsCurrency, hoveredNav, setHoveredNav } = useStateGeneral()

    const getApiStores = async () => {
        try {
            setLoading(true);
            const res = await ReturnTheCurrentStore()
            setResStores(res.data)
        } catch (error: any) {
            toast.error(`Stores: ` + error.response || error.message)
        }
        finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }
    }

    const getApiTaxons = async (page: number, per_page: number) => {
        try {
            setLoading(true);
            const res = await ListAllTaxons({ page, per_page })
            setResTaxons_List(res.data)
        } catch (error: any) {
            toast.error(`Taxons: ` + error.response || error.message)
        }
        finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }
    }

    const postApiCart = async () => {
        const existingToken = localStorage.getItem("order_token");
        if (existingToken) {
            // token đã có, có thể fetch cart hiện tại nếu muốn
            setLoading(false);
            return;
        }

        const data: Cart = {
            public_metadata: {
                total_weight: 3250,
            },
            private_metadata: {
                had_same_cart_items: true,
            },
        };

        try {
            const response = await CreateACart(data);
            console.log("Cart created:", response.data);

            // Nếu API trả về order_token thì lưu vào localStorage
            const orderToken = response.data.data?.attributes?.token
            if (orderToken) {
                localStorage.setItem("order_token", orderToken);
            }

            return response.data; // trả về dữ liệu nếu cần
        } catch (error: any) {
            toast.error(`Error creating cart: ` + error.response || error.message)
            throw error;
        }
    };


    useEffect(() => {
        getApiStores()
        getApiTaxons(1, 100)
        postApiCart()
    }, [])

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

    const [anchorElAccount, setAnchorElAccount] = useState<null | HTMLElement>(null);
    const openAccount = Boolean(anchorElAccount);

    const handleClickAccount = (event: React.MouseEvent<HTMLButtonElement>) => {
        resAccount?.data.attributes.email ?
            (
                setAnchorElAccount(event.currentTarget)
            )
            :
            (
                router.push('/login')
            )
    }

    const handleCloseAccount = () => {
        setAnchorElAccount(null);
    };

    const [hidden, setHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Khi scroll xuống và quá 100px thì ẩn header
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setHidden(true);
            } else if (currentScrollY < lastScrollY) {
                // Khi scroll lên thì hiện header
                setHidden(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const filteredFashionImg = useMemo(() => {
        return resTaxons_List?.data.filter((r) =>
            r.attributes.name.toLowerCase().includes("fashion".toLowerCase())
        );
    }, [resTaxons_List?.data]);

    const filterFashionMen = useMemo(() => {
        return resTaxons_List?.data.filter((r) =>
            r.attributes.permalink.toLowerCase().includes("categories/fashion/men/".toLowerCase())
        );
    }, [resTaxons_List?.data]);

    const filterFashionWomen = useMemo(() => {
        return resTaxons_List?.data.filter((r) =>
            r.attributes.permalink.toLowerCase().includes("categories/fashion/women/".toLowerCase())
        );
    }, [resTaxons_List?.data]);

    const filterFashionAccessories = useMemo(() => {
        return resTaxons_List?.data.filter((r) =>
            r.attributes.permalink.toLowerCase().includes("categories/fashion/accessories/".toLowerCase())
        );
    }, [resTaxons_List?.data]);

    const filteredWellnessImg = useMemo(() => {
        return resTaxons_List?.data.filter((r) =>
            r.attributes.name.toLowerCase().includes("wellness".toLowerCase())
        );
    }, [resTaxons_List?.data]);

    const filterWellnessFitness = useMemo(() => {
        return resTaxons_List?.data.filter((r) =>
            r.attributes.permalink.toLowerCase().includes("categories/wellness/fitness/".toLowerCase())
        );
    }, [resTaxons_List?.data]);

    const filterWellnessRelaxation = useMemo(() => {
        return resTaxons_List?.data.filter((r) =>
            r.attributes.permalink.toLowerCase().includes("categories/wellness/relaxation/".toLowerCase())
        );
    }, [resTaxons_List?.data]);

    const filterWellnessMentalStimulation = useMemo(() => {
        return resTaxons_List?.data.filter((r) =>
            r.attributes.permalink.toLowerCase().includes("categories/wellness/mental-stimulation/".toLowerCase())
        );
    }, [resTaxons_List?.data]);

    const filterWellnessNutrition = useMemo(() => {
        return resTaxons_List?.data.filter((r) =>
            r.attributes.permalink.toLowerCase().includes("categories/wellness/nutrition/".toLowerCase())
        );
    }, [resTaxons_List?.data]);

    const toPath = (text: string): string => {
        return text
            .toLowerCase()        // chuyển hết về chữ thường
            .trim()               // bỏ khoảng trắng đầu/cuối
            .replace(/\s+/g, '-') // thay khoảng trắng bằng dấu gạch ngang
            .replace(/[^\w-]/g, ''); // loại bỏ ký tự đặc biệt
    };

    return (
        <>
            <header
                className={`top-0 sticky z-100 px-5 py-4 bg-white backdrop-blur-[10px] border-b border-b-gray-700 transition-transform duration-500 ${hidden ? "-translate-y-full" : "translate-y-0"
                    }`}
            >
                <div className='max-w-[1535px] mx-auto flex justify-between items-center'>
                    <a onClick={() => {
                        router.push('/')
                    }}>
                        <img className="w-30 custom-desktop-height "
                            alt="Spree Commerce DEMO logo"
                            src="../../LogoFullBlack.webp" />
                    </a>
                    <Nav
                        classNameUl='flex list-none gap-7 uppercase text-lg'
                        classNameA={` size-[24px] relative cursor-pointer transiton-all duration-300 mo-underline after:absolute after:bottom-[-5px] after:left-0 after:h-[2px]  after:transistion-all after:duration-300 after:w-full after:visible after:scale-x-0 hover:after:w-full hover:after:scale-x-100  menu-item header--nav-link`}
                        classNameAActive='text-green-500 after:scale-x-100 after:bg-green-500'
                        classNameAHover=' after:scale-x-100 after:bg-gray-200'
                        classNameADeactive='text-gray-500'
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
                        {/* user */}
                        < IconButton
                            sx={sxButton}
                            onClick={handleClickAccount}
                        >
                            <Stack direction="row" spacing={2}>
                                <StyledBadge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    variant="dot"
                                >
                                    <Avatar
                                        sx={sxAvata}
                                    >
                                        {resAccount?.data.attributes.first_name.toUpperCase() ?? <FaRegUser className="mx-auto" />}
                                    </Avatar>
                                </StyledBadge >
                            </Stack>
                        </IconButton>
                        {resAccount?.data.attributes.email &&
                            <Menu
                                anchorEl={anchorElAccount}
                                open={openAccount}
                                onClose={handleCloseAccount}
                                PaperProps={PaperProps}
                                MenuListProps={MenuListProps}
                            >
                                <MenuItem sx={sxMenuItem}
                                // onClick={handleClickUSD}
                                >
                                    <div className='bg-green-50 p-2 flex gap-3'>
                                        <Stack direction="row" spacing={2}>
                                            <StyledBadge
                                                overlap="circular"
                                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                variant="dot"
                                            >
                                                <Avatar
                                                    sx={sxAvata}
                                                >
                                                    {resAccount?.data.attributes.first_name.toUpperCase() ?? <FaRegUser className="mx-auto" />}
                                                </Avatar>
                                            </StyledBadge >
                                        </Stack>
                                        <div className='flex flex-col gap-3'>
                                            <p className='flex gap-1'>{resAccount?.data.attributes.first_name} {resAccount?.data.attributes.last_name}</p>
                                            <p>{resAccount?.data.attributes.email}</p>
                                        </div>
                                    </div>
                                </MenuItem>
                                <MenuItem sx={sxMenuItem}
                                // onClick={handleClickUSD}
                                >
                                    Dashboard
                                </MenuItem>
                                <MenuItem sx={sxMenuItem}
                                // onClick={handleClickEUR}
                                >
                                    <span className='text-2xl rotate-[180deg]'><IoLogOut /></span>
                                    <span className={` text-xl transition-all duration-300 ease-in-out`}>Logout</span>
                                </MenuItem>
                            </Menu>
                        }
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
                {(hoveredNav === 1 || hoveredNav === 2) &&
                    <div
                        onMouseEnter={() => setHoveredNav(hoveredNav)} // Giữ hiển thị khi rê qua div này
                        onMouseLeave={() => setHoveredNav(null)} // Ẩn khi rời ra ngoài
                        className="absolute left-0 top-full w-full bg-white shadow-lg p-6 z-40 transition-all duration-300"
                    >
                        {hoveredNav === 1 &&
                            // fashion
                            <div className='max-w-[1535px] mx-auto grid grid-cols-4 '>
                                {[
                                    { filter: filterFashionMen, title: "Men" },
                                    { filter: filterFashionWomen, title: "Women" },
                                    { filter: filterFashionAccessories, title: "Accessories" },
                                ].map(({ filter, title }) => (
                                    <div className='flex-grow gap-4 flex flex-col '>
                                        <h3 className='text-lg font-semibold uppercase'>{title}</h3>
                                        <ul className='grid gap-4'>
                                            {filter?.map((data, id) => (
                                                <a key={id}
                                                    onClick={() => {
                                                        router.push(`/${toPath(data.attributes.name)}`)
                                                    }}
                                                    className='cursor-pointer transiton-all duration-300 hover:text-green-400'
                                                >
                                                    <div className='flex gap-3 items-center transiton-all duration-300 transform hover:translate-x-2'>
                                                        {data.attributes.name}
                                                    </div>
                                                </a>
                                            ))}
                                            <a
                                                onClick={() => {
                                                    router.push(`/${toPath(title)}`)
                                                }}
                                                className='cursor-pointer transiton-all duration-300 hover:text-green-400'
                                            >
                                                <div className='uppercase flex gap-3 items-center transiton-all duration-300 transform hover:translate-x-2'>
                                                    View All
                                                    <GrFormNextLink />
                                                </div>
                                            </a>
                                        </ul>
                                    </div>
                                ))}
                                {filteredFashionImg?.map((data, id) => (
                                    <div key={id} className='flex-grow gap-4 flex flex-col '>
                                        <img src={data.attributes.header_url} alt={data.attributes.name} className='rounded-md' />
                                    </div>
                                ))}
                            </div>
                        }
                        {/* wellness */}
                        {hoveredNav === 2 &&
                            <div className='max-w-[1535px] mx-auto grid grid-cols-4'>
                                {[
                                    { filter: filterWellnessFitness, title: "Fitness" },
                                    { filter: filterWellnessRelaxation, title: "Relaxation" },
                                    { filter: filterWellnessMentalStimulation, title: "Mental Stimulation" },
                                    { filter: filterWellnessNutrition, title: "Nutrition" },
                                ].map(({ filter, title }) => (
                                    <div className='flex-grow gap-4 flex flex-col '>
                                        <h3 className='text-lg font-semibold uppercase'>{title}</h3>
                                        <ul className='grid gap-4'>
                                            {filter?.map((data, id) => (
                                                <a key={id}
                                                    onClick={() => {
                                                        router.push(`/${toPath(data.attributes.name)}`)
                                                    }}
                                                    className='cursor-pointer transiton-all duration-300 hover:text-green-400'
                                                >
                                                    <div className='flex gap-3 items-center transiton-all duration-300 transform hover:translate-x-2'>
                                                        {data.attributes.name}
                                                    </div>
                                                </a>
                                            ))}
                                            <a
                                                onClick={() => {
                                                    router.push(`/${toPath(title)}`)
                                                }}
                                                className='cursor-pointer transiton-all duration-300 hover:text-green-400'
                                            >
                                                <div className='uppercase flex gap-3 items-center transiton-all duration-300 transform hover:translate-x-2'>
                                                    View All
                                                    <GrFormNextLink />
                                                </div>
                                            </a>
                                        </ul>
                                    </div>
                                ))}

                                {filteredWellnessImg?.map((data, id) => (
                                    <>
                                        {data.attributes.header_url &&
                                            <div key={id} className='flex-grow gap-4 flex flex-col '>
                                                <img src={data.attributes.header_url} alt={data.attributes.name} />
                                            </div>
                                        }
                                    </>

                                ))}
                            </div>
                        }
                    </div>
                }
            </header >

            <ToastContainer position="top-right" autoClose={3000} />
        </>
    )
}

export default HeaderWeb;