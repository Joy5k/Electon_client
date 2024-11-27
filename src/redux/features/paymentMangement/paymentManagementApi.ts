import { baseApi } from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
  
    getAllPayments: builder.query({
      query: () =>{
      return  {
          url: "/booking/booking-list",
          method: "GET",
        }
      },providesTags:["bookings"],

    }),
 
    createPaymentIntent: builder.mutation({
      query: (data) => {
        console.log(data)
      return  {
          url: "/payment/create-payment-intent",
          method: "POST",
          body:data
        }
      },invalidatesTags:["payments"]
    }),

  }),
});

export const {
  useGetAllPaymentsQuery,
  useCreatePaymentIntentMutation,
} = paymentApi;
