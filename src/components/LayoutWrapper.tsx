"use client";

import { ReactNode } from "react";
import { useStateGeneral } from "@/useState/useStateGeneral";
import FooterWeb from "./Web/Footer";
import FooterAdmin from "./Admin/Footer";
import HeaderWeb from "./Web/Header";

interface ContentWrapperProps {
    children: ReactNode;
}

const ContentWrapper = ({ children }: ContentWrapperProps) => {
    const { isDashboard } = useStateGeneral();

    return (
        <>
            {isDashboard ?
                <>
                    <main>{children}</main>
                    <FooterAdmin />
                </>
                :
                <>
                    <HeaderWeb />
                    <main
                        className="min-h-[50vh] px-5 py-10"
                    >{children}</main>
                    <FooterWeb />
                </>
            }
        </>
    );
};

export default ContentWrapper;
