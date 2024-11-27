import { useLocation } from "react-router-dom";
import { IProduct, IUser } from "../types";
import { useEffect, useState } from "react";
import { useGetUserQuery } from "../redux/features/userManagement/userManagement";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCreatePaymentIntentMutation } from "../redux/features/paymentMangement/paymentManagementApi";
import Spinner from "../components/Spinner/Spinner";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);


const Checkout = () => {
    const [stripePayment]=useCreatePaymentIntentMutation()
  const { data } = useGetUserQuery({});
  const location = useLocation();
  const { selectedProducts } = location.state || { selectedProducts: [] };
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const user = data?.data || ({} as IUser);
  const stripe = useStripe();
  const elements = useElements();
  const [openTransitionModal,setOpenTransitionModal]=useState<boolean>(false)
  const [paymentLoader,setPaymentLoader]=useState<boolean>(false)
  // Sum total price
  useEffect(() => {
    if (selectedProducts && selectedProducts.length > 0) {
      const total = selectedProducts.reduce(
        (accumulator: number, product: { productId: IProduct }) =>
          accumulator + (product.productId?.price || 0),
        0
      );
      setTotalPrice(total);
    }
  }, [selectedProducts]);

  // Handle Payment Submission

  const handlePayment = async (event: any) => {
    setPaymentLoader(true)
    event.preventDefault();
  
    // Ensure Stripe and Elements are loaded before proceeding
    if (!stripe || !elements) {
      console.log("Stripe or Elements is not loaded");
      setPaymentLoader(false)

      return;
    }
  
    const card = elements.getElement(CardElement);
  
    // If no card element is found, log an error and return early
    if (!card) {
      console.log("Card element not found");
      setPaymentLoader(false)

      return;
    }
  
    try {
      // Create the payment intent on the backend
      const response = await stripePayment({ amount: totalPrice }).unwrap();
      // Check if the response contains 'data' or 'error'
      if ('data' in response) {
        const paymentIntent = response.data;
        
        if (!paymentIntent || !paymentIntent.client_secret) {
          console.log("Payment intent creation failed or missing client secret");
          return;
        }
  
        // Confirm the payment with Stripe
        const { error, paymentIntent: confirmedPaymentIntent } = await stripe.confirmCardPayment(paymentIntent.client_secret, {
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
            console.log("Payment successful", confirmedPaymentIntent);
            setOpenTransitionModal(true)
            setPaymentLoader(false)

          } else {
            setPaymentLoader(false)

            console.log("Payment not confirmed, status:", confirmedPaymentIntent?.status);
          }
        }
      } else if ('error' in response) {
        setPaymentLoader(false)

        // Handle errors if the response contains 'error'
        console.error("Error in payment intent creation", response.error);
      }
    } catch (error) {
      setPaymentLoader(false)

      console.error("Error in payment process", error);
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

              {/* payment input field */}
              <div className="bg-gray-600 p-4">
              {!stripe || !elements ? (
  <p>Loading...</p> // Show loading text or spinner while Stripe is being initialized
) : (
  <CardElement
    options={{
      style: {
        base: {
            backgroundColor:"transparent",
         
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
              {paymentLoader ? <Spinner></Spinner> : "Pay Now"}
              </button>
            </form>
          </div>
        </div>
 {/* Modal */}
      {openTransitionModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold">Hello, World!</h2>
            <button
              onClick={()=>setOpenTransitionModal(!openTransitionModal)}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
            >
              Close
            </button>
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
                      <p>{prod?.productId.price ? `$${prod.productId.price}` : "Price not available"}</p>
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
              <p>{totalPrice} $</p>
              <p>50 $</p>
              <p className="mt-10 font-bold">{totalPrice + 50}</p>
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
