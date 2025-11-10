"use client";
import React from 'react';
import { useStateGeneral } from '@/useState/useStateGeneral';

import { useRouter } from "next/navigation";

type navProps = {
    classNameUl?: string;
    classNameA?: string;
    classNameAActive?: string;
    classNameTitle?: string;
    classNameAHover?: string
}

const Nav: React.FC<navProps> = ({
    classNameUl,
    classNameA,
    classNameAActive,
    classNameTitle,
    classNameAHover
}) => {
    const { pages, selectNav, setSelectNav, setHoveredNav, hoveredNav } = useStateGeneral();
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
                        onMouseEnter={() => setHoveredNav(index)}
                        className={`${classNameA} ${selectNav === index ? `${classNameAActive}` : "text-black "} ${hoveredNav === index ? `${classNameAHover}` : ''}`}
                    >
                        <div className={classNameTitle}>{page.title}</div>
                    </a>
                </li>
            ))}
        </ul>
    )
}
export default Nav