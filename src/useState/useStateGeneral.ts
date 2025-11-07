import { create } from 'zustand'
import { Pages } from '@/interface/interface'

import { FaAngleDoubleUp } from "react-icons/fa";
// import { JSX } from 'react';

interface State {
    pages: Pages[];
    isDashboard: boolean;
    setIsDashboard: (isCheck: boolean) => void
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
    setIsDashboard: (isCheck) => set({ isDashboard: isCheck })
}))