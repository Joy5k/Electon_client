
import img1 from "../../assets/images/img_p.webp"
import img2 from "../../assets/images/imge_p2.webp"
import img3 from "../../assets/images/img_p3.webp"
import img4 from "../../assets/images/img_p4.webp"
import { Link } from "react-router-dom"
import { FaBagShopping } from "react-icons/fa6"

const PopularProduct=()=>{
return(
    <div className="p-4">
        {/* filtering and title */}
      <div className="flex flex-col md:flex-row justify-between items-center">
      <div>

<h2 className="text-4xl text-primary font-bold my-10">Popular Products</h2>
</div>
<div>
<button className="text-md p-2 rounded-full border border-gray-500 hover:bg-gray-800 hover:text-primary m-3">Laptops</button>
<button className="text-md p-2 rounded-full border border-gray-500 hover:bg-gray-800 hover:text-primary m-3">Cameras</button>
<button className="text-md p-2 rounded-full border border-gray-500 hover:bg-gray-800 hover:text-primary m-3">Battery</button>
<button className="text-md p-2 rounded-full border border-gray-500 hover:bg-gray-800 hover:text-primary m-3">Mouse</button>
</div>
      </div>

      
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 my-10 ">
         {/* cart */}
         <div className="bg-black border border-gray-800  p-4 rounded-md w-64 mx-auto ">
            <div>
            <img src={img1} className="w-60 h-60 rounded-sm" alt="popular_image" />
            </div>
        {/* cart body */}
        <div className="text-md mt-10 flex justify-between items-center mr-4 ">
<div >
<Link to="/" className="text-gray-300 font-semibold hover:text-primary mb-4">Play game</Link>
<p className="mt-2 text-primary font-semibold">Price:50$</p>
</div>
<button className=" hover:border hover:rounded-full hover:p-2 p-2 hover:border-primary">
  <FaBagShopping className="text-3xl text-primary hover:text-white bg-transparent" />
</button>
        </div>
        </div>
{/* 2nd cart */}
 {/* cart */}
 <div className="bg-black border border-gray-800  p-4 rounded-md w-64 mx-auto">
            <div>
            <img src={img2} className="w-60 h-60 rounded-sm" alt="popular_image" />
            </div>
        {/* cart body */}
        <div className="text-md mt-10 flex justify-between items-center mr-4 ">
<div >
<Link to="/" className="text-gray-300 font-semibold hover:text-primary mb-4">Play game</Link>
<p className="mt-2 text-primary font-semibold">Price:50$</p>
</div>
<button className=" hover:border hover:rounded-full hover:p-2 p-2 hover:border-primary">
  <FaBagShopping className="text-3xl text-primary hover:text-white bg-transparent" />
</button>
        </div>
        </div>

        {/* 3rd cart */}
         {/* cart */}
         <div className="bg-black border border-gray-800  p-4 rounded-md w-64 mx-auto">
            <div>
            <img src={img3} className="w-60 h-60 rounded-sm" alt="popular_image" />
            </div>
        {/* cart body */}
        <div className="text-md mt-10 flex justify-between items-center mr-4 ">
<div >
<Link to="/" className="text-gray-300 font-semibold hover:text-primary mb-4">Play game</Link>
<p className="mt-2 text-primary font-semibold">Price:50$</p>
</div>
<button className=" hover:border hover:rounded-full hover:p-2 p-2 hover:border-primary">
  <FaBagShopping className="text-3xl text-primary hover:text-white bg-transparent" />
</button>
        </div>
        </div>

        {/* 4th cart  */}
         {/* cart */}
         <div className="bg-black border border-gray-800  p-4 rounded-md w-64 mx-auto">
            <div>
            <img src={img4} className="w-60 h-60 rounded-sm" alt="popular_image" />
            </div>
        {/* cart body */}
        <div className="text-md mt-10 flex justify-between items-center mr-4 ">
<div >
<Link to="/" className="text-gray-300 font-semibold hover:text-primary mb-4">Play game</Link>
<p className="mt-2 text-primary font-semibold">Price:50$</p>
</div>
<button className=" hover:border hover:rounded-full hover:p-2 p-2 hover:border-primary">
  <FaBagShopping className="text-3xl text-primary hover:text-white bg-transparent" />
</button>
        </div>
        </div>
     </div>
    </div>
)
}
export default PopularProduct