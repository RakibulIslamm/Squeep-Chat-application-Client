import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import SideBar from "../../Components/Private/Shared/SideBar";
import { socket } from "../../utils/Socket.io/socket";

const PrivateLayout = () => {
    const { name } = useSelector(state => state.auth.user);
    socket.connect();
    useEffect(() => {
        socket.on('connect', function (data) {
            //socket.emit('join', name);
            // console.log(data)
        });
    }, [name]);

    return (
        <div className='max-w-[1920px] min-h-[500px] xs:min-h-screen xxs:min-h-screen h-screen bg-primary mx-auto overflow-hidden flex items-start'>
            <SideBar />
            <Outlet />
        </div>
    );
};

export default PrivateLayout;