import Layout from "@/components/Layout";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Product() {
  const [product, setProduct] = useState(null);

  const { query } = useRouter();
  const { slug } = query;

  const fetchData = async () => {
    const response = await fetch(`/api/products/${slug}`);
    const data = await response.json();
    setProduct(data.product);
  };

  useEffect(() => {
    fetchData();
  }, [slug]);

  return (
    <Layout title={product?.title}>
      <div className="grid md:grid-cols-4 md:gap-3 bg-white rounded-xl p-10">
        <Image
          src={product?.image}
          width={300}
          height={300}
          alt="product image"
          className="rounded-xl"
        />
        <div>
          <div className="text-lg">
            <h2>{product?.title}</h2>
            <p>{product?.cat}</p>
            <p>{product?.description}</p>
          </div>
        </div>
        <div className="p-5">
          <div className="mb-2 flex justify-between">
            <div>Price:</div>
            <div>{product?.price}</div>
          </div>
          <div className="mb-2 flex justify-between">
            <div>Status:</div>
            <div>{product?.count ? "Available" : "Unavailable"}</div>
          </div>
          <button className="rounded-xl bg-gray-700 text-white px-4 py-2 w-full">
            Add to Cart
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Product;
