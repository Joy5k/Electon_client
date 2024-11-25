import { baseApi } from "../../api/baseApi";

const productManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
  
    getSingleProduct: builder.query({
      query: (id) =>{
      return  {
          url: `/product/single-product/${id}`,
          method: "GET",
        }
      },providesTags:["products"],

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
  useGetSingleProductQuery,
  useCreateBookingMutation,
  useUpdateProductMutation,
  useDeleteBookingMutation,
} = productManagementApi;
