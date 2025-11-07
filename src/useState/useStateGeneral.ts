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
}

export const useStateGeneral = create<State>((set) => ({
    pages: [
        {
            id: 0,
            title: 'Shop All',
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
    setYourMail: (mail) => ({ yourMail: mail })
}))