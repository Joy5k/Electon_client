import { CiBoxes } from "react-icons/ci";
import { BsGraphUpArrow } from "react-icons/bs";
import { TiGroup } from "react-icons/ti";
import { FaSackDollar } from "react-icons/fa6";
import { MdOutlineReportProblem } from "react-icons/md";
import { useAllProductsQuery } from "../../../redux/features/admin/productManagementApi";
import Spinner from "../../../components/Spinner/Spinner";
import { useGetAllUsersQuery } from "../../../redux/features/admin/userManagementApi";



function Overview() {
  const {data:products,isLoading}=useAllProductsQuery({})
  const {data:users,isLoading:userLoading}=useGetAllUsersQuery({})
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

      
    </div>
     }
    </div>
  )
}

export default Overview