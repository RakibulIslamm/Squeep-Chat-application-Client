import { Outlet } from "react-router-dom";


const Inbox = () => {

    return (
        <div className='w-full h-full flex justify-between'>
            <Outlet />
        </div>
    );
};

export default Inbox;