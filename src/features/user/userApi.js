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
        })
    })
})

export const { useAddUserMutation, useGetAllUsersQuery, useGetUserQuery } = userApi;