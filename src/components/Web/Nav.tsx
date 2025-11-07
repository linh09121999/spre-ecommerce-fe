"use client";
import React from 'react';
import { useStateGeneral } from '@/useState/useStateGeneral';

import { useRouter } from "next/navigation";

type navProps = {
    classNameUl?: string;
    classNameA?: string;
    classNameAActive?: string;
    classNameTitle?: string
}

const Nav: React.FC<navProps> = ({
    classNameUl,
    classNameA,
    classNameAActive,
    classNameTitle
}) => {
    const { pages, selectNav, setSelectNav } = useStateGeneral();
    const router = useRouter();

    return (
        <ul className={classNameUl}>
            {pages.map((page, index) => (
                <li key={index} >
                    <a
                        onClick={() => {
                            setSelectNav(index)
                            router.push(page.path)
                        }}
                        className={`${classNameA} ${selectNav === index ? `${classNameAActive}` : "text-black "}`}
                    >
                        <div className={classNameTitle}>{page.title}</div>
                    </a>
                </li>
            ))}
        </ul>
    )
}
export default Nav