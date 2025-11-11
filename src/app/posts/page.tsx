import React, { useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useStateGeneral } from '@/useState/useStateGeneral';

const Posts: React.FC = () => {
    const router = useRouter();
    const { setLoading, setSelectNav
    } = useStateGeneral()

    useEffect(() => {
        setSelectNav(null)
    }, [])

    return (
        <>
        </>
    )
}

export default Posts;