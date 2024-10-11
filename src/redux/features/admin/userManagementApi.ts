import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
  
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
    }),
    updateStudentStatus: builder.mutation({
      query: (data) => {
        console.log(data);
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
  useAddStudentMutation,
  useUpdateStudentStatusMutation,

} = userManagementApi;
