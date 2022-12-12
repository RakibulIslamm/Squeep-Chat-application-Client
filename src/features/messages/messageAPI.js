import apiSlice from "../api/apiSlice";


export const messageAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: ({ conversationId, email }) => `/messages?conversationId=${conversationId}`
        })
    })
})

export const { useGetMessagesQuery } = messageAPI;