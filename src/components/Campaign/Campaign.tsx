import  { useState, useEffect } from 'react';

import { FaShoppingBag } from 'react-icons/fa'
import router from '../../assets/images/router.jpg'
import { FaHeart } from 'react-icons/fa6'

const Campaign=()=>{
    const [time, setTime] = useState(6000);

    useEffect(() => {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);
return (
    <div>
        <div className='flex flex-col md:flex-row  justify-between items-center'>
            <p className='text-4xl text-white font-semibold ml-10 my-10'>Deal of The Day</p>
            <div className='flex justify-between gap-4 mr-1 md:mr-10 '>
                <button className='text-white border border-primary border-dashed rounded-full p-2 hover:bg-gray-900'>20% off</button>
                <button className='text-white border border-primary border-dashed rounded-full p-2 hover:bg-gray-900'>23% off</button>
                <button className='text-white border border-primary border-dashed rounded-full p-2 hover:bg-gray-900'>27% off</button>
            </div>
        </div>
        <div className='flex flex-col md:flex-row justify-evenly px-4'>
            <div className='flex flex-col md:flex-row mb-4 w-full md:w-6/12 border border-dashed border-gray-800 p-8'>
                <img src={router} className='w-72 h-fit' alt="" />
                <div>
                    <p className='text-4xl font-semibold text-white ml-3 md:ml-8 mt-10 mb-4 '>virtual router</p>
                    <p className='text-yellow-400 text-lg font-semibold ml-8'>Price:56$</p>
                   <div>
                   <div className="flex justify-start items-center mt-10 ml-6">
      <div className="text-gray-600 text-5xl font-bold ">
        End:{Math.floor(time / 60).toString().padStart(2, '0')}:
        {(time % 60).toString().padStart(2, '0')}
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

            <div className=' border-gray-800'>
             <div className='flex p-4 border border-dashed mb-3 rounded-md border-gray-800'>
                <img src={router} className='w-32 h-fit' alt="" />
                <div className='ml-4 px-6'>
                    <p className='text-lg text-white font-semibold font-mono'>Bluetooth Speaker</p>
                    <p className='text-primary font-mono font-semibold'>Price:34$</p>
                    <div className=' flex justify-evenly  text-xl mt-6 -ml-7 bg-transparent'>
                       <button className='p-3 rounded-full border hover:bg-primary'>
                         <FaShoppingBag className='bg-transparent'></FaShoppingBag>
                        </button>
                        <button className='p-3 rounded-full border hover:bg-primary'>
                            <FaHeart className='bg-transparent'></FaHeart>
                            </button>
                    </div>
                </div>
             </div>
             <div className='flex p-4 border border-dashed rounded-md border-gray-800'>
                <img src={router} className='w-32 h-fit' alt="" />
                <div className='ml-4 p-6'>
                    <p className='text-lg text-white font-semibold font-mono'>Bluetooth Speaker</p>
                    <p className='text-primary font-mono font-semibold'>Price:34$</p>
                    <div className=' flex justify-evenly  text-xl mt-6 -ml-7 bg-transparent'>
                       <button className='p-3 rounded-full border hover:bg-primary'>
                         <FaShoppingBag className='bg-transparent'></FaShoppingBag>
                        </button>
                        <button className='p-3 rounded-full border hover:bg-primary'>
                            <FaHeart className='bg-transparent'></FaHeart>
                            </button>
                    </div>
                </div>
             </div>
            </div>
        </div>
    </div>
)

}
export default Campaign