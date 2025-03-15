import BreadCrumps from "@/components/BreadCrumps";
import Layout from "@/components/Layout";

function MyOrdersHistory({ orders }) {
  return (
    <Layout title="My Orders History">
      <BreadCrumps pageName="my orders history" />

      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-900">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-300"
                >
                  Customer
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-300"
                >
                  Product
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-300"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-300"
                >
                  Quantity
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-300"
                >
                  Total
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-300"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700 bg-gray-800">
              {orders.map((order) =>
                order.orderItems.map((product, index) => (
                  <tr
                    key={`${order._id}-${index}`}
                    className="hover:bg-gray-700 transition-colors"
                  >
                    {index === 0 && (
                      <td
                        rowSpan={order.orderItems.length}
                        className="px-6 py-4 whitespace-nowrap"
                      >
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-100">
                              {order.user.name}
                            </div>
                          </div>
                        </div>
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-100">
                        {product.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-100">
                        ${product.price.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {product.quantity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                      ${(product.price * product.quantity).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.isPaid
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.isPaid ? "Paid" : "Pending"}
                      </span>
                      {order.isDelivered && (
                        <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          Delivered
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {orders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-300 text-lg">No orders found</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default MyOrdersHistory;

export async function getServerSideProps(context) {
  const response = await fetch(
    "http://localhost:3000/api/orders/my-orders-history",
    { headers: { Cookie: context.req.headers.cookie || "" } }
  );
  const orders = await response.json();

  return {
    props: { orders },
  };
}
