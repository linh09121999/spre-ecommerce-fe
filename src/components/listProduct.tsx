"use client"
import { ProductCardProps } from "@/interface/interface";
import Image from "next/image";

import React, { useState, useEffect, useMemo } from "react";
import ListProductCard from "./cardListProduct";
import { Menu, MenuItem } from "@mui/material";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useStateGeneral } from "@/useState/useStateGeneral";
import type { SxProps, Theme } from "@mui/material/styles";
import { ResTaxons_Retrieve } from "@/interface/responseData/interfaceStorefront";

interface ListProduct extends ProductCardProps {
    taxonsRetrieve: ResTaxons_Retrieve
}

const ListProduct: React.FC<ListProduct> = ({ products, included, taxonsRetrieve }) => {
    const PaperProps: SxProps<Theme> = {
        sx: {
            borderRadius: '10px',
            boxShadow: 'var(--shadow-xl)',
            maxWidth: 'calc(100%)',
            background: 'rgb(255,255,255,0.5)',
            backdropFilter: 'blur(10px)',
            zIndex: 100,
        },
    }

    const sxTextField: SxProps<Theme> = {
        width: {
            md: '100%',
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: "10px",
            background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(3, 7, 18, 0.8), rgba(0, 0, 0, 0.8))',
            backdropFilter: 'blur(10px)',
            padding: '3px 8px !important',
            transition: 'all 0.3s',
            fontSize: 'var(--text-xl)',
            border: '1px solid var(--color-gray-800)',
            height: '40px',
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
            color: 'var(--color-cyan-300)',
            paddingLeft: '14px',
            fontSize: 'var(--text-lg)',
            border: 'none',
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
        color: 'rgb(0,0,0,0.7)',
        zIndex: 100,
        '&:hover': {
            background: 'rgb(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            color: 'var(--color-green-600) !important',
            fontWeight: 600
        },
    }

    const sxControlLabel: SxProps<Theme> = {
        margin: 0,
        "& .MuiFormControlLabel-label": {
            fontSize: 'var(--text-sm) !important',
        },
        ":hover": {
            color: 'var(--color-cyan-300)'
        }
    }

    const sxCheckBoxMinate: SxProps<Theme> = {
        color: 'white',
        '&.Mui-checked': { color: 'var(--color-cyan-300)' },
        '&.MuiCheckbox-indeterminate': { color: 'var(--color-cyan-300)' },
    }

    const sxCheckBox: SxProps<Theme> = {
        color: 'white',
        '&.Mui-checked': { color: 'var(--color-cyan-300)' },
    }

    const sxPaperPropsDrawer: SxProps<Theme> = {
        sx: {
            background: 'linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(3, 7, 18, 0.8), rgba(0, 0, 0, 0.8))',
            color: 'var(--color-gray-200)',
            backdropFilter: 'blur(10px)'
        }
    }

    const sxBox1Drawer: SxProps<Theme> = {
        width: 250,
    }

    const sxBox2Drawer: SxProps<Theme> = {
        display: 'flex',
        // justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '12px 16px',
        cursor: 'pointer'
    }

    const sxIconButton: SxProps<Theme> = {
        color: 'white',
        fontSize: '2rem'
    }

    const sxDivider: SxProps<Theme> = {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    }

    const sxListItemDrawer: SxProps<Theme> = {
        padding: '12px 24px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            color: "var(--color-cyan-300)"
        },
        '& .MuiListItemIcon-root': {
            color: 'inherit',
            minWidth: '40px'
        }
    }

    const { prePage, loadingReadMore,
        currentPage, totalDatas, sortOption, setSortOption,
        sortBy, setSortBy,
    } = useStateGeneral()

    // const [sortBy, setSortBy] = useState<string>("Relevance")
    // const [sortOption, setSortOption] = useState("relevance");

    const Category = (name: string) => {
        if (!name) return undefined
        return name.substring(0, name.lastIndexOf('/'))
    }

    const [anchorElSortBy, setAnchorElSortBy] = useState<null | HTMLElement>(null);
    const openSortBy = Boolean(anchorElSortBy);
    const handleClickSortBy = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElSortBy(event.currentTarget);
    };
    const handleCloseSortBy = () => {
        setAnchorElSortBy(null);
    };

    const handleSortDefault = () => {
        handleCloseSortBy()
        setSortBy("Relevance")
        setSortOption("relevance");
    }

    const handleSortNewest = () => {
        handleCloseSortBy()
        setSortBy("Newest")
        setSortOption("newest");
    }

    // tang dan
    const handleSortOldest = () => {
        handleCloseSortBy()
        setSortBy("Oldest")
        setSortOption("oldest");
    }

    // Mới nhất (ngày gần nhất trước)
    const handleSortAtoZ = () => {
        handleCloseSortBy();
        setSortBy("A-Z");
        setSortOption("title-az");
    };

    const handleSortZtoA = () => {
        handleCloseSortBy();
        setSortBy("Z-A");
        setSortOption("title-za");
    };

    const handleSortHighest = () => {
        handleCloseSortBy();
        setSortBy("Highest");
        setSortOption("highest");
    }

    const handleSortLowest = () => {
        handleCloseSortBy();
        setSortBy("Lowest");
        setSortOption("lowest");
    }

    const getPrice = (item: string) => {
        // chuyển "$24.99" → 24.99, nếu null thì 0
        const num = parseFloat(item?.replace(/[^0-9.]/g, "")) || 0;
        return num;
    };

    const filteredReleases = useMemo(() => {
        if (!Array.isArray(products)) return [];
        const sorted = [...products].sort((a, b) => {
            switch (sortOption) {
                case "newest":
                    return (
                        new Date(b.attributes.updated_at).getTime() -
                        new Date(a.attributes.updated_at).getTime()
                    );
                case "oldest":
                    return (
                        new Date(a.attributes.updated_at).getTime() -
                        new Date(b.attributes.updated_at).getTime()
                    );
                case "title-az":
                    return a.attributes.name.localeCompare(b.attributes.name);
                case "title-za":
                    return b.attributes.name.localeCompare(a.attributes.name);
                case "highest":
                    return getPrice(b.attributes.display_price!) - getPrice(a.attributes.display_price!);
                case "lowest":
                    return getPrice(a.attributes.display_price!) - getPrice(b.attributes.display_price!);
                default:
                    return 0; // relevance
            }
        });

        return sorted;
    }, [products, sortOption])

    return (
        <div className={`max-w-[1535px] mx-auto flex flex-col ${taxonsRetrieve?.data.attributes.header_url ? 'gap-10' : 'gap-5'}`}>
            <div className={`${taxonsRetrieve?.data.attributes.header_url ? 'shadow-xl rounded-3xl' : ''} relative w-full  overflow-hidden  group`}>
                {/* Ảnh nền */}
                {taxonsRetrieve?.data.attributes.header_url ?
                    <>
                        <img
                            src={taxonsRetrieve?.data.attributes.header_url}
                            alt={taxonsRetrieve?.data.attributes.name}
                            className="w-full aspect-[16/5] object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Lớp phủ gradient tối giúp chữ nổi */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

                        {/* Nội dung chữ overlay */}
                        <div className="absolute left-0 bottom-0  p-10 text-white z-10 w-3/4 grid gap-3">
                            <span className="text-xl uppercase text-gray-300">{Category(taxonsRetrieve?.data.attributes.permalink)}</span>
                            <h3 className="text-4xl font-bold uppercase tracking-wide bg-gradient-to-r from-green-400 to-emerald-200 bg-clip-text text-transparent drop-shadow-lg">
                                {taxonsRetrieve?.data.attributes.name}
                            </h3>
                            {taxonsRetrieve?.data.attributes.description &&
                                <p className="text-gray-400 text-lg leading-relaxed">
                                    {taxonsRetrieve?.data.attributes.description}
                                </p>
                            }
                        </div>

                        {/* Hiệu ứng điểm nhấn (vòng sáng mờ khi hover) */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,white_0%,transparent_60%)] mix-blend-overlay"></div>

                    </>
                    :
                    <>
                        {/* Nội dung chữ overlay */}
                        <div className=" border-b-[2px] border-b-gray-200 grid gap-3 pb-5 w-full">
                            <span className="text-xl  uppercase text-gray-500">{Category(taxonsRetrieve?.data.attributes.permalink!)}</span>
                            <h3 className="text-4xl font-bold uppercase tracking-wide bg-gradient-to-r from-green-500 to-emerald-200 bg-clip-text text-transparent drop-shadow-lg">
                                {taxonsRetrieve?.data.attributes.name}
                            </h3>
                            {taxonsRetrieve?.data.attributes.description &&
                                <p className="text-gray-400 text-lg leading-relaxed w-3/4">
                                    {taxonsRetrieve?.data.attributes.description}
                                </p>
                            }
                        </div>
                    </>
                }


            </div>
            {products.length === 0 ?
                <div className="flex justify-center items-center">
                    <p className="text-gray-500 text-lg text-center">There are no products</p>
                </div>
                :
                <div className="grid lg:grid-cols-[300px_1fr] gap-5">
                    <aside className="grid h-fit max-lg:hidden lg:sticky lg:top-[105px] gap-4 ">
                    </aside>
                    <section className="flex flex-col gap-4 md:gap-6">
                        <div className="items-center pb-2 border-b-[2px] border-b-gray-200 flex justify-between ">
                            <div className="flex items-end gap-3">
                                <h3 className="text-md tracking-wide text-black/70">
                                    Result
                                </h3>
                                <span className="text-lg uppercase flex gap-1 items-end">
                                    <strong className="text-3xl text-green-600">{
                                        products.length === 0 ?
                                            0 :
                                            (currentPage * prePage) > totalDatas
                                                ?
                                                totalDatas
                                                : (currentPage * prePage)
                                    }</strong>/{totalDatas}
                                </span>
                            </div>
                            <button
                                className={`
                    ${openSortBy ? "shadow-xl " : ""} 
                    flex justify-between items-center w-full sm:w-auto 
                    px-3 py-2 md:px-4 md:py-2  md:rounded-[10px] 
                     transition-all duration-300 ease 
                    h-[40px] hover:shadow-xl rounded-2xl transition-all duration-300 
                `}
                                onClick={handleClickSortBy}
                            >
                                <div className="flex items-center gap-2 md:gap-4">
                                    <p className="text-black/70 text-md">Sort by:</p>
                                    <p className=" text-lg w-[80px] md:w-[120px] text-start truncate">
                                        {sortBy}
                                    </p>
                                </div>
                                <span className="transtion-all duration-300 ease ml-2">
                                    {openSortBy ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
                                </span>
                            </button>
                            <Menu
                                anchorEl={anchorElSortBy}
                                open={openSortBy}
                                onClose={handleCloseSortBy}
                                PaperProps={PaperProps}
                                MenuListProps={MenuListProps}
                            >
                                <MenuItem onClick={handleSortDefault} sx={sxMenuItem}>
                                    Relevance
                                </MenuItem>
                                <MenuItem onClick={handleSortHighest} sx={sxMenuItem}>
                                    Price (Highest)
                                </MenuItem>
                                <MenuItem onClick={handleSortLowest} sx={sxMenuItem}>
                                    Price (Lowest)
                                </MenuItem>
                                <MenuItem onClick={handleSortNewest} sx={sxMenuItem}>
                                    Release Date (Newest)
                                </MenuItem>
                                <MenuItem onClick={handleSortOldest} sx={sxMenuItem}>
                                    Release Date (Oldest)
                                </MenuItem>
                                <MenuItem onClick={handleSortAtoZ} sx={sxMenuItem}>
                                    Title (A-Z)
                                </MenuItem>
                                <MenuItem onClick={handleSortZtoA} sx={sxMenuItem}>
                                    Title (Z-A)
                                </MenuItem>
                            </Menu>
                        </div>
                        <div className="grid grid-cols-1  xl:grid-cols-4 gap-6">
                            <ListProductCard products={filteredReleases ?? []} included={included ?? []} />
                        </div>
                        {loadingReadMore && <p className="text-center py-4 text-gray-500">loading more...</p>}

                    </section>

                </div>
            }
        </div>
    );
}

export default ListProduct