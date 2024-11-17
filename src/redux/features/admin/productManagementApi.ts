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
    deleteProduct: builder.mutation({
      query: (id) => {
        console.log("In Redux",id)
      return  {
          url: `/product/delete-product/${id}`,
          method: "DELETE",
        }
      },invalidatesTags:["products"]
    }),
  }),
});

export const {
  useAllProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} = productManagementApi;
