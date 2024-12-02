import { CiBoxes } from "react-icons/ci";
import { BsGraphUpArrow } from "react-icons/bs";
import { FaSackDollar } from "react-icons/fa6";
import { MdOutlineReportProblem } from "react-icons/md";
import { useEffect, useState } from "react";
import PieChart from "../../dashboardComponents/charts/PieChart";
import { useGetAllMyProductsQuery } from "../../../../redux/features/products/productsApi";
import Spinner from "../../../../components/Spinner/Spinner";
import { IProduct } from "../../../../types";



function SellerOverview() {
  const {data:products,isLoading}=useGetAllMyProductsQuery({})
  const [chartData, setChartData] = useState<any>(null);

  // set products and user data for chart
  useEffect(() => {
    if (products?.data as IProduct) {
      setChartData({
        labels: ["Products", "Users"], // Labels for the datasets
        datasets: [
          {
            label: "Products",
            data: [50, 0],
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 2,
            fill: true,
          },
          
        ],
      });
    }
  }, [products]);

return (

   <div>
     <div className="w-full" >
     {
      isLoading ? <div className="flex justify-center items-center align-middle mx-auto w-11/12"><Spinner></Spinner></div> :
      <div className="">
      {/* overview carts */}
      <h3 className="text-xl font-bold mb-5 bg-transparent">Overview</h3>
    <div className="flex flex-col md:flex-row lg:flex-row mb-5 gap-3 ">

      {/* products cart */}
      <div className=" bg-emerald-800 p-3 min-w-52 min-h-36 w-72 rounded-lg ">
        <div className=" flex flex-row-reverse justify-between bg-transparent ">
        <CiBoxes className="bg-transparent text-7xl mt-5 " />

        <div className="bg-transparent">
        <p className="text-white  bg-transparent"> Products</p>
        <p className="text-white text-4xl py-5 bg-transparent">{products?.data?.length||0}</p>
        </div>
        </div>
        <hr />
        <p className="font-mono text-white bg-transparent relative">{(Number(products?.data?.length||0) * 3.67).toFixed(2)}% Increase <BsGraphUpArrow className="bg-transparent absolute right-4 top-[6px] font-bold bold" />
        </p>
        <div>

        </div>
      </div>
    
    
      {/* Total Sells products */}
      <div className=" bg-lime-800 p-3 min-w-52 min-h-36 w-72 rounded-lg ">
        <div className=" flex flex-row-reverse justify-between bg-transparent ">
        <FaSackDollar className="bg-transparent text-7xl mt-5 " />
      

        <div className="bg-transparent">
        <p className="text-white  bg-transparent"> Sells</p>
        <p className="text-white text-4xl py-5 bg-transparent">{products?.data?.length||0}</p>
        </div>
        </div>
        <hr />
        <p className="font-mono text-white bg-transparent relative">{(products?.data?.length||0 * 3.67).toFixed(2)}% Increase <BsGraphUpArrow className="bg-transparent absolute right-4 top-[6px] font-bold bold" />
        </p>
        <div>

        </div>
      </div>
      <div className=" bg-yellow-600 p-3 min-w-52 min-h-36 w-72 rounded-lg bg-transparent">
        <div className=" flex flex-row-reverse justify-between bg-transparent ">
       
        < MdOutlineReportProblem  className="bg-transparent text-7xl mt-5 " />

        <div className="bg-transparent">
        <p className="text-white  bg-transparent"> Reported items</p>
        <p className="text-white text-4xl py-5 bg-transparent">{products?.data?.length||0}</p>
        </div>
        </div>
        <hr />
        <p className="font-mono text-white bg-transparent relative">{(products?.data?.length ||0* 3.67).toFixed(2)}% Increase <BsGraphUpArrow className="bg-transparent absolute right-4 top-[6px] font-bold bold" />
        </p>
        <div>

        </div>
      </div>
      </div>

    {/* chart section start here */}
    <h3 className="my-6 text-xl   font-bold  ">Product with Pie chart</h3>
 {/* Charts section started here */}
 <div className="flex flex-col md:flex-row lg:flex-row justify-center align-middle items-center gap-3">
 <div className="w-full md:w-1/2 lg:w-1/2">
      {chartData && <PieChart chartData={chartData} />}
    </div>

 </div>
 </div>
     }
   
    </div>
   </div>
  )
}

export default SellerOverview