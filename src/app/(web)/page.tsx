"use client"
import { useRouter } from "next/navigation";
import { useStateGeneral } from '@/useState/useStateGeneral';

import React, { useEffect } from "react";
import { useState_ResPosts, useState_ResProducts, useState_ResStores, useState_ResTaxons } from "@/useState/useStatestorefront";
import { toast, ToastContainer } from "react-toastify";
import { ListAllProducts } from "@/service/storefront/products";
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

  const { setLoading, setSelectNav
  } = useStateGeneral()

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
    setSelectNav(null)
    getApiProducts("173", 1, 5, "default_variant,variants,option_types,product_properties,taxons,images,primary_variant")
    getApiProducts("174", 1, 5, "default_variant,variants,option_types,product_properties,taxons,images,primary_variant")
    getApiPosts()
  }, [])

  return (
    <>
      <section className="relative w-full h-[480px] overflow-hidden">
        <img
          src="https://cdn.vendo.dev/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6MjQ3OSwicHVyIjoiYmxvYl9pZCJ9fQ==--2ea59e9a7f3e0127203fa19260ee4f0c827a725d/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwic2F2ZXIiOnsic3RyaXAiOnRydWUsInF1YWxpdHkiOjc1LCJsb3NzbGVzcyI6ZmFsc2UsImFscGhhX3EiOjg1LCJyZWR1Y3Rpb25fZWZmb3J0Ijo2LCJzbWFydF9zdWJzYW1wbGUiOnRydWV9LCJyZXNpemVfdG9fbGltaXQiOls2NDAsbnVsbF19LCJwdXIiOiJ2YXJpYXRpb24ifX0=--d96e3e5279c093271eeb921db9065be22fee62e4/Image%20banner.jpg"
          alt="banner"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent"></div>
        <div className="relative z-10 flex flex-col justify-center items-start max-w-[1100px] mx-auto px-10 h-full text-white space-y-4" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-bold tracking-wide uppercase drop-shadow-lg">
            Welcome to this Spree Commerce demo website
          </h1>
          <p className="text-lg text-white/80 max-w-lg">
            Spree is an open-source eCommerce platform that you can customize, self-host and fully control. Its Enterprise Edition features multi-vendor marketplace, multi-tenant and B2B eCommerce capabilities. Learn more at spreecommerce.org
          </p>
          <button
            onClick={() => {
              router.push('/all-product')
            }}
            className="mt-4 bg-white/90 hover:bg-white text-green-700 px-6 py-3 rounded-lg shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg font-semibold">
            Shop Now
          </button>
        </div>
      </section>
      <div className="max-w-[1535px] mx-auto flex flex-col gap-15 px-5 py-10">
        <div className="flex flex-wrap justify-center gap-8 py-10">
          {[
            { title: "Categories", icon: <FiTag size={28} /> },
            { title: "Collections", icon: <FiLayers size={28} /> },
            { title: "Wellness", icon: <FiHeart size={28} /> },
          ].map(({ title, icon }) => (
            <button
              key={title}
              className="
    relative h-36 w-36 rounded-full flex flex-col items-center justify-center
    bg-gradient-to-br from-white/90 to-green-50/60 backdrop-blur-xl
    border border-white/50
    shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(34,197,94,0.4)]
    hover:scale-110 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
    overflow-hidden group
  "
            >
              {/* Vầng sáng chuyển động mạnh hơn */}
              <div
                className="
      absolute inset-0 rounded-full opacity-0 group-hover:opacity-100
      bg-[conic-gradient(from_180deg_at_50%_50%,#22c55e33_0deg,transparent_120deg,#22c55e33_240deg,transparent_360deg)]
      animate-spin-slower blur-md
      transition-opacity duration-700
    "
              ></div>

              {/* Hiệu ứng sáng nền trung tâm */}
              <div
                className="
      absolute inset-0 rounded-full opacity-60
      bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.25),transparent_70%)]
      group-hover:opacity-90 transition-all duration-700
    "
              ></div>

              {/* Icon */}
              <div
                className="
      relative z-10 mb-2 text-4xl text-green-600 
      transition-all duration-700 group-hover:text-green-700 
      group-hover:scale-125 group-hover:-translate-y-1
      drop-shadow-[0_2px_8px_rgba(34,197,94,0.6)]
    "
              >
                {icon}
              </div>

              {/* Title */}
              <span
                className="
      relative z-10 uppercase text-sm font-semibold tracking-wider
      text-gray-800 group-hover:text-green-900 transition-all duration-700
    "
              >
                {title}
              </span>

              {/* Vòng sáng ngoài mỏng, lan tỏa */}
              <span
                className="
      absolute inset-0 rounded-full border border-green-300/40
      opacity-0 group-hover:opacity-100 group-hover:scale-125
      transition-all duration-700
      shadow-[0_0_35px_8px_rgba(34,197,94,0.35)]
    "
              ></span>
            </button>


          ))}
        </div>

        <div className="grid grid-cols-2 gap-5">
          {resTaxons_List?.data.map((res, id) => (
            <>
              {(res.attributes.permalink === 'categories/fashion/men' || res.attributes.permalink === 'categories/fashion/women') &&
                <button key={res.id} className="relative group overflow-hidden rounded-md shadow-xl"
                  onClick={() => {
                    router.push(`/${res.attributes.name.toLocaleLowerCase()}`)
                  }}
                >
                  <img
                    src={res.attributes.header_url}
                    alt={res.attributes.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <h2 className="absolute bottom-6 left-6 text-white text-3xl font-bold uppercase tracking-wider drop-shadow-md">
                    {res.attributes.name}
                  </h2>
                </button>
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
          <div className="flex justify-center">
            <button
              onClick={() => {
                router.push(`/sale`)
              }}
              className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-green-100 to-green-200 text-green-800 rounded-md shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              View all <MdNavigateNext size={22} />
            </button>
          </div>
        </div>
        <div className='flex-grow gap-5 flex flex-col '>
          <div className="flex justify-center css-next items-center w-full transition-all duration-300 ease">
            <h3 className="text-xl uppercase font-semibold  bg-clip-text tracking-wide">New Arrivals</h3>

          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            <ListProductCard products={resDataProducts_NewList ?? []} included={resDataIcludes_NewList ?? []} />
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => {
                router.push(`/new-arrivals`)
              }}
              className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-green-100 to-green-200 text-green-800 rounded-md shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              View all <MdNavigateNext size={22} />
            </button>
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
                  <div
                    key={id}
                    className="relative group overflow-hidden rounded-xl shadow-md cursor-pointer"
                    onClick={() => router.push(`/post/${res.id}`)}
                  >
                    <img
                      src={res.attributes.image_url!}
                      alt={res.attributes.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                      <h3 className="text-lg text-white font-semibold group-hover:text-green-300 transition-colors">
                        {res.attributes.title}
                      </h3>
                      <p className="text-white/70 text-sm mt-1">
                        {res.attributes.author_name} •{" "}
                        {new Date(res.attributes.published_at).toLocaleDateString()}
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
                      <div className=" flex flex-col gap-2  " key={id}
                        onClick={() => {
                          router.push(`/post/${res.id}`)
                        }}>
                        <div className="relative w-fill group overflow-hidden rounded-md">
                          <img src={res.attributes.image_url!} alt={res.attributes.title} className="w-full  h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                          <div className="absolute  inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity"></div>
                        </div>
                        <div className=" ">
                          <h3 className="text-xl  font-semibold mt-1 mb-2">{res.attributes.title}</h3>
                          <p className="text-black/70 text-sm mt-1">
                            {res.attributes.author_name} •{" "}
                            {new Date(res.attributes.published_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    }
                  </>
                ))}
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    router.push(`/posts`)
                  }}
                  className="flex items-center gap-2 px-5 py-2 h-fit bg-gradient-to-r from-green-100 to-green-200 text-green-800 rounded-md shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  View all <MdNavigateNext size={22} />
                </button>
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