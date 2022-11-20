import { Outlet } from "react-router-dom";
import Conversations from "../Components/Private/InboxComponents/Conversations/Conversations";


const Inbox = () => {

    return (
        <div className='w-full h-full flex justify-between'>
            <Conversations />
            <Outlet />
        </div>
    );
};

export default Inbox;