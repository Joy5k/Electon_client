import { baseApi } from "../../api/baseApi";

const offerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
  
    getAllOfferedProducts: builder.query({
      query: () => {
        return {
          url: "offerProduct/allOffers",
          method: "GET",
        };
      },
      providesTags: ["offers"],
    }),
    createDiscount: builder.mutation({
      query: (data) =>{
      return  {
          url: "offerProduct/create",
          method: "POST",
          body:data

        }
      },invalidatesTags:["offers"],

    }),
 
    createDealOfTheDay: builder.mutation({
      query: () =>{
      return  {
          url: "/offerProduct/create",
          method: "POST",

        }
      },invalidatesTags:["offers"],

    }),
 
deleteOfferedProduct: builder.mutation({
      query: (id) =>{
      return  {
          url: `offerProduct/delete/${id}`,
          method: "DELETE",
        }
      },invalidatesTags:["offers"],
    
})







  }),
});

export const {
useGetAllOfferedProductsQuery,
useCreateDealOfTheDayMutation,
useCreateDiscountMutation,
useDeleteOfferedProductMutation
} = offerApi;
