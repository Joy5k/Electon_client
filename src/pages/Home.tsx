import Advertise from '../components/advertise/Advertise';
import Campaign from '../components/Campaign/Campaign';
import Features from '../components/features/Features';
import PopularProduct from '../components/popularProduct/PopularProduct';
import { useGetSingleProductQuery } from '../redux/features/admin/productManagementApi';
import { Link, useNavigate } from 'react-router-dom';
import LazyLoad from "react-lazyload";
import CategorySlider from '../components/catergorySlider/categorySlider';
import BlogEvents from '../components/BlogEvents/BlogEvents';
import Brand from '../components/brand/Brand';
import CustomerReview from '../components/customerReview/CustomerReview';


const HomePage = () => {
  const navigate = useNavigate();
  const { data } = useGetSingleProductQuery("679e3fe387e4bf1f5ea8392e");
  const product = data?.data;
  const token = localStorage.getItem('token');

  const handleProceedToCheckout = () => {
    if (!token) {
      navigate('/login');
    }
    if (product.length === 0) {
      alert('Please select at least one product to proceed.');
      return;
    }
    const selectedProducts = [product];
    navigate('/checkout', { state: { selectedProducts } });
  };

  return (
    <div>
      <div className="flex flex-col-reverse md:flex-row">
        <div className="xs:p-4 sm:p-4 md:p-20 flex-1">
          <h3 className="text-7xl text-white font-bold flex flex-col gap-3 text-center md:text-start">
            <span>Portable</span><span>Speaker</span>
          </h3>
          <div className="flex gap-3 mt-20 items-center justify-center md:justify-start">
            <button onClick={() => handleProceedToCheckout()} className="capitalize text-white bg-primary hover:bg-gray-800 hover:text-primary p-4 rounded-full text-xl font-bold">
              Shop Now
            </button>
            <Link to="/category">
              <button className="capitalize text-white hover:bg-gray-800 hover:text-white p-4 rounded-full text-xl font-bold border">
                View more
              </button>
            </Link>
          </div>
        </div>
        <div className='flex-1 py-12'>
          <LazyLoad>
            <img className='bg-transparent w-full h-fit' src="https://i.ibb.co.com/5hDf7dP0/banner.png" alt="Banner Image" />
          </LazyLoad>
        </div>
      </div>

      <CategorySlider />
      <PopularProduct />
      <Advertise />
      <Campaign />
      <Features />

   
        <CustomerReview />
        <Brand />
        <BlogEvents />
  
    </div>
  );
};

export default HomePage;
