import apiSlice from "../api/apiSlice";


const friendsApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        sendFriendRequest: builder.mutation({
            query: ({ currentUser, requestedPerson, conversationId }) => ({
                url: '/send-request',
                method: 'POST',
                body: { currentUser, requestedPerson, conversationId }
            })
        }),
        getRequestedFriends: builder.query({
            query: (email) => `/requested-friends?email=${email}`,
        }),
        getFriendRequest: builder.query({
            query: (email) => `/friend-request?email=${email}`,
        }),
        acceptFriend: builder.mutation({
            query: ({ id, email, conversationData }) => ({
                url: `/accept/${id}`,
                method: 'PUT'
            })
        }),
        cancelFriend: builder.mutation({
            query: ({ id, email }) => ({
                url: `/cancel/${id}`,
                method: 'DELETE',
            })
        }),
        getMyFriends: builder.query({
            query: (email) => `/friends?email=${email}`
        })
    })
})

export const { useSendFriendRequestMutation, useGetFriendRequestQuery, useGetRequestedFriendsQuery, useAcceptFriendMutation, useCancelFriendMutation, useGetMyFriendsQuery } = friendsApi;