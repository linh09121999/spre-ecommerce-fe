import { create } from 'zustand'
import { Pages } from '@/interface/interface'

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
    setYourMail: (mail) => ({ yourMail: mail }),
    ordersNumber: 0,
    setOrdersNumber: (order) => ({ ordersNumber: order }),
    heartNumber: 0,
    setHeartNumber: (heart) => ({ heartNumber: heart }),
    isSearch: false,
    setIsSearch: (isCheck) => set({ isSearch: isCheck }),
    isCurrency: 'USD',
    setIsCurrency: (isCheck) => set({ isCurrency: isCheck }),
    hoveredNav: null,
    setHoveredNav: (hover) => set({ hoveredNav: hover })
}))