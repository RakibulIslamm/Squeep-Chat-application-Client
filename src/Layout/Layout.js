import { Route, Routes } from "react-router-dom";
import Register from "../Pages/Register";
import PublicLayout from "./Public/PublicLayout";

function Layout() {

    return (
        <Routes>
            <Route path="/" element={<PublicLayout />}>
                <Route path="register" element={<Register />} />
            </Route>
            <Route path='*' element={<p>Not found</p>} />
        </Routes>
    );
}

export default Layout;