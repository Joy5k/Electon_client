import { baseApi } from "../../api/baseApi";

const productManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
  
    allProducts: builder.query({
      query: () => ({
        url: "/product/get-all-products",
        method: "GET",
      }),
    }),
 
  }),
});

export const {
  useAllProductsQuery,

} = productManagementApi;
