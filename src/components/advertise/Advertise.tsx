
import { useNavigate } from 'react-router-dom'
import tv from '../../assets/images/tv.png'
import { useGetSingleProductQuery } from '../../redux/features/admin/productManagementApi'
const Advertise=()=>{
    const navigate=useNavigate()
    const {data}=useGetSingleProductQuery("67526311cd73361733204aa7")
   const product=data?.data
   
   const handleProceedToCheckout = () => {
    if (product.length === 0) {
      alert('Please select at least one product to proceed.');
      return;
    }
    // Proceed with the selected products (You can pass `selectedProducts` to the next route)
    navigate('/checkout', { state: { product } });

  };
    return (
        <div className=' border border-black border-b-red-200 '>
            <div className='flex flex-col md:flex-row lg:flex-row gap-0 justify-evenly p-10 w-full'>
                    <div className=''>
                         <img src={tv} className='w-96 bg-transparent' alt="Advertise product Image" />
                    </div>
                <div  className=' flex flex-col justify-center items-center bg-transparent gap-10 '>
                        <span className='p-2 md:p-5 lg:p-5 text-white bg-primary px-3 md:px-16 text-center font-semibold text-xl'>HD television</span>
                        <h2 className='text-5xl text-white text-center bg-transparent'>Sale up to 50% off
                         </h2>
                        <p className='text-xl font-semibold text-white bg-transparent'>{product?.title||"32 inch HD display"}
                         </p>
                        <button onClick={handleProceedToCheckout} className='capitalize text-white bg-primary p-3 md:p-4 rounded-full text-center px-8 font-semibold hover:bg-gray-400'>Shop now</button>
                </div>
            </div>
        </div>
    )
}
export default Advertise