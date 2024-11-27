
function StripePayment() {
  return (
    <div>  <div>
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
</div></div>
  )
}

export default StripePayment