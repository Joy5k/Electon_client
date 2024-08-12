
import tv from '../../assets/images/tv.png'
const Advertise=()=>{

    return (
        <div>
            <div className='flex justify-between p-10'>
                <div className='w-4/12'>
                <img src={tv} className='w-full bg-gray-700' alt="Advertise product Image" />
                </div>
                <div  className='w-8/12 flex flex-col justify-center items-center bg-gray-700 gap-10 '>
                    <span className='p-5 text-white bg-primary px-16 text-center font-semibold text-xl'>HD television</span>
              <h2 className='text-5xl text-white text-center bg-transparent'>Sale up to 50% off
              </h2>
              <p className='text-xl font-semibold text-white bg-transparent'>32 inch HD display
              </p>
              <button className='capitalize text-white bg-primary p-4 rounded-full text-center px-8 font-semibold hover:bg-gray-400'>Shop now</button>
                </div>
            </div>
        </div>
    )
}
export default Advertise