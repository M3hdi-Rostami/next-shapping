import BreadCrumps from "@/components/BreadCrumps";
import CheckoutWizard from "@/components/CheckoutWizard";
import Layout from "@/components/Layout";
import { CartContext } from "@/context/Cart";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

function Payment() {
  const router = useRouter();

  const { state, dispatch } = useContext(CartContext);
  const {
    cart: { paymentMethod },
  } = state;

  const [currentPaymentMethod, setCurrentPaymentMethod] = useState("");

  useEffect(() => setCurrentPaymentMethod(paymentMethod), [paymentMethod]);

  function submitHandler(e) {
    e.preventDefault();
    if (!currentPaymentMethod) {
      return toast.warn("Please select the payment method.");
    }

    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: currentPaymentMethod });

    router.push("/placeorder");
  }

  const methods = ["Gateway", "offline"];
  return (
    <Layout title="checkout shopping">
      <BreadCrumps pageName="checkout payment method" />

      <CheckoutWizard activeTab={2}>
        <form
          className="mx-auto max-w-md flex flex-col gap-4"
          onSubmit={submitHandler}
        >
          {methods.map((item) => (
            <div key={item}>
              <label
                htmlFor={item}
                className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-xs hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
              >
                <p className="text-gray-700">{item}</p>

                <input
                  type="radio"
                  name="payment"
                  value={item}
                  id={item}
                  checked={currentPaymentMethod === item}
                  onChange={() => setCurrentPaymentMethod(item)}
                  className="size-5 border-gray-300 text-blue-500"
                />
              </label>
            </div>
          ))}
          <div className="flex gap-4">
            <button
              type="reset"
              onClick={() => router.push("/checkout")}
              className="flex w-full justify-center cursor-pointer rounded-md bg-gray-400 px-3 py-2 text-sm/6 font-semibold text-white shadow-xs hover:bg-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Back
            </button>
            <button
              type="submit"
              className="flex w-full justify-center cursor-pointer rounded-md bg-indigo-600 px-3 py-2 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Continue
            </button>
          </div>
        </form>
      </CheckoutWizard>
    </Layout>
  );
}

export default Payment;
