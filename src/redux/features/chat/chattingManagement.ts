import { baseApi } from "../../api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
  
    getAllChattingRoom: builder.query({
      query: () =>{
      return  {
          url: "/chat/chatting-rooms",
          method: "GET",
        }
      },providesTags:["bookings"],

    }),
 

  }),
});

export const {
  useGetAllChattingRoomQuery,
} = bookingApi;
