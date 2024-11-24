import { baseApi } from "../../api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
  
    getAllBookings: builder.query({
      query: () =>{
      return  {
          url: "/booking/booking-list",
          method: "GET",
        }
      },providesTags:["bookings"],

    }),
 
    createBooking: builder.mutation({
      query: (productId) => {
      return  {
          url: "/booking/create-booking",
          method: "POST",
          body:productId
        }
      },invalidatesTags:["bookings"]
    }),

    deleteBooking: builder.mutation({
      query: (id) => {
      return  {
          url: `/booking/booking/${id}`,
          method: "DELETE",
        }
      },invalidatesTags:["bookings"]
    }),

    updateProduct: builder.mutation({
      query: (data) => {
        console.log(data.data,"in redux")
      return  {
          url: `/product/update-product/${data.id}`,
          method: "PUT",
          body:data.data
        }
      },invalidatesTags:["products"]
    }),
  }),
});

export const {
  useGetAllBookingsQuery,
  useCreateBookingMutation,
  useUpdateProductMutation,
  useDeleteBookingMutation,
} = bookingApi;
