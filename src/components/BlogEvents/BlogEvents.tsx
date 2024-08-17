
import img from '../../assets/images/Blog-3.jpg'
import img2 from '../../assets/images/Blog-4.jpg'


const BlogEvents=()=>{
    const dateObj = new Date(Date.now());

    const day = String(dateObj.getDate()).padStart(2, '0'); // Gets the day and pads with 0 if needed
    const month = dateObj.toLocaleString('default', { month: 'short' }); // Gets the month in short form (e.g., Jan)
    const year = dateObj.getFullYear(); // Gets the year
    
    const formattedDate = `${day}-${month}-${year}`;    return (
        <div>
            <h4 className='text-3xl font-bold mx-8 mb-6'>Blog & Events</h4>
        <div className='flex flex-col md:flex-row lg:flex-row justify-center'>
            {/* cart1 */}
            <div className='flex flex-col md:flex-row justify-center border border-gray-500 w-fit md:w-[500px] p-4 rounded-lg gap-4 m-3'>
                <img className='w-full md:w-52 h-fit md:h-44 rounded-lg' src={img} alt="blog image" />
                <div>
                    <p>{formattedDate}</p>
                    <p className='text-lg font-semibold mb-2 text-primary'>Which of us ever undertakes?</p>
                    <p>In life's journey, who among us truly embarks on the path to self-discovery without hesitation? </p>
                    <p className='mt-6 text-gray-400'><span className="text-sky-800 font-semibold ">By</span> Space Tech</p>
                </div>
            </div>
            {/* cart2 */}
            <div className='flex flex-col md:flex-row justify-center border border-gray-500 w-fit md:w-[500px] p-4 rounded-lg gap-4 m-3'>
                <img className='w-full md:w-52 h-fit md:h-44 rounded-lg' src={img2} alt="blog image" />
                <div>
                    <p>{formattedDate}</p>
                    <p className='text-lg font-semibold mb-2 text-primary'>Why do we use it?</p>
                    <p>In the pursuit of comfort, some may avoid challenges or discomfort that lead to growth. </p>
                    <p className='mt-6 text-gray-400'><span className="text-sky-800 font-semibold ">By</span> Space Tech</p>
                </div>
            </div>

        </div>
        </div>
    )
}
export default BlogEvents