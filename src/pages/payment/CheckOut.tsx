import { useLocation } from "react-router-dom";
import { IProduct, IUser } from "../../types";
import { useState } from "react";
import { useGetUserQuery } from "../../redux/features/userManagement/userManagement";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCreatePaymentIntentMutation } from "../../redux/features/paymentMangement/paymentManagementApi";
import jsPDF from "jspdf";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);


const Checkout = () => {
  const [stripePayment]=useCreatePaymentIntentMutation()
  const { data } = useGetUserQuery({});
  const location = useLocation();
  const { selectedProducts } = location.state || { selectedProducts: [] };
  const user = data?.data || ({} as IUser);
  const stripe = useStripe();
  const elements = useElements();

  const [paymentError,setPaymentError]=useState<string>("")
  const [openTransitionModal,setOpenTransitionModal]=useState<boolean>(false)
  const [paymentLoader,setPaymentLoader]=useState<boolean>(false)
  const [paymentTransitionText,setPaymentTransitionText]=useState<string>("")
  const [copyButtonText, setCopyButtonText] = useState("Copy");

// adding all products price with user selected quantity
  const subtotal = (selectedProducts || []).reduce((acc: number, product: any) => {
    return acc + product.productId.price * product.userSelectedQuantity;
  }, 0);
  
  

  // handle the transtion id copy from the payment modal input
  const handleCopy = () => {
    navigator.clipboard.writeText(paymentTransitionText).then(() => {
      setCopyButtonText("Copied");
      setTimeout(() => setCopyButtonText("Copy"), 2000); // Reset the button text after 2 seconds
    });
  };
  
  // download the transition from payment modal 
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(16);
    doc.text("Product Summary from ELECTON", 10, 10);
  
    // Add transaction ID
    doc.setFontSize(12);
    doc.text(`Transaction ID: ${paymentTransitionText}`, 10, 20);
  
    // Add headers for product details
    let y = 30; // Y-coordinate to start the product details
    doc.text("Product Details:", 10, y);
    y += 10; // Move to the next line
  
    // Loop through the products and add details
    selectedProducts.forEach((product:any, index:number) => {
      doc.text(`Product ${index + 1}:`, 10, y);
      y += 10;
      doc.text(`- Name: ${product?.productId?.title || "N/A"}`, 10, y);
      y += 10;
      doc.text(`-Product-Price: $${product?.productId?.price || "0"}`, 10, y);
      y += 10;
      doc.text(`- Quantity: ${product?.userSelectedQuantity || "1"}`, 10, y);
      y += 10;
      doc.text(`-sub-total: $${product?.productId?.price * product?.userSelectedQuantity|| "0"}`, 10, y);
      y += 10;
    
      
      // Check if the content exceeds the page height (297mm for A4) and add a new page if necessary
      if (y > 280) {
        doc.addPage();
        y = 10; // Reset Y-coordinate for the new page
      }
    });
    doc.text(`- Total Price(with shipping): ${subtotal.toFixed(2) +50}`, 10, y);
    y += 10;
    // Save the PDF
    doc.save("Product_Summary.pdf");
  };
  

  // Handle Payment Submission

  const handlePayment = async (event: any) => {
    setPaymentLoader(true)
    event.preventDefault();
  
    // Ensure Stripe and Elements are loaded before proceeding
    if (!stripe || !elements) {
      setPaymentLoader(false)

      return;
    }
  
    const card = elements.getElement(CardElement);
  
    // If no card element is found, log an error and return early
    if (!card) {
      setPaymentLoader(false)

      return;
    }
  
    try {
      // Create the payment intent on the backend
      const response = await stripePayment(selectedProducts).unwrap();
      // Check if the response contains 'data' or 'error'
      if ('data' in response) {
        const paymentIntent = response?.data;

        if (!paymentIntent || !paymentIntent.paymentIntent.client_secret) {
          console.log("Payment intent creation failed or missing client secret");
          return;
        }
        // Confirm the payment with Stripe
        const { error, paymentIntent: confirmedPaymentIntent } = await stripe.confirmCardPayment(paymentIntent.paymentIntent.client_secret, {
          payment_method: {
            card: card, // We can now safely use 'card' since it is guaranteed not to be null
            billing_details: {
              name: `${user?.firstName} ${user?.lastName}`,
              email: user?.email,
             
            },
          },
        });
        // Handle any errors that occur during the confirmation process
        if (error) {
          console.log("Payment failed", error.message);
        } else {
          // You can check the confirmed paymentIntent here for success or further status
          if (confirmedPaymentIntent?.status === 'succeeded') {
            setPaymentTransitionText(confirmedPaymentIntent.id)
            setOpenTransitionModal(true)
            setPaymentLoader(false)

          } else {
            setPaymentLoader(false)

          }
        }
      } else if ('error' in response) {
        setPaymentLoader(false)

        // Handle errors if the response contains 'error'
        console.error("Error in payment intent creation", response.error);
      
      }
    }catch (error: unknown) {
      setPaymentLoader(false);
    
      // Assert the error type
      const err = error as { data?: { message?: string } };
    
      console.error("Error in payment process", err);
      setPaymentError(err?.data?.message || "An unexpected error occurred");
    }
    
  };
  
  
  return (
    <div className="mt-10 w-11/12 mx-auto">
      <div className="flex flex-col-reverse md:flex-row lg:flex-row justify-evenly items-start ">
        <div className="">
          <p>Account</p>
          <p className="my-1">Email: {user?.email}</p>
          <input type="checkbox" name="subscribe" id="" />
          <span>Email me with news and offers</span>
          <hr className="my-6" />
          <div>
            <form onSubmit={handlePayment}>
              <h3 className="text-2xl text-white">Delivery</h3>
              <select
                name="country"
                className="w-full border border-gray-600 p-3 rounded-sm mt-8"
              >
                <option value="bangladesh">Bangladesh</option>
                <option value="usa">USA</option>
                <option value="pakistan">Pakistan</option>
                <option value="palestine">Palestine</option>
                <option value="canada">Canada</option>
              </select>
              <div className="flex flex-col md:flex-row lg:flex-row justify-start">
                <input
                  type="text"
                  className="p-3 rounded-sm mt-4 w-full md:w-[300px] lg:w-[300px] border border-gray-600 mr-2"
                  name="firstName"
                  placeholder={user?.firstName || "First Name *"}
                />
                <input
                  type="text"
                  className="p-3 rounded-sm mt-4 w-full md:w-[300px] lg:w-[300px] border border-gray-600"
                  name="lastName"
                  placeholder={user?.lastName || "Last Name *"}
                />
              </div>
              <input
                type="text"
                className="w-full border border-gray-600 p-3 rounded-sm mt-4"
                name="address"
                placeholder="Your full address *"
                required
              />
              <input
                type="text"
                className="w-full border border-gray-600 p-3 rounded-sm mt-4"
                name="apartment"
                placeholder="Apartment (optional)"
              />
              <div className="flex flex-col md:flex-row lg:flex-row justify-start mb-10">
                <input
                  type="text"
                  className="p-3 rounded-sm mt-4 w-full md:w-[300px] lg:w-[300px] border border-gray-600 mr-2"
                  name="city"
                  placeholder={user?.address?.district || "City"}
                />
                <input
                  type="text"
                  className="p-3 rounded-sm mt-4 w-full md:w-[300px] lg:w-[300px] border border-gray-600"
                  name="postCode"
                  placeholder={user?.address?.postCode || "Post Code"}
                />
              </div>
              <h3 className="mt-16 mb-4 font-bold text-xl">Shipping method</h3>
              <p className="border mb-8 border-green-600 p-4 text-start bg-green-950">
                Credit card
              </p>
              {/* error appear or testing card credential */}
             
               <div className="mb-4 border border-green-400 p-2 ">
                {
                  paymentError ? <div>
                  <p className="text-red-600 text-xl font-semibold text-center my-2  ">Payment Failed!</p>
                  <p><span className="text-red-600 font-semibold">Message:</span> <span className="">{paymentError}</span></p>
                  <p className="text-primary text-center mt-2" >Please try again later.</p>
             </div> :
                <p >For Testing: cartNumber: 4242 4242 4242 4242 <br />
                     MM: 04/26 <br />
                     YY: 242 <br />
                     CVC: 24242
                   </p>
                }
                 
               
               </div>
              {/* payment input field */}
              <div className=" p-4">
              {!stripe || !elements ? (
  <p>Loading...</p> // Show loading text or spinner while Stripe is being initialized
) : (
  <CardElement
    options={{
      style: {
        base: {
          
          color: "#ffffff",  // Change text color to white
          fontSize: "16px",   // Optional: Adjust font size if needed
          "::placeholder": {
            color: "#ffffff", // Change placeholder text color to white
          },
        },
      },
    }}
  />
)}


              </div>
              <button
                type="submit"
                className="hover:bg-green-600 text-white p-4 rounded-md text-center font-semibold w-full my-5 bg-green-800"
                disabled={!stripe || !elements}
              >
              {paymentLoader ? <p className="animate-pulse text-white font-semibold  bg-transparent text-lg">Loading...</p> : "Pay Now"}
              </button>
            </form>
          </div>
        </div>
 {/*After successful Payment Modal */}
      {openTransitionModal && (
     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
     <div className="p-6 rounded shadow-lg w-1/3 bg-black border border-gray-600">
       <h2 className="text-xl font-bold text-center mb-4">Save your Transition ID!</h2>
       <p className="text-center m-2 text-green-400">Payment Successfully submitted</p>
       <div className="flex items-center">
         <input
           type="text"
           name="transitionText"
           value={paymentTransitionText}
           readOnly
           className="flex-grow p-2 border border-gray-700 rounded-l-md bg-gray-900 text-white"
         />
         <button
           onClick={handleCopy}
           className="bg-green-900 text-white px-4 py-2 rounded-r-md"
         >
           {copyButtonText}
         </button>
       </div>
       <div className="flex flex-col md:flex-row lg:flex-row justify-between mt-8">
         <button
           onClick={() => setOpenTransitionModal(false)}
           className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
         >
           Close
         </button>
         <button
           onClick={handleDownloadPDF}
           className="mt-4 bg-green-600 text-white py-2 px-4 rounded"
         >
           Download
         </button>
       </div>
     </div>
   </div>
     
      )}
        {/* Selected Products Section */}
        <div>
          <div>
            {selectedProducts &&
              selectedProducts?.map(
                (
                  prod: { userId: IUser; productId: IProduct; userSelectedQuantity: number },
                  index: number
                ) => (
                  <div key={index} className="flex md:flex-row lg:flex-row justify-start mt-6 items-center">
                    <img
                      src={prod?.productId.image}
                      className="w-24 h-24 rounded-lg mr-1"
                      alt="product_image"
                    />
                    <div className="flex justify-between gap-4 md:gap-8 lg:gap-8">
                      <div>
                        <p className="text-md font-bold">{prod?.productId.title || "Product Name"}</p>
                        <p>Color: {prod?.productId.color || "Unknown"}</p>
                      </div>
                      <p>Quantity: {prod?.userSelectedQuantity || 1}</p>
                      <p>{prod?.productId.price ? `$${prod.productId.price * prod.userSelectedQuantity}` : "Price not available"}</p>
                    </div>
                  </div>
                )
              )}
          </div>

          {/* Shipping Summary */}
          <div className="mt-36 flex justify-between border-b mb-20">
            <div className="mb-2">
              <p>Subtotal</p>
              <p>Shipping</p>
              <p className="mt-10 font-bold">Total</p>
            </div>

            <div>
              <p>{subtotal.toFixed(2)} $</p>
              <p>50 $</p>
              <p className="mt-10 font-bold">{subtotal + 50}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Wrap the Checkout component in Elements provider
export default function CheckoutPage() {
  return (
    <Elements stripe={stripePromise}>
      <Checkout />
    </Elements>
  );
}
