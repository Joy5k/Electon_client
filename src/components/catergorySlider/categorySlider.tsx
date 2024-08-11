
import { Link } from 'react-router-dom'
import remote from '../../assets/remote.png'
import laptop from '../../assets/laptop.png'
import camera from '../../assets/camera-1.png'
const CategorySlider = () => {
  return (
   <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mx-auto border-t border-dashed my-16'>
  
    <div className='flex  items-center border p-3 w-fit rounded-md mx-auto my-10
    '>
      <img src={remote}alt="" />
      <div>
<Link to="/" className='text-xl font-bold mb-4 hover:text-primary transition-colors block '>
 Alexa Remote
</Link>

        <Link to="/">
      <button className="relative bg-black text-white  text-lg py-2 px-4 rounded overflow-hidden group">
        <span className="block text-sm bg-primary px-2 rounded-sm ">10+ items</span>
        <span className="absolute w-full underline inset-0 flex items-center justify-center bg-black text-primary  rounded transform scale-0 group-hover:scale-100 transition-transform duration-300">
          Shop Now
        </span>
      </button>
    </Link>      </div>
    </div>
{/* cart2 */}

    <div className='flex  items-center border p-3 w-fit rounded-md mx-auto my-10
    '>
      <img src={laptop}alt="" />
      <div>
<Link to="/" className='text-xl font-bold mb-4 hover:text-primary transition-colors block '>
Desktop & Laptop
</Link>

        <Link to="/">
      <button className="relative bg-black text-white  text-lg py-2 px-4 rounded overflow-hidden group">
        <span className="block text-sm bg-primary px-2 rounded-sm ">10+ items</span>
        <span className="absolute w-full underline inset-0 flex items-center justify-center bg-black text-primary  rounded transform scale-0 group-hover:scale-100 transition-transform duration-300">
          Shop Now
        </span>
      </button>
    </Link>      </div>
    </div>

    {/* cart3 */}

    <div className='flex  items-center border p-3 w-fit rounded-md mx-auto my-10
    '>
      <img src={camera}alt="" />
      <div>
<Link to="/" className='text-xl font-bold mb-4 hover:text-primary transition-colors block '>
 canon camera
</Link>

        <Link to="/">
      <button className="relative bg-black text-white  text-lg py-2 px-4 rounded overflow-hidden group">
        <span className="block text-sm bg-primary px-2 rounded-sm ">10+ items</span>
        <span className="absolute w-full underline inset-0 flex items-center justify-center bg-black text-primary  rounded transform scale-0 group-hover:scale-100 transition-transform duration-300">
          Shop Now
        </span>
      </button>
    </Link>      </div>
    </div>

    {/* cart4 */}

    <div className='flex  items-center border p-3 w-fit rounded-md mx-auto my-10
    '>
      <img src={remote}alt="" />
      <div>
<Link to="/" className='text-xl font-bold mb-4 hover:text-primary transition-colors block '>
 Alexa Remote
</Link>

        <Link to="/">
      <button className="relative bg-black text-white  text-lg py-2 px-4 rounded overflow-hidden group">
        <span className="block text-sm bg-primary px-2 rounded-sm ">10+ items</span>
        <span className="absolute w-full underline inset-0 flex items-center justify-center bg-black text-primary  rounded transform scale-0 group-hover:scale-100 transition-transform duration-300">
          Shop Now
        </span>
      </button>
    </Link>      </div>
    </div>

    
   </div>
  );
};

export default CategorySlider;
