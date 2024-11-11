import { CiBoxes } from "react-icons/ci";
import { BsGraphUpArrow } from "react-icons/bs";



function Overview() {
  const products=[]
  return (
    <div className="w-full" >
      <div className="bg-gray-400">
        {/* overview carts */}
        <div className="flex flex-col md:flex-row lg:flex-row mb-5 gap-3">
        <div className=" bg-emerald-800 p-3 w-52 h-36 rounded-lg bg-transparent">
          <div className=" flex flex-row-reverse justify-between bg-transparent ">
          <CiBoxes className="bg-transparent text-7xl mt-5 animate-pulse" />

          <div className="bg-transparent">
          <p className="text-white  bg-transparent"> Products</p>
          <p className="text-white text-4xl py-5 bg-transparent">{products?.length}</p>
          </div>
          </div>
          <hr />
          <p className="font-mono text-white bg-transparent relative">{(products?.length * 3.67).toFixed(2)}% Increase <BsGraphUpArrow className="bg-transparent absolute right-4 top-[6px] font-bold bold" />
          </p>
          <div>

          </div>
        </div>
        <div className=" bg-emerald-800 p-3 w-52 h-36 rounded-lg bg-transparent">
          <div className=" flex flex-row-reverse justify-between bg-transparent ">
          <CiBoxes className="bg-transparent text-7xl mt-5 animate-pulse" />

          <div className="bg-transparent">
          <p className="text-white  bg-transparent"> Products</p>
          <p className="text-white text-4xl py-5 bg-transparent">{products?.length}</p>
          </div>
          </div>
          <hr />
          <p className="font-mono text-white bg-transparent relative">{(products?.length * 3.67).toFixed(2)}% Increase <BsGraphUpArrow className="bg-transparent absolute right-4 top-[6px] font-bold bold" />
          </p>
          <div>

          </div>
        </div>
        <div className=" bg-emerald-800 p-3 w-52 h-36 rounded-lg bg-transparent">
          <div className=" flex flex-row-reverse justify-between bg-transparent ">
          <CiBoxes className="bg-transparent text-7xl mt-5 animate-pulse" />

          <div className="bg-transparent">
          <p className="text-white  bg-transparent"> Products</p>
          <p className="text-white text-4xl py-5 bg-transparent">{products?.length}</p>
          </div>
          </div>
          <hr />
          <p className="font-mono text-white bg-transparent relative">{(products?.length * 3.67).toFixed(2)}% Increase <BsGraphUpArrow className="bg-transparent absolute right-4 top-[6px] font-bold bold" />
          </p>
          <div>

          </div>
        </div>
        <div className=" bg-emerald-800 p-3 w-52 h-36 rounded-lg bg-transparent">
          <div className=" flex flex-row-reverse justify-between bg-transparent ">
          <CiBoxes className="bg-transparent text-7xl mt-5 animate-pulse" />

          <div className="bg-transparent">
          <p className="text-white  bg-transparent"> Products</p>
          <p className="text-white text-4xl py-5 bg-transparent">{products?.length}</p>
          </div>
          </div>
          <hr />
          <p className="font-mono text-white bg-transparent relative">{(products?.length * 3.67).toFixed(2)}% Increase <BsGraphUpArrow className="bg-transparent absolute right-4 top-[6px] font-bold bold" />
          </p>
          <div>

          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Overview