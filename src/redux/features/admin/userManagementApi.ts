import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
  getAllUsers:builder.query({
    query:()=>({
      url:"/user/all-users",
      method:"GET"
    })
  }),
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
    }),
    updateStudentStatus: builder.mutation({
      query: (data) => {
        return {
          url: `/users/change-status/${data.id}`,
          method: "POST",
          body: data.data,
        };
      },
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useAddStudentMutation,
  useUpdateStudentStatusMutation,

} = userManagementApi;
