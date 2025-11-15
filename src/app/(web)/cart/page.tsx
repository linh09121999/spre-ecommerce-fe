"use client"
import { Cart, LineItemUpdate } from "@/interface/sendData/interfaceStorefront";
import { CreateACart, DeleteACart, RetrieveACart } from "@/service/storefront/cart";
import { RemoveAnItemToCart, SetLineItemQuantity } from "@/service/storefront/cartLineItems";
import { EmptyTheCart, ListEstimatedShippingRates } from "@/service/storefront/cartOther";
import { useStateGeneral } from "@/useState/useStateGeneral";
import { useState_ResCart, useState_ResCartOther } from "@/useState/useStatestorefront";
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaRegHeart, FaShieldAlt, FaShippingFast, FaTrashAlt, FaUndo } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

const ViewCart: React.FC = () => {
    const sxRadio: SxProps<Theme> = {
        width: "100%",
        alignItems: "flex-start",
        margin: 0,
        padding: "12px 14px",
        borderRadius: "12px",
        transition: "0.2s",

        "& .MuiFormControlLabel-label": {
            width: "100%",
        },

        "&:hover": {
            backgroundColor: "#f9fafb",
        }
    }

    const router = useRouter();
    const {
        setLoading, ordersNumber, heartNumber,
        setIsSearch, isSearch, isCurrency,
        setIsCurrency, hoveredNav, setHoveredNav } = useStateGeneral()
    const { resCartOther_List, setResCartOther_List } = useState_ResCartOther()
    const { resCart, setResCart } = useState_ResCart()

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

    const getApiRetrieveCart = async (include: string) => {
        try {
            setLoading(true)
            const response = await RetrieveACart({ include });
            setResCart(response.data)
            const cartNumber = response.data.data?.relationships.line_items.data
            localStorage.setItem("cart_number", cartNumber.length);
        } catch (error: any) {
            toast.error(`Error creating item cart: ` + error.response.statusText)
            throw error;
        } finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }
    }

    const deleteApiLineItem = async (id: string) => {
        try {
            setLoading(true)
            const response = await RemoveAnItemToCart(id);
        } catch (error: any) {
            toast.error(`Error detele item cart ${id}: ` + error.response.statusText)
            throw error;
        } finally {
            setLoading(false);
            getApiRetrieveCart("line_items")
        }
    }

    const setApiLineItem = async (line_item_id: string, quantity: number) => {
        const data: LineItemUpdate = {
            line_item_id: line_item_id,
            quantity: quantity
        }
        try {
            setLoading(true)
            const response = await SetLineItemQuantity(data);
        } catch (error: any) {
            toast.error(`Error set item cart ${line_item_id}: ` + error.response.statusText)
            throw error;
        } finally {
            setLoading(false);
            getApiRetrieveCart("line_items")
        }
    }

    // const postApiCart = async () => {
    //     const existingToken = localStorage.getItem("order_token");
    //     if (existingToken) {
    //         setLoading(false);
    //         return;
    //     }

    //     const data: Cart = {
    //         public_metadata: {
    //             total_weight: 3250,
    //         },
    //         private_metadata: {
    //             had_same_cart_items: true,
    //         },
    //     };

    //     try {
    //         setLoading(true)
    //         const response = await CreateACart(data);
    //         console.log("Cart created:", response.data);

    //         const orderToken = response.data.data?.attributes?.token
    //         if (orderToken) {
    //             localStorage.setItem("order_token", orderToken);
    //         }

    //         return response.data; 
    //     } catch (error: any) {
    //         toast.error(`Error creating cart: ` + error.response || error.message)
    //         throw error;
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // const deleteCart = async () => {
    //     try {
    //         setLoading(true)
    //         const response = await DeleteACart();
    //         localStorage.removeItem("order_token")
    //     } catch (error: any) {
    //         toast.error(`Error detele cart: ` + error.response.statusText)
    //         throw error;
    //     } finally {
    //         setLoading(false);
    //         getApiRetrieveCart("line_items")
    //     }
    // }

    useEffect(() => {
        setHoveredNav(null)
        getApiEstimatedShippingRate()
        getApiRetrieveCart("line_items")
    }, [])


    const priceInfo = (price: string, comparePrice: string | null) => {
        return comparePrice && comparePrice > price
            ? Math.round(((parseFloat(comparePrice) - parseFloat(price)) / parseFloat(comparePrice)) * 100)
            : 0;
    }

    const handleQuantityChange = (id: string, newQuantity: number) => {
        if (newQuantity === 0) {
            handleRemoveItem(id)
        } else {
            setApiLineItem(id, newQuantity)
        }
    };

    const handleSaveForLater = (id: string) => {

    }

    const handleRemoveItem = (id: string) => {
        deleteApiLineItem(id)

    }

    const handleRemoveAllItem = async () => {
        const items = resCart?.included ?? []
        if (items.length === 0) return;

        for (const item of items) {
            try {
                setLoading(true)
                const response = await RemoveAnItemToCart(item.id);
            } catch (error: any) {
                toast.error(`Error detele item cart ${item.id}: ` + error.response.statusText)
                throw error;
            } finally {
                setLoading(false);
                getApiRetrieveCart("line_items")
            }
        }
    }

    const [valueShippingFee, setValueShippingFee] = useState("0");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueShippingFee((event.target as HTMLInputElement).value);
    };

    return (
        <>
            <div className="flex items-center gap-3 px-5 max-w-[1535px] mx-auto py-4 text-lg">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 group transition-all duration-300"
                >
                    <span className="inline-flex items-center justify-center w-9 h-9 bg-white rounded-full shadow hover:shadow-lg transition-all">
                        <FaArrowLeft className="text-green-600 group-hover:-translate-x-1 transition-transform duration-300" />
                    </span>
                    <span className="font-medium text-gray-700 group-hover:text-green-600 transition-colors duration-300">
                        Cart
                    </span>
                </button>
            </div>
            <div className="max-w-[1535px] mx-auto grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 px-5 py-5">
                <div className="flex flex-col  self-start rounded-md bg-white p-5 flex-1 shadow-lg">
                    <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                        <h3 className="text-xl uppercase tracking-wide text-gray-800 font-semibold">
                            Cart Items
                        </h3>

                        {/* Delete All */}
                        {resCart && resCart?.data.relationships.line_items.data.length > 0 && (
                            <button
                                onClick={handleRemoveAllItem}
                                className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm font-medium transition"
                            >
                                <FaTrashAlt className="text-red-500" />
                                Clear All
                            </button>
                        )}
                    </div>
                    {(resCart && resCart?.data.relationships.line_items.data.length === 0) ?
                        <img src="../../no-items-in-cart.png" alt="no items in cart" />
                        :
                        <>
                            {resCart?.included.map((item) => (
                                <div className="flex gap-10 flex-col md:flex-row py-5 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors rounded-lg">
                                    <div className="h-full bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center text-primary-700">
                                        <img src="" alt={item.attributes.name} className="aspect-[1/1] h-full w-full" />
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <h3 className="text-lg font-semibold text-gray-900 ">{item.attributes.name}</h3>
                                        <p className="text-gray-600 text-sm">
                                            {item.attributes.options_text}
                                        </p>
                                        <div className="flex items-center gap-4" >
                                            <div className="flex items-end gap-2">
                                                <span className="text-2xl font-bold text-green-700">
                                                    ${item.attributes.price}
                                                </span>
                                                {Number(item.attributes.compare_at_amount) > 0 && (
                                                    <span className="text-md text-gray-400 line-through">
                                                        ${item.attributes.compare_at_amount}
                                                    </span>
                                                )}
                                            </div>
                                            {priceInfo(item.attributes.price, item.attributes.compare_at_amount) > 0 &&
                                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-rose-500 to-red-600 text-white shadow">
                                                    -{priceInfo(item.attributes.price, item.attributes.compare_at_amount)}%
                                                </span>
                                            }
                                        </div>
                                        <div className="flex items-center gap-4 flex-wrap" >
                                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                                                <button
                                                    className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors"
                                                    onClick={() => handleQuantityChange(item.id, item.attributes.quantity - 1)}
                                                >
                                                    −
                                                </button>
                                                <span className={`px-5 py-2 bg-white text-center font-semibold `}>{item.attributes.quantity}</span>
                                                <button
                                                    className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors"
                                                    onClick={() => handleQuantityChange(item.id, item.attributes.quantity + 1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex space-x-4">
                                            <button
                                                className="group text-primary-500 text-sm font-medium flex items-center space-x-2 hover:text-primary-600 transition-colors"
                                                onClick={() => handleSaveForLater(item.id)}
                                            >
                                                <FaRegHeart className="text-gray-600 group-hover:text-green-600" />
                                                <span>Save to view later</span>
                                            </button>
                                            <button
                                                className="text-red-500 text-sm font-medium flex items-center space-x-2 hover:text-red-600 transition-colors"
                                                onClick={() => handleRemoveItem(item.id)}
                                            >
                                                <FaTrashAlt />
                                                <span>Delete</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    }
                </div>
                <aside className="flex flex-col gap-5 self-start  ">
                    <div className="flex flex-col gap-5 rounded-md bg-white p-5 flex-1 shadow-lg">
                        <div className="items-center h-[50px] border-b-[2px] border-b-gray-200">
                            <h3 className="text-xl uppercase tracking-wide text-black/70">Shipping Options</h3>
                        </div>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={valueShippingFee}
                                onChange={handleChange}
                            >
                                {resCartOther_List?.data.map((res) => (
                                    <div className={`flex flex-col rounded-md  ${valueShippingFee === res.attributes.final_price ? 'bg-green-50 border-green-500 border' : ''}`}>
                                        <FormControlLabel
                                            key={res.attributes.final_price}
                                            value={res.attributes.final_price}
                                            control={<Radio />}
                                            sx={sxRadio}
                                            label={
                                                <div className={`flex justify-between w-full gap-5`}>
                                                    <div className="flex flex-col gap-1">
                                                        <div className="font-medium text-gray-900">{res.attributes.name}</div>
                                                        <div className="text-gray-600 text-sm">
                                                            {{
                                                                Standard: "Delivery in 5-7 business days",
                                                                Premium: "Delivery in 2-3 business days",
                                                                "Next Day": "Delivery next business day",
                                                            }[res.attributes.name]}
                                                        </div>
                                                    </div>
                                                    <div className="font-bold text-green-500">{res.attributes.display_cost}</div>
                                                </div>
                                            } />
                                    </div>
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className="flex flex-col gap-5 rounded-md bg-white p-5 flex-1 shadow-lg">
                        <div className="items-center h-[50px] border-b-[2px] border-b-gray-200">
                            <h3 className="text-xl uppercase tracking-wide text-black/70">Discount code</h3>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 rounded-md bg-white p-5 flex-1 shadow-lg">
                        <div className="items-center h-[50px] border-b-[2px] border-b-gray-200">
                            <h3 className="text-xl uppercase tracking-wide text-black/70">Order summary</h3>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Temporary estimate ({resCart?.data.attributes.item_count} products)</span>
                                <span className="font-medium">{resCart?.data.attributes.display_item_total}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Shipping fee</span>
                                <span className="font-medium">${valueShippingFee ?? 0}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Tax</span>
                                <span className="font-medium">{resCart?.data.attributes.display_tax_total ?? 0}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Discount</span>
                                <span className="font-medium">{resCart?.data.attributes.display_promo_total ?? 0}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold pt-4 border-t border-gray-200 ">
                                <span>Total</span>
                                <span id="total-cost">${Number(resCart?.data.attributes.total_minus_store_credits ?? 0) + Number(valueShippingFee ?? 0)}</span>
                            </div>
                            <button
                                className={`px-16 h-[50px] rounded-md bg-green-600 text-white font-semibold transition-transform hover:bg-green-700 hover:scale-105 `}
                            >Complete payment</button>
                        </div>
                        <div className="flex flex-wrap md:grid md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                            <div className="flex flex-col justify-center items-center gap-2 ">
                                <FaShippingFast className='text-green-500' />
                                <span className='text-sm'>Free shipping</span>
                            </div>
                            <div className="flex flex-col justify-center items-center gap-2">
                                <FaUndo className='text-green-500' />
                                <span className='text-sm'>Easy returns</span>
                            </div>
                            <div className="flex flex-col justify-center items-center gap-2">
                                <FaShieldAlt className='text-green-500' />
                                <span className='text-sm'>Secure payment</span>
                            </div>
                        </div>
                        <button
                            onClick={() => router.back()}
                            className="flex items-center justify-center gap-2 group transition-all duration-300 text-green-500 hover:text-green-700"
                        >
                            <span className="inline-flex items-center justify-center w-9 h-9 bg-white rounded-full shadow group-hover:shadow-lg transition-all">
                                <FaArrowLeft className="text-green-600 group-hover:-translate-x-1 transition-transform duration-300" />
                            </span>
                            Continue shopping</button>
                    </div>
                </aside>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    )
}

export default ViewCart