import { CartContext } from "@/context/Cart";
import { useRouter } from "next/router";
import { useContext } from "react";
import { toast } from "react-toastify";

function AddToCartButton(props) {
  const { product, withRedirect = false } = props;

  const { state, dispatch } = useContext(CartContext);
  const {
    cart: { cartItems },
  } = state;
  const router = useRouter();

  function addToCartHandler() {
    const existingItem = cartItems.find((item) => item.slug === product.slug);
    const qty = existingItem ? existingItem.qty + 1 : 1;

    if (product.count < qty) {
      return toast.warn("Product is out!");
    }

    dispatch({ type: "ADD_ITEMS", payload: { ...product, qty } });
    toast.success("Product is added to cart");
    if (withRedirect) {
      router.push("/cart");
    }
  }

  return (
    <button
      onClick={addToCartHandler}
      className="rounded-xl bg-gray-700 text-white px-4 py-2 w-full cursor-pointer hover:opacity-90"
    >
      Add to Cart
    </button>
  );
}

export default AddToCartButton;
