import { socket } from "../../utils/Socket.io/socket";
import apiSlice from "../api/apiSlice";


export const messageAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: ({ conversationId, email }) => `/messages?conversationId=${conversationId}`,
            async onCacheEntryAdded({ conversationId, email }, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) {
                try {
                    await cacheDataLoaded;
                    socket.on('message', (data) => {
                        updateCachedData(draft => {
                            // console.log(JSON.parse(JSON.stringify(draft)));
                            // console.log(data);
                            if (conversationId === data.conversationId && email !== data?.sender?.email) {
                                const message = {
                                    _id: parseInt(draft.length) + 1,
                                    ...data
                                }
                                draft.unshift(message);
                            };
                        });
                    });
                }
                catch (err) {

                }
                finally {
                    await cacheEntryRemoved;
                    socket.close();
                }
            }

        }),
        sendMessage: builder.mutation({
            query: (data) => ({
                url: `/send-message`,
                method: "POST",
                body: data
            })
        })
    })
})

export const { useGetMessagesQuery, useSendMessageMutation } = messageAPI;