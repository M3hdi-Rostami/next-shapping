import RequireAuth from "@/hoc/RequireAuth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function CreateProductPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  async function submitHandler({ title, price, count }) {
    const response = await fetch("http://localhost:3000/api/products/create", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ title, price: +price, count: +count }),
    });
    const { message } = await response.json();
    if (response.status === 201) {
      toast.success(message);
      reset();
    } else {
      toast.error(message);
    }
  }

  return (
    <div className="bg-slate-900 p-6 rounded-lg mb-8 flex justify-center">
      <form
        action="#"
        method="POST"
        className="space-y-6 w-3/6"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div>
          <label
            htmlFor="title"
            className="block text-sm/6 font-medium text-gray-100"
          >
            Title
          </label>
          <div className="mt-2">
            <input
              {...register("title", { required: true })}
              id="title"
              name="title"
              autoComplete="title"
              className="block w-full rounded-md bg-gray-600 px-3 py-2 text-base text-gray-100 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
          {errors.title && (
            <div className="text-red-500 text-xs absolute">
              Please enter you title.
            </div>
          )}
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm/6 font-medium text-gray-100"
          >
            Price
          </label>
          <div className="mt-2">
            <input
              {...register("price", { required: true })}
              id="price"
              name="price"
              type="number"
              autoComplete="price"
              className="block w-full rounded-md bg-gray-600 px-3 py-2 text-base text-gray-100 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
          {errors.price && (
            <div className="text-red-500 text-xs absolute">
              Please enter you price.
            </div>
          )}
        </div>
        <div>
          <label
            htmlFor="count"
            className="block text-sm/6 font-medium text-gray-100"
          >
            Count
          </label>
          <div className="mt-2">
            <input
              {...register("count", { required: true })}
              id="count"
              name="count"
              type="number"
              autoComplete="count"
              className="block w-full rounded-md bg-gray-600 px-3 py-2 text-base text-gray-100 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
          {errors.count && (
            <div className="text-red-500 text-xs absolute">
              Please enter you count.
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
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default RequireAuth(CreateProductPage);
