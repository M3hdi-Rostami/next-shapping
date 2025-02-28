import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

function Product(props) {
  const { item } = props;
  return (
    <div className="bg-white rounded-xl mb-5 w-3xs flex flex-col items-center justify-between">
      <Link href={`/products/${item.slug}`}>
        <img src={item.image} alt="product image" className="rounded-t-xl" />
      </Link>
      <div className="flex items-center justify-center flex-col p-5">
        <Link href={`/products/${item.slug}`}>
          <h2 className="text-lg">{item.title}</h2>
        </Link>
        <p className="p-2">{item.price}</p>
        <AddToCartButton product={item} />
      </div>
    </div>
  );
}

export default Product;
