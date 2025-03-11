import CheckoutWizard from "@/components/CheckoutWizard";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { CartContext } from "@/context/Cart";
import BreadCrumps from "@/components/BreadCrumps";

function PlaceOrder() {
  const { state, dispatch } = useContext(CartContext);
  const {
    cart: { cartItems, shippingData },
  } = state;
  const router = useRouter();

  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    setTotalPrice(cartItems.reduce((acc, cur) => acc + cur.qty * cur.price, 0));
  }, [cartItems]);

  function removeItemHandler(item) {
    dispatch({ type: "REMOVE_ITEM", payload: item });
  }

  return (
    <Layout title="placeOrder shopping">
      <BreadCrumps pageName="checkout place order" />

      <CheckoutWizard activeTab={3}>
        <div className="flex flex-col gap-6">
          <div className="bg-gray-300 rounded-lg p-4">
            <div className="py-2 font-bold text-2xl w-max border-b-2 border-gray-400 text-gray-500 pb-1 mb-2">
              Selected Products:
            </div>
            <ul
              role="list"
              className="divide-y divide-gray-100 flex flex-col gap-2"
            >
              {cartItems.length > 0 &&
                cartItems.map((item) => (
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
                          <span className="font-bold text-gray-100">
                            {item.price}
                          </span>
                          <span className="text-gray-200"> | </span>
                          <span className="text-gray-300">Total Price: </span>
                          <span className="font-bold text-gray-100">
                            {item.qty * item.price}
                          </span>
                        </p>

                        <p className="text-sm/6 text-gray-900">
                          <span className="text-gray-300">Category: </span>
                          <span className="font-bold text-gray-100">
                            {item.cat}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 border-t border-gray-600 pt-2">
                      <p
                        onClick={() => removeItemHandler(item)}
                        className="text-red-400 font-bold text-gray-100 cursor-pointer hover:text-red-600"
                      >
                        remove
                      </p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>

          <div className="bg-gray-300 rounded-lg p-4">
            <div className="py-2 font-bold text-2xl w-max border-b-2 border-gray-400 text-gray-500 pb-1 mb-2">
              User:
            </div>
            {shippingData ? (
              <ul className="flex items-center justify-between gap-2">
                {Object.entries(shippingData).map(([key, value]) => (
                  <li key={key}>
                    <span className="text-lg">{key}</span>:{" "}
                    <span className="text-lg font-bold">{value}</span>
                  </li>
                ))}
              </ul>
            ) : (
              "User not found"
            )}
          </div>

          <div className="bg-gray-300 rounded-lg p-4 text-gray-800 font-bold  flex items-center justify-between gap-4">
            <div className="text-2xl">
              <span className="mr-2"> Total Price:</span>
              <span className="text-blue-600 font-bold">${totalPrice}</span>
            </div>
            <button
              onClick={() => {}}
              className="px-4 py-2 min-w-xs rounded-lg bg-blue-500 font-bold text-gray-100 hover:bg-blue-600 cursor-pointer"
            >
              Pay
            </button>
          </div>
        </div>
      </CheckoutWizard>
    </Layout>
  );
}

export default PlaceOrder;
