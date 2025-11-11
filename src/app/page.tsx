"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useStateGeneral } from '@/useState/useStateGeneral';

import React, { useState, useEffect, useMemo } from "react";
import { useState_ResPosts, useState_ResProducts, useState_ResStores, useState_ResTaxons } from "@/useState/useStatestorefront";
import { toast, ToastContainer } from "react-toastify";
import { ListAllProducts } from "@/service/storefront/products";
import { IncludedImage } from "@/interface/interface";
import ListProductCard from "@/components/cardListProduct";
import { MdNavigateNext } from "react-icons/md";
import { FiHeart, FiLayers, FiShoppingBag, FiStar, FiTag } from "react-icons/fi";
import { ListAllPost } from "@/service/storefront/posts";

const Home: React.FC = () => {
  const router = useRouter();
  const { resTaxons_List } = useState_ResTaxons()
  const {
    resDataIcludes_NewList, resDataIcludes_SaleList,
    resDataProducts_NewList, resDataProducts_SaleList,
    setResDataIcludes_NewList, setResDataIcludes_SaleList, setResDataProduct_NewList, setResDataProduct_SaleList
  } = useState_ResProducts()
  const { resPosts_List, setResPosts_List } = useState_ResPosts()

  const { setLoading } = useStateGeneral()

  const getApiProducts = async (filter_taxons: string, page: number, per_page: number, include: string) => {
    try {
      setLoading(true);
      const res = await ListAllProducts({ filter_taxons, page, per_page, include })
      if (filter_taxons === "173") {
        setResDataIcludes_SaleList(res.data.included)
        setResDataProduct_SaleList(res.data.data)
      } else if (filter_taxons === "174") {
        setResDataIcludes_NewList(res.data.included)
        setResDataProduct_NewList(res.data.data)
      }
    } catch (error: any) {
      toast.error(`Products: ` + error.response.error)
      if (filter_taxons === "173") {
        setResDataIcludes_SaleList([])
        setResDataProduct_SaleList([])
      } else if (filter_taxons === "174") {
        setResDataIcludes_NewList([])
        setResDataProduct_NewList([])
      }
    }
    finally {
      setLoading(false); // 👈 tắt loading sau khi có dữ liệu
    }
  }

  const getApiPosts = async () => {
    try {
      setLoading(true);
      const res = await ListAllPost()
      setResPosts_List(res.data)
    } catch (error: any) {
      toast.error(`Posts: ` + error.response.error)
    }
    finally {
      setLoading(false); // 👈 tắt loading sau khi có dữ liệu
    }
  }

  useEffect(() => {
    getApiProducts("173", 1, 5, "default_variant,variants,option_types,product_properties,taxons,images,primary_variant")
    getApiProducts("174", 1, 5, "default_variant,variants,option_types,product_properties,taxons,images,primary_variant")
    getApiPosts()
  }, [])

  return (
    <>
      <div className="w-[full] relative h-[440px]">
        <div className="w-full absolute left-0 h-[440px] ">
          <img
            src="https://cdn.vendo.dev/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6MjQ3OSwicHVyIjoiYmxvYl9pZCJ9fQ==--2ea59e9a7f3e0127203fa19260ee4f0c827a725d/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwic2F2ZXIiOnsic3RyaXAiOnRydWUsInF1YWxpdHkiOjc1LCJsb3NzbGVzcyI6ZmFsc2UsImFscGhhX3EiOjg1LCJyZWR1Y3Rpb25fZWZmb3J0Ijo2LCJzbWFydF9zdWJzYW1wbGUiOnRydWV9LCJyZXNpemVfdG9fbGltaXQiOls2NDAsbnVsbF19LCJwdXIiOiJ2YXJpYXRpb24ifX0=--d96e3e5279c093271eeb921db9065be22fee62e4/Image%20banner.jpg"
            alt="banner"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 " loading="lazy"/>
        </div>

      </div>
      <div className="max-w-[1535px] mx-auto flex flex-col gap-15 px-5 py-10">
        <div className="flex justify-center gap-5">
          {[
            { title: "Categories", icon: <FiTag size={24} /> },
            { title: "Brands", icon: <FiShoppingBag size={24} /> },
            { title: "Collections", icon: <FiLayers size={24} /> },
            { title: "Wellness", icon: <FiHeart size={24} /> },
            { title: "Beauty", icon: <FiStar size={24} /> },
          ].map(({ title, icon }) => (
            <button
              key={title}
              className="h-36 w-36 rounded-full border-2 border-gray-300 border-dashed group relative transition-all duration-300 hover:border-none hover:shadow-xl hover:scale-105"
            >
              <div className="flex flex-col items-center justify-center h-32 w-32 m-auto rounded-full bg-gradient-to-br from-gray-300 to-white group-hover:from-green-300 group-hover:to-green-50 transition-all duration-300 shadow-sm">
                <div className="text-green-600 mb-2 text-3xl group-hover:text-green-700 transition-all duration-300">
                  {icon}
                </div>
                <span className="uppercase text-sm font-semibold text-gray-700 group-hover:text-green-700 transition-all duration-300 text-center">
                  {title}
                </span>
              </div>

              {/* Vòng tròn xoay nhẹ khi hover */}
              <span className="absolute inset-0 rounded-full border-2 border-dashed border-green-300 opacity-0 group-hover:opacity-100 animate-spin-slow"></span>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-5">
          {resTaxons_List?.data.map((res, id) => (
            <>
              {(res.attributes.name === 'Men' || res.attributes.name === 'Women') &&
                <div key={res.id} className="relative group overflow-hidden rounded-md shadow-lg">
                  <img
                    src={res.attributes.header_url}
                    alt={res.attributes.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity"></div>
                  <h2 className="absolute bottom-5 left-5 text-white text-2xl font-semibold uppercase tracking-wide">
                    {res.attributes.name}
                  </h2>
                </div>
              }
            </>
          ))}
        </div>
        <div className='flex-grow gap-5 flex flex-col '>
          <div className="flex justify-center css-next items-center w-full transition-all duration-300 ease">
            <h3 className="text-xl uppercase font-semibold  bg-clip-text tracking-wide">Sale</h3>

          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            <ListProductCard products={resDataProducts_SaleList ?? []} included={resDataIcludes_SaleList ?? []} />
          </div>
          <div className="css-next px-3 py-[2px]">
            <button className="mx-auto flex w-[105px] h-10  justify-center items-center gap-1.5 shrink-0 rounded-md shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              onClick={() => {
                // router.push('/')
              }}
            >View all <span className=""><MdNavigateNext size={24} /></span></button>
          </div>
        </div>
        <div className='flex-grow gap-5 flex flex-col '>
          <div className="flex justify-center css-next items-center w-full transition-all duration-300 ease">
            <h3 className="text-xl uppercase font-semibold  bg-clip-text tracking-wide">New Arrivals</h3>

          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            <ListProductCard products={resDataProducts_NewList ?? []} included={resDataIcludes_NewList ?? []} />
          </div>
          <div className="css-next px-3 py-[2px]">
            <button className="mx-auto flex w-[105px] h-10  justify-center items-center gap-1.5 shrink-0 rounded-md shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              onClick={() => {
                // router.push('/')
              }}
            >View all <span className=""><MdNavigateNext size={24} /></span></button>
          </div>
        </div>
        <div className='flex-grow gap-5 flex flex-col '>
          <div className="flex justify-center css-next items-center w-full transition-all duration-300 ease">
            <h3 className="text-xl uppercase font-semibold  bg-clip-text tracking-wide">Latest Posts</h3>

          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resPosts_List?.data.slice(0, 4).map((res, id) => (
              <>
                {res.attributes.content &&
                  <div className="relative group overflow-hidden rounded-md shadow-lg">
                    <img src={res.attributes.image_url!} alt={res.attributes.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-b-md">
                      <h3 className="text-xl text-white font-semibold mt-1">{res.attributes.title}</h3>
                      <p className="text-white/70 text-sm mt-1">
                        {res.attributes.author_name} | Published: {new Date(res.attributes.published_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                }
              </>
            ))}
            <div className="grid gap-5">
              <div className="grid gap-5 gird grid-cols-2 ">
                {resPosts_List?.data.slice(0, 4).map((res, id) => (
                  <>
                    {!res.attributes.content &&
                      <div className=" flex flex-col gap-2  ">
                        <div className="relative w-fill group overflow-hidden rounded-md">
                          <img src={res.attributes.image_url!} alt={res.attributes.title} className="w-full  h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                          <div className="absolute  inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity"></div>
                        </div>
                        <div className=" ">
                          <h3 className="text-xl  font-semibold mt-1 mb-2">{res.attributes.title}</h3>
                          <p className="text-black/70 text-sm mt-1">
                            {res.attributes.author_name} | Published: {new Date(res.attributes.published_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    }
                  </>
                ))}
              </div>
              <div className="css-next px-3 py-[2px]">
                <button className="mx-auto flex w-[105px] h-10  justify-center items-center gap-1.5 shrink-0 rounded-md shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  onClick={() => {
                    // router.push('/')
                  }}
                >View all <span className=""><MdNavigateNext size={24} /></span></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />

    </>
  );
}

export default Home