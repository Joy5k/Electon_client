import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
  
    getUser: builder.query({
      query: () => ({
        url: "/user/getMe",
        method: "GET",
       
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: "/user/update",
        method: "PUT",
        body: data,
      }),
    }),
    updateRoleUserToSeller: builder.mutation({
      query: () => ({
        url: "/user/userToSeller",
        method: "PUT",
       
      }),
    }),
  
  }),
});
export const {
  useUpdateRoleUserToSellerMutation,
    useUpdateUserMutation,
    useGetUserQuery
} = userManagementApi;
