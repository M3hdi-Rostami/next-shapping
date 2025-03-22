import BreadCrumps from "@/components/BreadCrumps";
import CheckoutWizard from "@/components/CheckoutWizard";
import Layout from "@/components/Layout";
import { CartContext } from "@/context/Cart";
import RequireAuth from "@/hoc/RequireAuth";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";

function Index() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const { state, dispatch } = useContext(CartContext);
  const {
    cart: { shippingData },
  } = state;

  useEffect(() => {
    setValue("name", shippingData?.name);
    setValue("family", shippingData?.family);
    setValue("mobile", shippingData?.mobile);
    setValue("postalCode", shippingData?.postalCode);
    setValue("address", shippingData?.address);
  }, [setValue, shippingData]);

  function submitHandler({ name, family, mobile, postalCode, address }) {
    dispatch({
      type: "SAVE_SHIPPING_DATA",
      payload: {
        name,
        family,
        mobile,
        postalCode,
        address,
      },
    });
    router.push("/payment");
  }

  return (
    <Layout title="checkout shopping">
      <BreadCrumps pageName="checkout address" />

      <CheckoutWizard activeTab={1}>
        <form
          action="#"
          method="POST"
          className="space-y-6 max-w-8/12"
          onSubmit={handleSubmit(submitHandler)}
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm/6 font-medium text-gray-100"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                {...register("name", { required: true })}
                id="name"
                name="name"
                type="name"
                autoComplete="name"
                className="block w-full rounded-md bg-gray-600 px-3 py-2 text-base text-gray-100 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            {errors.name && (
              <div className="text-red-500 text-xs absolute">
                Please enter you name.
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="family"
              className="block text-sm/6 font-medium text-gray-100"
            >
              Family
            </label>
            <div className="mt-2">
              <input
                {...register("family", { required: true })}
                id="family"
                name="family"
                type="family"
                autoComplete="family"
                className="block w-full rounded-md bg-gray-600 px-3 py-2 text-base text-gray-100 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            {errors.family && (
              <div className="text-red-500 text-xs absolute">
                Please enter you family.
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="mobile"
              className="block text-sm/6 font-medium text-gray-100"
            >
              Mobile
            </label>
            <div className="mt-2">
              <input
                {...register("mobile", { required: true })}
                id="mobile"
                name="mobile"
                type="number"
                autoComplete="mobile"
                className="block w-full rounded-md bg-gray-600 px-3 py-2 text-base text-gray-100 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            {errors.mobile && (
              <div className="text-red-500 text-xs absolute">
                Please enter you mobile.
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="postalCode"
              className="block text-sm/6 font-medium text-gray-100"
            >
              Postal Code
            </label>
            <div className="mt-2">
              <input
                {...register("postalCode", { required: true })}
                id="postalCode"
                name="postalCode"
                type="number"
                autoComplete="postalCode"
                className="block w-full rounded-md bg-gray-600 px-3 py-2 text-base text-gray-100 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            {errors.postalCode && (
              <div className="text-red-500 text-xs absolute">
                Please enter you postal code.
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm/6 font-medium text-gray-100"
            >
              Address
            </label>
            <div className="mt-2">
              <textarea
                {...register("address", { required: true })}
                id="address"
                name="address"
                autoComplete="address"
                rows={2}
                className="block w-full rounded-md bg-gray-600 px-3 py-2 text-base text-gray-100 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            {errors.address && (
              <div className="text-red-500 text-xs absolute">
                Please enter you address.
              </div>
            )}
          </div>
          <div className="flex gap-4">
            <button
              type="reset"
              onClick={reset}
              className="flex w-full justify-center cursor-pointer rounded-md bg-gray-400 px-3 py-2 text-sm/6 font-semibold text-white shadow-xs hover:bg-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Reset
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

export default RequireAuth(Index);
