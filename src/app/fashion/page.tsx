"use client"
import ListProductCard from "@/components/cardListProduct";
import { ListAllProducts } from "@/service/storefront/products";
import { RetrieveATaxon } from "@/service/storefront/taxons";
import { useStateGeneral } from "@/useState/useStateGeneral";
import { useState_ResPosts, useState_ResProducts, useState_ResTaxons } from "@/useState/useStatestorefront";
import { Menu, MenuItem } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import Image from "next/image";
import { useRouter } from "next/navigation";

import React, { useState, useEffect, useMemo } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

const Fashion: React.FC = () => {
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

    const router = useRouter();
    const { resDataIcludes_List, resDataProducts_List, setResDataIcludes_List, setResDataProduct_List } = useState_ResProducts()
    const { resTaxons_Retrieve, setResTaxons_Retrieve } = useState_ResTaxons()

    const { setLoading, setSelectNav, prePage, loadingReadMore, setLoadingReadMore,
        currentPage, setCurrentPage, totalDatas, totalPages, setTotalDatas, setTotalPages
    } = useStateGeneral()

    const getApiTaxonsFashion = async (taxon_permalink: string) => {
        try {
            setLoading(true);
            const res = await RetrieveATaxon(taxon_permalink)
            setResTaxons_Retrieve(res.data)
        } catch (error: any) {
            toast.error(`Stores: ` + error.response.error)
        }
        finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }
    }

    const [sortBy, setSortBy] = useState<string>("Relevance")
    const [sortOption, setSortOption] = useState("relevance");

    const getApiProducts = async (filter_taxons: string, page: number, per_page: number, include: string) => {
        try {
            { page === 1 ? setLoading(true) : setLoadingReadMore(true) }
            setLoadingReadMore(true)
            const res = await ListAllProducts({ filter_taxons, page, per_page, include })
            setTotalDatas(res.data.meta.total_count)
            setTotalPages(res.data.meta.total_pages)
            setCurrentPage(page); // cập nhật page hiện tại sau khi load xong

            if (page === 1) {
                setResDataProduct_List(res.data.data);
                setResDataIcludes_List(res.data.included)
            } else {
                setResDataProduct_List((prev) => [...prev, ...res.data.data]);
                setResDataIcludes_List((prev) => [...prev, ...res.data.included])
            }
        } catch (error: any) {
            toast.error(`Products: ` + error.response.error)
            setResDataProduct_List([])
            setResDataIcludes_List([])
            setCurrentPage(0)
        }
        finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
            setLoadingReadMore(false)
        }
    }

    useEffect(() => {
        setSelectNav(1)
        getApiTaxonsFashion("categories/fashion")
        getApiProducts("175", 1, prePage, "default_variant,variants,option_types,product_properties,taxons,images,primary_variant")
    }, [])

    // Infinite scroll
    useEffect(() => {
        setSortBy("Relevance")
        setSortOption("relevance");
        const handleScroll = () => {
            if (loadingReadMore) return;

            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
                if (currentPage < totalPages) {
                    getApiProducts("175", currentPage + 1, prePage, "default_variant,variants,option_types,product_properties,taxons,images,primary_variant")
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loadingReadMore, currentPage, totalDatas, getApiProducts]);


    const Category = (name: string) => {
        if (!name) return undefined
        return name.substring(0, name.lastIndexOf('/'))
    }

    const covertDate = (date: string) => {
        return new Date(date).toLocaleDateString()
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
        if (!Array.isArray(resDataProducts_List)) return [];
        const sorted = [...resDataProducts_List].sort((a, b) => {
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
    }, [resDataProducts_List, sortOption])

    return (
        <>
            <div className="max-w-[1535px] mx-auto flex flex-col gap-10">
                <div className="relative w-full rounded-3xl overflow-hidden shadow-xl group">
                    {/* Ảnh nền */}
                    {resTaxons_Retrieve?.data.attributes.header_url && (
                        <img
                            src={resTaxons_Retrieve?.data.attributes.header_url}
                            alt={resTaxons_Retrieve?.data.attributes.name}
                            className="w-full aspect-[16/5] object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    )}

                    {/* Lớp phủ gradient tối giúp chữ nổi */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

                    {/* Nội dung chữ overlay */}
                    <div className="absolute left-0 bottom-0  p-10 text-white z-10 w-3/4 grid gap-3">
                        <span className="text-xl uppercase text-gray-300">{Category(resTaxons_Retrieve?.data.attributes.permalink!)}</span>
                        <h3 className="text-4xl font-bold uppercase tracking-wide mb-3 bg-gradient-to-r from-green-400 to-emerald-200 bg-clip-text text-transparent drop-shadow-lg">
                            {resTaxons_Retrieve?.data.attributes.name}
                        </h3>
                        <p className="text-gray-100 text-lg leading-relaxed">
                            {resTaxons_Retrieve?.data.attributes.description}
                        </p>
                    </div>

                    {/* Hiệu ứng điểm nhấn (vòng sáng mờ khi hover) */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,white_0%,transparent_60%)] mix-blend-overlay"></div>
                </div>
                <div className="grid lg:grid-cols-[300px_1fr] gap-5">
                    <aside className="grid h-fit max-lg:hidden lg:sticky lg:top-[105px] gap-4 ">
                    </aside>
                    <section className="flex flex-col gap-4 md:gap-6">
                        <div className="items-center pb-2 border-b-[2px] border-b-gray-200 flex justify-between ">
                            <div className="flex items-end gap-3">
                                <h3 className="text-lg uppercase tracking-wide ">
                                    Result
                                </h3>
                                <span className="text-lg uppercase flex gap-1 items-center">
                                    <strong className="text-3xl text-green-600">{
                                        resDataProducts_List.length === 0 ?
                                            0 :
                                            (currentPage * prePage) > totalDatas ?
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
                                    <p className="text-black/70 text-sm">Sort by:</p>
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
                            <ListProductCard products={filteredReleases ?? []} included={resDataIcludes_List ?? []} />
                        </div>
                        {loadingReadMore && <p className="text-center py-4 text-gray-500">loading more...</p>}

                    </section>

                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
}

export default Fashion