


const Checkout=()=>{

    return(
        <div>
            <div>
                <div>
                    <p>Account</p>
                    <p className="my-1">Email:web@gmail.com</p>
                    <input type="checkbox" name="subscribe" id="" /><span>Email me with news and offers
                    </span>
                    <hr  className="my-6"/>
                    <div>
                        <form >
                            <h3 className="text-2xl text-white">Delivery</h3>
                            <select name="country" className="w-full border p-3 rounded-sm mt-8" id="">
                                <option value="bangladesh">Bangladesh</option>
                                <option value="usa">USA</option>
                                <option value="pakistan">Pakistan</option>
                                <option value="palestine">Palestine</option>
                                <option value="canada">Canada</option>
                            </select>
                            <div className="flex flex-col md:flex-row lg:flex-row justify-start">
                            <input type="text" className="p-3 rounded-sm mt-4 w-full md:w-[300px] lg:w-[300px] border mr-2" name="fistName" placeholder="First Name" />
                            <input type="text" className="p-3 rounded-sm mt-4 w-full md:w-[300px] lg:w-[300px] border" name="lastName" placeholder="Last Name" />
                            </div>
                        <input type="text" className="w-full border p-3 rounded-sm mt-4" name="address" id="" placeholder="Address" />
                        <input type="text" className="w-full border p-3 rounded-sm mt-4" name="apartment" id="" placeholder="Apartment (optional)" />
                        <div className="flex flex-col md:flex-row lg:flex-row justify-start mb-10">
                        <input type="text" className="p-3 rounded-sm mt-4 w-full md:w-[300px] lg:w-[300px] border mr-2" name="city" placeholder="City" />
                        <input type="text" className="p-3 rounded-sm mt-4 w-full md:w-[300px] lg:w-[300px] border" name="postCode" placeholder="Post Code (optional)" />
                        
                        </div>
                      
                        </form>
                        <div>
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
                <div>
                    <img src="" alt="" />
                    <div>
                        <p></p>
                        <p>quantity:2</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Checkout