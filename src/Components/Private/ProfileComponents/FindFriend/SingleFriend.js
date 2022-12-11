import { useState } from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useAddConversationMutation } from '../../../../features/conversations/conversationsAPI';
import { useGetRequestedFriendsQuery, useSendFriendRequestMutation } from '../../../../features/friends/friendsApi';
import { useGetUserQuery } from '../../../../features/user/userApi';
import { RiUserShared2Line } from 'react-icons/ri';

const SingleFriend = ({ user }) => {
    const [disabled, setDisabled] = useState(false);
    const [addedUsers, setAddedUsers] = useState([]);

    const { email: currentUserEmail } = useSelector(state => state.auth.user)
    const { data: currentUserData } = useGetUserQuery(currentUserEmail) || {}

    const { data: requestedFriends } = useGetRequestedFriendsQuery(currentUserEmail);
    const isExist = requestedFriends?.map(f => f?.friendship?.filter(email => email !== currentUserEmail)[0]);

    const [addConversation] = useAddConversationMutation();
    const [sendFriendRequest] = useSendFriendRequestMutation();

    const handleAddFriend = async () => {
        setDisabled(true);
        setAddedUsers([...addedUsers, user?.email]);
        try {
            const { name, email, img, _id, username } = currentUserData;
            const currentUser = { name, email, img, _id, username };
            const data = {
                participants: [email, user?.email],
                users: [user, currentUserData],
                sender: '',
                lastMessage: '',
                unseenMessages: 0,
                timestamp: '',
                isFriend: false
            }
            const result = await addConversation({ data, email }).unwrap();
            if (result.insertedId) {
                await sendFriendRequest({ currentUser, requestedPerson: user, conversationId: result.insertedId });
            }
        }
        catch (err) {
            console.log(err);
            setAddedUsers(addedUsers.filter(e => e !== user?.email));
        }
        finally {
            setDisabled(false);
        }
    }


    return (
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
                <div className='w-[30px] h-[30px] flex items-center'>
                    <img className='rounded-full w-full' src={user?.img || "https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-avatar-icon-png-image_313572.jpg"} alt="" />
                </div>
                <p className='font-normal text-white'>{user?.name}</p>
            </div>
            <button disabled={addedUsers?.includes(user?.email) || disabled || isExist?.includes(user?.email)} onClick={handleAddFriend} className='px-3 py-[0px] bg-yellow text-lightBlack rounded-full text-sm disabled:bg-gray-400'>{addedUsers?.includes(user?.email) || isExist?.includes(user?.email) ? <span className='flex items-center gap-1'><RiUserShared2Line /> Requested</span> : <span className='flex items-center gap-1'><AiOutlineUserAdd />Add Friend</span>}</button>
        </div>
    );
};

export default SingleFriend;