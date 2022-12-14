import { useEffect, useState } from "react"
// import { auth } from "../Firebase/firebaseInit";
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import { authApp } from "../Firebase/firebaseInit";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../features/auth/authSlice";
import { socket } from "../utils/Socket.io/socket";


const useListenAuth = () => {
    const dispatch = useDispatch();
    const [authChecked, setAuthChecked] = useState(false);
    const auth = getAuth(authApp);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const currentUser = { name: user.displayName, email: user.email, img: user.photoURL }
                dispatch(getCurrentUser(currentUser));
                socket.emit('user', user.email);
                // console.log(user);
            } else {
                // console.log('User Not Found');
            }
            setTimeout(() => {
                setAuthChecked(true)
            }, 500);
        });
    }, [auth, dispatch]);

    return authChecked
}

export default useListenAuth;