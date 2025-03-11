import Layout from "@/components/Layout";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";
import NotFountPage from "../404";
import BreadCrumps from "@/components/BreadCrumps";

function Product(props) {
  const { product } = props;

  if (!product)
    return (
      <Layout title="not found product!">
        <NotFountPage />
      </Layout>
    );

  return (
    <Layout title={product?.title}>
      <BreadCrumps pageName={product?.title} />
      <div className="grid md:grid-cols-4 md:gap-3 bg-gray-900 text-gray-100 rounded-xl p-10">
        <Image
          src={product?.image}
          width={300}
          height={300}
          alt="product image"
          className="rounded-xl"
        />
        <div>
          <div className="flex flex-col justify-between gap-10">
            <h1 className="text-2xl">{product?.title}</h1>
            <p className="text-gray-300 text-sm">{product?.description}</p>
          </div>
        </div>
        <div className="p-5">
          <div className="mb-2 flex justify-between">
            <div className="text-gray-400">Category:</div>
            <div className="font-bold">{product?.cat}</div>
          </div>
          <div className="mb-2 flex justify-between">
            <div className="text-gray-400">Price:</div>
            <div className="font-bold">{product?.price}</div>
          </div>
          <div className="mb-4 flex justify-between">
            <div className="text-gray-400">Status:</div>
            <div className="font-bold">
              {product?.count ? (
                <span className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-2.5 py-0.5 text-emerald-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="-ms-1 me-1.5 size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>

                  <p className="whitespace-nowrap text-sm">Available</p>
                </span>
              ) : (
                <span className="inline-flex items-center justify-center rounded-full bg-red-500 px-2.5 py-0.5 text-red-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="-ms-1 me-1.5 size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>

                  <p className="whitespace-nowrap text-sm">Unavailable</p>
                </span>
              )}
            </div>
          </div>
          <AddToCartButton product={product} withRedirect={true} cls="w-full" />
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
