import { CiBoxes } from "react-icons/ci";
import { BsGraphUpArrow } from "react-icons/bs";
import { TiGroup } from "react-icons/ti";
import { FaSackDollar } from "react-icons/fa6";
import { MdOutlineReportProblem } from "react-icons/md";
import { useAllProductsQuery } from "../../../redux/features/admin/productManagementApi";
import Spinner from "../../../components/Spinner/Spinner";
import { useGetAllUsersQuery } from "../../../redux/features/admin/userManagementApi";
import PieChart from "./charts/PieChart";
import { useEffect, useState } from "react";
import StackedLineChart from "./charts/StackedChart";
import { verifyToken } from "../../../utils/verifyToken";



function Overview() {
  const {data:products,isLoading}=useAllProductsQuery({})
  const {data:users,isLoading:userLoading}=useGetAllUsersQuery({})
  const [chartData, setChartData] = useState<any>(null);
  useEffect(() => {
    if (products?.data && users?.data) {
      setChartData({
        labels: ["Products", "Users"], // Labels for the datasets
        datasets: [
          {
            label: "Products",
            data: [products.data.length, 0],
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 2,
            fill: true,
          },
          {
            label: "Users",
            data: [0, users.data.length],
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 2,
            fill: true,
          },
        ],
      });
    }
  }, [products, users]);
  const token=localStorage.getItem("token") as string;
  const decoded=verifyToken(token) as {role:string}
 
return (
    <div className="w-full min-h-screen bg-black text-gray-100 p-6">
      {isLoading || userLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : (
        <div className="space-y-8">
          {/* Header */}
          <div className="pb-4 border-b border-gray-800">
            <h3 className="text-3xl font-bold text-emerald-400">Dashboard Overview</h3>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Products Card */}
            <div className="bg-gray-950 border border-gray-900 p-5 rounded-xl hover:transform hover:scale-105 transition-all duration-300 shadow-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Total Products</p>
                  <p className="text-3xl font-bold text-emerald-400">{products?.data.length}</p>
                </div>
                <div className="p-3 bg-emerald-900/20 rounded-full">
                  <CiBoxes className="text-4xl text-emerald-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-emerald-400 flex items-center">
                  <BsGraphUpArrow className="mr-2" />
                  {(Number(products?.data?.length) * 3.67).toFixed(2)}%
                </span>
                <span className="text-gray-400">Last 30 days</span>
              </div>
            </div>

            {/* Users Card - Conditional */}
            {decoded.role !== "seller" && (
              <div className="bg-gray-950 border border-gray-900 p-5 rounded-xl hover:transform hover:scale-105 transition-all duration-300 shadow-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Total Users</p>
                    <p className="text-3xl font-bold text-purple-400">{users?.data?.length}</p>
                  </div>
                  <div className="p-3 bg-purple-900/20 rounded-full">
                    <TiGroup className="text-4xl text-purple-400" />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-purple-400 flex items-center">
                    <BsGraphUpArrow className="mr-2" />
                    {(users?.data?.length * 3.67).toFixed(2)}%
                  </span>
                  <span className="text-gray-400">Last 30 days</span>
                </div>
              </div>
            )}

            {/* Sales Card */}
            <div className="bg-gray-950 border border-gray-900 p-5 rounded-xl hover:transform hover:scale-105 transition-all duration-300 shadow-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Total Sales</p>
                  <p className="text-3xl font-bold text-blue-400">{products?.data?.length}</p>
                </div>
                <div className="p-3 bg-blue-900/20 rounded-full">
                  <FaSackDollar className="text-4xl text-blue-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-blue-400 flex items-center">
                  <BsGraphUpArrow className="mr-2" />
                  {(products?.data?.length * 3.67).toFixed(2)}%
                </span>
                <span className="text-gray-400">Last 30 days</span>
              </div>
            </div>

            {/* Reported Items Card */}
            <div className="bg-gray-950 border border-gray-900 p-5 rounded-xl hover:transform hover:scale-105 transition-all duration-300 shadow-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Reported Items</p>
                  <p className="text-3xl font-bold text-yellow-400">{products?.data?.length}</p>
                </div>
                <div className="p-3 bg-yellow-900/20 rounded-full">
                  <MdOutlineReportProblem className="text-4xl text-yellow-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-yellow-400 flex items-center">
                  <BsGraphUpArrow className="mr-2" />
                  {(products?.data?.length * 3.67).toFixed(2)}%
                </span>
                <span className="text-gray-400">Last 30 days</span>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-center space-x-4">
              <div className="flex-1 border-t border-gray-800"></div>
              <h3 className="text-xl font-semibold text-emerald-400 px-4">
                Analytics Overview
              </h3>
              <div className="flex-1 border-t border-gray-800"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-950 border border-gray-900 p-6 rounded-xl shadow-lg">
                <h4 className="text-lg font-semibold mb-4 text-emerald-400">Distribution Overview</h4>
                {chartData && <PieChart chartData={chartData} />}
              </div>

              <div className="bg-gray-950 border border-gray-900 p-6 rounded-xl shadow-lg">
                <h4 className="text-lg font-semibold mb-4 text-emerald-400">Progress Trends</h4>
                {chartData ? (
                  <StackedLineChart data={chartData} />
                ) : (
                  <p className="text-center text-gray-400">Loading Chart Data...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Overview