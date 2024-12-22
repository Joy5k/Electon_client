import { baseApi } from "../../api/baseApi";

const offerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
  
    createDiscount: builder.mutation({
      query: (data) =>{
      return  {
          url: "/offerProduct/create",
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
 

  }),
});

export const {
useCreateDealOfTheDayMutation,
useCreateDiscountMutation
} = offerApi;
