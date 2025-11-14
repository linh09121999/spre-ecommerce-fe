"use client"
import { useRouter } from "next/navigation";
import { useStateGeneral } from '@/useState/useStateGeneral';

import React, { useEffect } from "react";
import { useState_ResPosts, useState_ResProducts, useState_ResStores, useState_ResTaxons } from "@/useState/useStatestorefront";
import { toast, ToastContainer } from "react-toastify";
import { ListAllProducts } from "@/service/storefront/products";
import ListProductCard from "@/components/cardListProduct";
import { MdNavigateNext } from "react-icons/md";
import { FiHeart, FiLayers, FiShoppingBag, FiStar, FiTag, FiUser, FiUsers } from "react-icons/fi";
import { ListAllPost } from "@/service/storefront/posts";
import { GiAppleCore, GiBrain, GiMeditation } from "react-icons/gi";
import { PiBarbell } from "react-icons/pi";

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

  const toPath = (text: string): string => {
    return text
      .toLowerCase()        // chuyển hết về chữ thường
      .trim()               // bỏ khoảng trắng đầu/cuối
      .replace(/\s+/g, '-') // thay khoảng trắng bằng dấu gạch ngang
      .replace(/[^\w-]/g, ''); // loại bỏ ký tự đặc biệt
  };

  return (
    <>
      <section className="relative w-full h-[580px] md:h-[650px] overflow-hidden rounded-b-[60px] shadow-2xl">
        <img
          src="https://cdn.vendo.dev/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6MjQ3OSwicHVyIjoiYmxvYl9pZCJ9fQ==--2ea59e9a7f3e0127203fa19260ee4f0c827a725d/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwic2F2ZXIiOnsic3RyaXAiOnRydWUsInF1YWxpdHkiOjc1LCJsb3NzbGVzcyI6ZmFsc2UsImFscGhhX3EiOjg1LCJyZWR1Y3Rpb25fZWZmb3J0Ijo2LCJzbWFydF9zdWJzYW1wbGUiOnRydWV9LCJyZXNpemVfdG9fbGltaXQiOls2NDAsbnVsbF19LCJwdXIiOiJ2YXJpYXRpb24ifX0=--d96e3e5279c093271eeb921db9065be22fee62e4/Image%20banner.jpg"
          alt="banner"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] ease-out hover:scale-125"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>

        {/* Soft color tint */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

        {/* Noise  */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>

        {/* Content */}
        <div
          className="relative z-10 flex flex-col justify-center h-full max-w-[1250px] mx-auto px-6 md:px-12"
          data-aos="fade-up"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-white drop-shadow-2xl">
            Explore Your Style With <span className="text-green-300">Spree Commerce</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-xl mt-5 leading-relaxed">
            Build fully customizable eCommerce experiences with Spree’s powerful open-source platform.
          </p>

          <button
            onClick={() => router.push('/all-product')}
            className="mt-8 w-fit bg-white text-green-700 font-semibold px-8 py-3.5 rounded-xl shadow-lg hover:bg-green-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            Shop Now
          </button>
        </div>
      </section>
      <div className="max-w-[1535px] mx-auto flex flex-col gap-15 px-5 py-10">
        <div className="flex flex-nowrap md:flex-wrap gap-6 justify-center overflow-x-auto pb-10 no-scrollbar">
          {[
            { title: "Men", icon: <FiUser size={28} /> },                // biểu tượng người (nam)
            { title: "Women", icon: <FiUsers size={28} /> },            // biểu tượng group/khác biệt nhẹ cho nữ
            { title: "Accessories", icon: <FiShoppingBag size={28} /> },// túi/phụ kiện mua sắm
            { title: "Fitness", icon: <PiBarbell size={28} /> },        // tạ cho thể thao/fitness
            { title: "Relaxation", icon: <GiMeditation size={28} /> }, // thiền/relax
            { title: "Mental Stimulation", icon: <GiBrain size={28} /> }, // não / kích thích tinh thần
            { title: "Nutrition", icon: <GiAppleCore size={28} /> },
          ].map(({ title, icon }) => (
            <button
              key={title}
              onClick={() => router.push(`/${toPath(title)}`)}
              className="
          relative h-32 w-32 md:h-36 md:w-36 shrink-0
          rounded-xl flex flex-col items-center justify-center
          bg-white/40 backdrop-blur-xl
          border border-white/50
          shadow-lg hover:shadow-xl hover:scale-110
          transition-all duration-500 ease-out
          overflow-hidden group
        "
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-200/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>

              <div className="text-green-600 group-hover:text-green-800 transition-all duration-500 text-4xl">
                {icon}
              </div>

              <span className="mt-2 text-sm font-semibold uppercase tracking-wide group-hover:text-green-900">
                {title}
              </span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-5">
          {resTaxons_List?.data
            .filter(({ attributes }) =>
              ["categories/fashion/men", "categories/fashion/women"].includes(
                attributes.permalink
              )
            )
            .map((res) => (
              <button
                key={res.id}
                className="relative group overflow-hidden rounded-xl shadow-xl"
                onClick={() => router.push(`/${res.attributes.name.toLowerCase()}`)}
              >
                <img
                  src={res.attributes.header_url} alt={res.attributes.name.toLowerCase()}
                  className="w-full h-full object-cover duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                <h3 className="absolute bottom-6 left-6 text-white text-3xl font-bold uppercase tracking-wider drop-shadow-lg">
                  {res.attributes.name}
                </h3>
              </button>
            ))}
        </div>
        <section className="relative py-14 px-4">
          <div className="flex justify-center items-center">
            <h3 className="text-2xl uppercase font-semibold tracking-wide">Sale</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-6">
            <ListProductCard products={resDataProducts_SaleList ?? []} included={resDataIcludes_SaleList ?? []} />
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={() => router.push(`/sale`)}
              className="flex items-center gap-2 px-5 py-2 h-fit bg-gradient-to-r from-green-100 to-green-200 text-green-800 rounded-md shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

              View all <MdNavigateNext size={22} />
            </button>
          </div>
        </section>

        <section className="relative py-14 px-4 bg-gradient-to-r from-green-50 to-green-100">
          <div className="flex justify-center items-center">
            <h3 className="text-2xl uppercase font-semibold tracking-wide">New Arrivals</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-6">
            <ListProductCard products={resDataProducts_NewList ?? []} included={resDataIcludes_NewList ?? []} />
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={() => router.push(`/new-arrivals`)}
              className="flex items-center gap-2 px-5 py-2 h-fit bg-gradient-to-r from-green-100 to-green-200 text-green-800 rounded-md shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

              View all <MdNavigateNext size={22} />
            </button>
          </div>
        </section>

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