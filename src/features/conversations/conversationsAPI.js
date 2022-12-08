import apiSlice from "../api/apiSlice";

export const conversationsAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // API goes here
        addConversation: builder.mutation({
            query: ({ data, email }) => ({
                url: `/conversations`,
                method: 'POST',
                body: data
            })
        }),

    })
})

export const { useAddConversationMutation } = conversationsAPI;