
import brand from '../../assets/images/brand-2.png'
import brand2 from '../../assets/images/brand-3.png'
import brand3 from '../../assets/images/brand-4.png'
import brand4 from '../../assets/images/brand-5.png'

const Brand=()=>{
    return (
        <div>
            <div className='flex flex-col md:flex-row justify-center p-20 bg-gray-900 mx-8 my-20'>
                <img className='bg-transparent mx-auto'  src={brand} alt="Brand Image" />
                <img className='bg-transparent mx-auto' src={brand2} alt="Brand Image" />
                <img className='bg-transparent mx-auto' src={brand3} alt="Brand Image" />
                <img className='bg-transparent mx-auto' src={brand4} alt="Brand Image" />
            </div>
        </div>
    )
}
export default Brand