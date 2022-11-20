import { Route, Routes } from "react-router-dom";
import Inbox from "../Pages/Inbox";
import Login from "../Pages/Login";
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

                </Route>
            </Route>


            <Route path='*' element={<p>Not found</p>} />
        </Routes>
    );
}

export default Layout;