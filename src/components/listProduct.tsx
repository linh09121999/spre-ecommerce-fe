"use client"
import { ProductCardProps } from "@/interface/interface";
import Image from "next/image";

import React, { useState, useEffect, useMemo } from "react";
import ListProductCard from "./cardListProduct";
import { Checkbox, FormControlLabel, IconButton, InputAdornment, Menu, MenuItem, Slider, TextField } from "@mui/material";
import { FaCheckCircle, FaChevronDown, FaChevronUp, FaMinusCircle, FaRegCircle } from "react-icons/fa";
import { useStateGeneral } from "@/useState/useStateGeneral";
import type { SxProps, Theme } from "@mui/material/styles";
import { ResTaxons_Retrieve } from "@/interface/responseData/interfaceStorefront";
import { PiCurrencyDollar } from "react-icons/pi";
import { useState_ResProducts, useState_ResTaxons } from "@/useState/useStatestorefront";
import { IoMdSearch } from "react-icons/io";
import { ListAllProducts } from "@/service/storefront/products";
import { toast, ToastContainer } from "react-toastify";

interface ListProduct extends ProductCardProps {
    taxonsRetrieve: ResTaxons_Retrieve;
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
            borderRadius: "var(--radius-md)",
            background: 'white',
            backdropFilter: 'blur(10px)',
            padding: '3px 8px !important',
            transition: 'all 0.3s',
            fontSize: 'var(--text-xl)',
            border: '1px solid var(--color-gray-200)',
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
            color: 'var(--color-gray-500)',
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
            color: 'var(--color-green-500)'
        }
    }

    const sxCheckBoxMinate: SxProps<Theme> = {
        color: 'black',
        '&.Mui-checked': { color: 'var(--color-green-500)' },
        '&.MuiCheckbox-indeterminate': { color: 'var(--color-green-500)' },
    }

    const sxCheckBox: SxProps<Theme> = {
        color: 'black',
        '&.Mui-checked': { color: 'var(--color-green-500)' },
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

    const sxSlider: SxProps<Theme> = {
        color: "var(--color-gray-500)",
        '& .MuiSlider-thumb': {
            bgcolor: '#fff',
            border: '2px solid currentColor',
            width: 20,
            height: 20,
            boxShadow: '0 0 0 8px rgba(0,0,0,0.02)',
        },
        '& .MuiSlider-track': {
            border: 'none',
        },
        '& .MuiSlider-rail': {
            opacity: 0.5,
            backgroundColor: 'var(--color-gray-300)',
        },
        '& .MuiSlider-mark': {
            backgroundColor: 'transparent',
        }
    }

    const { prePage, loadingReadMore,
        currentPage, totalDatas,
        sortOption, setSortOption, sortBy, setSortBy,
        filterAvailabity, filterTaxonsFashion, filterTaxonsWellness,
        filterTaxonsAllProduct, filterCollectonsAllProduct,
        filterSize, checkedSize, setCheckedSize,
        filterColor, checkedColor, setCheckedColor
    } = useStateGeneral()


    const { resTaxons_List } = useState_ResTaxons()

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

    const Category = (name: string) => {
        if (!name) return undefined
        return name.substring(0, name.lastIndexOf('->'))
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

    const [showAvailabity, setShowAvailabity] = useState<boolean>(true)
    const [showPrice, setShowPrice] = useState<boolean>(true)
    const [showTaxons, setShowTaxons] = useState<boolean>(true)
    const [showCollectons, setShowCollectons] = useState<boolean>(true)
    const [showColor, setShowColor] = useState<boolean>(true)
    const [showSize, setShowSize] = useState<boolean>(true)

    // availabyty
    const [checkedItemsAvailabity, setCheckedItemsAvailabity] = useState<number[]>([])
    const allCheckedAvailabity = checkedItemsAvailabity.length === filterAvailabity.length
    const isIndeterminateAvailabity = checkedItemsAvailabity.length > 0 && checkedItemsAvailabity.length < filterAvailabity.length

    // Khi click vào "All"
    const handleCheckAllAvailabity = () => {
        allCheckedAvailabity ?
            setCheckedItemsAvailabity([])
            :
            setCheckedItemsAvailabity(filterAvailabity.map((type) => type.id))
    }

    // Khi click vào từng item
    const handleCheckItemAvailabity = (id: number) => {
        checkedItemsAvailabity.includes(id) ?
            setCheckedItemsAvailabity(checkedItemsAvailabity.filter((itemId) => itemId !== id))
            :
            (
                setCheckedItemsAvailabity([...checkedItemsAvailabity, id])

            )
    }

    // all
    const [checkedItemsTaxonsAllProduct, setCheckItemTaxonsAllProduct] = useState<number[]>([])
    const allCheckedTaxonsAllProduct = checkedItemsTaxonsAllProduct.length === filterTaxonsAllProduct.length
    const isIndeterminateTaxonsAllProduct = checkedItemsTaxonsAllProduct.length > 0 && checkedItemsTaxonsAllProduct.length < filterTaxonsAllProduct.length

    // Khi click vào "All"
    const handleCheckAllTaxonsAllProduct = () => {
        allCheckedTaxonsAllProduct ?
            setCheckItemTaxonsAllProduct([])
            :
            setCheckItemTaxonsAllProduct(filterTaxonsAllProduct.map((type) => type.id))
    }

    // Khi click vào từng item
    const handleCheckItemTaxonsAllProduct = (id: number) => {
        checkedItemsTaxonsAllProduct.includes(id) ?
            setCheckItemTaxonsAllProduct(checkedItemsTaxonsAllProduct.filter((itemId) => itemId !== id))
            :
            (
                setCheckItemTaxonsAllProduct([...checkedItemsTaxonsAllProduct, id])

            )
    }

    // 
    const [checkedItemsCollectonsAllProduct, setCheckItemCollectonsAllProduct] = useState<number[]>([])
    const allCheckedCollectonsAllProduct = checkedItemsCollectonsAllProduct.length === filterCollectonsAllProduct.length
    const isIndeterminateCollectonsAllProduct = checkedItemsCollectonsAllProduct.length > 0 && checkedItemsCollectonsAllProduct.length < filterCollectonsAllProduct.length

    // Khi click vào "All"
    const handleCheckAllCollectonsAllProduct = () => {
        allCheckedCollectonsAllProduct ?
            setCheckItemCollectonsAllProduct([])
            :
            setCheckItemCollectonsAllProduct(filterCollectonsAllProduct.map((type) => type.id))
    }

    // Khi click vào từng item
    const handleCheckItemCollectonsAllProduct = (id: number) => {
        checkedItemsCollectonsAllProduct.includes(id) ?
            setCheckItemCollectonsAllProduct(checkedItemsCollectonsAllProduct.filter((itemId) => itemId !== id))
            :
            (
                setCheckItemCollectonsAllProduct([...checkedItemsCollectonsAllProduct, id])

            )
    }

    // fashion
    const [checkedItemsTaxonsFashion, setCheckItemTaxonsFashion] = useState<number[]>([])
    const allCheckedTaxonsFashion = checkedItemsTaxonsFashion.length === filterTaxonsFashion.length
    const isIndeterminateTaxonsFashion = checkedItemsTaxonsFashion.length > 0 && checkedItemsTaxonsFashion.length < filterTaxonsFashion.length

    // Khi click vào "All"
    const handleCheckAllTaxonsFashion = () => {
        allCheckedTaxonsFashion ?
            setCheckItemTaxonsFashion([])
            :
            setCheckItemTaxonsFashion(filterTaxonsFashion.map((type) => type.id))
    }

    // Khi click vào từng item
    const handleCheckItemTaxonsFashion = (id: number) => {
        checkedItemsTaxonsFashion.includes(id) ?
            setCheckItemTaxonsFashion(checkedItemsTaxonsFashion.filter((itemId) => itemId !== id))
            :
            (
                setCheckItemTaxonsFashion([...checkedItemsTaxonsFashion, id])

            )
    }

    // wellness
    const [checkedItemsTaxonsWellness, setCheckItemTaxonsWellness] = useState<number[]>([])
    const allCheckedTaxonsWellness = checkedItemsTaxonsWellness.length === filterTaxonsWellness.length
    const isIndeterminateTaxonsWellness = checkedItemsTaxonsWellness.length > 0 && checkedItemsTaxonsWellness.length < filterTaxonsWellness.length

    // Khi click vào "All"
    const handleCheckAllTaxonsWellness = () => {
        allCheckedTaxonsWellness ?
            setCheckItemTaxonsWellness([])
            :
            setCheckItemTaxonsWellness(filterTaxonsWellness.map((type) => type.id))
    }

    // Khi click vào từng item
    const handleCheckItemTaxonsWellness = (id: number) => {
        checkedItemsTaxonsWellness.includes(id) ?
            setCheckItemTaxonsWellness(checkedItemsTaxonsWellness.filter((itemId) => itemId !== id))
            :
            (
                setCheckItemTaxonsWellness([...checkedItemsTaxonsWellness, id])

            )
    }

    // men
    const [checkedItemsTaxonsMen, setCheckItemTaxonsMen] = useState<number[]>([])
    const allCheckedTaxonsMen =
        filterFashionMen && filterFashionMen.length > 0
            ? checkedItemsTaxonsMen.length === filterFashionMen.length
            : false;

    const isIndeterminateTaxonsMen =
        filterFashionMen && filterFashionMen.length > 0
            ? checkedItemsTaxonsMen.length > 0 &&
            checkedItemsTaxonsMen.length < filterFashionMen.length
            : false;
    // Khi click vào "All"
    const handleCheckAllTaxonsMen = () => {
        allCheckedTaxonsMen ?
            setCheckItemTaxonsMen([])
            :
            setCheckItemTaxonsMen(filterFashionMen!.map((type) => Number(type.id)))
    }

    // Khi click vào từng item
    const handleCheckItemTaxonsMen = (id: number) => {
        checkedItemsTaxonsMen.includes(id) ?
            setCheckItemTaxonsMen(checkedItemsTaxonsMen.filter((itemId) => itemId !== id))
            :
            (
                setCheckItemTaxonsMen([...checkedItemsTaxonsMen, id])

            )
    }

    // women
    const [checkedItemsTaxonsWomen, setCheckItemTaxonsWomen] = useState<number[]>([])
    const allCheckedTaxonsWomen =
        filterFashionWomen && filterFashionWomen.length > 0
            ? checkedItemsTaxonsWomen.length === filterFashionWomen.length
            : false;

    const isIndeterminateTaxonsWomen =
        filterFashionWomen && filterFashionWomen.length > 0
            ? checkedItemsTaxonsWomen.length > 0 &&
            checkedItemsTaxonsWomen.length < filterFashionWomen.length
            : false;
    // Khi click vào "All"
    const handleCheckAllTaxonsWomen = () => {
        allCheckedTaxonsWomen ?
            setCheckItemTaxonsWomen([])
            :
            setCheckItemTaxonsWomen(filterFashionWomen!.map((type) => Number(type.id)))
    }

    // Khi click vào từng item
    const handleCheckItemTaxonsWomen = (id: number) => {
        checkedItemsTaxonsWomen.includes(id) ?
            setCheckItemTaxonsWomen(checkedItemsTaxonsWomen.filter((itemId) => itemId !== id))
            :
            (
                setCheckItemTaxonsWomen([...checkedItemsTaxonsWomen, id])

            )
    }

    // accessories
    const [checkedItemsTaxonsAccessories, setCheckItemTaxonsAccessories] = useState<number[]>([])
    const allCheckedTaxonsAccessories =
        filterFashionAccessories && filterFashionAccessories.length > 0
            ? checkedItemsTaxonsWomen.length === filterFashionAccessories.length
            : false;

    const isIndeterminateTaxonsAccessories =
        filterFashionAccessories && filterFashionAccessories.length > 0
            ? checkedItemsTaxonsWomen.length > 0 &&
            checkedItemsTaxonsWomen.length < filterFashionAccessories.length
            : false;
    // Khi click vào "All"
    const handleCheckAllTaxonsAccessories = () => {
        allCheckedTaxonsAccessories ?
            setCheckItemTaxonsAccessories([])
            :
            setCheckItemTaxonsAccessories(filterFashionAccessories!.map((type) => Number(type.id)))
    }

    // Khi click vào từng item
    const handleCheckItemTaxonsAccessories = (id: number) => {
        checkedItemsTaxonsAccessories.includes(id) ?
            setCheckItemTaxonsAccessories(checkedItemsTaxonsAccessories.filter((itemId) => itemId !== id))
            :
            (
                setCheckItemTaxonsAccessories([...checkedItemsTaxonsAccessories, id])

            )
    }

    // Fitness
    const [checkedItemsTaxonsFitness, setCheckItemTaxonsFitness] = useState<number[]>([])
    const allCheckedTaxonsFitness =
        filterWellnessFitness && filterWellnessFitness.length > 0
            ? checkedItemsTaxonsWomen.length === filterWellnessFitness.length
            : false;

    const isIndeterminateTaxonsFitness =
        filterWellnessFitness && filterWellnessFitness.length > 0
            ? checkedItemsTaxonsWomen.length > 0 &&
            checkedItemsTaxonsWomen.length < filterWellnessFitness.length
            : false;
    // Khi click vào "All"
    const handleCheckAllTaxonsFitness = () => {
        allCheckedTaxonsFitness ?
            setCheckItemTaxonsFitness([])
            :
            setCheckItemTaxonsFitness(filterWellnessFitness!.map((type) => Number(type.id)))
    }

    // Khi click vào từng item
    const handleCheckItemTaxonsFitness = (id: number) => {
        checkedItemsTaxonsFitness.includes(id) ?
            setCheckItemTaxonsFitness(checkedItemsTaxonsFitness.filter((itemId) => itemId !== id))
            :
            (
                setCheckItemTaxonsFitness([...checkedItemsTaxonsFitness, id])

            )
    }

    // Relaxation
    const [checkedItemsTaxonsRelaxation, setCheckItemTaxonsRelaxation] = useState<number[]>([])
    const allCheckedTaxonsRelaxation =
        filterWellnessRelaxation && filterWellnessRelaxation.length > 0
            ? checkedItemsTaxonsWomen.length === filterWellnessRelaxation.length
            : false;

    const isIndeterminateTaxonsRelaxation =
        filterWellnessRelaxation && filterWellnessRelaxation.length > 0
            ? checkedItemsTaxonsWomen.length > 0 &&
            checkedItemsTaxonsWomen.length < filterWellnessRelaxation.length
            : false;
    // Khi click vào "All"
    const handleCheckAllTaxonsRelaxation = () => {
        allCheckedTaxonsRelaxation ?
            setCheckItemTaxonsRelaxation([])
            :
            setCheckItemTaxonsRelaxation(filterWellnessRelaxation!.map((type) => Number(type.id)))
    }

    // Khi click vào từng item
    const handleCheckItemTaxonsRelaxation = (id: number) => {
        checkedItemsTaxonsRelaxation.includes(id) ?
            setCheckItemTaxonsRelaxation(checkedItemsTaxonsRelaxation.filter((itemId) => itemId !== id))
            :
            (
                setCheckItemTaxonsRelaxation([...checkedItemsTaxonsRelaxation, id])

            )
    }

    // Mental Stimulation
    const [checkedItemsTaxonsMentalStimulation, setCheckItemTaxonsMentalStimulation] = useState<number[]>([])
    const allCheckedTaxonsMentalStimulation =
        filterWellnessMentalStimulation && filterWellnessMentalStimulation.length > 0
            ? checkedItemsTaxonsWomen.length === filterWellnessMentalStimulation.length
            : false;

    const isIndeterminateTaxonsMentalStimulation =
        filterWellnessMentalStimulation && filterWellnessMentalStimulation.length > 0
            ? checkedItemsTaxonsWomen.length > 0 &&
            checkedItemsTaxonsWomen.length < filterWellnessMentalStimulation.length
            : false;
    // Khi click vào "All"
    const handleCheckAllTaxonsMentalStimulation = () => {
        allCheckedTaxonsMentalStimulation ?
            setCheckItemTaxonsMentalStimulation([])
            :
            setCheckItemTaxonsMentalStimulation(filterWellnessMentalStimulation!.map((type) => Number(type.id)))
    }

    // Khi click vào từng item
    const handleCheckItemTaxonsMentalStimulation = (id: number) => {
        checkedItemsTaxonsMentalStimulation.includes(id) ?
            setCheckItemTaxonsMentalStimulation(checkedItemsTaxonsMentalStimulation.filter((itemId) => itemId !== id))
            :
            (
                setCheckItemTaxonsMentalStimulation([...checkedItemsTaxonsMentalStimulation, id])

            )
    }
    // Nutrition
    const [checkedItemsTaxonsNutrition, setCheckItemTaxonsNutrition] = useState<number[]>([])
    const allCheckedTaxonsNutrition =
        filterWellnessNutrition && filterWellnessNutrition.length > 0
            ? checkedItemsTaxonsWomen.length === filterWellnessNutrition.length
            : false;

    const isIndeterminateTaxonsNutrition =
        filterWellnessNutrition && filterWellnessNutrition.length > 0
            ? checkedItemsTaxonsWomen.length > 0 &&
            checkedItemsTaxonsWomen.length < filterWellnessNutrition.length
            : false;
    // Khi click vào "All"
    const handleCheckAllTaxonsNutrition = () => {
        allCheckedTaxonsNutrition ?
            setCheckItemTaxonsNutrition([])
            :
            setCheckItemTaxonsNutrition(filterWellnessNutrition!.map((type) => Number(type.id)))
    }

    // Khi click vào từng item
    const handleCheckItemTaxonsNutrition = (id: number) => {
        checkedItemsTaxonsNutrition.includes(id) ?
            setCheckItemTaxonsNutrition(checkedItemsTaxonsNutrition.filter((itemId) => itemId !== id))
            :
            (
                setCheckItemTaxonsNutrition([...checkedItemsTaxonsNutrition, id])

            )
    }

    // size
    const [inputValueSize, setInputValueSize] = useState<string>("");

    const filterSearchSize = useMemo(() => {
        if (!inputValueSize.trim()) return filterSize;
        return filterSize.filter((r) =>
            r.title.toLowerCase().includes(inputValueSize.toLowerCase())
        );
    }, [inputValueSize, filterSize]);

    const handleSelectSize = (id: number) => {
        setCheckedSize((prev) =>
            prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
        );
    };

    // color
    const [inputValueColor, setInputValueColor] = useState<string>("");

    const filterSearchColor = useMemo(() => {
        if (!inputValueColor.trim()) return filterColor;
        return filterColor.filter((r) =>
            r.title.toLowerCase().includes(inputValueColor.toLowerCase())
        );
    }, [inputValueColor, filterColor]);

    const handleSelectColor = (id: number) => {
        setCheckedColor((prev) =>
            prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
        );
    };

    const toLowerNoSpace = (str: string): string => {
        return str.toLowerCase().replace(/\s+/g, '');
    };

    const [priceMin, setPriceMin] = React.useState<number>(0);
    const [priceMax, setPriceMax] = React.useState<number>(200);

    const handleChangeInputPriceMin = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valuePriceMin = Number(e.target.value)
        if (valuePriceMin > priceMax) return
        setPriceMin(valuePriceMin || 0)
    }

    const handleChangeInputPriceMax = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valuePriceMax = Number(e.target.value)
        if (valuePriceMax < priceMin) return
        setPriceMax(valuePriceMax || 0)
    }

    const handleChangeSliderCommitted = (_event: Event | React.SyntheticEvent, newValue: number | number[]) => {
        const [min, max] = newValue as number[];
    }

    const handleChangeSlider = (_event: Event, newValue: number | number[]) => {
        const [min, max] = newValue as number[];
        setPriceMin(min);
        setPriceMax(max);
    };

    const handleClearAllFilters = () => {
        setCheckedItemsAvailabity(filterAvailabity.map((type) => type.id));
        setCheckItemTaxonsAllProduct(filterTaxonsAllProduct.map((type) => type.id));
        setCheckItemCollectonsAllProduct(filterCollectonsAllProduct.map((type) => type.id));
        setCheckItemTaxonsFashion(filterTaxonsFashion.map((type) => type.id))
        setCheckItemTaxonsWellness(filterTaxonsWellness.map((type) => type.id))
        setCheckItemTaxonsMen(filterFashionMen!.map((type) => Number(type.id)))
        setCheckItemTaxonsWomen(filterFashionWomen!.map((type) => Number(type.id)))
        setCheckItemTaxonsAccessories(filterFashionAccessories!.map((type) => Number(type.id)))
        setCheckItemTaxonsFitness(filterWellnessFitness!.map((type) => Number(type.id)))
        setCheckItemTaxonsRelaxation(filterWellnessRelaxation!.map((type) => Number(type.id)))
        setCheckItemTaxonsMentalStimulation(filterWellnessMentalStimulation!.map((type) => Number(type.id)))
        setCheckItemTaxonsNutrition(filterWellnessNutrition!.map((type) => Number(type.id)))

        setCheckedColor([]);
        setCheckedSize([]);
        setPriceMin(0);
        setPriceMax(200);
    }


    const filteredProducts = useMemo(() => {
        let result = [...filteredReleases];

        // 5️⃣ Availability
        if (checkedItemsAvailabity.length > 0) {
            result = result.filter((p) => {
                return checkedItemsAvailabity.some((id) => {
                    const selected = filterAvailabity.find((f) => f.id === id);
                    if (!selected) return false;

                    const key = selected.title.toLowerCase();
                    if (key.includes("in stock")) return p.attributes.in_stock;
                    if (key.includes("available")) return p.attributes.available;
                    if (key.includes("backorder")) return p.attributes.backorderable;
                    return false;
                });
            });
        }

        // 6️⃣ Price
        result = result.filter((p) => {
            const price = parseFloat(p.attributes.price || "0");
            return price >= priceMin && price <= priceMax;
        });


        // 2️⃣ Collections
        if (checkedItemsCollectonsAllProduct.length > 0) {
            result = result.filter((p) => {
                const productCollections = p.relationships.taxons?.data?.map((c: any) => Number(c.id)) || [];
                return checkedItemsCollectonsAllProduct.some((id) => productCollections.includes(id));
            });
        }

        // all product
        if (checkedItemsTaxonsAllProduct.length > 0 && !taxonsRetrieve) {
            result = result.filter((p) => {
                const productTaxons = p.relationships.taxons?.data?.map((t: any) => Number(t.id)) || [];
                return checkedItemsTaxonsAllProduct.some((id) => productTaxons.includes(id));
            });
        }

        // fashion
        if (checkedItemsTaxonsFashion.length > 0 && taxonsRetrieve?.data.attributes.name === 'Fashion') {
            result = result.filter((p) => {
                const productTaxons = p.relationships.taxons?.data?.map((t: any) => Number(t.id)) || [];
                return checkedItemsTaxonsFashion.some((id) => productTaxons.includes(id));
            });
        }

        // wellness
        if (checkedItemsTaxonsWellness.length > 0 && taxonsRetrieve?.data.attributes.name === 'Wellness') {
            result = result.filter((p) => {
                const productTaxons = p.relationships.taxons?.data?.map((t: any) => Number(t.id)) || [];
                return checkedItemsTaxonsWellness.some((id) => productTaxons.includes(id));
            });
        }

        // men
        if (checkedItemsTaxonsMen.length > 0 && (taxonsRetrieve?.data.attributes.name === 'Men' && filterFashionMen!.length > 0)) {
            result = result.filter((p) => {
                const productTaxons = p.relationships.taxons?.data?.map((t: any) => Number(t.id)) || [];
                return checkedItemsTaxonsMen.some((id) => productTaxons.includes(id));
            });
        }

        // women
        if (checkedItemsTaxonsWomen.length > 0 && (taxonsRetrieve?.data.attributes.name === 'Women' && filterFashionWomen!.length > 0)) {
            result = result.filter((p) => {
                const productTaxons = p.relationships.taxons?.data?.map((t: any) => Number(t.id)) || [];
                return checkedItemsTaxonsWomen.some((id) => productTaxons.includes(id));
            });
        }

        // accessories
        if (checkedItemsTaxonsAccessories.length > 0 && (taxonsRetrieve?.data.attributes.name === 'Accessories' && filterFashionAccessories!.length > 0)) {
            result = result.filter((p) => {
                const productTaxons = p.relationships.taxons?.data?.map((t: any) => Number(t.id)) || [];
                return checkedItemsTaxonsAccessories.some((id) => productTaxons.includes(id));
            });
        }

        // Fitness
        if (checkedItemsTaxonsFitness.length > 0 && (taxonsRetrieve?.data.attributes.name === 'Fitness' && filterWellnessFitness!.length > 0)) {
            result = result.filter((p) => {
                const productTaxons = p.relationships.taxons?.data?.map((t: any) => Number(t.id)) || [];
                return checkedItemsTaxonsFitness.some((id) => productTaxons.includes(id));
            });
        }

        // Relaxation
        if (checkedItemsTaxonsRelaxation.length > 0 && (taxonsRetrieve?.data.attributes.name === 'Relaxation' && filterWellnessRelaxation!.length > 0)) {
            result = result.filter((p) => {
                const productTaxons = p.relationships.taxons?.data?.map((t: any) => Number(t.id)) || [];
                return checkedItemsTaxonsRelaxation.some((id) => productTaxons.includes(id));
            });
        }

        // Mental Stimulation
        if (checkedItemsTaxonsMentalStimulation.length > 0 && (taxonsRetrieve?.data.attributes.name === 'Mental Stimulation' && filterWellnessMentalStimulation!.length > 0)) {
            result = result.filter((p) => {
                const productTaxons = p.relationships.taxons?.data?.map((t: any) => Number(t.id)) || [];
                return checkedItemsTaxonsMentalStimulation.some((id) => productTaxons.includes(id));
            });
        }

        // Nutrition
        if (checkedItemsTaxonsNutrition.length > 0 && (taxonsRetrieve?.data.attributes.name === 'Nutrition' && filterWellnessNutrition!.length > 0)) {
            result = result.filter((p) => {
                const productTaxons = p.relationships.taxons?.data?.map((t: any) => Number(t.id)) || [];
                return checkedItemsTaxonsNutrition.some((id) => productTaxons.includes(id));
            });
        }

        // 3️⃣ Color
        // 4️⃣ Size
        return result;
    }, [
        products,
        filteredReleases,
        checkedItemsTaxonsAllProduct,
        checkedItemsCollectonsAllProduct,
        checkedColor,
        checkedSize,
        checkedItemsAvailabity,
        priceMin,
        priceMax,
        included,
    ]);

    return (
        <>
            <div className={`max-w-[1535px] mx-auto flex flex-col px-5 py-10 ${taxonsRetrieve?.data.attributes.header_url ? 'gap-10' : 'gap-5'}`}>
                <div className={`${taxonsRetrieve?.data.attributes.header_url ? 'shadow-xl rounded-md' : ''} relative w-full  overflow-hidden  group`}>
                    {/* Ảnh nền */}
                    {!taxonsRetrieve ?
                        <>
                            <div className=" border-b-[2px] border-b-gray-200 grid gap-3 pb-5 w-full">
                                <h3 className="text-3xl font-bold uppercase tracking-wide bg-gradient-to-r from-green-500 to-emerald-200 bg-clip-text text-transparent drop-shadow-lg">
                                    Shop all
                                </h3>
                            </div>
                        </>
                        :
                        <>
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
                                        <span className="text-lg text-gray-300">{Category(taxonsRetrieve?.data.attributes.pretty_name)?.replace(/\s*->\s*/g, " / ")}</span>
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
                                        <span className="text-md text-gray-500">{Category(taxonsRetrieve?.data.attributes.pretty_name)?.replace(/\s*->\s*/g, " / ")}</span>
                                        <h3 className="text-3xl font-bold uppercase tracking-wide bg-gradient-to-r from-green-500 to-emerald-200 bg-clip-text text-transparent drop-shadow-lg">
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
                        </>
                    }
                </div>
                {products.length === 0 ?
                    <div className="flex justify-center items-center">
                        <p className="text-gray-500 text-lg text-center">There are no products</p>
                    </div>
                    :
                    <div className="grid lg:grid-cols-[300px_1fr] gap-10">
                        {/* lg:sticky lg:top-[105px] */}
                        <aside className="grid h-fit max-lg:hidden  gap-10 ">
                            <div className="items-center h-[50px] border-b-[2px] border-b-gray-200">
                                <h3 className="text-xl uppercase tracking-wide text-black/70">Filter</h3>
                            </div>
                            <div className="flex flex-col gap-5">
                                <button className="flex justify-between items-center w-full transition-all duration-300 ease"
                                    onClick={() => {
                                        setShowAvailabity(!showAvailabity)
                                    }}
                                >
                                    <h3 className="text-sm uppercase  bg-clip-text tracking-wide">Availabity</h3>
                                    <span className="">{showAvailabity ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}</span>
                                </button>
                                {showAvailabity && (
                                    <div className="text-lg  text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                        <FormControlLabel control={
                                            <Checkbox
                                                indeterminate={isIndeterminateAvailabity}
                                                checked={allCheckedAvailabity}
                                                onChange={handleCheckAllAvailabity}
                                                icon={<FaRegCircle />}
                                                indeterminateIcon={<FaMinusCircle />}
                                                checkedIcon={<FaCheckCircle />}
                                                sx={sxCheckBoxMinate}
                                            />
                                        }
                                            label="All"
                                            sx={sxControlLabel}
                                        />
                                        {filterAvailabity.map((vailabity) => (
                                            <FormControlLabel key={vailabity.id} control={
                                                <Checkbox
                                                    checked={checkedItemsAvailabity.includes(vailabity.id)}
                                                    onChange={() => handleCheckItemAvailabity(vailabity.id)}
                                                    icon={<FaRegCircle />}
                                                    checkedIcon={<FaCheckCircle />}
                                                    sx={sxCheckBox}
                                                />
                                            }
                                                label={vailabity.title}
                                                sx={sxControlLabel}
                                            />
                                        ))}

                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col gap-5">
                                <button className="flex justify-between items-center w-full transition-all duration-300 ease"
                                    onClick={() => {
                                        setShowPrice(!showPrice)
                                    }}
                                >
                                    <h3 className="text-sm uppercase  bg-clip-text tracking-wide">Price</h3>
                                    <span className="">{showPrice ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}</span>
                                </button>
                                {showPrice && (
                                    <div className="text-lg  text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                        <div className="px-2">
                                            <Slider
                                                value={[priceMin, priceMax]}
                                                onChange={handleChangeSlider}
                                                onChangeCommitted={handleChangeSliderCommitted}
                                                min={0}
                                                max={1000}
                                                valueLabelDisplay="auto"
                                                sx={sxSlider}
                                            />
                                        </div>
                                        <div className="flex justify-between gap-2 items-center">
                                            <TextField
                                                type="number"
                                                slotProps={{
                                                    input: {
                                                        startAdornment: (
                                                            <InputAdornment position="start"
                                                            >
                                                                <PiCurrencyDollar />
                                                            </InputAdornment>
                                                        ),
                                                    },
                                                }}
                                                value={priceMin}
                                                variant="outlined"
                                                sx={sxTextField}
                                                onChange={handleChangeInputPriceMin}
                                            />
                                            <p>to</p>
                                            <TextField
                                                type="number"
                                                slotProps={{
                                                    input: {
                                                        startAdornment: (
                                                            <InputAdornment position="start"
                                                            >
                                                                <PiCurrencyDollar />
                                                            </InputAdornment>
                                                        ),
                                                    },
                                                }}
                                                value={priceMax}
                                                variant="outlined"
                                                sx={sxTextField}
                                                onChange={handleChangeInputPriceMax}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {!taxonsRetrieve &&
                                <>
                                    <div className="flex flex-col gap-5">
                                        <button className="flex justify-between items-center w-full transition-all duration-300 ease"
                                            onClick={() => {
                                                setShowTaxons(!showTaxons)
                                            }}
                                        >
                                            <h3 className="text-sm uppercase  bg-clip-text tracking-wide">Categories</h3>
                                            <span className="">{showTaxons ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}</span>
                                        </button>
                                        {showTaxons &&
                                            <div className="text-lg  text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                                <FormControlLabel control={
                                                    <Checkbox
                                                        indeterminate={isIndeterminateTaxonsAllProduct}
                                                        checked={allCheckedTaxonsAllProduct}
                                                        onChange={handleCheckAllTaxonsAllProduct}
                                                        icon={<FaRegCircle />}
                                                        indeterminateIcon={<FaMinusCircle />}
                                                        checkedIcon={<FaCheckCircle />}
                                                        sx={sxCheckBoxMinate}
                                                    />
                                                }
                                                    label="All"
                                                    sx={sxControlLabel}
                                                />
                                                {filterTaxonsAllProduct.map((filter) => (
                                                    <FormControlLabel key={filter.id} control={
                                                        <Checkbox
                                                            checked={checkedItemsTaxonsAllProduct.includes(filter.id)}
                                                            onChange={() => handleCheckItemTaxonsAllProduct(filter.id)}
                                                            icon={<FaRegCircle />}
                                                            checkedIcon={<FaCheckCircle />}
                                                            sx={sxCheckBox}
                                                        />
                                                    }
                                                        label={filter.title}
                                                        sx={sxControlLabel}
                                                    />
                                                ))}
                                            </div>
                                        }
                                    </div>

                                </>
                            }

                            {taxonsRetrieve?.data.attributes.name === 'Fashion' &&
                                <>
                                    <div className="flex flex-col gap-5">
                                        <button className="flex justify-between items-center w-full transition-all duration-300 ease"
                                            onClick={() => {
                                                setShowTaxons(!showTaxons)
                                            }}
                                        >
                                            <h3 className="text-sm uppercase  bg-clip-text tracking-wide">Categories</h3>
                                            <span className="">{showTaxons ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}</span>
                                        </button>
                                        {showTaxons &&
                                            <div className="text-lg  text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                                <FormControlLabel control={
                                                    <Checkbox
                                                        indeterminate={isIndeterminateTaxonsFashion}
                                                        checked={allCheckedTaxonsFashion}
                                                        onChange={handleCheckAllTaxonsFashion}
                                                        icon={<FaRegCircle />}
                                                        indeterminateIcon={<FaMinusCircle />}
                                                        checkedIcon={<FaCheckCircle />}
                                                        sx={sxCheckBoxMinate}
                                                    />
                                                }
                                                    label="All"
                                                    sx={sxControlLabel}
                                                />
                                                {filterTaxonsFashion.map((filter) => (
                                                    <FormControlLabel key={filter.id} control={
                                                        <Checkbox
                                                            checked={checkedItemsTaxonsFashion.includes(filter.id)}
                                                            onChange={() => handleCheckItemTaxonsFashion(filter.id)}
                                                            icon={<FaRegCircle />}
                                                            checkedIcon={<FaCheckCircle />}
                                                            sx={sxCheckBox}
                                                        />
                                                    }
                                                        label={filter.title}
                                                        sx={sxControlLabel}
                                                    />
                                                ))}
                                            </div>
                                        }
                                    </div>

                                </>
                            }

                            {taxonsRetrieve?.data.attributes.name === 'Wellness' &&
                                <div className="flex flex-col gap-5">
                                    <button className="flex justify-between items-center w-full transition-all duration-300 ease"
                                        onClick={() => {
                                            setShowTaxons(!showTaxons)
                                        }}
                                    >
                                        <h3 className="text-sm uppercase  bg-clip-text tracking-wide">Categories</h3>
                                        <span className="">{showTaxons ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}</span>
                                    </button>
                                    {showTaxons && (
                                        <div className="text-lg  text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                            <FormControlLabel control={
                                                <Checkbox
                                                    indeterminate={isIndeterminateTaxonsWellness}
                                                    checked={allCheckedTaxonsWellness}
                                                    onChange={handleCheckAllTaxonsWellness}
                                                    icon={<FaRegCircle />}
                                                    indeterminateIcon={<FaMinusCircle />}
                                                    checkedIcon={<FaCheckCircle />}
                                                    sx={sxCheckBoxMinate}
                                                />
                                            }
                                                label="All"
                                                sx={sxControlLabel}
                                            />
                                            {filterTaxonsWellness.map((filter) => (
                                                <FormControlLabel key={filter.id} control={
                                                    <Checkbox
                                                        checked={checkedItemsTaxonsWellness.includes(filter.id)}
                                                        onChange={() => handleCheckItemTaxonsWellness(filter.id)}
                                                        icon={<FaRegCircle />}
                                                        checkedIcon={<FaCheckCircle />}
                                                        sx={sxCheckBox}
                                                    />
                                                }
                                                    label={filter.title}
                                                    sx={sxControlLabel}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            }

                            {(taxonsRetrieve?.data.attributes.name === 'Men' && filterFashionMen!.length > 0) &&
                                <div className="flex flex-col gap-5">
                                    <button className="flex justify-between items-center w-full transition-all duration-300 ease"
                                        onClick={() => {
                                            setShowTaxons(!showTaxons)
                                        }}
                                    >
                                        <h3 className="text-sm uppercase  bg-clip-text tracking-wide">Categories</h3>
                                        <span className="">{showTaxons ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}</span>
                                    </button>
                                    {showTaxons && (
                                        <div className="text-lg  text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                            <FormControlLabel control={
                                                <Checkbox
                                                    indeterminate={isIndeterminateTaxonsMen}
                                                    checked={allCheckedTaxonsMen}
                                                    onChange={handleCheckAllTaxonsMen}
                                                    icon={<FaRegCircle />}
                                                    indeterminateIcon={<FaMinusCircle />}
                                                    checkedIcon={<FaCheckCircle />}
                                                    sx={sxCheckBoxMinate}
                                                />
                                            }
                                                label="All"
                                                sx={sxControlLabel}
                                            />
                                            {filterFashionMen!.map((filter, id) => (
                                                <FormControlLabel key={id} control={
                                                    <Checkbox
                                                        checked={checkedItemsTaxonsMen.includes(Number(filter.id))}
                                                        onChange={() => handleCheckItemTaxonsMen(Number(filter.id))}
                                                        icon={<FaRegCircle />}
                                                        checkedIcon={<FaCheckCircle />}
                                                        sx={sxCheckBox}
                                                    />
                                                }
                                                    label={filter.attributes.name}
                                                    sx={sxControlLabel}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            }

                            {(taxonsRetrieve?.data.attributes.name === 'Women' && filterFashionWomen!.length > 0) &&
                                <div className="flex flex-col gap-5">
                                    <button className="flex justify-between items-center w-full transition-all duration-300 ease"
                                        onClick={() => {
                                            setShowTaxons(!showTaxons)
                                        }}
                                    >
                                        <h3 className="text-sm uppercase  bg-clip-text tracking-wide">Categories</h3>
                                        <span className="">{showTaxons ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}</span>
                                    </button>
                                    {showTaxons && (
                                        <div className="text-lg  text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                            <FormControlLabel control={
                                                <Checkbox
                                                    indeterminate={isIndeterminateTaxonsWomen}
                                                    checked={allCheckedTaxonsWomen}
                                                    onChange={handleCheckAllTaxonsWomen}
                                                    icon={<FaRegCircle />}
                                                    indeterminateIcon={<FaMinusCircle />}
                                                    checkedIcon={<FaCheckCircle />}
                                                    sx={sxCheckBoxMinate}
                                                />
                                            }
                                                label="All"
                                                sx={sxControlLabel}
                                            />
                                            {filterFashionWomen!.map((filter, id) => (
                                                <FormControlLabel key={id} control={
                                                    <Checkbox
                                                        checked={checkedItemsTaxonsWomen.includes(Number(filter.id))}
                                                        onChange={() => handleCheckItemTaxonsWomen(Number(filter.id))}
                                                        icon={<FaRegCircle />}
                                                        checkedIcon={<FaCheckCircle />}
                                                        sx={sxCheckBox}
                                                    />
                                                }
                                                    label={filter.attributes.name}
                                                    sx={sxControlLabel}
                                                />
                                            ))}
                                        </div>)}
                                </div>
                            }

                            {(taxonsRetrieve?.data.attributes.name === 'Accessories' && filterFashionAccessories!.length > 0) &&
                                <div className="flex flex-col gap-5">
                                    <button className="flex justify-between items-center w-full transition-all duration-300 ease"
                                        onClick={() => {
                                            setShowTaxons(!showTaxons)
                                        }}
                                    >
                                        <h3 className="text-sm uppercase  bg-clip-text tracking-wide">Categories</h3>
                                        <span className="">{showTaxons ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}</span>
                                    </button>
                                    {showTaxons && (
                                        <div className="text-lg  text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                            <FormControlLabel control={
                                                <Checkbox
                                                    indeterminate={isIndeterminateTaxonsAccessories}
                                                    checked={allCheckedTaxonsAccessories}
                                                    onChange={handleCheckAllTaxonsAccessories}
                                                    icon={<FaRegCircle />}
                                                    indeterminateIcon={<FaMinusCircle />}
                                                    checkedIcon={<FaCheckCircle />}
                                                    sx={sxCheckBoxMinate}
                                                />
                                            }
                                                label="All"
                                                sx={sxControlLabel}
                                            />
                                            {filterFashionAccessories!.map((filter, id) => (
                                                <FormControlLabel key={id} control={
                                                    <Checkbox
                                                        checked={checkedItemsTaxonsAccessories.includes(Number(filter.id))}
                                                        onChange={() => handleCheckItemTaxonsAccessories(Number(filter.id))}
                                                        icon={<FaRegCircle />}
                                                        checkedIcon={<FaCheckCircle />}
                                                        sx={sxCheckBox}
                                                    />
                                                }
                                                    label={filter.attributes.name}
                                                    sx={sxControlLabel}
                                                />
                                            ))}
                                        </div>)}
                                </div>
                            }

                            {(taxonsRetrieve?.data.attributes.name === 'Fitness' && filterWellnessFitness!.length > 0) &&
                                <div className="flex flex-col gap-5">
                                    <button className="flex justify-between items-center w-full transition-all duration-300 ease"
                                        onClick={() => {
                                            setShowTaxons(!showTaxons)
                                        }}
                                    >
                                        <h3 className="text-sm uppercase  bg-clip-text tracking-wide">Categories</h3>
                                        <span className="">{showTaxons ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}</span>
                                    </button>
                                    {showTaxons && (
                                        <div className="text-lg  text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                            <FormControlLabel control={
                                                <Checkbox
                                                    indeterminate={isIndeterminateTaxonsFitness}
                                                    checked={allCheckedTaxonsFitness}
                                                    onChange={handleCheckAllTaxonsFitness}
                                                    icon={<FaRegCircle />}
                                                    indeterminateIcon={<FaMinusCircle />}
                                                    checkedIcon={<FaCheckCircle />}
                                                    sx={sxCheckBoxMinate}
                                                />
                                            }
                                                label="All"
                                                sx={sxControlLabel}
                                            />
                                            {filterWellnessFitness!.map((filter, id) => (
                                                <FormControlLabel key={id} control={
                                                    <Checkbox
                                                        checked={checkedItemsTaxonsFitness.includes(Number(filter.id))}
                                                        onChange={() => handleCheckItemTaxonsFitness(Number(filter.id))}
                                                        icon={<FaRegCircle />}
                                                        checkedIcon={<FaCheckCircle />}
                                                        sx={sxCheckBox}
                                                    />
                                                }
                                                    label={filter.attributes.name}
                                                    sx={sxControlLabel}
                                                />
                                            ))}
                                        </div>)}
                                </div>
                            }

                            {(taxonsRetrieve?.data.attributes.name === 'Relaxation' && filterWellnessRelaxation!.length > 0) &&
                                <div className="flex flex-col gap-5">
                                    <button className="flex justify-between items-center w-full transition-all duration-300 ease"
                                        onClick={() => {
                                            setShowTaxons(!showTaxons)
                                        }}
                                    >
                                        <h3 className="text-sm uppercase  bg-clip-text tracking-wide">Categories</h3>
                                        <span className="">{showTaxons ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}</span>
                                    </button>
                                    {showTaxons && (
                                        <div className="text-lg  text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                            <FormControlLabel control={
                                                <Checkbox
                                                    indeterminate={isIndeterminateTaxonsRelaxation}
                                                    checked={allCheckedTaxonsRelaxation}
                                                    onChange={handleCheckAllTaxonsRelaxation}
                                                    icon={<FaRegCircle />}
                                                    indeterminateIcon={<FaMinusCircle />}
                                                    checkedIcon={<FaCheckCircle />}
                                                    sx={sxCheckBoxMinate}
                                                />
                                            }
                                                label="All"
                                                sx={sxControlLabel}
                                            />
                                            {filterWellnessRelaxation!.map((filter, id) => (
                                                <FormControlLabel key={id} control={
                                                    <Checkbox
                                                        checked={checkedItemsTaxonsRelaxation.includes(Number(filter.id))}
                                                        onChange={() => handleCheckItemTaxonsRelaxation(Number(filter.id))}
                                                        icon={<FaRegCircle />}
                                                        checkedIcon={<FaCheckCircle />}
                                                        sx={sxCheckBox}
                                                    />
                                                }
                                                    label={filter.attributes.name}
                                                    sx={sxControlLabel}
                                                />
                                            ))}
                                        </div>)}
                                </div>
                            }

                            {(taxonsRetrieve?.data.attributes.name === 'Mental Stimulation' && filterWellnessMentalStimulation!.length > 0) &&
                                <div className="flex flex-col gap-5">
                                    <button className="flex justify-between items-center w-full transition-all duration-300 ease"
                                        onClick={() => {
                                            setShowTaxons(!showTaxons)
                                        }}
                                    >
                                        <h3 className="text-sm uppercase  bg-clip-text tracking-wide">Categories</h3>
                                        <span className="">{showTaxons ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}</span>
                                    </button>
                                    {showTaxons && (
                                        <div className="text-lg  text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                            <FormControlLabel control={
                                                <Checkbox
                                                    indeterminate={isIndeterminateTaxonsMentalStimulation}
                                                    checked={allCheckedTaxonsMentalStimulation}
                                                    onChange={handleCheckAllTaxonsMentalStimulation}
                                                    icon={<FaRegCircle />}
                                                    indeterminateIcon={<FaMinusCircle />}
                                                    checkedIcon={<FaCheckCircle />}
                                                    sx={sxCheckBoxMinate}
                                                />
                                            }
                                                label="All"
                                                sx={sxControlLabel}
                                            />
                                            {filterWellnessMentalStimulation!.map((filter, id) => (
                                                <FormControlLabel key={id} control={
                                                    <Checkbox
                                                        checked={checkedItemsTaxonsMentalStimulation.includes(Number(filter.id))}
                                                        onChange={() => handleCheckItemTaxonsMentalStimulation(Number(filter.id))}
                                                        icon={<FaRegCircle />}
                                                        checkedIcon={<FaCheckCircle />}
                                                        sx={sxCheckBox}
                                                    />
                                                }
                                                    label={filter.attributes.name}
                                                    sx={sxControlLabel}
                                                />
                                            ))}
                                        </div>)}
                                </div>
                            }

                            {(taxonsRetrieve?.data.attributes.name === 'Nutrition' && filterWellnessNutrition!.length > 0) &&
                                <div className="flex flex-col gap-5">
                                    <button className="flex justify-between items-center w-full transition-all duration-300 ease"
                                        onClick={() => {
                                            setShowTaxons(!showTaxons)
                                        }}
                                    >
                                        <h3 className="text-sm uppercase  bg-clip-text tracking-wide">Categories</h3>
                                        <span className="">{showTaxons ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}</span>
                                    </button>
                                    {showTaxons && (
                                        <div className="text-lg  text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                            <FormControlLabel control={
                                                <Checkbox
                                                    indeterminate={isIndeterminateTaxonsNutrition}
                                                    checked={allCheckedTaxonsNutrition}
                                                    onChange={handleCheckAllTaxonsNutrition}
                                                    icon={<FaRegCircle />}
                                                    indeterminateIcon={<FaMinusCircle />}
                                                    checkedIcon={<FaCheckCircle />}
                                                    sx={sxCheckBoxMinate}
                                                />
                                            }
                                                label="All"
                                                sx={sxControlLabel}
                                            />
                                            {filterWellnessNutrition!.map((filter, id) => (
                                                <FormControlLabel key={id} control={
                                                    <Checkbox
                                                        checked={checkedItemsTaxonsNutrition.includes(Number(filter.id))}
                                                        onChange={() => handleCheckItemTaxonsNutrition(Number(filter.id))}
                                                        icon={<FaRegCircle />}
                                                        checkedIcon={<FaCheckCircle />}
                                                        sx={sxCheckBox}
                                                    />
                                                }
                                                    label={filter.attributes.name}
                                                    sx={sxControlLabel}
                                                />
                                            ))}
                                        </div>)}
                                </div>
                            }

                            <div className="flex flex-col gap-5">
                                <button className="flex justify-between items-center w-full transition-all duration-300 ease"
                                    onClick={() => {
                                        setShowCollectons(!showCollectons)
                                    }}
                                >
                                    <h3 className="text-sm uppercase  bg-clip-text tracking-wide">Collectons</h3>
                                    <span className="">{showCollectons ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}</span>
                                </button>
                                {showCollectons &&
                                    <div className="text-lg  text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                        <FormControlLabel control={
                                            <Checkbox
                                                indeterminate={isIndeterminateCollectonsAllProduct}
                                                checked={allCheckedCollectonsAllProduct}
                                                onChange={handleCheckAllCollectonsAllProduct}
                                                icon={<FaRegCircle />}
                                                indeterminateIcon={<FaMinusCircle />}
                                                checkedIcon={<FaCheckCircle />}
                                                sx={sxCheckBoxMinate}
                                            />
                                        }
                                            label="All"
                                            sx={sxControlLabel}
                                        />
                                        {filterCollectonsAllProduct.map((filter) => (
                                            <FormControlLabel key={filter.id} control={
                                                <Checkbox
                                                    checked={checkedItemsCollectonsAllProduct.includes(filter.id)}
                                                    onChange={() => handleCheckItemCollectonsAllProduct(filter.id)}
                                                    icon={<FaRegCircle />}
                                                    checkedIcon={<FaCheckCircle />}
                                                    sx={sxCheckBox}
                                                />
                                            }
                                                label={filter.title}
                                                sx={sxControlLabel}
                                            />
                                        ))}
                                    </div>
                                }
                            </div>

                            <div className="flex flex-col gap-5">
                                <button className="flex justify-between items-center w-full transition-all duration-300 ease"
                                    onClick={() => {
                                        setShowColor(!showColor)
                                    }}
                                >
                                    <h3 className="text-sm uppercase  bg-clip-text tracking-wide">Color</h3>
                                    <span className="">{showColor ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}</span>
                                </button>
                                {showColor && (
                                    <div className="text-lg  text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                        <div className="text-lg  text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                            <TextField
                                                type="search"
                                                placeholder="Search of Color..."
                                                sx={sxTextField}
                                                onChange={(e) => setInputValueColor(e.target.value)}
                                                value={inputValueColor}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                sx={{ color: 'var(--color-gray-300)' }}
                                                            >
                                                                <IoMdSearch className="mx-auto" />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                            {filterSearchColor.length > 0 ? (
                                                <div className="flex flex-wrap gap-4">
                                                    {filterSearchColor.map((res) => (
                                                        <button
                                                            key={res.id}
                                                            onClick={() => handleSelectColor(res.id)}
                                                            className={`flex items-center gap-2 p-2 rounded-3xl transition-all duration-300
                                                            ${checkedColor.includes(res.id)
                                                                    ? 'bg-white shadow-lg scale-[1.03]'
                                                                    : 'bg-gray-50 hover:bg-gray-100 shadow-sm'}
                                                             `}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <span
                                                                    style={{
                                                                        background: toLowerNoSpace(res.title),
                                                                        border: toLowerNoSpace(res.title) === 'white' ? '1px solid #ccc' : 'none',
                                                                        boxShadow:
                                                                            toLowerNoSpace(res.title) === 'white'
                                                                                ? 'inset 0 0 3px rgba(0,0,0,0.1)'
                                                                                : '0 0 4px rgba(0,0,0,0.08)',
                                                                    }}
                                                                    className={`w-6 h-6 rounded-full ${checkedColor.includes(res.id) ? 'opacity-100' : 'opacity-70'}`}
                                                                ></span>
                                                                <p
                                                                    className={`text-sm transition-colors ${checkedColor.includes(res.id)
                                                                        ? 'text-gray-800 font-medium'
                                                                        : 'text-gray-400 font-medium group-hover:text-gray-500'
                                                                        }`}
                                                                >
                                                                    {res.title}
                                                                </p>
                                                            </div>
                                                        </button>

                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-gray-400 text-sm italic">
                                                    No color found.
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col gap-5">
                                <button className="flex justify-between items-center w-full transition-all duration-300 ease"
                                    onClick={() => {
                                        setShowSize(!showSize)
                                    }}
                                >
                                    <h3 className="text-sm uppercase  bg-clip-text tracking-wide">Size</h3>
                                    <span className="">{showSize ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}</span>
                                </button>
                                {showSize && (
                                    <div className="text-lg  text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                        <TextField
                                            type="search"
                                            placeholder="Search of size..."
                                            sx={sxTextField}
                                            onChange={(e) => setInputValueSize(e.target.value)}
                                            value={inputValueSize}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            sx={{ color: 'var(--color-gray-300)' }}
                                                        >
                                                            <IoMdSearch className="mx-auto" />
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                        {filterSearchSize.length > 0 ? (
                                            <div className="flex flex-wrap gap-3">
                                                {filterSearchSize.map((res) => (
                                                    <button
                                                        key={res.id}
                                                        onClick={() => handleSelectSize(res.id)}
                                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg group ${checkedSize.includes(res.id) ? 'bg-white shadow-lg scale-[1.03]'
                                                            : 'bg-gray-50 hover:bg-gray-100 shadow-sm'}`}
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <p className={`text-sm text-start ${checkedSize.includes(res.id)
                                                                ? 'text-gray-800 font-medium'
                                                                : 'text-gray-400 font-medium group-hover:text-gray-500'
                                                                }`}>{res.title}</p>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-gray-400 text-sm italic">
                                                No size found.
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="grid grid-cols-2 gap-5 items-center">
                                <button className="h-10 bg-green-600 justify-center text-white items-center gap-1.5 shrink-0 rounded-md shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                    Apply
                                </button>
                                <button className=" h-10 border border-gray-100 justify-center items-center gap-1.5 shrink-0 rounded-md shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                    onClick={handleClearAllFilters}
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        </aside >
                        <section className="flex flex-col gap-4 md:gap-6">
                            <div className="items-center h-[50px] border-b-[2px] border-b-gray-200 flex justify-between ">
                                <h3 className="text-xl flex gap-2 uppercase tracking-wide text-black/70">
                                    PRODUCTS
                                    (<span className=" text-green-600 font-bold">
                                        {products.length === 0 ?
                                            0 :
                                            filteredProducts.length > totalDatas
                                                ?
                                                totalDatas
                                                : filteredProducts.length
                                        }
                                    </span> / {totalDatas})
                                </h3>
                                <button
                                    className={`
                    ${openSortBy ? "shadow-xl " : ""} 
                    flex justify-between items-center w-full sm:w-auto 
                    px-3 py-2 md:px-4 md:py-2  md:rounded-sm 
                     transition-all duration-300 ease 
                    h-[40px] hover:shadow-xl rounded-md transition-all duration-300 
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
                                <ListProductCard products={filteredProducts ?? []} included={included ?? []} />
                            </div>
                            {loadingReadMore && <p className="text-center py-4 text-gray-500">loading more...</p>}

                        </section>

                    </div >
                }
            </div >
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
}

export default ListProduct