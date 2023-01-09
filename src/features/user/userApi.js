import apiSlice from "../api/apiSlice";


const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addUser: builder.mutation({
            query: ({ data }) => ({
                url: `/users`,
                method: 'POST',
                body: data
            })
        }),
        getAllUsers: builder.query({
            query: (email) => `/find-people?email=${email}`
        }),
        getUser: builder.query({
            query: (email) => `/user?email=${email}`
        }),
        updateUserProfile: builder.mutation({
            query: ({ id, data }) => ({
                url: `/update-profile/${id}`,
                method: 'POST',
                body: data
            })
        }),
        updateUserProfilePhoto: builder.mutation({
            query: ({ id, data }) => ({
                url: `/update-profile-photo/${id}`,
                method: 'POST',
                body: data
            })
        }),
    })
})

export const { useAddUserMutation, useGetAllUsersQuery, useGetUserQuery, useUpdateUserProfileMutation, useUpdateUserProfilePhotoMutation } = userApi;