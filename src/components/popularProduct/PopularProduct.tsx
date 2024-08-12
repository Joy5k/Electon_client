
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
      <div>
      <div>

<h2 className="text-4xl text-primary font-bold my-10">Popular Products</h2>
</div>
<div>
<button></button>
</div>
      </div>
        <div className="bg-black border border-gray-800  p-4 rounded-md w-64">
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
    </div>
)
}
export default PopularProduct