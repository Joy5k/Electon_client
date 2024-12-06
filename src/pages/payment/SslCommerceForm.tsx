// SslCommerceForm.tsx
import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const SslCommerceForm = ({ subtotal, user, onPaymentSuccess }: any) => {
  const [paymentError, setPaymentError] = useState<string>("");
  const [isCardValid, setIsCardValid] = useState(false);
  const [paymentLoader, setPaymentLoader] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleCardChange = (event: any) => {
    setIsCardValid(event.complete);
  };

  const handlePayment = async (event: any) => {
    setPaymentLoader(true);
    event.preventDefault();

    if (!stripe || !elements) {
      setPaymentLoader(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setPaymentLoader(false);
      return;
    }

    try {
      // Assuming stripePayment is a function that creates a payment intent on your backend
      const response = await fetch("/api/payment-intent", {
        method: "POST",
        body: JSON.stringify({ amount: subtotal }), // Send the subtotal as amount
      });
      const paymentIntentData = await response.json();

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        paymentIntentData.client_secret,
        {
          payment_method: {
            card,
            billing_details: {
              name: `${user?.firstName} ${user?.lastName}`,
              email: user?.email,
            },
          },
        }
      );

      if (error) {
        setPaymentError(error.message || "Payment failed");
      } else if (paymentIntent.status === "succeeded") {
        onPaymentSuccess(paymentIntent.id);
      }
    } catch (error) {
      setPaymentError("Payment failed due to an error.");
    } finally {
      setPaymentLoader(false);
    }
  };

  return (
    <form onSubmit={handlePayment}>
      <h3 className="text-2xl text-white">Payment Information</h3>
      <div className="p-4">
        {!stripe || !elements ? (
          <p>Loading...</p>
        ) : (
          <CardElement
            options={{
              style: {
                base: {
                  color: "#ffffff",
                  fontSize: "16px",
                  "::placeholder": {
                    color: "#ffffff",
                  },
                },
              },
            }}
            onChange={handleCardChange}
          />
        )}
      </div>
      {paymentError && <p className="text-red-600">{paymentError}</p>}
      <button
        type="submit"
        className={`text-white p-4 rounded-md text-center font-semibold w-full my-5 ${
          !isCardValid ? "bg-gray-500" : "bg-green-800 hover:bg-green-600"
        }`}
        disabled={!stripe || !elements || !isCardValid}
      >
        {paymentLoader ? (
          <p className="animate-pulse text-white font-semibold bg-transparent text-lg">Loading...</p>
        ) : (
          "Pay Now"
        )}
      </button>
    </form>
  );
};

export default SslCommerceForm;
