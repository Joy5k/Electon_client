import { baseApi } from "../../api/baseApi";

const productManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
  
    allProducts: builder.query({
      query: () =>{
      return  {
          url: "/product/get-all-products",
          method: "GET",
        }
      },providesTags:["products"],

    }),
 
    createProduct: builder.mutation({
      query: (data) => {
      return  {
          url: "/product/create-product",
          method: "POST",
          body:data
        }
      },invalidatesTags:["products"]
    }),
  }),
});

export const {
  useAllProductsQuery,
  useCreateProductMutation
} = productManagementApi;
