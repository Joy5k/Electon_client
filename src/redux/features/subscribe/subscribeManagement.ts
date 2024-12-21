import { baseApi } from "../../api/baseApi";

const subscribeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
  
    createSubscriber: builder.mutation({
      query: (data) =>{
      return  {
          url: "/subscription/subscribe",
          method: "POST",
          body:data

        }
      },invalidatesTags:["subscribe"],

    }),
 

  }),
});

export const {
useCreateSubscriberMutation,
} = subscribeApi;
