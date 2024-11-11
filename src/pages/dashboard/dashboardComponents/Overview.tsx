import { CiBoxes } from "react-icons/ci";



function Overview() {
  const products=[]
  return (
    <div className="w-full" >
      <div className="bg-gray-400">
        {/* overview carts */}
        <div>
        <div className="border bg-sky-600 p-3 w-52 h-36 rounded-lg bg-transparent">
          <div className=" flex flex-row-reverse justify-between bg-transparent">
          <CiBoxes className="bg-transparent text-2xl" />

          <div className="bg-transparent">
          <p className="text-white text-sm  bg-transparent"> Products</p>
          <p className="text-white text-4xl py-5 bg-transparent">{products?.length}</p>
          </div>
          </div>
          <hr />
          <p className="font-mono text-white bg-transparent">{(products?.length * 3.67).toFixed(2)}% Increase</p>
          <div>

          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Overview