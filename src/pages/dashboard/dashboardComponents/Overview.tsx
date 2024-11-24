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
            label: "Product Count",
            data: [products.data.length, 0], // Product count
            backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 99, 132, 0.6)"], // Product colors
          },
          {
            label: "User Count",
            data: [0, users.data.length], // User count
            backgroundColor: ["rgba(153, 102, 255, 0.6)", "rgba(255, 159, 64, 0.6)"], // User colors
          },
        ],
      });
    }
  }, [products, users]);
return (
    <div className="w-full" >
     {
      isLoading ||userLoading ? <div className="flex justify-center items-center align-middle mx-auto w-11/12"><Spinner></Spinner></div> :
      <div className="">
      {/* overview carts */}
      <h3 className="text-xl font-bold mb-5 bg-transparent">Overview</h3>
    <div className="flex flex-col md:flex-row lg:flex-row mb-5 gap-3">
      {/* products cart */}
      <div className=" bg-emerald-800 p-3 w-52 h-36 rounded-lg ">
        <div className=" flex flex-row-reverse justify-between bg-transparent ">
        <CiBoxes className="bg-transparent text-7xl mt-5 " />

        <div className="bg-transparent">
        <p className="text-white  bg-transparent"> Products</p>
        <p className="text-white text-4xl py-5 bg-transparent">{products?.data.length}</p>
        </div>
        </div>
        <hr />
        <p className="font-mono text-white bg-transparent relative">{(Number(products?.data?.length) * 3.67).toFixed(2)}% Increase <BsGraphUpArrow className="bg-transparent absolute right-4 top-[6px] font-bold bold" />
        </p>
        <div>

        </div>
      </div>
      {/* users cart */}
      <div className=" bg-purple-900 p-3 w-52 h-36 rounded-lg ">
        <div className=" flex flex-row-reverse justify-between bg-transparent ">
       
        <TiGroup className="bg-transparent text-7xl mt-5 "  />

        <div className="bg-transparent">
        <p className="text-white  bg-transparent"> Users</p>
        <p className="text-white text-4xl py-5 bg-transparent">{users?.data?.length}</p>
        </div>
        </div>
        <hr />
        <p className="font-mono text-white bg-transparent relative">{(users?.data?.length * 3.67).toFixed(2)}% Increase <BsGraphUpArrow className="bg-transparent absolute right-4 top-[6px] font-bold bold" />
        </p>
        <div>

        </div>
      </div>
      {/* Total Sells products */}
      <div className=" bg-lime-800 p-3 w-52 h-36 rounded-lg ">
        <div className=" flex flex-row-reverse justify-between bg-transparent ">
        <FaSackDollar className="bg-transparent text-7xl mt-5 " />
      

        <div className="bg-transparent">
        <p className="text-white  bg-transparent"> Sells</p>
        <p className="text-white text-4xl py-5 bg-transparent">{products?.data?.length}</p>
        </div>
        </div>
        <hr />
        <p className="font-mono text-white bg-transparent relative">{(products?.data?.length * 3.67).toFixed(2)}% Increase <BsGraphUpArrow className="bg-transparent absolute right-4 top-[6px] font-bold bold" />
        </p>
        <div>

        </div>
      </div>
      <div className=" bg-yellow-600 p-3 w-52 h-36 rounded-lg bg-transparent">
        <div className=" flex flex-row-reverse justify-between bg-transparent ">
       
        < MdOutlineReportProblem  className="bg-transparent text-7xl mt-5 " />

        <div className="bg-transparent">
        <p className="text-white  bg-transparent"> Reported items</p>
        <p className="text-white text-4xl py-5 bg-transparent">{products?.data?.length}</p>
        </div>
        </div>
        <hr />
        <p className="font-mono text-white bg-transparent relative">{(products?.data?.length * 3.67).toFixed(2)}% Increase <BsGraphUpArrow className="bg-transparent absolute right-4 top-[6px] font-bold bold" />
        </p>
        <div>

        </div>
      </div>
      </div>

    {/* chart section start here */}
    <div>
      {chartData && <PieChart chartData={chartData} />}
    </div>
    </div>
     }
    </div>
  )
}

export default Overview