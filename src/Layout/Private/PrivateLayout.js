import { Outlet } from "react-router-dom";
import SideBar from "../../Components/Private/Shared/SideBar";

const PrivateLayout = () => {

    return (
        <div className='max-w-[1920px] min-h-[500px] h-screen bg-primary mx-auto overflow-hidden flex items-start'>
            <SideBar />
            <Outlet />
        </div>
    );
};

export default PrivateLayout;