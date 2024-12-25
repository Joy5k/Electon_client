import { baseApi } from "../../api/baseApi";

const offerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
  
    getDiscount: builder.query({
      query: () => {
        return {
          url: "offerProduct/getDiscount",
          method: "GET",
        };
      },
      providesTags: ["offers"],
    }),
    getDealOfTheDay: builder.query({
      query: () => {
        return {
          url: "/offerProduct/dealOfTheDayOffer",
          method: "GET",
        };
      },
      providesTags: ["offers"],
    }),
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
 updateAllDiscount: builder.mutation({
      query: (data) =>{
      return  {
          url: `/offerProduct/update/${data.id}`,
          method: "PUT",
          body:data.data

        }
      },invalidatesTags:["offers"],

 }),
 updateProductStatus: builder.mutation({
  query: (_id) => {
    return {
      url: `/offerProduct/updateStatus/${_id}`,
      method: "PUT",
    };
  },
  invalidatesTags: ["offers"],
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
useGetDiscountQuery,
useGetDealOfTheDayQuery,
useCreateDealOfTheDayMutation,
useCreateDiscountMutation,
useUpdateAllDiscountMutation,
useUpdateProductStatusMutation,
useDeleteOfferedProductMutation
} = offerApi;
