import { CartContext } from "@/context/Cart";
import { useRouter } from "next/router";
import { useContext } from "react";
import { toast } from "react-toastify";

function AddToCartButton(props) {
  const { product, withRedirect = false, cls = "" } = props;

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
      className={`cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${cls}`}
    >
      Add to Cart
    </button>
  );
}

export default AddToCartButton;
