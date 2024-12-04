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
      return  {
          url: `/product/delete-product/${id}`,
          method: "DELETE",
        }
      },invalidatesTags:["products"]
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
  useAllProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productManagementApi;
