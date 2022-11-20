import { Outlet } from "react-router-dom";
import ActiveFriends from "../Components/Private/InboxComponents/ActiveFriends/ActiveFriends";
import Conversations from "../Components/Private/InboxComponents/Conversations/Conversations";


const Inbox = () => {

    return (
        <div className='w-full h-full flex justify-between'>
            <Conversations />
            <Outlet />
            <ActiveFriends />
        </div>
    );
};

export default Inbox;