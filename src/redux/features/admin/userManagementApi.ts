import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
  getAllUsers:builder.query({
    query:()=>({
      url:"/user/all-users",
      method:"GET"
    }),providesTags:["users"]
  }),
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
    }),
    updateUserStatus: builder.mutation({
      query: (data) => {
        return {
          url: `/users/change-status/${data.id}`,
          method: "POST",
        };
      },invalidatesTags:["users"]
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useAddStudentMutation,
  useUpdateUserStatusMutation,

} = userManagementApi;
