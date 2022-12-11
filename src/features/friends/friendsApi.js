import apiSlice from "../api/apiSlice";


const friendsApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        sendFriendRequest: builder.mutation({
            query: ({ currentUser, requestedPerson, conversationId }) => ({
                url: '/send-request',
                method: 'POST',
                body: { currentUser, requestedPerson, conversationId }
            }),
            async onQueryStarted({ currentUser, requestedPerson }, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    const friend = {
                        _id: result.data.insertedId,
                        friendship: [currentUser.email, requestedPerson.email],
                        requester: currentUser.email,
                        receiver: requestedPerson.email,
                        users: [
                            currentUser, requestedPerson
                        ],
                        status: 'pending'
                    }
                    dispatch(
                        apiSlice.util.updateQueryData('getRequestedFriends', currentUser.email, (draft) => {
                            draft.push(friend);
                        })
                    )
                }
                catch (err) {
                    console.log(err);
                }
            }
        }),
        getRequestedFriends: builder.query({
            query: (email) => `/requested-friends?email=${email}`,
        }),
        getFriendRequest: builder.query({
            query: (email) => `/friend-request?email=${email}`,
        }),
        acceptFriend: builder.mutation({
            query: ({ id, email }) => ({
                url: `/accept/${id}`,
                method: 'PUT'
            }),
            async onQueryStarted({ id, email }, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;

                    if (result.data.modifiedCount > 0) {
                        dispatch(
                            apiSlice.util.updateQueryData('getFriendRequest', email, (draft) => {
                                for (const user of draft) {
                                    if (user._id === id) {
                                        user.status = 'friend'
                                    }
                                }
                            })
                        );
                    }
                }
                catch (err) {

                }
            }
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