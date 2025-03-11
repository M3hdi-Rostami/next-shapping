import BreadCrumps from "@/components/BreadCrumps";
import Layout from "@/components/Layout";
import { CartContext } from "@/context/Cart";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

function Cart() {
  const { state, dispatch } = useContext(CartContext);
  const {
    cart: { cartItems },
  } = state;
  const router = useRouter();

  function removeItemHandler(item) {
    dispatch({ type: "REMOVE_ITEM", payload: item });
  }

  function redirectToCheckout() {
    router.push("/checkout");
  }

  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    setTotalPrice(cartItems.reduce((acc, cur) => acc + cur.qty * cur.price, 0));
  }, [cartItems]);

  return (
    <Layout title="cart shopping">
      <BreadCrumps pageName="cart shopping" />

      <ul role="list" className="divide-y divide-gray-100 flex flex-col gap-2">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="flex flex-col justify-between gap-3 py-5 bg-gray-800 p-4 rounded-lg"
          >
            <div className="flex justify-between gap-x-6">
              <div className="flex min-w-0 gap-x-4">
                <Image
                  alt=""
                  src={item.image}
                  width={100}
                  height={100}
                  className="rounded-lg"
                />
                <div className="min-w-0 flex-auto flex flex-col justify-between">
                  <p className="text-sm/6 font-semibold text-white">
                    {item.title}
                    <span className="text-gray-300"> | </span>
                    <span className="bg-gray-400 text-gray-900 px-2 py-1 rounded-full">
                      {item.qty}
                    </span>
                  </p>
                  <p className="truncate text-xs/5 text-gray-300">
                    {item.description}
                  </p>
                </div>
              </div>
              <div className="shrink-0 flex flex-col items-end justify-between">
                <p className="text-sm/6 text-gray-900">
                  <span className="text-gray-300">Price: </span>
                  <span className="font-bold text-gray-100">{item.price}</span>
                  <span className="text-gray-200"> | </span>
                  <span className="text-gray-300">Total Price: </span>
                  <span className="font-bold text-gray-100">
                    {item.qty * item.price}
                  </span>
                </p>

                <p className="text-sm/6 text-gray-900">
                  <span className="text-gray-300">Category: </span>
                  <span className="font-bold text-gray-100">{item.cat}</span>
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-gray-600 pt-2">
              <p
                onClick={() => removeItemHandler(item)}
                className="text-red-400 font-bold  cursor-pointer hover:text-red-600"
              >
                remove
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className="bg-gray-800 px-4 py-2  mt-6 rounded-lg font-bold text-gray-100 text-l flex items-center justify-between gap-4">
        <div>
          <span className="mr-2"> Total Price:</span>
          <span className="text-emerald-500">{totalPrice}</span>
        </div>
        <button
          onClick={redirectToCheckout}
          className="px-4 py-2 rounded-lg bg-blue-500  font-bold text-gray-100 hover:bg-blue-600 cursor-pointer"
        >
          Checkout
        </button>
      </div>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
