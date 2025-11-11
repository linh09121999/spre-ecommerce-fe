'use client';
import React, { useEffect } from "react";
import { useParams } from 'next/navigation';
import { useStateGeneral } from "@/useState/useStateGeneral";
import { RetrieveAProduct } from "@/service/storefront/products";
import { toast } from "react-toastify";

const ProductDetail: React.FC = () => {
  const params = useParams();  // Trả về object { id: '123' }
  const { id } = params; //id: la slug

  const { setLoading, setSelectNav
  } = useStateGeneral()

  const getApiProductRetrieve = async (product_slug: string, include: string) => {
    try {
      setLoading(true);
      const res = await RetrieveAProduct(product_slug, { include })
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
    <div className="p-8">
      <h1 className="text-2xl font-bold">Chi tiết sản phẩm #{id}</h1>
      <p>Thông tin chi tiết của sản phẩm ...</p>
    </div>
  );
}

export default ProductDetail