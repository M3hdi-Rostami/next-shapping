import Layout from "@/components/Layout";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";
import NotFountPage from "../404";

function Product(props) {
  const { product } = props;
  console.log("🚀 ~ Product ~ product:", product);

  if (!product)
    return (
      <Layout title="not found product!">
        <NotFountPage />
      </Layout>
    );

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
          <AddToCartButton product={product} />
        </div>
      </div>
    </Layout>
  );
}

export default Product;

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const response = await fetch(`http://localhost:3000/api/products/${slug}`);
  const product = await response.json();

  return {
    props: { product },
  };
}
