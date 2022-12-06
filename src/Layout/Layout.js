import { Route, Routes } from "react-router-dom";
import Messages from "../Components/Private/InboxComponents/Messages/Messages";
import Inbox from "../Pages/Inbox";
import Login from "../Pages/Login";
import Profile from "../Pages/Profile";
import Register from "../Pages/Register";
import PrivateRoute from "../utils/Routes/PrivateRoute";
import PublicRoute from "../utils/Routes/PublicRoute";
import PrivateLayout from "./Private/PrivateLayout";
import PublicLayout from "./Public/PublicLayout";

function Layout() {

    return (
        <Routes>
            <Route path="/" element={<PublicRoute><PublicLayout /></PublicRoute>}>
                <Route index element={<Login />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Route>

            {/* Private Layout */}
            <Route path="/inbox" element={<PrivateRoute><PrivateLayout /></PrivateRoute>}>
                <Route path="/inbox" element={<Inbox />}>
                    <Route path='messages/:id' element={<Messages />} />
                </Route>
            </Route>

            <Route path="/my-profile" element={<PrivateRoute><PrivateLayout /></PrivateRoute>}>
                <Route path="/my-profile" element={<Profile />}>

                </Route>
            </Route>


            <Route path='*' element={<p>Not found</p>} />
        </Routes>
    );
}

export default Layout;