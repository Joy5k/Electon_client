import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
  getAllUsers:builder.query({
    query:()=>({
      url:"/user/all-users",
      method:"GET"
    }),providesTags:["users"]
  }),
    
    updateUserStatus: builder.mutation({
      query: (id) => {
        return {
          url: `/user/block/${id}`,
          method: "PUT",
        };
      },invalidatesTags:["users"]
    }),

    createAdmin: builder.mutation({
      query: (_id) => {
        if (!_id || typeof _id !== "string" || !_id.trim()) {
          throw new Error("Invalid ID provided");
        }
        return {
          url: `/user/create-admin`,
          method: "PUT",
          body:{_id}
        };
      },invalidatesTags:["users"]
    }),

    deleteUser: builder.mutation({
      query: (id) => {
        return {
          url: `/user/delete/${id}`,
          method: "DELETE",
        };
      },invalidatesTags:["users"]
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useUpdateUserStatusMutation,
  useCreateAdminMutation,
  useDeleteUserMutation

} = userManagementApi;
