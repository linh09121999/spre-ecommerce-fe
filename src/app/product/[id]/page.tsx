'use client';
import React, { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import { useStateGeneral } from "@/useState/useStateGeneral";
import { ListAllProducts, RetrieveAProduct } from "@/service/storefront/products";
import { toast, ToastContainer } from "react-toastify";
import { useState_ResProducts } from "@/useState/useStatestorefront";
import ProductDetailCompoment from "@/components/productDetail";
import { IncludedTaxon } from "@/interface/interface";
import ListProductCard from "@/components/cardListProduct";

const ProductDetail: React.FC = () => {
  const params = useParams();  // Trả về object { id: '123' }
  const { id } = params; //id: la slug

  const {
    setLoading, setSelectNav
  } = useStateGeneral()


  const {
    resProduct_Retrieve, setResProduct_Retrieve,
    resDataProducts_Related, setResDataProducts_Related,
    resDataIcludes_Related, setResDataIcludes_Related
  } = useState_ResProducts()

  const getApiProducts = async (filter_taxons: string, page: number, per_page: number, include: string) => {
    try {
      setLoading(true)
      const res = await ListAllProducts({ filter_taxons, page, per_page, include })
      setResDataProducts_Related(res.data.data);
      setResDataIcludes_Related(res.data.included)
    } catch (error: any) {
      toast.error(`Products: ` + error.response.error)
      setResDataProducts_Related([])
      setResDataIcludes_Related([])
    }
    finally {
      setLoading(false);
    }
  }

  const getApiProductRetrieve = async (product_slug: string, include: string) => {
    try {
      setLoading(true);
      const res = await RetrieveAProduct(product_slug, { include })
      setResProduct_Retrieve(res.data)

      // Kiểm tra included có tồn tại và là mảng trước khi filter
      const included: any[] = Array.isArray(res.data.included) ? res.data.included : [];

      // khai báo kiểu cho item
      const includedTaxons: IncludedTaxon[] = included.filter(
        (item: any) => item.type === 'taxon'
      ) as IncludedTaxon[];

      const maxId = includedTaxons.reduce((max, item) => {
        const idNum = Number(item.id); // đảm bảo chuyển sang number
        return idNum > max ? idNum : max;
      }, 0);

      getApiProducts(String(maxId), 1, 10, "default_variant,variants,option_types,product_properties,taxons,images,primary_variant")

    } catch (error: any) {
      toast.error(`Products: ` + error.response.error)
    }
    finally {
      setLoading(false); // 👈 tắt loading sau khi có dữ liệu
    }
  }

  useEffect(() => {
    getApiProductRetrieve(String(id), "default_variant,variants,option_types,product_properties,taxons,images,primary_variant")
    setSelectNav(null)
  }, [])

  return (
    <>
      <ProductDetailCompoment data={resProduct_Retrieve?.data ?? undefined} included={resProduct_Retrieve?.included ?? []} />
      <div className='flex-grow gap-5 flex flex-col max-w-[1535px] mx-auto px-5 py-10'>
        <div className="flex css-next items-center w-full transition-all duration-300 ease">
          <h3 className="text-xl uppercase font-semibold bg-clip-text tracking-wide">You might also like</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          <ListProductCard products={resDataProducts_Related ?? []} included={resDataIcludes_Related ?? []} />
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default ProductDetail