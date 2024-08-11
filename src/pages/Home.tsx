
import banner from '../assets/banner4.png'
const HomePage=()=>{

    return(
        <div className=" flex flex-col-reverse md:flex-row   ">
          <div className="xs:p-4 sm:p-4 md:p-20 flex-1 r">
            <h3 className="text-7xl text-white font-bold flex flex-col gap-3 text-center md:text-start"><span>Portable</span><span >Speaker</span></h3>
            <div className="flex gap-3 mt-20 items-center justify-center md:justify-start">
            <button className="capitalize text-white bg-primary hover:bg-gray-800 hover:text-primary p-4 rounded-full text-xl font-bold ">Shop Now</button>
            <button className="capitalize text-white hover:bg-gray-800 hover:text-white p-4 rounded-full text-xl font-bold border">View more</button>
            </div>
          </div>
          {/* banner image */}
          <div className='flex-1 py-12'>
            <img className='bg-transparent w-full h-fit' src={banner} alt="Banner Image" />
          </div>
          
        </div>
    )
}

export default HomePage;