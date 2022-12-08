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
        changeConversationStatus: builder.mutation({
            query: ({ conversationId }) => ({
                url: `/conversation-status/${conversationId}`,
                method: 'PUT',
                body: { isFriend: true }
            })
        }),

    })
})

export const { useAddConversationMutation, useChangeConversationStatusMutation } = conversationsAPI;