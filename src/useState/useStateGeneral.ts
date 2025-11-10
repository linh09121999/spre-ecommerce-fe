import { create } from 'zustand'
import { FilterProduct, Pages } from '@/interface/interface'

// import { JSX } from 'react';

interface State {
    pages: Pages[];
    isDashboard: boolean;
    setIsDashboard: (isCheck: boolean) => void;
    selectNav: number;
    setSelectNav: (select: number) => void;
    loading: boolean;
    setLoading: (isCheck: boolean) => void;
    yourMail: string;
    setYourMail: (mail: string) => void;
    ordersNumber: number;
    setOrdersNumber: (order: number) => void;
    heartNumber: number;
    setHeartNumber: (order: number) => void;
    isSearch: boolean;
    setIsSearch: (isCheck: boolean) => void;
    isCurrency: string;
    setIsCurrency: (isCheck: string) => void;
    hoveredNav: number | null;
    setHoveredNav: (hover: number | null) => void;
    prePage: number;
    loadingReadMore: boolean;
    setLoadingReadMore: (isCheck: boolean) => void;
    totalDatas: number;
    setTotalDatas: (total: number) => void;
    totalPages: number;
    setTotalPages: (total: number) => void;
    currentPage: number;
    setCurrentPage: (current: number) => void;
    sortBy: string;
    setSortBy: (sort: string) => void;
    sortOption: string;
    setSortOption: (sort: string) => void;
    filterAvailabity: FilterProduct[];
    filterTaxonsFashion: FilterProduct[];
    filterTaxonsWellness: FilterProduct[];
    
}

export const useStateGeneral = create<State>((set) => ({
    pages: [
        {
            id: 0,
            title: 'Home',
            path: "/"
        },
        {
            id: 1,
            title: 'Fashion',
            path: "/fashion"
        },
        {
            id: 2,
            title: 'Wellness',
            path: "/wellness"
        },
        {
            id: 3,
            title: 'New Arrivals',
            path: "/new_arrivals"
        },
        {
            id: 4,
            title: 'Sale',
            path: "/sale"
        }
    ],
    isDashboard: false,
    setIsDashboard: (isCheck) => set({ isDashboard: isCheck }),
    selectNav: 0,
    setSelectNav: (select) => set({ selectNav: select }),
    loading: true,
    setLoading: (isCheck) => set({ loading: isCheck }),
    yourMail: '',
    setYourMail: (mail) => set({ yourMail: mail }),
    ordersNumber: 0,
    setOrdersNumber: (order) => set({ ordersNumber: order }),
    heartNumber: 0,
    setHeartNumber: (heart) => set({ heartNumber: heart }),
    isSearch: false,
    setIsSearch: (isCheck) => set({ isSearch: isCheck }),
    isCurrency: 'USD',
    setIsCurrency: (isCheck) => set({ isCurrency: isCheck }),
    hoveredNav: null,
    setHoveredNav: (hover) => set({ hoveredNav: hover }),
    prePage: 12,
    loadingReadMore: false,
    setLoadingReadMore: (isCheck) => set({ loadingReadMore: isCheck }),
    currentPage: 0,
    setCurrentPage: (current) => set({ currentPage: current }),
    totalDatas: 0,
    setTotalDatas: (total) => set({ totalDatas: total }),
    totalPages: 0,
    setTotalPages: (total) => set({ totalPages: total }),
    sortBy: 'Relevance',
    setSortBy: (sort) => set({ sortBy: sort }),
    sortOption: 'relevance',
    setSortOption: (sort) => set({ sortOption: sort }),
    filterAvailabity: [
        { id: 0, title: "In stock" },
        { id: 1, title: "Out of stock" }
    ],
    filterTaxonsFashion: [
        { id: 0, title: "Men" },
        { id: 1, title: "Women" },
        { id: 3, title: "Accessories" }
    ],
    filterTaxonsWellness: [
        { id: 0, title: "Fitness" },
        { id: 1, title: "Relaxation" },
        { id: 2, title: "Mental Stimulation" },
        { id: 3, title: "Nutrition" }
    ]
}))