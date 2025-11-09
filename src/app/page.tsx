"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useStateGeneral } from '@/useState/useStateGeneral';

import React, { useState, useEffect, useMemo } from "react";
import { useState_ResProducts, useState_ResTaxons } from "@/useState/useStatestorefront";
import { toast, ToastContainer } from "react-toastify";
import { ListAllProducts } from "@/service/storefront/products";
import { IncludedImage } from "@/interface/interface";
import ListProductCard from "@/components/cardListProduct";
import { MdNavigateNext } from "react-icons/md";

const Home: React.FC = () => {
  const router = useRouter();
  const { resTaxons_List } = useState_ResTaxons()
  const { resProducts_NewList, setResProducts_NewList, setResProducts_SaleList, resProducts_SaleList } = useState_ResProducts()

  const { setLoading } = useStateGeneral()

  const getApiProducts = async (filter_taxons: string, page: number, per_page: number, include: string) => {
    try {
      setLoading(true);
      const res = await ListAllProducts({ filter_taxons, page, per_page, include })
      if (filter_taxons === "173") {
        console.log("173", res.data)
        setResProducts_SaleList(res.data)
      } else if (filter_taxons === "174") {
        console.log("174", res.data)
        setResProducts_NewList(res.data)
      }
    } catch (error: any) {
      toast.error(`Stores: ` + error.response.error)
    }
    finally {
      setLoading(false); // 👈 tắt loading sau khi có dữ liệu
    }
  }

  useEffect(() => {
    getApiProducts("173", 1, 5, "default_variant,variants,option_types,product_properties,taxons,images,primary_variant")
    getApiProducts("174", 1, 5, "default_variant,variants,option_types,product_properties,taxons,images,primary_variant")

  }, [])

  return (
    <>
      <div className="max-w-[1535px] mx-auto flex flex-col gap-10">
        <div className="flex justify-center gap-5">
          <button
            className="h-32 w-32 rounded-full border border-gray-400 border-dashed group"
          >
            <div className="uppercase text-sm bg-gray-200 h-28 w-28 rounded-full m-auto justify-center content-center">Categories</div>
          </button>
          <button
            className="h-32 w-32 rounded-full border border-gray-400 border-dashed group"
          >
            <div className="uppercase text-sm bg-gray-200 h-28 w-28 rounded-full m-auto justify-center content-center">Brands</div>
          </button><button
            className="h-32 w-32 rounded-full border border-gray-400 border-dashed group"
          >
            <div className="uppercase text-sm bg-gray-200 h-28 w-28 rounded-full m-auto justify-center content-center">Collections</div>
          </button><button
            className="h-32 w-32 rounded-full border border-gray-400 border-dashed group"
          >
            <div className="uppercase text-sm bg-gray-200 h-28 w-28 rounded-full m-auto justify-center content-center">Wellness</div>
          </button><button
            className="h-32 w-32 rounded-full border border-gray-400 border-dashed group"
          >
            <div className="uppercase text-sm bg-gray-200 h-28 w-28 rounded-full m-auto justify-center content-center">Beauty</div>
          </button>
        </div>
        <div className="grid grid-cols-2 gap-5">
          {resTaxons_List?.data.map((res, id) => (
            <>
              {(res.attributes.name === 'Men' || res.attributes.name === 'Women') &&
                <div className="relative group">
                  <img className="w-full rounded-xl shadow-lg" src={res.attributes.header_url} alt={res.attributes.name} />
                </div>
              }
            </>
          ))}
        </div>
        <div className='flex-grow gap-5 flex flex-col '>
          <div className="flex justify-between css-next items-center w-full transition-all duration-300 ease">
            <h3 className="text-xl uppercase font-semibold  bg-clip-text tracking-wide">Sale</h3>
            <button className="flex gap-1 items-center  tracking-wide"
              onClick={() => {
                router.push('/sale')
              }}
            >View all <span className=""><MdNavigateNext size={24} /></span></button>
          </div>
          <ListProductCard products={resProducts_SaleList?.data ?? []} included={resProducts_SaleList?.included ?? []} />
        </div>
        <div className='flex-grow gap-5 flex flex-col '>
          <div className="flex justify-between css-next items-center w-full transition-all duration-300 ease">
            <h3 className="text-xl uppercase font-semibold  bg-clip-text tracking-wide">New Arrivals</h3>
            <button className="flex gap-1 items-center  tracking-wide"
              onClick={() => {
                router.push('/new-arrivals')
              }}
            >View all <span className=""><MdNavigateNext size={24} /></span></button>
          </div>
          <ListProductCard products={resProducts_NewList?.data ?? []} included={resProducts_NewList?.included ?? []} />
        </div>
        {/* <p>{resTaxons_List?.data.map((data) => (
          <p>{data.id} : {data.attributes.permalink}</p>
        ))}</p> */}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />

    </>
  );
}

export default Home