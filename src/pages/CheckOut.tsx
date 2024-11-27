
import { useLocation } from "react-router-dom";
import { IProduct, IUser } from "../types";
import { useEffect, useState } from "react";
import { useGetUserQuery } from "../redux/features/userManagement/userManagement";

const Checkout=()=>{
    const {data}=useGetUserQuery({})
   
    const location = useLocation();
    const { selectedProducts } = location.state || { selectedProducts: [] };
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const  user=data?.data||{} as IUser

    // sum total price
    useEffect(() => {
      if (selectedProducts && selectedProducts.length > 0) {
        const total = selectedProducts.reduce(
          (accumulator:number, product:{productId:IProduct}) =>
            accumulator + (product.productId?.price || 0),
          0
        );
        setTotalPrice(total);
      }
    }, [selectedProducts]);
    console.log(user)
    return(
        <div className="mt-10 w-11/12 mx-auto">
            <div className="flex flex-col-reverse md:flex-row lg:flex-row justify-evenly items-start ">
                <div className="">
                    <p>Account</p>
                    <p className="my-1">Email:{user?.email}</p>
                    <input type="checkbox" name="subscribe" id="" /><span>Email me with news and offers
                    </span>
                    <hr  className="my-6"/>
                    <div>
                        <form >
                            <h3 className="text-2xl text-white">Delivery</h3>
                            <select name="country" className="w-full border border-gray-600 p-3 rounded-sm mt-8" id="">
                                <option value="bangladesh">Bangladesh</option>
                                <option value="usa">USA</option>
                                <option value="pakistan">Pakistan</option>
                                <option value="palestine">Palestine</option>
                                <option value="canada">Canada</option>
                            </select>
                            <div className="flex flex-col md:flex-row lg:flex-row justify-start">
                            <input type="text" className="p-3 rounded-sm mt-4 w-full md:w-[300px] lg:w-[300px] border border-gray-600 mr-2" name="fistName" placeholder={user?.firstName||"First Name *"} />
                            <input type="text" className="p-3 rounded-sm mt-4 w-full md:w-[300px] lg:w-[300px] border border-gray-600" name="lastName" placeholder={user.lastName||"Last Name *"} />
                            </div>
                        <input type="text" className="w-full border border-gray-600 p-3 rounded-sm mt-4" name="address" id="" placeholder="Your full address *" required/>
                        <input type="text" className="w-full border border-gray-600 p-3 rounded-sm mt-4" name="apartment" id="" placeholder="Apartment (optional)" />
                        <div className="flex flex-col md:flex-row lg:flex-row justify-start mb-10">
                        <input type="text" className="p-3 rounded-sm mt-4 w-full md:w-[300px] lg:w-[300px] border border-gray-600 mr-2" name="city" placeholder={user?.address?.district||"Patuakhali"} />
                        <input type="text" className="p-3 rounded-sm mt-4 w-full md:w-[300px] lg:w-[300px] border border-gray-600" name="postCode" placeholder={user?.address?.postCode||"8600"} />
                        
                        </div>
                      
                        </form>
                        <div>
                            <p className="mt-16 mb-4 font-bold text-xl">Shipping method
                            </p>
                        <p className="border mb-8 border-green-600  p-4 text-start  bg-green-950">Credit card
                        </p>
                        <form >
                            <input type="text" className="p-3 border border-gray-600 w-full" placeholder="cart number" name="cartNumber" id="" />
                         <div className="flex flex-col md:flex-row lg:flex-row justify-start">
                            <input type="text" className="p-3 rounded-sm mt-4 w-full md:w-[300px] lg:w-[300px] border border-gray-600 mr-2" name="expirationDate" placeholder="Expiration Date" />
                            <input type="text" className="p-3 rounded-sm mt-4 w-full md:w-[300px] lg:w-[300px] border border-gray-600 " name="securityCode" placeholder="Security Code" />
                         </div>
                        <button className="hover:bg-green-600 text-white p-4 rounded-md text-center font-semibold w-full  my-5 bg-green-800"> Pay Now</button>
                        </form>
                        </div>
                    </div>
                </div>
           {/* selected products section */}
              <div>
                 <div>
                 {
                  selectedProducts &&
                     selectedProducts?.map((prod:{userId:IUser,productId:IProduct,userSelectedQuantity:number}, index:number) => (
    <div
      key={index}
      className="flex md:flex-row lg:flex-row justify-start mt-6 items-center"
    >
      <img
        src={prod?.productId.image}
        className="w-24 h-24 rounded-lg mr-1"
        alt="product_image"
      />
      <div className="flex justify-between gap-4 md:gap-8 lg:gap-8">
        <div>
          <p className="text-md font-bold">{prod?.productId.title || 'Product Name'}</p>
          <p>Color: {prod?.productId.color || 'Unknown'}</p>
        </div>
        <p>Quantity: {prod?.userSelectedQuantity || 1}</p>
        <p>{prod?.productId.price ? `$${prod.productId.price}` : 'Price not available'}</p>
      </div>
    </div>
                  ))
                    }
                </div>
        {/* shipping summery */}
                <div className="mt-36 flex  justify-between border-b mb-20">
                  <div className="mb-2">
                        <p>subtotal</p>
                        <p>shipping</p>
                        <p className="mt-10 font-bold">Total</p>
                    </div>
                    
                    <div>
                        <p>{totalPrice} $</p>
                        <p>50 $</p>
                        <p className="mt-10 font-bold">{totalPrice+50}</p>
                    </div>
                  
                  </div>
              </div>
            </div>
        </div>
    )
}
export default Checkout