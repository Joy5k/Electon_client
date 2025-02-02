
import { Link } from 'react-router-dom'
import { useGetAllCategoriesQuery } from '../../redux/features/admin/productManagementApi';
import { ICategory } from '../../types';
import Spinner from '../Spinner/Spinner';
const CategorySlider = () => {
  const {data:categories,isLoading}=useGetAllCategoriesQuery({})
  const slicedCategories=categories?.data.slice(0,5)


if(isLoading){
  return <Spinner></Spinner>
}
  return (
   <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mx-auto border-t border-dashed my-16'>
  
{
  slicedCategories?.map((category:ICategory,i:number)=>(
<div key={i} className='flex  items-center border p-3 w-fit rounded-md mx-auto my-10
    '>
      <img src={category.category === "pc" ? "images/laptop.png" : category.category === "box" ? "images/box.jpg" : category.category === "camera" ? "images/camera-1.png" :  "https://cdn-icons-png.flaticon.com/512/3696/3696504.png"} alt="" className='w-36 h-36' />
      <div>
<Link to="/" className='text-xl font-bold mb-4 hover:text-primary transition-colors block '>
{(category?.category === "pc" ? "PC & Laptop" : category?.category ?? "").toUpperCase()}
</Link>

        <Link to="/">
      <button className="relative bg-black text-white  text-lg py-2 px-4 rounded overflow-hidden group">
        <span className="block text-sm bg-primary px-2 rounded-sm ">10+ items</span>
        <span className="absolute w-full underline inset-0 flex items-center justify-center bg-black text-primary  rounded transform scale-0 group-hover:scale-100 transition-transform duration-300">
          Shop Now
        </span>
      </button>
    </Link>      
    </div>
    </div>
  ))
}

    



    
   </div>
  );
};

export default CategorySlider;
