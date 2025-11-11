'use client';
import React, { useEffect } from "react";
import { useParams } from 'next/navigation';
import { useStateGeneral } from "@/useState/useStateGeneral";
import { RetrieveAProduct } from "@/service/storefront/products";
import { toast, ToastContainer } from "react-toastify";
import { useState_ResProducts } from "@/useState/useStatestorefront";
import ProductDetailCompoment from "@/components/productDetail";

const ProductDetail: React.FC = () => {
  const params = useParams();  // Trả về object { id: '123' }
  const { id } = params; //id: la slug

  const { setLoading, setSelectNav
  } = useStateGeneral()

  const { resProduct_Retrieve, setResProduct_Retrieve } = useState_ResProducts()

  const getApiProductRetrieve = async (product_slug: string, include: string) => {
    try {
      setLoading(true);
      const res = await RetrieveAProduct(product_slug, { include })
      setResProduct_Retrieve(res.data)
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

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default ProductDetail