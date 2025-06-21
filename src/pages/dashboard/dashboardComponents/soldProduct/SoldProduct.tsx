import { FaSackDollar } from "react-icons/fa6";
import { BsGraphUpArrow } from "react-icons/bs";

import { useEffect, useState } from "react";
import Spinner from "../../../../components/Spinner/Spinner";
// import { verifyToken } from "../../../../utils/verifyToken";

function SoldProduct() {
  const { data: soldProducts, isLoading } = {data:{data:[]},isLoading:false}
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    if (soldProducts?.data) {
      const revenue = soldProducts.data.reduce((sum: number, product: any) => {
        return sum + (product.price * product.soldQuantity || 0);
      }, 0);
      setTotalRevenue(revenue);
    }
  }, [soldProducts]);

  // const token = localStorage.getItem("token") as string;
  // const decoded = verifyToken(token) as { role: string };

  return (
    <div className="w-full min-h-screen bg-black text-gray-100 p-6">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : (
        <div className="space-y-8">
          {/* Header */}
          <div className="pb-4 border-b border-gray-800">
            <h3 className="text-3xl font-bold text-emerald-400">Sales Overview</h3>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Sold Products Card */}
            <div className="bg-gray-950 border border-gray-900 p-5 rounded-xl hover:transform hover:scale-105 transition-all duration-300 shadow-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Total Sold Products</p>
                  <p className="text-3xl font-bold text-emerald-400">
                    {soldProducts?.data?.length || 0}
                  </p>
                </div>
                <div className="p-3 bg-emerald-900/20 rounded-full">
                  <FaSackDollar className="text-4xl text-emerald-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-emerald-400 flex items-center">
                  <BsGraphUpArrow className="mr-2" />
                  {soldProducts?.data?.length ? (soldProducts.data.length * 3.67).toFixed(2) : 0}%
                </span>
                <span className="text-gray-400">Last 30 days</span>
              </div>
            </div>

            {/* Total Revenue Card */}
            <div className="bg-gray-950 border border-gray-900 p-5 rounded-xl hover:transform hover:scale-105 transition-all duration-300 shadow-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Total Revenue</p>
                  <p className="text-3xl font-bold text-blue-400">
                    ${totalRevenue.toFixed(2)}
                  </p>
                </div>
                <div className="p-3 bg-blue-900/20 rounded-full">
                  <FaSackDollar className="text-4xl text-blue-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-blue-400 flex items-center">
                  <BsGraphUpArrow className="mr-2" />
                  {totalRevenue ? (totalRevenue * 0.0367).toFixed(2) : 0}%
                </span>
                <span className="text-gray-400">Last 30 days</span>
              </div>
            </div>

            {/* Average Sale Card */}
            <div className="bg-gray-950 border border-gray-900 p-5 rounded-xl hover:transform hover:scale-105 transition-all duration-300 shadow-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Average Sale</p>
                  <p className="text-3xl font-bold text-purple-400">
                    ${soldProducts?.data?.length ? (totalRevenue / soldProducts.data.length).toFixed(2) : 0}
                  </p>
                </div>
                <div className="p-3 bg-purple-900/20 rounded-full">
                  <FaSackDollar className="text-4xl text-purple-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-purple-400 flex items-center">
                  <BsGraphUpArrow className="mr-2" />
                  {soldProducts?.data?.length ? (soldProducts.data.length * 1.23).toFixed(2) : 0}%
                </span>
                <span className="text-gray-400">Last 30 days</span>
              </div>
            </div>
          </div>

          {/* Sold Products List */}
          <div className="space-y-6">
            <div className="flex items-center justify-center space-x-4">
              <div className="flex-1 border-t border-gray-800"></div>
              <h3 className="text-xl font-semibold text-emerald-400 px-4">
                Sold Products
              </h3>
              <div className="flex-1 border-t border-gray-800"></div>
            </div>

            <div className="bg-gray-950 border border-gray-900 rounded-xl shadow-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-800">
                <thead className="bg-gray-900">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Quantity Sold
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-950 divide-y divide-gray-800">
                  {soldProducts?.data?.map((product: any) => (
                    <tr key={product._id} className="hover:bg-gray-900/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={product.image} alt={product.name} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-100">{product.name}</div>
                            <div className="text-sm text-gray-400">{product.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                        ${product.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                        {product.soldQuantity || 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-emerald-400">
                        ${(product.price * (product.soldQuantity || 1)).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SoldProduct;