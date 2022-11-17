import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, getAuth, signOut } from "firebase/auth";
import { useState } from "react";
import { authApp } from '../Firebase/firebaseInit'


const useFirebase = () => {
    const [loginLoading, setLoginLoading] = useState(false);
    const [regLoading, setRegLoading] = useState(false);
    const auth = getAuth(authApp)

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

        }
        finally {
            setLoginLoading(false);
        }

    }

    // Log Out
    const logOut = (navigate) => {
        signOut(auth)
            .then(() => {
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
        regLoading
    }

}

export default useFirebase