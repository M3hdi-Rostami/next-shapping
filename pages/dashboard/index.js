import {
  FiBarChart,
  FiDollarSign,
  FiShoppingBag,
  FiUsers,
} from "react-icons/fi";
import { useEffect, useState } from "react";

import Layout from "@/components/Layout";
import Link from "next/link";
import RequireAdmin from "@/hoc/RequireAdmin";

function Dashboard() {
  const [summaryData, setSummaryData] = useState({
    usersCount: 0,
    ordersCount: 0,
    productsCount: 0,
  });

  async function fetchSummaryData() {
    try {
      const response = await fetch("/api/admin/summery");
      const data = await response.json();
      setSummaryData(data);
    } catch (error) {
      console.error("Error fetching summary data:", error);
    }
  }

  useEffect(() => {
    fetchSummaryData();
  }, []);

  return (
    <Layout title="Admin Dashboard">
      <div className="p-6 space-y-6">
        {/* Welcome Section */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Welcome back, Admin
          </h1>
          <div className="flex space-x-3">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Add Product
            </button>
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
              Generate Report
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Products</p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {summaryData?.productsCount || 0}
                </h3>
                <p className="text-green-500 text-sm">+12% from last month</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FiDollarSign className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Orders</p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {summaryData?.ordersCount || 0}
                </h3>
                <p className="text-green-500 text-sm">+8% from last month</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FiShoppingBag className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Customers</p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {summaryData.usersCount || 0}
                </h3>
                <p className="text-green-500 text-sm">+5% from last month</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FiUsers className="w-6 h-6 text-purple-500" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Average Order</p>
                <h3 className="text-2xl font-bold text-gray-800">$168</h3>
                <p className="text-red-500 text-sm">-2% from last month</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <FiBarChart className="w-6 h-6 text-orange-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Recent Orders
            </h2>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((order) => (
                <div
                  key={order}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-gray-100 p-2 rounded-md">
                      <FiShoppingBag className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        Order #{order}234
                      </p>
                      <p className="text-sm text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-600">
                    Completed
                  </span>
                </div>
              ))}
            </div>
            <Link
              href="/orders"
              className="text-blue-500 text-sm mt-4 inline-block hover:underline"
            >
              View all orders →
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left">
                <h3 className="font-medium text-gray-800">Add Product</h3>
                <p className="text-sm text-gray-500">
                  Add new products to your store
                </p>
              </button>
              <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left">
                <h3 className="font-medium text-gray-800">Manage Orders</h3>
                <p className="text-sm text-gray-500">
                  View and update order status
                </p>
              </button>
              <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left">
                <h3 className="font-medium text-gray-800">Customer List</h3>
                <p className="text-sm text-gray-500">View customer details</p>
              </button>
              <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left">
                <h3 className="font-medium text-gray-800">Analytics</h3>
                <p className="text-sm text-gray-500">View detailed reports</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default RequireAdmin(Dashboard);
