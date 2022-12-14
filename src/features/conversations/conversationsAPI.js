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
        updateConversation: builder.mutation({
            query: ({ messageData, id, email }) => ({
                url: `/conversations/${id}`,
                method: 'PUT',
                body: messageData
            }),
            async onQueryStarted({ messageData, id, email }, { queryFulfilled, dispatch }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData('getConversations', email, (draft) => {
                        draft.forEach(conv => {
                            if (conv._id === id) {
                                conv.lastMessage = messageData.messageText;
                                conv.sender = messageData.email;
                                conv.timestamp = messageData.timestamp;
                                return;
                            }
                        });
                        draft.sort((x, y) => {
                            return new Date(x.timestamp) < new Date(y.timestamp) ? 1 : -1
                        })
                    })
                )
                try {
                    await queryFulfilled;
                }
                catch (err) {
                    patchResult.undo();
                }
                finally {

                }
            }
        }),
        changeConversationStatus: builder.mutation({
            query: ({ conversationId }) => ({
                url: `/conversation-status/${conversationId}`,
                method: 'PUT',
                body: { isFriend: true }
            })
        }),

        getConversations: builder.query({
            query: (email) => `/conversations?email=${email}`,
        }),

        getSingleConversation: builder.query({
            query: (id) => `/conversation/${id}`
        }),

    })
})

export const { useAddConversationMutation, useChangeConversationStatusMutation, useGetConversationsQuery, useGetSingleConversationQuery, useUpdateConversationMutation } = conversationsAPI;