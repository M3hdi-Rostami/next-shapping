import { CartContext } from "@/context/Cart";
import { useRouter } from "next/router";
import { useContext } from "react";

function AddToCartButton({ product }) {
  const { state, dispatch } = useContext(CartContext);
  const router = useRouter();

  function addToCartHandler() {
    const existingItem = state.cart.cartItems.find(
      (item) => item.slug === product.slug
    );
    const qty = existingItem ? existingItem.qty + 1 : 1;

    if (product.count < qty) {
      return alert("Product is out!");
    }

    dispatch({ type: "ADD_ITEMS", payload: { ...product, qty } });
    router.push("/cart");
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
