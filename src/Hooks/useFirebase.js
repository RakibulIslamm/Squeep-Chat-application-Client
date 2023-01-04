import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, getAuth, signOut, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { authLogError, authRegError, logOutUser, passUpdated } from "../features/auth/authSlice";
import { authApp } from '../Firebase/firebaseInit'
import { socket } from "../utils/Socket.io/socket";


const useFirebase = () => {
    const [loginLoading, setLoginLoading] = useState(false);
    const [regLoading, setRegLoading] = useState(false);
    const auth = getAuth(authApp);
    const dispatch = useDispatch();

    // Create account
    const createAccount = async (name, email, password) => {
        setRegLoading(true)
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const user = result.user;
            // const currentUser = { name: name, email: user.email, img: user.photoURL }
            if (user?.email) {
                try {
                    await updateProfile(auth.currentUser, { displayName: name })
                    const currentUser = { name: user.displayName, email: user.email, img: user.photoURL }
                    console.log(currentUser);
                    // const { displayName, photoURL, email } = user;
                    // const username = email.split('@')[0];
                }
                catch (err) {

                }
            }
        }
        catch (err) {
            dispatch(authRegError(err.message));
        }
        finally {
            setRegLoading(false);
        }
    }

    // Login
    const login = async (email, password, navigate) => {
        setLoginLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password)
            const user = result.user;
            const currentUser = { name: user.displayName, email: user.email, img: user.photoURL }
            console.log(currentUser);
        }
        catch (err) {
            dispatch(authLogError(err.message));
        }
        finally {
            setLoginLoading(false);
        }

    }

    // Change password
    const changePassword = async (currentPassword, newPassword) => {
        try {
            const user = auth.currentUser;
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            console.log();
            const check = await reauthenticateWithCredential(user, credential);
            if (check) {
                await updatePassword(user, newPassword);
                dispatch(passUpdated(true));
                setTimeout(() => {
                    dispatch(passUpdated(false));
                }, 10000);
            }
        } catch (e) {
            console.log(e.message);
        }
    }

    // Log Out
    const logOut = (navigate) => {
        signOut(auth)
            .then(() => {
                dispatch(logOutUser());
                socket.disconnect()
                navigate('/login');
            })
            .catch((error) => {
                // An error happened.
            });
    }


    return {
        createAccount,
        login,
        logOut,
        loginLoading,
        regLoading,
        changePassword,
    }

}

export default useFirebase