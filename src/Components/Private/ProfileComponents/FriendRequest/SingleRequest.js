import { RiUserUnfollowLine, RiUserReceived2Line } from 'react-icons/ri'
import moment from "moment/moment";
import { useSelector } from "react-redux";

const SingleRequest = ({ friend }) => {
    const { email } = useSelector(state => state.auth.user);
    const user = friend?.users?.find(user => user.email !== email);
    return (
        <div className='border-b border-primary py-4 last:border-0'>
            <div className='flex gap-2'>
                <div className='w-[55px] h-[55px] flex items-center'>
                    <img className='rounded-full w-full' src={user?.img || "https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-avatar-icon-png-image_313572.jpg"} alt="" />
                </div>
                <div>
                    <div className="w-full flex items-center gap-5 justify-between">
                        <p className='font-semibold text-white text-lg'>{user?.name}</p>
                        <p className='font-light text-gray-400 text-xs'>{moment(friend.timestamp).fromNow()}</p>
                    </div>
                    {<>
                        <div className="flex items-center gap-2">
                            <button className='px-2 py-[0px] bg-[#B8F7D4] text-primary hover:bg-[#93E1E1] transition-all ease-in-out rounded-full text-sm disabled:bg-gray-400 flex items-center gap-1'><RiUserReceived2Line />Confirm</button>
                            <button className='px-2 py-[0px] bg-[#FF636D] text-primary hover:bg-red-500 hover:text-white transition-all ease-in-out rounded-full text-sm flex items-center gap-1'><RiUserUnfollowLine />Cancel</button>
                        </div>
                    </>}

                </div>
            </div>
        </div>
    );
};

export default SingleRequest;

//isLoading ? <RotatingLinesLoader color={'white'} size='30' /> : 