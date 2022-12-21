import { socket } from "../../utils/Socket.io/socket";
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

        getConversations: builder.query({
            query: (email) => `/conversations?email=${email}`,
            onCacheEntryAdded(args, { cacheDataLoaded, updateCachedData, cacheEntryRemoved }) {
                socket.on("updateConversation", ({ data, id }) => {
                    updateCachedData(draft => {
                        for (const c of draft) {
                            if (c._id === id) {
                                c.lastMessage = data.messageText;
                                c.sender = data.email;
                                c.timestamp = data.timestamp;
                                c.unseenMessages += 1
                            }
                        }
                        draft.sort((x, y) => {
                            return new Date(x.timestamp) < new Date(y.timestamp) ? 1 : -1
                        })
                    })
                })
            }
        }),

        getSearchedConversation: builder.query({
            query: ({ text, email }) => `/search-conversations?search=${text}&email=${email}`
        }),

        getSingleConversation: builder.query({
            query: (id) => `/conversation/${id}`
        }),

        changeConversationStatus: builder.mutation({
            query: ({ conversationId, conversation, email }) => ({
                url: `/conversation-status/${conversationId}`,
                method: 'PUT',
                body: { isFriend: true }
            }),
            async onQueryStarted({ conversation, email }, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    if (result.data.modifiedCount) {
                        dispatch(
                            apiSlice.util.updateQueryData('getConversations', email, (draft) => {
                                draft.unshift(conversation);
                            })
                        )
                    }

                }
                catch (err) {

                }
                finally {

                }
            }
        })

    })
})

export const { useAddConversationMutation, useChangeConversationStatusMutation, useGetConversationsQuery, useGetSingleConversationQuery, useUpdateConversationMutation, useGetSearchedConversationQuery } = conversationsAPI;