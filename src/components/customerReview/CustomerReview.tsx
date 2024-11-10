
import men from '../../assets/images/men.jpg'
import men2 from '../../assets/images/men2.jpg'
import men3 from '../../assets/images/women.jpg'
const CustomerReview=()=>{

    return (
        <div>
            <h3 className='text-4xl text-center font-bold my-10'>Customer love
            </h3>
            <div className=' flex flex-col md:flex-row lg:flex-row justify-center mx-0 md:mx-10 gap-6'>
                <div className='border border-dashed border-gray-700 w-full p-8'>
                   <div className='flex items-center justify-start gap-6 mb-2'>
                   <img src={men} className='w-20 h-20 rounded-full border border-primary border-dashed p-1' alt="" />
                   <p className='text-2xl font-mono font-bold'>Mehedi Hasan</p>
                   </div>
                    <div> 
                  <p >  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, maxime!
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, maxime!</p>
                    </div>
                </div>
                <div className='border border-dashed border-gray-700 w-full p-8'>
                   <div className='flex items-center justify-start gap-6 mb-2'>
                   <img src={men2} className='w-20 h-20 rounded-full border border-primary border-dashed p-1' alt="" />
                   <p className='text-2xl font-mono font-bold'>Michel ston</p>
                   </div>
                    <div> 
                  <p >  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, maxime!
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, maxime!</p>
                    </div>
                </div>
                <div className='border border-dashed border-gray-700 w-full p-8'>
                   <div className='flex items-center justify-start gap-6 mb-2'>
                   <img src={men3} className='w-20 h-20 rounded-full border border-primary border-dashed p-1' alt="" />
                   <p className='text-2xl font-mono font-bold'>Chris p.creem</p>
                   </div>
                    <div> 
                  <p >  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, maxime!
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, maxime!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CustomerReview