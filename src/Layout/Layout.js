import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PublicLayout from "./Public/PublicLayout";

function Layout() {

    return (
        <Routes>
            <Route path="/" element={<PublicLayout />}>
                <Route index element={<Login />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Route>
            <Route path='*' element={<p>Not found</p>} />
        </Routes>
    );
}

export default Layout;