"use client"
import ListProductCard from "@/components/cardListProduct";
import { ListAllProducts } from "@/service/storefront/products";
import { RetrieveATaxon } from "@/service/storefront/taxons";
import { useStateGeneral } from "@/useState/useStateGeneral";
import { useState_ResPosts, useState_ResProducts, useState_ResTaxons } from "@/useState/useStatestorefront";
import Image from "next/image";
import { useRouter } from "next/navigation";

import React, { useState, useEffect, useMemo } from "react";
import { toast, ToastContainer } from "react-toastify";

const Fashion: React.FC = () => {
    const router = useRouter();
    const { resProducts_List, setResProducts_List } = useState_ResProducts()
    const { resTaxons_Retrieve, setResTaxons_Retrieve } = useState_ResTaxons()

    const { setLoading, setSelectNav } = useStateGeneral()

    const getApiTaxonsFashion = async (taxon_permalink: string) => {
        try {
            setLoading(true);
            const res = await RetrieveATaxon(taxon_permalink)
            setResTaxons_Retrieve(res.data)
        } catch (error: any) {
            toast.error(`Stores: ` + error.response.error)
        }
        finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }
    }


    const getApiProducts = async (filter_taxons: string, page: number, per_page: number, include: string) => {
        try {
            setLoading(true);
            const res = await ListAllProducts({ filter_taxons, page, per_page, include })
            setResProducts_List(res.data)
        } catch (error: any) {
            toast.error(`Stores: ` + error.response.error)
        }
        finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }
    }

    useEffect(() => {
        setSelectNav(1)
        getApiTaxonsFashion("categories/fashion")
        getApiProducts("175", 1, 15, "default_variant,variants,option_types,product_properties,taxons,images,primary_variant")
    }, [])


    return (
        <>
            <div className="max-w-[1535px] mx-auto flex flex-col gap-10">
                <div className="flex justify-between gap-10">
                    <div>
                        <h3 className="text-3xl uppercase font-semibold  bg-clip-text tracking-wide">{resTaxons_Retrieve?.data.attributes.name}</h3>
                        <p>{resTaxons_Retrieve?.data.attributes.description}</p>
                    </div>
                    {resTaxons_Retrieve?.data.attributes.header_url &&
                        <img
                            className="w-1/3"
                            src={resTaxons_Retrieve?.data.attributes.header_url} alt={resTaxons_Retrieve?.data.attributes.name} />
                    }
                </div>
                <div>
                    <ListProductCard products={resProducts_List?.data ?? []} included={resProducts_List?.included ?? []} />

                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
}

export default Fashion