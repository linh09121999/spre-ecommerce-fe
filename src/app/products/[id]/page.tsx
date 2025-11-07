import { useParams } from "next/navigation";

export default function ProductDetail() {
  const { id } = useParams();
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Chi tiết sản phẩm #{id}</h1>
      <p>Thông tin chi tiết của sản phẩm {id}...</p>
    </div>
  );
}