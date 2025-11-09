"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useStateGeneral } from '@/useState/useStateGeneral';

import React, { useState, useEffect, useMemo } from "react";
import { useState_ResProducts, useState_ResTaxons } from "@/useState/useStatestorefront";
import { toast, ToastContainer } from "react-toastify";
import { ListAllProducts } from "@/service/storefront/products";
import { IncludedImage } from "@/interface/interface";
import ProductCard from "@/components/cardProduct";

const Home: React.FC = () => {
  const { resTaxons_List } = useState_ResTaxons()
  const { resProducts_List, setResProducts_List } = useState_ResProducts()

  const { setLoading } = useStateGeneral()

  const getApiProducts = async (filter_taxons: string, page: number, per_page: number, include: string) => {
    try {
      setLoading(true);
      const res = await ListAllProducts({ filter_taxons, page, per_page, include })
      setResProducts_List(res.data)
      console.log(res.data)
    } catch (error: any) {
      toast.error(`Stores: ` + error.response.error)
    }
    finally {
      setLoading(false); // 👈 tắt loading sau khi có dữ liệu
    }
  }

  useEffect(() => {
    getApiProducts("173", 1, 7, "default_variant,variants,option_types,product_properties,taxons,images,primary_variant")
  }, [])

  return (
    <>
      <div className="max-w-[1535px] mx-auto flex flex-col gap-10">
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
          <h3 className='text-2xl font-bold uppercase'>Sale</h3>
          {/* <div className="grid grid-cols-5 gap-5"> */}
            <ProductCard products={resProducts_List?.data ?? []} included={resProducts_List?.included ?? []} />

          {/* </div> */}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />

    </>
  );
}

export default Home