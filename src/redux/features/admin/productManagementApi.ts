import { baseApi } from "../../api/baseApi";

const productManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
  
    getAllCategories: builder.query({
      query: () =>{
      return  {
          url: `/product/category`,
          method: "GET",
        }
      },providesTags:["products"],

    }),
    allProducts: builder.query({
      query: (query) =>{
      return  {
          url: `/product/get-all-products?searchTerm=${query.searchTerm? query.searchTerm: ""}`,
          method: "GET",
        }
      },providesTags:["products"],

    }),
    getSingleProduct: builder.query({
      query: (id) =>{
      return  {
          url: `/product/single-product/${id}`,
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
  useGetAllCategoriesQuery,
  useAllProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productManagementApi;
