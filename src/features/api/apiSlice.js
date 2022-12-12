import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000',
        prepareHeaders: async (headers, { getState, endpoint }) => { }
    }),
    refetchOnReconnect: true,
    tagTypes: [],
    endpoints: (builder) => ({

    })
});

export default apiSlice;