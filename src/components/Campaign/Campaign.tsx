import  { useState, useEffect } from 'react';

import { FaShoppingBag } from 'react-icons/fa'
import { FaHeart } from 'react-icons/fa6'
import { useGetDealOfTheDayQuery } from '../../redux/features/offers/offerManagement';
import { toast } from 'sonner';

const Campaign=()=>{
    const {data}=useGetDealOfTheDayQuery({})
    const products=data?.data;
    const singleProduct=data?.data[0].productId;

    // const initialTime = Math.floor(
    //     (new Date(products[0].offerStartDate).getTime() - Date.now()) / 1000
    //   );

    //   const [time, setTime] = useState(initialTime > 0 ? initialTime : 0);
      const [time, setTime] = useState( 10)
    
      useEffect(() => {
        const interval = setInterval(() => {
          setTime((prevTime) => {
            if (prevTime <= 0) {
              clearInterval(interval);
              return 0; // Ensure the counter stops at 0
            }
            return prevTime - 1;
          });
        }, 1000);
    
        return () => clearInterval(interval); // Cleanup on component unmount
      }, []);
return (
    <div>
        <div className='flex flex-col md:flex-row  justify-between items-center'>
            <p className='text-4xl text-white font-semibold ml-10 my-10'>Deal of The Day</p>
            {/* <div className='flex justify-between gap-4 mr-1 md:mr-10 '>
                <button className='text-white border border-primary border-dashed rounded-full p-2 hover:bg-gray-900'>20% off</button>
                <button className='text-white border border-primary border-dashed rounded-full p-2 hover:bg-gray-900'>23% off</button>
                <button className='text-white border border-primary border-dashed rounded-full p-2 hover:bg-gray-900'>27% off</button>
            </div> */}
        </div>
        <div className='flex flex-col md:flex-row justify-evenly px-4'>
           {
            products &&  <div className='flex flex-col md:flex-row mb-4 w-full md:w-6/12 border border-dashed border-gray-800 p-8'>
            <img src={singleProduct?.image} className='w-72 h-fit' alt="" />
            <div>
                <p className='text-4xl font-semibold text-white ml-3 md:ml-8 mt-10 mb-4 '>{singleProduct?.title}</p>
                <p className='text-yellow-400 text-lg font-semibold ml-8'>Price:{singleProduct?.price}$</p>
               <div>
               <div className="flex justify-start items-center mt-10 ml-6">
                 <div >
                   {
                    time ?   <p className="text-gray-600 text-5xl font-bold ">
                    End:{Math.floor(time / 60).toString().padStart(2, '0')}:
                    {(time % 60).toString().padStart(2, '0')}
                    </p> : <p onClick={()=>toast.warning("wait for next round")}  className='text-red-600  font-semibold underline cursor-pointer '>Offer has been closed</p>
                   }
                    </div>
                    </div>
               </div>
                <div className=' flex justify-evenly  text-xl mt-12 -ml-5 bg-transparent'>
                   <button className='p-4 rounded-full border hover:bg-primary'>
                     <FaShoppingBag className='bg-transparent'></FaShoppingBag>
                    </button>
                    <button className='p-4 rounded-full border hover:bg-primary'>
                        <FaHeart className='bg-transparent'></FaHeart>
                    </button>
                </div>
            </div> 
        </div>

           }
            <div className=' border-gray-800 flex  flex-col  justify-center'>
            {
  products?.slice(1,3).map((product, i: number) => {
    return (
      <div
        key={i}
        className="flex p-4 border border-dashed mb-3 rounded-md border-gray-800"
      >
        <img
          src={product?.productId?.image}
          className="w-32 h-fit"
          alt=""
        />
        <div className="ml-4 px-6">
          <p className="text-lg text-white font-semibold font-mono">
            {product?.productId?.title}
          </p>
          <p className="text-primary font-mono font-semibold">
            Price: {product?.productId?.price}$
          </p>
          <div className="flex justify-evenly text-xl mt-6 -ml-7 bg-transparent">
            <button className="p-3 rounded-full border hover:bg-primary">
              <FaShoppingBag className="bg-transparent"></FaShoppingBag>
            </button>
            <button className="p-3 rounded-full border hover:bg-primary">
              <FaHeart className="bg-transparent"></FaHeart>
            </button>
          </div>
        </div>
      </div>
    );
  })
}


            </div>
        </div>
    </div>
)

}
export default Campaign