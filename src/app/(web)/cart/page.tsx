"use client"
import { RetrieveACart } from "@/service/storefront/cart";
import { ListEstimatedShippingRates } from "@/service/storefront/cartOther";
import { useStateGeneral } from "@/useState/useStateGeneral";
import { useState_ResCart, useState_ResCartOther } from "@/useState/useStatestorefront";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

const Cart: React.FC = () => {
    const {
        setLoading, ordersNumber, heartNumber,
        setIsSearch, isSearch, isCurrency,
        setIsCurrency, hoveredNav, setHoveredNav } = useStateGeneral()
    const { resCartOther_List, setResCartOther_List } = useState_ResCartOther()


    const getApiEstimatedShippingRate = async () => {
        try {
            setLoading(true)
            const response = await ListEstimatedShippingRates()
            setResCartOther_List(response.data)
        } catch (error: any) {
            toast.error(`Error shipping rate: ` + error.response.statusText)
            throw error;
        } finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }
    }

    useEffect(() => {
        setHoveredNav(null)
        getApiEstimatedShippingRate()
    }, [])

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    )
}

export default Cart